import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { comparePassword } from '@/lib/password'
import { sendLogin2FACode } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Los campos email y password son requeridos.' },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
        emailVerified: true // Extraer emailVerified
      },
    })

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'Credenciales inválidas.' },
        { status: 401 }
      )
    }

    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      return NextResponse.json(
        { success: false, message: 'Credenciales inválidas.' },
        { status: 401 }
      )
    }

    if (!user.emailVerified) {
      return NextResponse.json(
        { success: false, message: 'Por favor verifica tu correo electrónico antes de iniciar sesión.' },
        { status: 403 }
      )
    }

    // El usuario existe y tiene la contraseña correcta. En lugar de dar el JWT, mandamos el 2FA.
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
    const verificationCodeExpiry = new Date()
    verificationCodeExpiry.setMinutes(verificationCodeExpiry.getMinutes() + 5) // 5 minutos de validez para 2FA

    await prisma.user.update({
        where: { id: user.id },
        data: {
            verificationCode,
            verificationCodeExpiry
        }
    })

    await sendLogin2FACode(user.email, verificationCode)

    return NextResponse.json(
      {
        success: true,
        requiresVerification: true,
        message: 'Código de verificación enviado al correo.',
        email: user.email // Devolvemos el email para el siguiente paso
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error en login:', error)
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}
