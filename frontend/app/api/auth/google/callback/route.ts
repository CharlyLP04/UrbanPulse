import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../../lib/db'
import { signAccessToken, signRefreshToken, TokenPayload } from '../../../../../lib/auth'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')

    if (!code) {
      return NextResponse.redirect(new URL('/auth/login?error=oauth_code_missing', request.url))
    }

    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET
    const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback'

    if (!clientId || !clientSecret) {
      console.error("Faltan variables de entorno para Google Auth")
      return NextResponse.redirect(new URL('/auth/login?error=oauth_config_missing', request.url))
    }

    // 1. Obtener los tokens usando el code
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenResponse.ok) {
      console.error('Error obteniendo token de google', await tokenResponse.text())
      return NextResponse.redirect(new URL('/auth/login?error=oauth_token_error', request.url))
    }

    const tokenData = await tokenResponse.json()
    const { id_token, access_token } = tokenData

    // 2. Obtener el perfil del usuario de Google
    const profileResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    if (!profileResponse.ok) {
      console.error('Error obteniendo perfil de google')
      return NextResponse.redirect(new URL('/auth/login?error=oauth_profile_error', request.url))
    }

    const profileData = await profileResponse.json()
    const { email, name } = profileData

    if (!email) {
      return NextResponse.redirect(new URL('/auth/login?error=oauth_email_missing', request.url))
    }

    // 3. Buscar o crear el usuario en Prisma
    let user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name: name || 'Usuario de Google',
          password: null, // Password opcional añadido en schema
          emailVerified: true, // Google ya verificó este email
          role: 'USER'
        },
      })
    } else {
      // Si el usuario existe pero no estaba verificado, y se conectó mediante google, podemos verificarlo.
      if (!user.emailVerified) {
        await prisma.user.update({
          where: { id: user.id },
          data: { emailVerified: true }
        })
      }
    }

    const normalizedRole = user.role.toLowerCase()

    const tokenPayload: TokenPayload = {
      userId: user.id,
      email: user.email,
      role: normalizedRole,
    }

    const accessToken = await signAccessToken(tokenPayload)
    const refreshToken = await signRefreshToken(tokenPayload)

    // Redirigir al dashboard con las cookies de autenticación
    const response = NextResponse.redirect(new URL('/dashboard/home', request.url))

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
    console.error('Error en callback de google oauth:', error)
    return NextResponse.redirect(new URL('/auth/login?error=oauth_internal_error', request.url))
  }
}
