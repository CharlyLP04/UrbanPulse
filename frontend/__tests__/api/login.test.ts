import { POST } from '@/app/api/auth/login/route'
import { NextRequest } from 'next/server'

// Mocks
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

// Importamos los mocks para sobreescribirlos por prueba
import { prisma } from '@/lib/db'
import { comparePassword } from '@/lib/password'

describe('POST /api/auth/login Seguridad', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('Rechaza credenciales erróneas (401) y protege contra inyecciones/lectura', async () => {
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue(null)

    const request = new NextRequest('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'hacker@mal.com', password: '123' }),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(401)
    expect(data.message).toBe('Credenciales inválidas.')
    expect(response.cookies.has('auth-token')).toBe(false)
  })

  it('Verifica flujo crítico: Asigna cookie Http-Only a rol ADMINISTRADOR', async () => {
    // Simulamos DB devolviendo al Admin
    ;(prisma.user.findUnique as jest.Mock).mockResolvedValue({
      id: 'admin_1',
      email: 'admin@urbanpulse.com',
      name: 'Admin',
      role: 'ADMIN',
      password: 'hashedPassword',
    })
    ;(comparePassword as jest.Mock).mockResolvedValue(true)

    const request = new NextRequest('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@urbanpulse.com', password: 'adminpassword' }),
    })

    const response = await POST(request)
    const data = await response.json()

    // 1. Validaciones Lógicas de Rol
    expect(response.status).toBe(200)
    expect(data.user.role).toBe('admin') // Normalizado a minúsculas en el endpoint
    
    // 2. Validaciones de Seguridad (Checklist)
    const setCookie = response.headers.get('set-cookie')
    expect(setCookie).toContain('auth-token=mock-access-token')
    expect(setCookie).toContain('HttpOnly')
    expect(setCookie).toContain('Path=/')
  })

  it('Fuerza error 400 si faltan datos previniendo colapsos SQL', async () => {
    const request = new NextRequest('http://localhost/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: '' }), // Faltan campos
    })

    const response = await POST(request)
    expect(response.status).toBe(400)
  })
})
