import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAccessToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

async function requireAdmin(request: NextRequest) {
  const token = request.cookies.get('auth-token')?.value
  if (!token) return null
  try {
    const payload = await verifyAccessToken(token)
    if (payload.role !== 'admin') return null
    return payload
  } catch {
    return null
  }
}

export async function GET(request: NextRequest) {
  const admin = await requireAdmin(request)
  if (!admin) {
    return NextResponse.json({ success: false, message: 'No autorizado.' }, { status: 403 })
  }

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        emailVerified: true,
        createdAt: true,
        _count: { select: { reports: true } },
      },
    })
    return NextResponse.json({ success: true, users }, { status: 200 })
  } catch (error) {
    console.error('Error obteniendo usuarios:', error)
    return NextResponse.json({ success: false, message: 'Error interno.' }, { status: 500 })
  }
}
