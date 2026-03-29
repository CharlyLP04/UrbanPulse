import { POST } from '@/app/api/auth/verify-login/route'
import { NextRequest } from 'next/server'
jest.mock('next/server', () => {
  const original = jest.requireActual('next/server')
  return {
    ...original,
    NextResponse: {
      json: (data: any, init?: any) => {
        const cookiesMap = new Map()
        return {
          status: init?.status || 200,
          json: async () => data,
          headers: new Headers(init?.headers) || { get: () => null },
          cookies: {
            set: (name: string, value: string) => cookiesMap.set(name, value),
            get: (name: string) => ({ value: cookiesMap.get(name) }),
            has: (name: string) => cookiesMap.has(name),
          }
        } as unknown as Response
      }
    }
  }
})
import { prisma } from '@/lib/db'
import { signAccessToken, signRefreshToken } from '@/lib/auth'

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

jest.mock('@/lib/auth', () => ({
  signAccessToken: jest.fn().mockResolvedValue('mock-access-token'),
  signRefreshToken: jest.fn().mockResolvedValue('mock-refresh-token'),
}))

describe('POST /api/auth/verify-login Seguridad', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    Object.defineProperty(process.env, 'NODE_ENV', { value: 'development', configurable: true })
  })

  it('Rechaza credenciales erróneas (401) si falla el código', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: '1',
      email: 'hacker@mal.com',
      verificationCode: '654321', // Código real
      verificationCodeExpiry: new Date(Date.now() + 100000)
    })

    const request = {
      json: async () => ({ email: 'hacker@mal.com', code: '111111' }) // Código erróneo
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.message).toBe('El código de seguridad es incorrecto.')
    expect(response.cookies.has('auth-token')).toBe(false)
  })

  it('Verifica flujo crítico: Asigna cookie Http-Only a rol ADMINISTRADOR tras 2FA', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 'admin_1',
      email: 'admin@urbanpulse.com',
      name: 'Admin',
      role: 'ADMIN',
      verificationCode: '123456',
      verificationCodeExpiry: new Date(Date.now() + 100000)
    })
    ;(prisma.user.update as jest.Mock).mockResolvedValue({})

    const request = {
      json: async () => ({ email: 'admin@urbanpulse.com', code: '123456' })
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.user.role).toBe('admin')
    
    expect(prisma.user.update).toHaveBeenCalledWith({
       where: { id: 'admin_1' },
       data: { verificationCode: null, verificationCodeExpiry: null }
    })

    const authCookie = response.cookies.get('auth-token')
    expect(authCookie?.value).toBe('mock-access-token')
  })

  it('Fuerza error 400 si faltan datos previniendo colapsos SQL', async () => {
    const request = {
      json: async () => ({ email: '' })
    } as unknown as NextRequest

    const response = await POST(request)
    expect(response.status).toBe(400)
  })
})
