import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

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

        if (user.emailVerified) {
            return NextResponse.json(
                { success: false, message: 'El correo ya está verificado.' },
                { status: 400 }
            )
        }

        if (user.verificationCode !== code) {
            return NextResponse.json(
                { success: false, message: 'El código de verificación es incorrecto.' },
                { status: 400 }
            )
        }

        if (!user.verificationCodeExpiry || new Date() > user.verificationCodeExpiry) {
            return NextResponse.json(
                { success: false, message: 'El código de verificación ha expirado. Por favor solicita uno nuevo.' },
                { status: 400 }
            )
        }

        // Marcar como verificado
        await prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: true,
                verificationCode: null,
                verificationCodeExpiry: null,
            },
        })

        return NextResponse.json(
            { success: true, message: 'Tu cuenta ha sido verificada con éxito. Ya puedes iniciar sesión.' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error en verify-email:', error)
        return NextResponse.json(
            { success: false, message: 'Error interno del servidor.' },
            { status: 500 }
        )
    }
}
