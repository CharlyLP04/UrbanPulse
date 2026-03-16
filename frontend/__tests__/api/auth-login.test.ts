import { POST } from "@/app/api/auth/login/route"

describe("Auth Login API", () => {

  test("Credenciales válidas", async () => {

    const req = new Request("http://localhost/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "admin@test.com",
        password: "123456"
      })
    }) as any

    const res = await POST(req)

    expect(res.status).toBe(200)

  })


  test("Credenciales inválidas", async () => {

    const req = new Request("http://localhost/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        email: "fake@test.com",
        password: "wrong"
      })
    }) as any

    const res = await POST(req)

    expect(res.status).toBe(401)

  })


  test("Campos vacíos", async () => {

    const req = new Request("http://localhost/api/auth/login", {
      method: "POST",
      body: JSON.stringify({})
    }) as any

    const res = await POST(req)

    expect(res.status).toBe(400)

  })


  test("Error interno controlado", async () => {

    const req = new Request("http://localhost/api/auth/login", {
      method: "POST",
      body: JSON.stringify(null)
    }) as any

    const res = await POST(req)

    expect(res.status).toBe(500)

  })

})