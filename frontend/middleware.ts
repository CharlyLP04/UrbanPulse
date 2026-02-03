import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback-secret-key'
)

// Rutas públicas (acceso sin autenticación)
const publicRoutes = [
  '/',
  '/auth/login',
  '/auth/register',
  '/public/explore',
]

// Rutas de administrador (requieren rol admin)
const adminRoutes = [
  '/admin/dashboard',
  '/admin/moderation',
]

// Rutas de usuario (requieren autenticación)
const protectedRoutes = [
  '/dashboard',
  '/dashboard/create-report',
  '/dashboard/home',
  '/dashboard/profile',
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Permitir acceso a rutas públicas
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Verificar token JWT
  const token = request.cookies.get('auth-token')?.value

  if (!token) {
    // Redirigir a login si no hay token
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  try {
    // Verificar y decodificar token
    const { payload } = await jwtVerify(token, secret)
    const userRole = payload.role as string

    // Verificar rutas de administrador
    if (adminRoutes.some(route => pathname.startsWith(route))) {
      if (userRole !== 'admin') {
        // Redirigir a dashboard de usuario si no es admin
        return NextResponse.redirect(new URL('/dashboard/home', request.url))
      }
    }

    // Permitir acceso a rutas protegidas
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.next()
    }

    // Si la ruta no está definida, permitir acceso
    return NextResponse.next()

  } catch (error) {
    // Token inválido, redirigir a login
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}

// Configurar qué rutas debe manejar el middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}