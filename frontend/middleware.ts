import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-key'
)

// Rutas completamente públicas (sin autenticación, coincidencia exacta o prefijos)
const publicExactRoutes = ['/', '/public/explore']
const publicPrefixRoutes = ['/auth/']

// Rutas de administrador (requieren rol admin)
const adminPrefixRoutes = ['/admin/']

// Rutas protegidas de usuario (requieren cualquier rol autenticado)
const protectedPrefixRoutes = ['/dashboard/']

/**
 * Determina si una ruta es pública (no requiere autenticación).
 */
function isPublicRoute(pathname: string): boolean {
  if (publicExactRoutes.includes(pathname)) return true
  return publicPrefixRoutes.some(prefix => pathname.startsWith(prefix))
}

/**
 * Determina si una ruta es exclusiva del administrador.
 */
function isAdminRoute(pathname: string): boolean {
  return adminPrefixRoutes.some(prefix => pathname.startsWith(prefix))
}

/**
 * Determina si una ruta requiere autenticación de usuario.
 */
function isProtectedRoute(pathname: string): boolean {
  return protectedPrefixRoutes.some(prefix => pathname.startsWith(prefix))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. Verificar si es ruta pública
  if (isPublicRoute(pathname)) {
    // Si el usuario ya está autenticado e intenta ir a /auth/*,
    // redirigirlo a su dashboard.
    if (pathname.startsWith('/auth/')) {
      const token = request.cookies.get('auth-token')?.value
      if (token) {
        try {
          await jwtVerify(token, secret)
          // Token válido: redirigir a dashboard
          return NextResponse.redirect(new URL('/dashboard/home', request.url))
        } catch {
          // Token inválido: permítir acceso a la página de auth
          return NextResponse.next()
        }
      }
    }
    return NextResponse.next()
  }

  // 2. Para rutas no públicas, verificar token JWT
  const token = request.cookies.get('auth-token')?.value

  if (!token) {
    // Sin token: redirigir a login
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  try {
    // Verificar y decodificar token
    const { payload } = await jwtVerify(token, secret)
    const userRole = String(payload.role || '').toLowerCase()

    // 3. Verificar rutas de administrador
    if (isAdminRoute(pathname)) {
      if (userRole !== 'admin') {
        // Usuario sin permisos de admin: redirigir a su dashboard
        return NextResponse.redirect(new URL('/dashboard/home', request.url))
      }
      // Admin accediendo a ruta de admin: permitir
      return NextResponse.next()
    }

    // 4. Verificar rutas protegidas de usuario
    if (isProtectedRoute(pathname)) {
      // Cualquier usuario autenticado puede acceder
      return NextResponse.next()
    }

    // 5. Default-deny: si la ruta no está en ninguna lista conocida, bloquear.
    // Redirigir según autenticación del usuario.
    return NextResponse.redirect(new URL('/dashboard/home', request.url))

  } catch {
    // Token inválido o expirado: limpiar cookie y redirigir a login
    const response = NextResponse.redirect(new URL('/auth/login', request.url))
    response.cookies.delete('auth-token')
    return response
  }
}

// Configurar qué rutas debe manejar el middleware
export const config = {
  matcher: [
    /*
     * Intercepta todas las rutas excepto:
     * - api (API routes internas de Next.js)
     * - _next/static (archivos estáticos)
     * - _next/image (optimización de imágenes)
     * - favicon.ico
     * - archivos con extensión (imágenes, fuentes, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}