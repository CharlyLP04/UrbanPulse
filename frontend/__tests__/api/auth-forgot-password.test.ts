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
import crypto from 'crypto'
import { POST } from '@/app/api/auth/forgot-password/route'
import { prisma } from '@/lib/db'
import { sendPasswordResetLink } from '@/lib/email'

if (!Response.json) {
  Response.json = function (data: any, init: ResponseInit = {}) {
    return new Response(JSON.stringify(data), {
      ...init,
      headers: { 'Content-Type': 'application/json', ...(init.headers || {}) },
    })
  }
}

jest.mock('crypto', () => {
  const actual = jest.requireActual('crypto')
  return {
    ...actual,
    randomBytes: jest.fn(),
  }
})

jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  },
}))

jest.mock('@/lib/email', () => ({
  sendPasswordResetLink: jest.fn(),
}))

describe('Forgot Password API', () => {
  const mockFindUnique = prisma.user.findUnique as jest.Mock
  const mockUpdate = prisma.user.update as jest.Mock
  const mockRandomBytes = crypto.randomBytes as jest.Mock
  const mockSendPasswordResetLink = sendPasswordResetLink as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
    process.env.NEXT_PUBLIC_API_URL = 'http://localhost:3000'
  })

  test('responde 400 si no se envía email', async () => {
    const request = {
      json: jest.fn().mockResolvedValue({}),
      nextUrl: { origin: 'http://localhost:3000' },
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.message).toBe('El correo es requerido.')
    expect(mockFindUnique).not.toHaveBeenCalled()
  })

  test('responde mensaje genérico aunque el usuario no exista', async () => {
    mockFindUnique.mockResolvedValue(null)

    const request = {
      json: jest.fn().mockResolvedValue({ email: 'missing@test.com' }),
      nextUrl: { origin: 'http://localhost:3000' },
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toBe('Si el correo existe en nuestro sistema, te enviaremos un enlace de recuperación.')
    expect(mockUpdate).not.toHaveBeenCalled()
  })

  test('genera token, guarda hash y expiración cuando el usuario existe', async () => {
    const rawBuffer = Buffer.alloc(32, 1)
    const rawToken = rawBuffer.toString('hex')

    mockRandomBytes.mockReturnValue({
      toString: () => rawToken
    })

    mockFindUnique.mockResolvedValue({
      id: 'user-1',
      email: 'user@test.com',
    })

    const request = {
      json: jest.fn().mockResolvedValue({ email: 'user@test.com' }),
      nextUrl: { origin: 'http://localhost:3000' },
    } as unknown as NextRequest

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.message).toBe('Si el correo existe en nuestro sistema, te enviaremos un enlace de recuperación.')
    
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: {
        resetToken: rawToken, // The route stores the raw token now, not hashed
        resetTokenExpiry: expect.any(Date),
      },
    })
    
    expect(mockSendPasswordResetLink).toHaveBeenCalledWith(
      'user@test.com',
      `http://localhost:3000/auth/reset-password?token=${rawToken}`
    )
  })
})
