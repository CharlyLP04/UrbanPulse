import type { NextRequest } from 'next/server'
import { GET } from '@/app/api/auth/me/route'
import { prisma } from '@/lib/db'
import { verifyAccessToken } from '@/lib/auth'

jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
    },
  },
}))

jest.mock('@/lib/auth', () => ({
  verifyAccessToken: jest.fn(),
}))

describe('Auth Me API', () => {
  const mockFindUnique = prisma.user.findUnique as jest.Mock
  const mockVerifyAccessToken = verifyAccessToken as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('responde 401 si no hay auth-token', async () => {
    const request = {
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
    } as unknown as NextRequest

    const response = await GET(request)

    expect(response.status).toBe(401)
    expect(mockVerifyAccessToken).not.toHaveBeenCalled()
  })

  test('responde 401 si el token es inválido', async () => {
    mockVerifyAccessToken.mockRejectedValue(new Error('invalid'))

    const request = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'invalid-token' }),
      },
    } as unknown as NextRequest

    const response = await GET(request)

    expect(response.status).toBe(401)
    expect(mockVerifyAccessToken).toHaveBeenCalledWith('invalid-token')
  })

  test('regresa los datos del usuario con rol normalizado', async () => {
    mockVerifyAccessToken.mockResolvedValue({
      userId: 'user-1',
      email: 'user@test.com',
      role: 'USER',
    })
    mockFindUnique.mockResolvedValue({
      id: 'user-1',
      email: 'user@test.com',
      name: 'Usuario Demo',
      role: 'ADMIN',
    })

    const request = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'valid-token' }),
      },
    } as unknown as NextRequest

    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data).toEqual({
      success: true,
      user: {
        id: 'user-1',
        email: 'user@test.com',
        name: 'Usuario Demo',
        role: 'admin',
      }
    })
  })
})
