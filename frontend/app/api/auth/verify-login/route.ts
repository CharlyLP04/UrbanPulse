import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'
import { signAccessToken, signRefreshToken, TokenPayload } from '../../../../lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, code } = body

    if (!email || !code) {
      return NextResponse.json(
        { success: false, message: 'El correo y el código son requeridos.' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Usuario no encontrado.' },
        { status: 404 }
      )
    }

    if (user.verificationCode !== code) {
      return NextResponse.json(
        { success: false, message: 'El código de seguridad es incorrecto.' },
        { status: 401 }
      )
    }

    if (!user.verificationCodeExpiry || new Date() > user.verificationCodeExpiry) {
      return NextResponse.json(
        { success: false, message: 'El código ha expirado. Por favor intenta iniciar sesión de nuevo.' },
        { status: 401 }
      )
    }

    // Código válido, limpiar código
    await prisma.user.update({
        where: { id: user.id },
        data: {
            verificationCode: null,
            verificationCodeExpiry: null
        }
    })

    const normalizedRole = user.role.toLowerCase()

    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: normalizedRole,
    }

    const accessToken = await signAccessToken(tokenPayload)
    const refreshToken = await signRefreshToken(tokenPayload)

    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: normalizedRole,
        },
      },
      { status: 200 }
    )

    response.cookies.set('auth-token', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 15 * 60,
      path: '/',
    })

    response.cookies.set('refresh-token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    })

    return response

  } catch (error) {
    console.error('Error en verify-login:', error)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}
