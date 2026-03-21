import type { NextRequest } from 'next/server'
import { POST } from '@/app/api/auth/refresh/route'
import { signAccessToken, verifyRefreshToken } from '@/lib/auth'

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

jest.mock('@/lib/auth', () => ({
  signAccessToken: jest.fn(),
  verifyRefreshToken: jest.fn(),
}))

describe('Auth Refresh API', () => {
  const mockSignAccessToken = signAccessToken as jest.Mock
  const mockVerifyRefreshToken = verifyRefreshToken as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('responde 401 si no existe refresh-token', async () => {
    const request = {
      cookies: {
        get: jest.fn().mockReturnValue(undefined),
      },
    } as unknown as NextRequest

    const response = await POST(request)

    expect(response.status).toBe(401)
    expect(mockVerifyRefreshToken).not.toHaveBeenCalled()
    expect(mockSignAccessToken).not.toHaveBeenCalled()
  })

  test('renueva el auth-token si el refresh-token es válido', async () => {
    mockVerifyRefreshToken.mockResolvedValue({
      userId: 'user-1',
      email: 'user@test.com',
      role: 'user',
    })
    mockSignAccessToken.mockResolvedValue('new-access-token')

    const request = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'valid-refresh-token' }),
      },
    } as unknown as NextRequest

    const response = await POST(request)

    expect(response.status).toBe(200)
    expect(mockVerifyRefreshToken).toHaveBeenCalledWith('valid-refresh-token')
    expect(mockSignAccessToken).toHaveBeenCalledWith({
      userId: 'user-1',
      email: 'user@test.com',
      role: 'user',
    })
    expect(response.cookies.get('auth-token')?.value).toBe('new-access-token')
  })

  test('responde 401 si el refresh-token es inválido o expiró', async () => {
    mockVerifyRefreshToken.mockRejectedValue(new Error('expired'))

    const request = {
      cookies: {
        get: jest.fn().mockReturnValue({ value: 'expired-refresh-token' }),
      },
    } as unknown as NextRequest

    const response = await POST(request)

    expect(response.status).toBe(401)
    expect(mockVerifyRefreshToken).toHaveBeenCalledWith('expired-refresh-token')
    expect(mockSignAccessToken).not.toHaveBeenCalled()
  })
})
