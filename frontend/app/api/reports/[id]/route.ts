import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'
import { ReportStatus } from '@prisma/client'
import { verifyAccessToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const report = await prisma.report.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
        comments: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        _count: {
          select: {
            votes: true,
          },
        },
      },
    })

    if (!report) {
      return NextResponse.json(
        {
          success: false,
          message: 'Reporte no encontrado',
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        data: report,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching report:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Error al obtener el reporte',
      },
      { status: 500 }
    )
  }
}

const allowedStatuses = Object.values(ReportStatus)

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authToken = request.cookies.get('auth-token')?.value

    if (!authToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'Sesión no válida o expirada.',
        },
        { status: 401 }
      )
    }

    const tokenPayload = await verifyAccessToken(authToken)

    if (String(tokenPayload.role || '').toLowerCase() !== 'admin') {
      return NextResponse.json(
        {
          success: false,
          message: 'No tienes permisos para modificar el estado del reporte.',
        },
        { status: 403 }
      )
    }

    const body = await request.json()
    const status =
      typeof body.status === 'string' ? body.status.trim().toUpperCase() : ''

    if (!allowedStatuses.includes(status as ReportStatus)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Estado inválido. Usa OPEN, IN_PROGRESS, RESOLVED o CLOSED.',
        },
        { status: 400 }
      )
    }

    const report = await prisma.report.update({
      where: { id: params.id },
      data: {
        status: status as ReportStatus,
      },
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

    return NextResponse.json(
      {
        success: true,
        data: report,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error updating report status:', error)

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === 'P2025'
    ) {
      return NextResponse.json(
        {
          success: false,
          message: 'Reporte no encontrado.',
        },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Error al actualizar el estado del reporte.',
      },
      { status: 500 }
    )
  }
}
