import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'
import { TokenPayload, verifyAccessToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const reports = await prisma.report.findMany({
      orderBy: { createdAt: 'desc' },
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
        data: reports,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error fetching reports:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Error al obtener los reportes',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
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

    let tokenPayload: TokenPayload

    try {
      tokenPayload = await verifyAccessToken(authToken)
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: 'Sesión no válida o expirada.',
        },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { title, description, location, categoryId } = body

    if (!title || !description) {
      return NextResponse.json(
        {
          success: false,
          message: 'Faltan campos obligatorios (title, description)',
        },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: tokenPayload.userId },
    })

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Usuario no encontrado',
        },
        { status: 404 }
      )
    }

    const report = await prisma.report.create({
      data: {
        title,
        description,
        location,
        userId: tokenPayload.userId,
        categoryId,
      },
    })

    return NextResponse.json(
      {
        success: true,
        data: report,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating report:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Error al crear el reporte',
      },
      { status: 500 }
    )
  }
}
