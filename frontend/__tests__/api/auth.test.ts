import { NextRequest } from 'next/server'
import { POST as loginPOST } from '../../app/api/auth/login/route'
import { POST as registerPOST } from '../../app/api/auth/register/route'

describe('API Endpoint Tests - Auth', () => {

  test('Login returns 400 if missing data', async () => {
    const request = new NextRequest(
      new Request('http://localhost/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({})
      })
    )

    const response = await loginPOST(request)
    expect(response.status).toBe(400)
  })

  test('Register returns 400 if missing data', async () => {
    const request = new NextRequest(
      new Request('http://localhost/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({})
      })
    )

    const response = await registerPOST(request)
    expect(response.status).toBe(400)
  })

})
