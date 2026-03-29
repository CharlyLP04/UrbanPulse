import { POST } from '@/app/api/auth/logout/route'

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

describe('Auth Logout API', () => {
  test('limpia auth-token y refresh-token', async () => {
    const response = await POST()

    expect(response.status).toBe(200)

    const setCookieHeader = response.headers.get('set-cookie') || ''
    expect(setCookieHeader).toContain('auth-token=')
    expect(setCookieHeader).toContain('refresh-token=')
    expect(setCookieHeader).toContain('Max-Age=0')
  })
})
