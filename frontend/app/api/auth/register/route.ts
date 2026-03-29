import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'
import { hashPassword } from '../../../../lib/password'
import { sendVerificationEmail } from '../../../../lib/email'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    try {
        // ── 1. Parsear y validar body ────────────────────────
        const body = await request.json()
        const { email, name, password } = body

        if (!email || !name || !password) {
            return NextResponse.json(
                { success: false, message: 'Los campos email, name y password son requeridos.' },
                { status: 400 }
            )
        }

        // Validación básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: 'El formato del email es inválido.' },
                { status: 400 }
            )
        }

        // Validación de longitud de contraseña
        if (password.length < 6) {
            return NextResponse.json(
                { success: false, message: 'La contraseña debe tener al menos 6 caracteres.' },
                { status: 400 }
            )
        }

        // ── 2. Verificar que el email no exista ──────────────
        const existingUser = await prisma.user.findUnique({
            where: { email },
        })

        if (existingUser) {
            return NextResponse.json(
                { success: false, message: 'El email ya está registrado.' },
                { status: 409 }
            )
        }

        // ── 3. Hashear contraseña y crear usuario ────────────
        const hashedPassword = await hashPassword(password)
        
        // Generar código de verificación de 6 dígitos
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString()
        const verificationCodeExpiry = new Date()
        verificationCodeExpiry.setMinutes(verificationCodeExpiry.getMinutes() + 30) // 30 minutos

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: 'USER',
                emailVerified: false,
                verificationCode,
                verificationCodeExpiry
            },
            select: {
                id: true,
                email: true,
            },
        })

        // ── 4. Enviar correo de verificación ─────────────────
        await sendVerificationEmail(email, verificationCode)

        // ── 5. Construir respuesta (Sin loguear) ───────────────
        return NextResponse.json(
            {
                success: true,
                message: 'Usuario registrado. Por favor revisa tu correo para verificar tu cuenta.',
                requiresEmailVerification: true,
                email: user.email
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Error en registro:', error)
        return NextResponse.json(
            { success: false, message: 'Error interno del servidor.' },
            { status: 500 }
        )
    }
}
