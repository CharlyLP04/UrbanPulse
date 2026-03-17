import type { NextRequest } from 'next/server'
import { POST } from '@/app/api/auth/login/route'
import { prisma } from '@/lib/db'
import { comparePassword } from '@/lib/password'
import { signAccessToken, signRefreshToken } from '@/lib/auth'

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
  },
}))

jest.mock('@/lib/password', () => ({
  comparePassword: jest.fn(),
}))

jest.mock('@/lib/auth', () => ({
  signAccessToken: jest.fn().mockResolvedValue('mock-access-token'),
  signRefreshToken: jest.fn().mockResolvedValue('mock-refresh-token'),
}))

describe('Auth Login API', () => {
  const mockFindUnique = prisma.user.findUnique as jest.Mock
  const mockComparePassword = comparePassword as jest.Mock
  const mockSignAccessToken = signAccessToken as jest.Mock
  const mockSignRefreshToken = signRefreshToken as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Credenciales válidas', async () => {
    mockFindUnique.mockResolvedValue({
      id: '1',
      email: 'admin@test.com',
      name: 'Admin Municipal',
      role: 'ADMIN',
      password: 'hashed-password',
    })
    mockComparePassword.mockResolvedValue(true)

    const req = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@test.com',
        password: '123456',
      }),
    }) as NextRequest

    const res = await POST(req)

    expect(res.status).toBe(200)
    expect(mockFindUnique).toHaveBeenCalledWith({
      where: { email: 'admin@test.com' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true,
      },
    })
    expect(mockComparePassword).toHaveBeenCalledWith('123456', 'hashed-password')
    expect(mockSignAccessToken).toHaveBeenCalled()
    expect(mockSignRefreshToken).toHaveBeenCalled()
    expect(res.cookies.get('auth-token')?.value).toBe('mock-access-token')
    expect(res.cookies.get('refresh-token')?.value).toBe('mock-refresh-token')
  })

  test('Credenciales inválidas', async () => {
    mockFindUnique.mockResolvedValue({
      id: '1',
      email: 'admin@test.com',
      name: 'Admin Municipal',
      role: 'ADMIN',
      password: 'hashed-password',
    })
    mockComparePassword.mockResolvedValue(false)

    const req = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@test.com',
        password: 'incorrecta',
      }),
    }) as NextRequest

    const res = await POST(req)

    expect(res.status).toBe(401)
    expect(mockComparePassword).toHaveBeenCalledWith('incorrecta', 'hashed-password')
  })

  test('Campos vacíos', async () => {
    const req = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({}),
    }) as NextRequest

    const res = await POST(req)

    expect(res.status).toBe(400)
    expect(mockFindUnique).not.toHaveBeenCalled()
    expect(mockComparePassword).not.toHaveBeenCalled()
  })

  test('Error interno controlado', async () => {
    mockFindUnique.mockRejectedValue(new Error('DB error'))

    const req = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@test.com',
        password: '123456',
      }),
    }) as NextRequest

    const res = await POST(req)

    expect(res.status).toBe(500)
    expect(mockFindUnique).toHaveBeenCalled()
  })
})