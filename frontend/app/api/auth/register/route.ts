import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'
import { hashPassword } from '../../../../lib/password'
import { signAccessToken, signRefreshToken, TokenPayload } from '../../../../lib/auth'

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

        const user = await prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
                role: 'USER',
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        })

        // ── 4. Generar tokens JWT ────────────────────────────
        const tokenPayload: TokenPayload = {
            userId: user.id,
            email: user.email,
            role: user.role,
        }

        const accessToken = await signAccessToken(tokenPayload)
        const refreshToken = await signRefreshToken(tokenPayload)

        // ── 5. Construir respuesta con cookies ───────────────
        const response = NextResponse.json(
            {
                success: true,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            },
            { status: 201 }
        )

        // Cookie de acceso (15 minutos)
        response.cookies.set('auth-token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60, // 15 minutos en segundos
            path: '/',
        })

        // Cookie de refresh (7 días)
        response.cookies.set('refresh-token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60, // 7 días en segundos
            path: '/',
        })

        return response
    } catch (error) {
        console.error('Error en registro:', error)
        return NextResponse.json(
            { success: false, message: 'Error interno del servidor.' },
            { status: 500 }
        )
    }
}
