import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'
import { comparePassword } from '../../../../lib/password'
import { signAccessToken, signRefreshToken, TokenPayload } from '../../../../lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
    try {
        // ── 1. Parsear y validar body ────────────────────────
        const body = await request.json()
        const { email, password } = body

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Los campos email y password son requeridos.' },
                { status: 400 }
            )
        }

        // ── 2. Buscar usuario por email ──────────────────────
        const user = await prisma.user.findUnique({
            where: { email },
        })

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Credenciales inválidas.' },
                { status: 401 }
            )
        }

        // ── 3. Verificar contraseña ──────────────────────────
        const isPasswordValid = await comparePassword(password, user.password)

        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, message: 'Credenciales inválidas.' },
                { status: 401 }
            )
        }

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
            { status: 200 }
        )

        // Cookie de acceso (15 minutos)
        response.cookies.set('auth-token', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60,
            path: '/',
        })

        // Cookie de refresh (7 días)
        response.cookies.set('refresh-token', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        })

        return response
    } catch (error) {
        console.error('Error en login:', error)
        return NextResponse.json(
            { success: false, message: 'Error interno del servidor.' },
            { status: 500 }
        )
    }
}
