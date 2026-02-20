
import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/db'

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
                                name: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
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
                { error: 'Reporte no encontrado' },
                { status: 404 }
            )
        }

        return NextResponse.json(report)
    } catch (error) {
        console.error('Error fetching report:', error)
        return NextResponse.json(
            { error: 'Error al obtener el reporte' },
            { status: 500 }
        )
    }
}
