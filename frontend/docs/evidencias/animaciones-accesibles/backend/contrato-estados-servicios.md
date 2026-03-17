# Contrato de Estados – Servicios Backend

## 1. Estructura general de respuesta

Todos los endpoints del backend devuelven respuestas estandarizadas con la siguiente estructura:

### Respuesta exitosa

```json
{
  "success": true,
  "data": {}
}
Respuesta con error
{
  "success": false,
  "message": "Descripción del error"
}
2. Estados que utiliza el frontend

El frontend puede mostrar animaciones según los siguientes estados:

Cargando → mientras espera la respuesta del servidor.

Éxito → cuando success es true.

Error → cuando success es false.

3. Endpoints documentados
GET /api/reports

Éxito (200)

{
  "success": true,
  "data": []
}

Error (500)

{
  "success": false,
  "message": "Error al obtener los reportes"
}
GET /api/reports/:id

Éxito (200)

{
  "success": true,
  "data": {}
}

No encontrado (404)

{
  "success": false,
  "message": "Reporte no encontrado"
}

Error (500)

{
  "success": false,
  "message": "Error al obtener el reporte"
}
POST /api/auth/login

Éxito (200)

{
  "success": true,
  "data": {
    "user": {},
    "token": "jwt"
  }
}

Error (400 / 401)

{
  "success": false,
  "message": "Credenciales inválidas"
}
POST /api/auth/register

Éxito (201)

{
  "success": true,
  "data": {
    "user": {}
  }
}

Error (400)

{
  "success": false,
  "message": "Error en el registro"
}