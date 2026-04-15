import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

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
