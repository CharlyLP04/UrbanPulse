import type { NextRequest } from 'next/server'
jest.mock('next/server', () => {
  const original = jest.requireActual('next/server')
  return {
    ...original,
    NextResponse: {
      json: (data: any, init?: any) => {
        return {
          status: init?.status || 200,
          json: async () => data,
          headers: new Headers(init?.headers)
        } as unknown as Response
      }
    }
  }
})
import { POST } from '@/app/api/auth/reset-password/route'
import { prisma } from '@/lib/db'
import { hashPassword } from '@/lib/password'

if (!Response.json) {
  Response.json = function (data: any, init: ResponseInit = {}) {
    return new Response(JSON.stringify(data), {
      ...init,
      headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
    })
  }
}

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
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.message).toBe('Falta el token de seguridad o la nueva contraseña.')
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
    expect(data.success).toBe(false)
    expect(data.message).toBe('Token de recuperación inválido.')
    expect(mockUpdate).not.toHaveBeenCalled()
  })

  test('responde mensaje genérico si el token expiró', async () => {
    mockFindFirst.mockResolvedValue({
      id: 'user-1',
      resetTokenExpiry: new Date(Date.now() - 60_000), // Ya pasó
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
    expect(data.success).toBe(false)
    expect(data.message).toBe('El enlace de recuperación ha expirado. Por favor solicita uno nuevo.')
    expect(mockUpdate).not.toHaveBeenCalled()
  })

  test('actualiza contraseña y limpia token si el token es válido', async () => {
    mockFindFirst.mockResolvedValue({
      id: 'user-1',
      resetTokenExpiry: new Date(Date.now() + 60_000), // Aún válido
    })
    mockHashPassword.mockResolvedValue('hashed-new-password')

    const request = {
      json: jest.fn().mockResolvedValue({
        token: 'raw-token',
        newPassword: 'Nueva123',
      }),
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toBe('Tu contraseña ha sido actualizada con éxito.')
    expect(mockFindFirst).toHaveBeenCalledWith({
      where: {
        resetToken: 'raw-token',
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
