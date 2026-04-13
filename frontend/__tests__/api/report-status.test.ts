import type { NextRequest } from 'next/server'
import { PATCH } from '@/app/api/reports/[id]/route'
import { prisma } from '@/lib/db'
import { verifyAccessToken } from '@/lib/auth'

jest.mock('@/lib/db', () => ({
  prisma: {
    report: {
      update: jest.fn(),
    },
  },
}))

jest.mock('@/lib/auth', () => ({
  verifyAccessToken: jest.fn(),
}))

describe('Report Status API', () => {
  const mockUpdateReport = prisma.report.update as jest.Mock
  const mockVerifyAccessToken = verifyAccessToken as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('responde 401 si no hay token', async () => {
    const request = {
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
      json: jest.fn(),
    } as unknown as NextRequest

    const response = await PATCH(request, { params: { id: 'report-1' } })

    expect(response.status).toBe(401)
    expect(mockVerifyAccessToken).not.toHaveBeenCalled()
  })

  test('responde 403 si el rol no es admin', async () => {
    mockVerifyAccessToken.mockResolvedValue({
      userId: 'user-1',
      email: 'user@test.com',
      role: 'moderator',
    })

    const request = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'valid-token' }),
      },
      json: jest.fn().mockResolvedValue({ status: 'RESOLVED' }),
    } as unknown as NextRequest

    const response = await PATCH(request, { params: { id: 'report-1' } })

    expect(response.status).toBe(403)
    expect(mockUpdateReport).not.toHaveBeenCalled()
  })

  test('responde 400 si el estado es inválido', async () => {
    mockVerifyAccessToken.mockResolvedValue({
      userId: 'admin-1',
      email: 'admin@test.com',
      role: 'admin',
    })

    const request = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'valid-token' }),
      },
      json: jest.fn().mockResolvedValue({ status: 'INVALID' }),
    } as unknown as NextRequest

    const response = await PATCH(request, { params: { id: 'report-1' } })

    expect(response.status).toBe(400)
    expect(mockUpdateReport).not.toHaveBeenCalled()
  })

  test('actualiza el estado cuando el usuario es admin', async () => {
    mockVerifyAccessToken.mockResolvedValue({
      userId: 'admin-1',
      email: 'admin@test.com',
      role: 'admin',
    })
    mockUpdateReport.mockResolvedValue({
      id: 'report-1',
      status: 'RESOLVED',
      category: { id: 'category-1', name: 'Bacheo' },
      user: { id: 'admin-1', name: 'Admin', email: 'admin@test.com' },
      _count: { comments: 0, votes: 2 },
    })

    const request = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'valid-token' }),
      },
      json: jest.fn().mockResolvedValue({ status: 'RESOLVED' }),
    } as unknown as NextRequest

    const response = await PATCH(request, { params: { id: 'report-1' } })

    expect(response.status).toBe(200)
    expect(mockUpdateReport).toHaveBeenCalledWith({
      where: { id: 'report-1' },
      data: {
        status: 'RESOLVED',
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
  })
})
