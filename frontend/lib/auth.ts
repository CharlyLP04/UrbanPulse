import { SignJWT, jwtVerify } from 'jose'

// ── Tipos ──────────────────────────────────────────────

export interface TokenPayload {
    userId: string
    email: string
    role: string
}

// ── Secrets ────────────────────────────────────────────

const accessSecret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret-key'
)

const refreshSecret = new TextEncoder().encode(
    process.env.JWT_REFRESH_SECRET || 'fallback-refresh-secret-key'
)

// ── Access Token (15 min) ──────────────────────────────

export async function signAccessToken(payload: TokenPayload): Promise<string> {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('15m')
        .sign(accessSecret)
}

// ── Refresh Token (7 días) ─────────────────────────────

export async function signRefreshToken(payload: TokenPayload): Promise<string> {
    return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(refreshSecret)
}

// ── Verificar Access Token ─────────────────────────────

export async function verifyAccessToken(token: string): Promise<TokenPayload> {
    const { payload } = await jwtVerify(token, accessSecret)
    return {
        userId: payload.userId as string,
        email: payload.email as string,
        role: payload.role as string,
    }
}

// ── Verificar Refresh Token ────────────────────────────

export async function verifyRefreshToken(token: string): Promise<TokenPayload> {
    const { payload } = await jwtVerify(token, refreshSecret)
    return {
        userId: payload.userId as string,
        email: payload.email as string,
        role: payload.role as string,
    }
}
