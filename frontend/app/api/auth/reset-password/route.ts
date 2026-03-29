import { createHash } from 'crypto'
import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { hashPassword } from '@/lib/password'

export const dynamic = 'force-dynamic'

const INVALID_TOKEN_MESSAGE = 'Token de recuperación inválido o expirado.'

function hashResetToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { token, newPassword } = body

    if (!token || !newPassword) {
      return Response.json(
        {
          success: false,
          message: 'Los campos token y newPassword son requeridos.',
        },
        { status: 400 }
      )
    }

    const hashedToken = hashResetToken(token)

    const user = await prisma.user.findFirst({
      where: {
        resetToken: hashedToken,
      },
      select: {
        id: true,
        resetTokenExpiry: true,
      },
    })

    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry <= new Date()) {
      return Response.json(
        {
          success: false,
          message: INVALID_TOKEN_MESSAGE,
        },
        { status: 400 }
      )
    }

    const hashedPassword = await hashPassword(newPassword)

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    })

    return Response.json(
      {
        success: true,
        message: 'La contraseña se actualizó correctamente.',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error in reset password:', error)
    return Response.json(
      {
        success: false,
        message: 'Error interno del servidor.',
      },
      { status: 500 }
    )
  }
}
