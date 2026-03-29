import type { NextRequest } from 'next/server'
import { createHash, randomBytes } from 'crypto'
import { POST } from '@/app/api/auth/forgot-password/route'
import { prisma } from '@/lib/db'

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

describe('Forgot Password API', () => {
  const mockFindUnique = prisma.user.findUnique as jest.Mock
  const mockUpdate = prisma.user.update as jest.Mock
  const mockRandomBytes = randomBytes as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('responde 400 si no se envía email', async () => {
    const request = {
      json: jest.fn().mockResolvedValue({}),
      nextUrl: { origin: 'http://localhost:3000' },
    } as unknown as NextRequest

    const response = await POST(request)

    expect(response.status).toBe(400)
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
    expect(data.message).toBe(
      'Si el correo está registrado, recibirás instrucciones para recuperar tu contraseña.'
    )
    expect(mockUpdate).not.toHaveBeenCalled()
  })

  test('genera token, guarda hash y expiración cuando el usuario existe', async () => {
    const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation(() => undefined)
    const rawBuffer = Buffer.alloc(32, 1)
    const rawToken = rawBuffer.toString('hex')
    const hashedToken = createHash('sha256').update(rawToken).digest('hex')

    mockRandomBytes.mockReturnValue(rawBuffer)
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
    expect(data.message).toBe(
      'Si el correo está registrado, recibirás instrucciones para recuperar tu contraseña.'
    )
    expect(mockUpdate).toHaveBeenCalledWith({
      where: { id: 'user-1' },
      data: {
        resetToken: hashedToken,
        resetTokenExpiry: expect.any(Date),
      },
    })
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      'Reset password link:',
      `http://localhost:3000/auth/reset-password?token=${rawToken}`
    )

    consoleInfoSpy.mockRestore()
  })
})
