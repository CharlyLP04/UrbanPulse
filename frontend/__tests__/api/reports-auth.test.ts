import type { NextRequest } from 'next/server'
import { POST } from '@/app/api/reports/route'
import { prisma } from '@/lib/db'
import { verifyAccessToken } from '@/lib/auth'

if (!Response.json) {
  Response.json = function (data: unknown, init: ResponseInit = {}) {
    return new Response(JSON.stringify(data), {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init.headers || {}),
      },
    })
  }
}

jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
    category: {
      findUnique: jest.fn(),
    },
    report: {
      create: jest.fn(),
    },
  },
}))

jest.mock('@/lib/auth', () => ({
  verifyAccessToken: jest.fn(),
}))

describe('Reports API Auth', () => {
  const mockFindUnique = prisma.user.findUnique as jest.Mock
  const mockFindCategory = prisma.category.findUnique as jest.Mock
  const mockCreate = prisma.report.create as jest.Mock
  const mockVerifyAccessToken = verifyAccessToken as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('responde 401 si no hay auth-token', async () => {
    const request = {
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
      json: jest.fn(),
    } as unknown as NextRequest

    const response = await POST(request)

    expect(response.status).toBe(401)
    expect(mockVerifyAccessToken).not.toHaveBeenCalled()
    expect(mockCreate).not.toHaveBeenCalled()
  })

  test('responde 401 si el auth-token es inválido', async () => {
    mockVerifyAccessToken.mockRejectedValue(new Error('invalid'))

    const request = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'invalid-token' }),
      },
      json: jest.fn(),
    } as unknown as NextRequest

    const response = await POST(request)

    expect(response.status).toBe(401)
    expect(mockVerifyAccessToken).toHaveBeenCalledWith('invalid-token')
    expect(mockCreate).not.toHaveBeenCalled()
  })

  test('crea el reporte usando el userId del token y no del body', async () => {
    mockVerifyAccessToken.mockResolvedValue({
      userId: 'token-user-id',
      email: 'user@test.com',
      role: 'user',
    })
    mockFindUnique.mockResolvedValue({
      id: 'token-user-id',
      email: 'user@test.com',
    })
    mockFindCategory.mockResolvedValue({
      id: 'category-1',
      name: 'Bacheo',
    })
    mockCreate.mockResolvedValue({
      id: 'report-1',
      title: 'Bache',
      description: 'Bache grande',
      location: 'Calle 1',
      userId: 'token-user-id',
      categoryId: 'category-1',
      category: {
        id: 'category-1',
        name: 'Bacheo',
      },
      user: {
        id: 'token-user-id',
        name: 'Usuario',
        email: 'user@test.com',
      },
    })

    const request = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'valid-access-token' }),
      },
      json: jest.fn().mockResolvedValue({
        title: 'Bache',
        description: 'Bache grande',
        location: 'Calle 1',
        userId: 'body-user-id',
        categoryId: 'category-1',
      }),
    } as unknown as NextRequest

    const response = await POST(request)

    expect(response.status).toBe(201)
    expect(mockVerifyAccessToken).toHaveBeenCalledWith('valid-access-token')
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { id: 'token-user-id' },
    })
    expect(mockFindCategory).toHaveBeenCalledWith({
      where: { id: 'category-1' },
    })
    expect(mockCreate).toHaveBeenCalledWith({
      data: {
        title: 'Bache',
        description: 'Bache grande',
        location: 'Calle 1',
        latitude: null,
        longitude: null,
        userId: 'token-user-id',
        categoryId: 'category-1',
      },
      include: {
        category: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    })
  })

  test('responde 400 si falta categoryId', async () => {
    mockVerifyAccessToken.mockResolvedValue({
      userId: 'token-user-id',
      email: 'user@test.com',
      role: 'user',
    })

    const request = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'valid-access-token' }),
      },
      json: jest.fn().mockResolvedValue({
        title: 'Bache',
        description: 'Bache grande',
        location: 'Calle 1',
      }),
    } as unknown as NextRequest

    const response = await POST(request)

    expect(response.status).toBe(400)
    expect(mockFindCategory).not.toHaveBeenCalled()
    expect(mockCreate).not.toHaveBeenCalled()
  })
})
