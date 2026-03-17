import { POST } from '@/app/api/auth/login/route'
import { prisma } from '@/lib/db'
import { comparePassword } from '@/lib/password'

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

describe('Auth Login API', () => {

  const mockFindUnique = prisma.user.findUnique as jest.Mock
  const mockComparePassword = comparePassword as jest.Mock

  beforeEach(() => {
    jest.clearAllMocks()
  })

  function createMockRequest(body: any) {
    return {
      json: async () => body,
    } as any
  }

  test('Credenciales válidas', async () => {

    mockFindUnique.mockResolvedValue({
      id: '1',
      email: 'admin@test.com',
      name: 'Admin Mock',
      role: 'ADMIN',
      password: 'hashed-password',
    })

    mockComparePassword.mockResolvedValue(true)

    const req = createMockRequest({
      email: 'admin@test.com',
      password: '123456',
    })

    const res = await POST(req)

    expect(res.status).toBe(200)
  })

  test('Credenciales inválidas', async () => {

    mockFindUnique.mockResolvedValue({
      id: '1',
      email: 'admin@test.com',
      name: 'Admin Mock',
      role: 'ADMIN',
      password: 'hashed-password',
    })

    mockComparePassword.mockResolvedValue(false)

    const req = createMockRequest({
      email: 'admin@test.com',
      password: 'wrong',
    })

    const res = await POST(req)

    expect(res.status).toBe(401)
  })

  test('Campos vacíos', async () => {

    const req = createMockRequest({})

    const res = await POST(req)

    expect(res.status).toBe(400)
  })

  test('Error interno controlado', async () => {

    const req = createMockRequest({
      email: 'admin@test.com',
      password: '123456',
    })

    const res = await POST(req)

    expect(res.status).toBeDefined()
  })

})