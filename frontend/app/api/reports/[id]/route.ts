import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAccessToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const report = await prisma.report.findUnique({
      where: { id: params.id },
      include: {
        category: { select: { name: true, color: true } },
        user: { select: { name: true } },
        _count: { select: { votes: true, comments: true } },
      },
    })

    if (!report) {
      return NextResponse.json({ success: false, message: 'Reporte no encontrado.' }, { status: 404 })
    }

    return NextResponse.json({ success: true, report }, { status: 200 })
  } catch (error) {
    console.error('Error obteniendo reporte:', error)
    return NextResponse.json({ success: false, message: 'Error interno.' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Verificar token
  const token = request.cookies.get('auth-token')?.value
  if (!token) {
    return NextResponse.json({ success: false, message: 'No autorizado.' }, { status: 401 })
  }

  let payload: Awaited<ReturnType<typeof verifyAccessToken>>
  try {
    payload = await verifyAccessToken(token)
  } catch {
    return NextResponse.json({ success: false, message: 'Token inválido.' }, { status: 401 })
  }

  // Solo admin puede cambiar estado
  if (payload.role !== 'admin') {
    return NextResponse.json({ success: false, message: 'No autorizado.' }, { status: 403 })
  }

  try {
    const body = await request.json()
    const { status } = body

    const validStatuses = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED']
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ success: false, message: 'Estado inválido.' }, { status: 400 })
    }

    const updated = await prisma.report.update({
      where: { id: params.id },
      data: { status },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
        _count: {
          select: {
            comments: true,
            votes: true,
          },
        },
      },
    })

    return NextResponse.json({ success: true, report: updated }, { status: 200 })
  } catch (error) {
    console.error('Error actualizando reporte:', error)
    return NextResponse.json({ success: false, message: 'Error interno.' }, { status: 500 })
  }
}
