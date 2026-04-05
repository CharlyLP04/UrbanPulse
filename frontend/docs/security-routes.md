# Documentación de Seguridad de Rutas - UrbanPulse

## Resumen

UrbanPulse implementa un sistema de **Control de Acceso Basado en Roles (RBAC)** en el lado del servidor mediante el **Middleware de Next.js**. Esto garantiza que ningún cliente pueda acceder a recursos protegidos sin autenticación y autorización válidas, incluso accediendo directamente por URL.

---

## Arquitectura de Seguridad

```
Petición del Navegador
        │
        ▼
┌───────────────────────┐
│   Next.js Middleware  │  ← Se ejecuta en el Edge antes de renderizar
│    (middleware.ts)    │     Verifica JWT en cookie `auth-token`
└───────────┬───────────┘
            │
   ┌────────┴──────────┐
   │                   │
   ▼                   ▼
¿Ruta Pública?    ¿Tiene Token JWT?
   │                   │
  Sí                  No → Redirige a /auth/login
   │                   │
   ▼                  Sí
Permitir          ¿Token Válido?
acceso                 │
                      No → Elimina cookie → Redirige /auth/login
                       │
                      Sí
                  ¿Ruta Admin?
                       │
              ┌────────┴────────┐
              │                 │
              Sí                No
         ┿rol=admin?        ¿Ruta Dashboard?
              │                 │
             No → /dashboard/home  Sí → Permitir
              │                 │
             Sí                No → Default-Deny → /dashboard/home
          Permitir
```

---

## Clasificación de Rutas

### Rutas Públicas (sin autenticación)
| Ruta | Acceso | Descripción |
|------|--------|-------------|
| `/` | Todos | Página de bienvenida |
| `/public/explore` | Todos | Explorar incidencias públicas |
| `/auth/login` | No autenticados | Inicio de sesión |
| `/auth/register` | No autenticados | Registro de usuario |

> **Nota:** Si un usuario **ya autenticado** intenta acceder a `/auth/*`, es redirigido automáticamente a `/dashboard/home`.

### Rutas Protegidas (requieren autenticación)
| Ruta | Rol Requerido | Descripción |
|------|---------------|-------------|
| `/dashboard/home` | `user` o `admin` | Panel principal |
| `/dashboard/create-report` | `user` o `admin` | Crear nuevo reporte |
| `/dashboard/profile` | `user` o `admin` | Perfil de usuario |

### Rutas Administrativas (requieren rol admin)
| Ruta | Rol Requerido | Descripción |
|------|---------------|-------------|
| `/admin/dashboard` | `admin` | Panel de administración |
| `/admin/moderation` | `admin` | Moderación de reportes |

### Default-Deny
Cualquier ruta no clasificada en los grupos anteriores es **bloqueada por defecto**:
- Sin token → redirige a `/auth/login`
- Con token válido → redirige a `/dashboard/home`

---

## Autenticación JWT

### Flujo del Token

1. El usuario inicia sesión en `/auth/login`
2. El servidor emite un JWT firmado con `JWT_SECRET` y lo guarda en una cookie `HttpOnly`:
   - **Nombre:** `auth-token`
   - **Duración:** 15 minutos (access token)
   - **Tipo:** `HttpOnly`, `SameSite=Strict`
   - **Secure:** `true` en producción (HTTPS requerido)

3. El middleware verifica el JWT en cada petición usando `jose.jwtVerify`
4. Si el token es inválido o expirado, se elimina la cookie y se redirige a login

### Payload del JWT
```typescript
{
  sub: string,      // ID del usuario
  role: 'user' | 'admin',  // Rol para RBAC
  iat: number,      // Fecha de emisión
  exp: number,      // Fecha de expiración
}
```

---

## Decisiones de Diseño

### ¿Por qué Middleware de Next.js y no Client-Side?

| Criterio | Client-Side | Middleware (Edge) |
|----------|-------------|-------------------|
| **Seguridad** | ❌ Bypasseable con DevTools | ✅ Se ejecuta antes del render |
| **SEO** | ✅ | ✅ |
| **SSR** | ❌ No protege | ✅ Protege también el HTML inicial |
| **Velocidad** | ✅ Rápido | ✅ Edge (muy rápido) |

### ¿Por qué Default-Deny?

La estrategia **"deny by default"** (negar por defecto) es un principio fundamental de seguridad. En lugar de listar qué rutas bloquear, se listan explícitamente qué rutas permitir. Cualquier ruta nueva o desconocida queda automáticamente protegida.

### ¿Por qué eliminar la cookie en token inválido?

Si el token está expirado o manipulado, eliminar la cookie `auth-token` previene:
- Bucles de redirección si el cliente reintenta con una cookie corrupta
- Confusión de estado en el cliente (que podría creer estar autenticado)

---

## Matriz de Control de Acceso

| Ruta | Sin auth | `user` | `admin` |
|------|----------|--------|---------|
| `/` | ✅ | ✅ | ✅ |
| `/public/explore` | ✅ | ✅ | ✅ |
| `/auth/login` | ✅ | 🔄 → dashboard | 🔄 → dashboard |
| `/auth/register` | ✅ | 🔄 → dashboard | 🔄 → dashboard |
| `/dashboard/home` | 🔄 → login | ✅ | ✅ |
| `/dashboard/create-report` | 🔄 → login | ✅ | ✅ |
| `/dashboard/profile` | 🔄 → login | ✅ | ✅ |
| `/admin/dashboard` | 🔄 → login | 🔒 → dashboard | ✅ |
| `/admin/moderation` | 🔄 → login | 🔒 → dashboard | ✅ |
| `/ruta-desconocida` | 🔄 → login | 🔒 → dashboard | 🔒 → dashboard |

**Leyenda:** ✅ Acceso permitido | 🔄 Redirección | 🔒 Acceso denegado

---

## Cobertura de Tests de Seguridad

Los tests en `middleware.test.ts` cubren los siguientes escenarios críticos:

| Escenario | Descripción |
|-----------|-------------|
| ✅ Rutas públicas sin token | Debe retornar `next()` |
| ✅ Bug fix de ruta `/` | `/` no es prefijo de `/admin/*` |
| ✅ Rutas protegidas sin token | Redirige a `/auth/login` |
| ✅ Rutas admin sin token | Redirige a `/auth/login` |
| ✅ `user` accede a dashboard | Permitido |
| ✅ `user` accede a `/admin/*` | Redirige a `/dashboard/home` |
| ✅ `admin` accede a `/admin/*` | Permitido |
| ✅ `admin` accede a dashboard | Permitido |
| ✅ Token inválido | Redirige a `/auth/login` |
| ✅ Token expirado | Elimina cookie + redirige a login |
| ✅ Usuario autenticado en `/auth/login` | Redirige a `/dashboard/home` |
| ✅ Usuario autenticado en `/auth/register` | Redirige a `/dashboard/home` |
| ✅ Token inválido en `/auth/*` | Permite acceso a la página |
| ✅ Ruta desconocida con token | Default-deny → dashboard |
| ✅ Ruta desconocida sin token | Default-deny → login |

---

## Cómo Ejecutar los Tests de Seguridad

```bash
# Desde /frontend
# Un test específico del middleware
npm test middleware.test.ts

# Todos los tests del proyecto
npm test

# Con reporte de coverage
npm run test:coverage
```

---

*Documentación generada: 2026-04-05 | Versión: 1.0.0*
