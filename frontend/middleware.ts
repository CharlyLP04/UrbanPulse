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

  // Obtener token de la cookie
  const token = request.cookies.get('auth-token')?.value

  // Bloquear si no hay sesión
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  try {
    // Verificar y decodificar token
    const { payload } = await jwtVerify(token, secret)
    const userRole = payload.role as string

    // Verificar rutas de administrador
    if (adminRoutes.some(route => pathname.startsWith(route))) {
      if (userRole !== 'admin') {
        return NextResponse.redirect(new URL('/dashboard/home', request.url))
      }
    }

    // Permitir acceso a rutas protegidas
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      return NextResponse.next()
    }

    return NextResponse.next()

  } catch (error) {
    // Token inválido → login
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}