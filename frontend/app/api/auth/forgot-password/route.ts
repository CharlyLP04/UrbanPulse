import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'
import { sendPasswordResetLink } from '../../../../lib/email'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { email } = body

        if (!email) {
            return NextResponse.json(
                { success: false, message: 'El correo es requerido.' },
                { status: 400 }
            )
        }

        const user = await prisma.user.findUnique({
            where: { email },
        })

        // Siempre devolver éxito para no revelar si un correo existe o no a atacantes
        if (!user) {
            return NextResponse.json(
                { success: true, message: 'Si el correo existe en nuestro sistema, te enviaremos un enlace de recuperación.' },
                { status: 200 }
            )
        }

        // Generar un UUID o token seguro para la recuperación
        const resetToken = crypto.randomBytes(32).toString('hex')
        const resetTokenExpiry = new Date()
        resetTokenExpiry.setMinutes(resetTokenExpiry.getMinutes() + (parseInt(process.env.RESET_TOKEN_EXPIRY_MINUTES || '30')))

        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken,
                resetTokenExpiry
            }
        })

        const origin = process.env.APP_URL || request.nextUrl.origin || 'http://localhost:3000'
        const resetLink = `${origin}/auth/reset-password?token=${resetToken}`

        await sendPasswordResetLink(user.email, resetLink)

        return NextResponse.json(
            { success: true, message: 'Si el correo existe en nuestro sistema, te enviaremos un enlace de recuperación.' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Error en forgot-password:', error)
        return NextResponse.json(
            { success: false, message: 'Error interno del servidor.' },
            { status: 500 }
        )
    }
}
