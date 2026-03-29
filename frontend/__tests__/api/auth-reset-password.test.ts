import type { NextRequest } from 'next/server'
import { createHash } from 'crypto'
import { POST } from '@/app/api/auth/reset-password/route'
import { prisma } from '@/lib/db'
import { hashPassword } from '@/lib/password'

jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findFirst: jest.fn(),
      update: jest.fn(),
    },
  },
}))

jest.mock('@/lib/password', () => ({
  hashPassword: jest.fn(),
}))

describe('Reset Password API', () => {
  const mockFindFirst = prisma.user.findFirst as jest.Mock
  const mockUpdate = prisma.user.update as jest.Mock
  const mockHashPassword = hashPassword as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('responde 400 si faltan token o newPassword', async () => {
    const request = {
      json: jest.fn().mockResolvedValue({}),
    } as unknown as NextRequest

    const response = await POST(request)

    expect(response.status).toBe(400)
    expect(mockFindFirst).not.toHaveBeenCalled()
  })

  test('responde mensaje genérico si el token no existe', async () => {
    mockFindFirst.mockResolvedValue(null)

    const request = {
      json: jest.fn().mockResolvedValue({
        token: 'raw-token',
        newPassword: 'Nueva123',
      }),
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.message).toBe('Token de recuperación inválido o expirado.')
    expect(mockUpdate).not.toHaveBeenCalled()
  })

  test('responde mensaje genérico si el token expiró', async () => {
    mockFindFirst.mockResolvedValue({
      id: 'user-1',
      resetTokenExpiry: new Date(Date.now() - 60_000),
    })

    const request = {
      json: jest.fn().mockResolvedValue({
        token: 'raw-token',
        newPassword: 'Nueva123',
      }),
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.message).toBe('Token de recuperación inválido o expirado.')
    expect(mockUpdate).not.toHaveBeenCalled()
  })

  test('actualiza contraseña y limpia token si el token es válido', async () => {
    const rawToken = 'reset-token'
    const hashedToken = createHash('sha256').update(rawToken).digest('hex')

    mockFindFirst.mockResolvedValue({
      id: 'user-1',
      resetTokenExpiry: new Date(Date.now() + 60_000),
    })
    mockHashPassword.mockResolvedValue('hashed-new-password')

    const request = {
      json: jest.fn().mockResolvedValue({
        token: rawToken,
        newPassword: 'Nueva123',
      }),
    } as unknown as NextRequest

    const response = await POST(request)

    expect(response.status).toBe(200)
    expect(mockFindFirst).toHaveBeenCalledWith({
      where: {
        resetToken: hashedToken,
      },
      select: {
        id: true,
        resetTokenExpiry: true,
      },
    })
    expect(mockHashPassword).toHaveBeenCalledWith('Nueva123')
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: {
        password: 'hashed-new-password',
        resetToken: null,
        resetTokenExpiry: null,
      },
    })
  })
})
