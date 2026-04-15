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

// PATCH /api/admin/reports/[id] — cambiar estado de un reporte
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await requireAdmin(request)
  if (!admin) {
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
      include: { category: true, user: { select: { name: true } } },
    })

    return NextResponse.json({ success: true, report: updated }, { status: 200 })
  } catch (error) {
    console.error('Error actualizando reporte:', error)
    return NextResponse.json({ success: false, message: 'Error interno.' }, { status: 500 })
  }
}

// DELETE /api/admin/reports/[id] — eliminar un reporte
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await requireAdmin(request)
  if (!admin) {
    return NextResponse.json({ success: false, message: 'No autorizado.' }, { status: 403 })
  }

  try {
    await prisma.report.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error eliminando reporte:', error)
    return NextResponse.json({ success: false, message: 'Error interno.' }, { status: 500 })
  }
}
