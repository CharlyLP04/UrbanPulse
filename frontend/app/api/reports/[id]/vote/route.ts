import { NextRequest } from 'next/server'
import { VoteType } from '@prisma/client'
import { prisma } from '../../../../../lib/db'
import { verifyAccessToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authToken = request.cookies.get('auth-token')?.value

    if (!authToken) {
      return Response.json(
        {
          success: false,
          message: 'Sesión no válida o expirada.',
        },
        { status: 401 }
      )
    }

    const tokenPayload = await verifyAccessToken(authToken)
    const reportId = params.id

    const [user, report] = await Promise.all([
      prisma.user.findUnique({
        where: { id: tokenPayload.userId },
        select: { id: true },
      }),
      prisma.report.findUnique({
        where: { id: reportId },
        select: { id: true },
      }),
    ])

    if (!user) {
      return Response.json(
        {
          success: false,
          message: 'Sesión no válida o expirada.',
        },
        { status: 401 }
      )
    }

    if (!report) {
      return Response.json(
        {
          success: false,
          message: 'Reporte no encontrado.',
        },
        { status: 404 }
      )
    }

    const existingVote = await prisma.vote.findUnique({
      where: {
        reportId_userId: {
          reportId,
          userId: tokenPayload.userId,
        },
      },
    })

    if (existingVote) {
      const votesCount = await prisma.vote.count({
        where: { reportId },
      })

      return Response.json(
        {
          success: false,
          message: 'Ya has votado este reporte.',
          data: {
            reportId,
            votesCount,
          },
        },
        { status: 409 }
      )
    }

    await prisma.vote.create({
      data: {
        reportId,
        userId: tokenPayload.userId,
        voteType: VoteType.UP,
      },
    })

    const votesCount = await prisma.vote.count({
      where: { reportId },
    })

    return Response.json(
      {
        success: true,
        data: {
          reportId,
          votesCount,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating vote:', error)
    return Response.json(
      {
        success: false,
        message: 'Error al registrar el voto.',
      },
      { status: 500 }
    )
  }
}
