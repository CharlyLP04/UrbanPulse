import { middleware } from './middleware'
import { jwtVerify } from 'jose'

jest.mock('jose', () => ({
  jwtVerify: jest.fn(),
}))

jest.mock('next/server', () => ({
  NextResponse: {
    next: jest.fn(() => 'next'),
    redirect: jest.fn((url) => `redirect:${url}`),
  },
}))

describe('Middleware Tests', () => {

  it('should allow public route', async () => {
    const request = {
      nextUrl: { pathname: '/' },
      cookies: { get: jest.fn() }
    }

    const response = await middleware(request as any)

    expect(response).toBe('next')
  })

})
