import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

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

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { title, description, location, userId, categoryId } = body

    if (!title || !description || !userId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Faltan campos obligatorios (title, description, userId)',
        },
        { status: 400 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
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
        userId,
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