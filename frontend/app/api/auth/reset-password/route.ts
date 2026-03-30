import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'
import { hashPassword } from '../../../../lib/password'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { token, newPassword } = body

        if (!token || !newPassword) {
            return NextResponse.json(
                { success: false, message: 'Falta el token de seguridad o la nueva contraseña.' },
                { status: 400 }
            )
        }

        if (newPassword.length < 6) {
            return NextResponse.json(
                { success: false, message: 'La contraseña debe tener al menos 6 caracteres.' },
                { status: 400 }
            )
        }

        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
            },
        })

        if (!user || !user.resetTokenExpiry) {
            return NextResponse.json(
                { success: false, message: 'Token de recuperación inválido.' },
                { status: 400 }
            )
        }

        if (new Date() > user.resetTokenExpiry) {
            return NextResponse.json(
                { success: false, message: 'El enlace de recuperación ha expirado. Por favor solicita uno nuevo.' },
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
            }
        })

        return NextResponse.json(
            { success: true, message: 'Tu contraseña ha sido actualizada con éxito.' },
            { status: 200 }
        )

    } catch (error) {
        console.error('Error en reset-password:', error)
        return NextResponse.json(
            { success: false, message: 'Error interno del servidor.' },
            { status: 500 }
        )
    }
}
