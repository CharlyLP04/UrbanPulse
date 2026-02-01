<div align="center">

# 🧠 Backend & API (Node.js + Express)

</div>

El núcleo lógico de UrbanPulse. API RESTful construida con Node.js y Express, diseñada para ser escalable y contenerizada.

## ⚙️ Reglas de Desarrollo (Backend)

### 1. Arquitectura y Código
*   **Controladores "Skinny"**: La lógica de negocio compleja debe estar en Servicios (`/services`), no en los Controladores.
*   **Rutas**: Definir rutas en `/routes` y usar versionado de API (ej. `/api/v1/incidencias`).
*   **Manejo de Errores**: Todo endpoint debe usar bloques `try/catch` y responder con códigos HTTP semánticos (200, 201, 400, 401, 404, 500).

### 2. Base de Datos (PostgreSQL)
*   Las migraciones son la **única** forma autorizada de modificar el esquema de la base de datos.
*   Nombres de tablas y columnas deben estar en `snake_case`.

### 3. Dockerización
*   El `Dockerfile` en esta carpeta es la fuente de verdad para el despliegue.
*   **Regla de Oro**: Si funciona en local pero no en Docker, está roto. Siempre probar con `docker compose up --build`.

### 4. Seguridad
*   Validar **siempre** los datos de entrada (usar middlewares tipo `joi` o `express-validator`).
*   Prohibido devolver contraseñas o datos sensibles en las respuestas JSON.

### 5. Configuración del Entorno
*   Crear un archivo `.env` basado en las necesidades del proyecto (ver `Dockerfile` o contactar al Tech Lead).
*   Asegurarse de que `tsconfig.json` esté presente para la compilación de TypeScript.
