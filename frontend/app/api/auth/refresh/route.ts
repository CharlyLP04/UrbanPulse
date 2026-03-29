import { NextRequest, NextResponse } from 'next/server'
import { signAccessToken, verifyRefreshToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  const refreshToken = request.cookies.get('refresh-token')?.value

  if (!refreshToken) {
    return NextResponse.json(
      {
        success: false,
        message: 'Refresh token inválido o expirado.',
      },
      { status: 401 }
    )
  }

  try {
    const payload = await verifyRefreshToken(refreshToken)
    const accessToken = await signAccessToken(payload)

    const response = NextResponse.json(
      {
        success: true,
        message: 'Access token renovado correctamente.',
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

    return response
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'Refresh token inválido o expirado.',
      },
      { status: 401 }
    )
  }
}
