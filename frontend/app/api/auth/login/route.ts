import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Validación básica
    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Los campos email y password son requeridos.',
        },
        { status: 400 }
      )
    }

    // 🔹 MOCK USER
    const mockUser = {
      id: 1,
      email: 'admin@test.com',
      name: 'Admin Mock',
      role: 'ADMIN',
    }

    // 🔹 Simulación de credenciales correctas
    if (email === 'admin@test.com' && password === '123456') {
      return NextResponse.json(
        {
          success: true,
          user: mockUser,
          accessToken: 'mock-access-token',
          refreshToken: 'mock-refresh-token',
        },
        { status: 200 }
      )
    }

    // 🔹 Credenciales incorrectas
    return NextResponse.json(
      {
        success: false,
        message: 'Credenciales inválidas.',
      },
      { status: 401 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Error interno del servidor.',
      },
      { status: 500 }
    )
  }
}