/**
 * Tests de Seguridad del Middleware de UrbanPulse
 *
 * Verifica el control de acceso basado en roles (RBAC) y la protección
 * de rutas mediante JWT. Se cubren los siguientes escenarios:
 *  - Rutas públicas accesibles sin token
 *  - Rutas protegidas bloqueadas sin token
 *  - Acceso de usuario autenticado a su dashboard
 *  - Bloqueo de acceso a rutas de administrador para rol 'user'
 *  - Acceso de administrador a rutas de admin
 *  - Token inválido o expirado
 *  - Redirección de usuario ya autenticado que visita /auth/*
 *  - Default-deny para rutas desconocidas
 */

import { middleware } from './middleware'
import { jwtVerify } from 'jose'

// ─── Mocks ───────────────────────────────────────────────────────────────────

jest.mock('jose', () => ({
  jwtVerify: jest.fn(),
}))

const mockNext = jest.fn(() => ({ type: 'next', cookies: { delete: jest.fn() } }))
const mockRedirectTo = jest.fn((url: URL) => ({
  type: 'redirect',
  url: url.pathname,
  cookies: { delete: jest.fn() },
}))

jest.mock('next/server', () => ({
  NextResponse: {
    next: () => mockNext(),
    redirect: (url: URL) => mockRedirectTo(url),
  },
}))

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Construye un objeto Request simulado para el middleware.
 */
function buildRequest(pathname: string, tokenValue?: string): any {
  return {
    nextUrl: {
      pathname,
    },
    url: `http://localhost${pathname}`,
    cookies: {
      get: jest.fn((name: string) => {
        if (name === 'auth-token' && tokenValue) {
          return { value: tokenValue }
        }
        return undefined
      }),
    },
  }
}

/**
 * Configura jwtVerify para devolver un payload JWT con el rol indicado.
 */
function mockValidToken(role: 'user' | 'admin') {
  ;(jwtVerify as jest.Mock).mockResolvedValue({
    payload: { sub: 'user-123', role },
  })
}

/**
 * Configura jwtVerify para lanzar un error (token inválido/expirado).
 */
function mockInvalidToken() {
  ;(jwtVerify as jest.Mock).mockRejectedValue(new Error('Token inválido'))
}

// ─── Reset ────────────────────────────────────────────────────────────────────

beforeEach(() => {
  jest.clearAllMocks()
  mockNext.mockReturnValue({ type: 'next', cookies: { delete: jest.fn() } })
  mockRedirectTo.mockImplementation((url: URL) => ({
    type: 'redirect',
    url: url.pathname,
    cookies: { delete: jest.fn() },
  }))
})

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Seguridad del Middleware - Control de Acceso por Rol (RBAC)', () => {

  // ── Rutas Públicas ─────────────────────────────────────────────────────────

  describe('Rutas Públicas (sin autenticación)', () => {
    const rutasPublicas = [
      '/',
      '/public/explore',
      '/auth/login',
      '/auth/register',
    ]

    test.each(rutasPublicas)(
      'permite acceso a "%s" sin token',
      async (ruta) => {
        const request = buildRequest(ruta) // sin token
        const response = await middleware(request)

        // Para rutas públicas sin token, siempre debe pasar o redirigir a login (no al revés)
        // Las rutas /auth/* sin token deben dejar pasar (NextResponse.next)
        expect(mockNext).toHaveBeenCalled()
        expect(mockRedirectTo).not.toHaveBeenCalled()
      }
    )

    test('ruta "/" es evaluada como coincidencia exacta (no como prefijo de todo)', async () => {
      // Esta es la corrección del bug: "/" no debe ser prefijo de "/admin/dashboard"
      const request = buildRequest('/admin/dashboard') // sin token
      await middleware(request)

      // Debe redirigir a login, NO dejar pasar
      expect(mockRedirectTo).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: '/auth/login' })
      )
      expect(mockNext).not.toHaveBeenCalled()
    })
  })

  // ── Protección de Rutas sin Token ──────────────────────────────────────────

  describe('Rutas Protegidas - Bloqueo sin Token', () => {
    const rutasProtegidas = [
      '/dashboard/home',
      '/dashboard/create-report',
      '/dashboard/profile',
    ]

    test.each(rutasProtegidas)(
      'bloquea "%s" y redirige a /auth/login cuando no hay token',
      async (ruta) => {
        const request = buildRequest(ruta) // sin token
        await middleware(request)

        expect(mockRedirectTo).toHaveBeenCalledWith(
          expect.objectContaining({ pathname: '/auth/login' })
        )
        expect(mockNext).not.toHaveBeenCalled()
      }
    )

    const rutasAdmin = ['/admin/dashboard', '/admin/moderation']

    test.each(rutasAdmin)(
      'bloquea ruta de admin "%s" y redirige a /auth/login cuando no hay token',
      async (ruta) => {
        const request = buildRequest(ruta) // sin token
        await middleware(request)

        expect(mockRedirectTo).toHaveBeenCalledWith(
          expect.objectContaining({ pathname: '/auth/login' })
        )
      }
    )
  })

  // ── Acceso de Usuario Autenticado (rol: user) ──────────────────────────────

  describe('Usuario Autenticado con rol "user"', () => {
    test('puede acceder a /dashboard/home', async () => {
      mockValidToken('user')
      const request = buildRequest('/dashboard/home', 'token-valido')
      await middleware(request)

      expect(mockNext).toHaveBeenCalled()
      expect(mockRedirectTo).not.toHaveBeenCalled()
    })

    test('puede acceder a /dashboard/create-report', async () => {
      mockValidToken('user')
      const request = buildRequest('/dashboard/create-report', 'token-valido')
      await middleware(request)

      expect(mockNext).toHaveBeenCalled()
      expect(mockRedirectTo).not.toHaveBeenCalled()
    })

    test('puede acceder a /dashboard/profile', async () => {
      mockValidToken('user')
      const request = buildRequest('/dashboard/profile', 'token-valido')
      await middleware(request)

      expect(mockNext).toHaveBeenCalled()
      expect(mockRedirectTo).not.toHaveBeenCalled()
    })

    test('es bloqueado de /admin/dashboard y redirigido a /dashboard/home', async () => {
      mockValidToken('user')
      const request = buildRequest('/admin/dashboard', 'token-valido')
      await middleware(request)

      expect(mockRedirectTo).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: '/dashboard/home' })
      )
      expect(mockNext).not.toHaveBeenCalled()
    })

    test('es bloqueado de /admin/moderation y redirigido a /dashboard/home', async () => {
      mockValidToken('user')
      const request = buildRequest('/admin/moderation', 'token-valido')
      await middleware(request)

      expect(mockRedirectTo).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: '/dashboard/home' })
      )
      expect(mockNext).not.toHaveBeenCalled()
    })
  })

  // ── Acceso de Administrador (rol: admin) ───────────────────────────────────

  describe('Administrador autenticado con rol "admin"', () => {
    test('puede acceder a /admin/dashboard', async () => {
      mockValidToken('admin')
      const request = buildRequest('/admin/dashboard', 'token-admin')
      await middleware(request)

      expect(mockNext).toHaveBeenCalled()
      expect(mockRedirectTo).not.toHaveBeenCalled()
    })

    test('puede acceder a /admin/moderation', async () => {
      mockValidToken('admin')
      const request = buildRequest('/admin/moderation', 'token-admin')
      await middleware(request)

      expect(mockNext).toHaveBeenCalled()
      expect(mockRedirectTo).not.toHaveBeenCalled()
    })

    test('también puede acceder a /dashboard/home', async () => {
      mockValidToken('admin')
      const request = buildRequest('/dashboard/home', 'token-admin')
      await middleware(request)

      expect(mockNext).toHaveBeenCalled()
      expect(mockRedirectTo).not.toHaveBeenCalled()
    })
  })

  // ── Token Inválido / Expirado ──────────────────────────────────────────────

  describe('Token Inválido o Expirado', () => {
    test('token inválido en ruta protegida redirige a /auth/login', async () => {
      mockInvalidToken()
      const request = buildRequest('/dashboard/home', 'token-malo')
      await middleware(request)

      expect(mockRedirectTo).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: '/auth/login' })
      )
      expect(mockNext).not.toHaveBeenCalled()
    })

    test('token inválido en ruta de admin redirige a /auth/login', async () => {
      mockInvalidToken()
      const request = buildRequest('/admin/dashboard', 'token-manipulado')
      await middleware(request)

      expect(mockRedirectTo).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: '/auth/login' })
      )
    })

    test('token expirado elimina la cookie auth-token', async () => {
      mockInvalidToken()
      const request = buildRequest('/dashboard/profile', 'token-expirado')
      const response = await middleware(request)

      // La respuesta de redirección debe incluir eliminación de cookie
      expect(response?.cookies?.delete).toHaveBeenCalledWith('auth-token')
    })
  })

  // ── Redirección de Usuario Ya Autenticado en /auth/* ──────────────────────

  describe('Usuario autenticado que visita páginas de Auth', () => {
    test('usuario con token válido en /auth/login es redirigido a /dashboard/home', async () => {
      mockValidToken('user')
      const request = buildRequest('/auth/login', 'token-valido')
      await middleware(request)

      expect(mockRedirectTo).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: '/dashboard/home' })
      )
      expect(mockNext).not.toHaveBeenCalled()
    })

    test('usuario con token válido en /auth/register es redirigido a /dashboard/home', async () => {
      mockValidToken('user')
      const request = buildRequest('/auth/register', 'token-valido')
      await middleware(request)

      expect(mockRedirectTo).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: '/dashboard/home' })
      )
    })

    test('usuario con token inválido en /auth/login puede ver la página', async () => {
      mockInvalidToken()
      const request = buildRequest('/auth/login', 'token-malo')
      await middleware(request)

      expect(mockNext).toHaveBeenCalled()
      expect(mockRedirectTo).not.toHaveBeenCalled()
    })
  })

  // ── Default-Deny: Rutas Desconocidas ──────────────────────────────────────

  describe('Default-Deny: Rutas no Registradas', () => {
    test('ruta desconocida /unknown con token válido es redirigida al dashboard', async () => {
      mockValidToken('user')
      const request = buildRequest('/unknown-route', 'token-valido')
      await middleware(request)

      // Al no estar en ninguna lista, el default-deny redirige al dashboard
      expect(mockRedirectTo).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: '/dashboard/home' })
      )
    })

    test('ruta desconocida /test sin token redirige a /auth/login', async () => {
      const request = buildRequest('/test-route') // sin token
      await middleware(request)

      expect(mockRedirectTo).toHaveBeenCalledWith(
        expect.objectContaining({ pathname: '/auth/login' })
      )
    })
  })
})
