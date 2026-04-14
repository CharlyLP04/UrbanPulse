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
import { POST } from '@/app/api/auth/login/route'
import { prisma } from '@/lib/db'
import { comparePassword } from '@/lib/password'
import { sendLogin2FACode } from '@/lib/email'

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
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}))

jest.mock('@/lib/password', () => ({
  comparePassword: jest.fn(),
}))

jest.mock('@/lib/email', () => ({
  sendLogin2FACode: jest.fn(),
}))

describe('Auth Login API', () => {
  const mockFindUnique = prisma.user.findUnique as jest.Mock
  const mockUpdate = prisma.user.update as jest.Mock
  const mockComparePassword = comparePassword as jest.Mock
  const mockSendLogin2FACode = sendLogin2FACode as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('Rechaza si no está verificado el email', async () => {
    mockFindUnique.mockResolvedValue({
      id: '1',
      email: 'admin@test.com',
      name: 'Admin',
      role: 'ADMIN',
      password: 'hashed-password',
      emailVerified: false,
    })
    mockComparePassword.mockResolvedValue(true)

    const req = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@test.com',
        password: 'password123',
      }),
    }) as NextRequest

    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(403)
    expect(data.success).toBe(false)
    expect(data.message).toBe('Por favor verifica tu correo electrónico antes de iniciar sesión.')
  })

  test('Credenciales válidas lanzan 2FA y actualizan db', async () => {
    mockFindUnique.mockResolvedValue({
      id: '1',
      email: 'admin@test.com',
      name: 'Admin',
      role: 'ADMIN',
      password: 'hashed-password',
      emailVerified: true,
    })
    mockComparePassword.mockResolvedValue(true)

    const req = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        email: 'admin@test.com',
        password: 'password123',
      }),
    }) as NextRequest

    const res = await POST(req)
    const data = await res.json()

    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.requiresVerification).toBe(true)
    expect(data.email).toBe('admin@test.com')
    
    expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: '1' },
      data: expect.objectContaining({
        verificationCode: expect.any(String)
      })
    }))
    expect(mockSendLogin2FACode).toHaveBeenCalledWith('admin@test.com', expect.any(String))
  })

  test('Credenciales inválidas (password incorrecto)', async () => {
    mockFindUnique.mockResolvedValue({
      id: '1',
      email: 'admin@test.com',
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
    const data = await res.json()

    expect(res.status).toBe(401)
    expect(data.message).toBe('Credenciales inválidas.')
  })

  test('Campos vacíos', async () => {
    const req = new Request('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({}),
    }) as NextRequest

    const res = await POST(req)

    expect(res.status).toBe(400)
  })
})
