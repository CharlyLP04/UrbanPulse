import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAccessToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ success: false, message: 'No autenticado.' }, { status: 401 })
    }

    let payload
    try {
      payload = await verifyAccessToken(token)
    } catch (error) {
      return NextResponse.json({ success: false, message: 'Token inválido o expirado.' }, { status: 401 })
    }

    if (!payload || !payload.userId) {
      return NextResponse.json({ success: false, message: 'Token inválido.' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    })

    if (!user) {
      return NextResponse.json({ success: false, message: 'Usuario no encontrado.' }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      user,
    }, { status: 200 })

  } catch (error) {
    console.error('Error en /api/auth/me:', error)
    return NextResponse.json({ success: false, message: 'Error interno del servidor.' }, { status: 500 })
  }
}
