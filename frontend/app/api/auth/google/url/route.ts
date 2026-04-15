import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google/callback'

  if (!clientId) {
    return NextResponse.json(
      { success: false, message: 'Google Client ID no configurado.' },
      { status: 500 }
    )
  }

  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth'
  
  const options = {
    redirect_uri: redirectUri,
    client_id: clientId,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email'
    ].join(' ')
  }

  const qs = new URLSearchParams(options)

  return NextResponse.json({ url: `${rootUrl}?${qs.toString()}` })
}
