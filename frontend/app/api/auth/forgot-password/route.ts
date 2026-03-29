import { randomBytes, createHash } from 'crypto'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

const GENERIC_MESSAGE =
  'Si el correo está registrado, recibirás instrucciones para recuperar tu contraseña.'

function hashResetToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return Response.json(
        {
          success: false,
          message: 'El correo es obligatorio.',
        },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
      },
    })

    if (user) {
      const rawToken = randomBytes(32).toString('hex')
      const hashedToken = hashResetToken(rawToken)
      const resetTokenExpiry = new Date(Date.now() + 30 * 60 * 1000)
      const appUrl = process.env.APP_URL || request.nextUrl.origin
      const resetLink = `${appUrl}/auth/reset-password?token=${rawToken}`

      await prisma.user.update({
        where: { id: user.id },
        data: {
          resetToken: hashedToken,
          resetTokenExpiry,
        },
      })

      if (process.env.NODE_ENV !== 'production') {
        console.info('Reset password link:', resetLink)
      }
    }

    return Response.json(
      {
        success: true,
        message: GENERIC_MESSAGE,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in forgot password:', error)
    return Response.json(
      {
        success: false,
        message: 'Error interno del servidor.',
      },
      { status: 500 }
    )
  }
}
