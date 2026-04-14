import { NextRequest } from 'next/server'
import { prisma } from '@/lib/db'
import { verifyAccessToken } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
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

  try {
    const payload = await verifyAccessToken(authToken)

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
      return Response.json(
        {
          success: false,
          message: 'Sesión no válida o expirada.',
        },
        { status: 401 }
      )
    }

    return Response.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role.toLowerCase(),
        }
      },
      { status: 200 }
    )
  } catch {
    return Response.json(
      {
        success: false,
        message: 'Sesión no válida o expirada.',
      },
      { status: 401 }
    )
  }
}
