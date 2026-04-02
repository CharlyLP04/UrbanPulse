# Evidencia de Deploy - Recuperación de Contraseña

## 1. Información del Ambiente

| Campo | Valor |
|-------|-------|
| Tipo | Desarrollo local (Docker) |
| URL | http://localhost:3000 |
| Base de Datos | PostgreSQL 15 (Docker) |

## 2. Variables de Entorno Configuradas

- [x] `RESET_TOKEN_EXPIRY_MINUTES=30` - Tiempo de expiración del token de recuperación
- [x] `APP_URL=http://localhost:3000` - URL base para construir enlaces de recuperación
- [x] `JWT_SECRET` - Configurado
- [x] `JWT_REFRESH_SECRET` - Configurado
- [x] `DATABASE_URL` - Configurado para PostgreSQL

## 3. Endpoints Verificados

| Endpoint | Método | Estado |
|----------|--------|--------|
| `/api/auth/forgot-password` | POST | ✅ Implementado |
| `/api/auth/reset-password` | POST | ✅ Implementado |

### Flujo de Recuperación
1. Usuario solicita recuperación en `/auth/forgot-password`
2. Sistema genera token de 30 minutos
3. Se envía email con enlace a `/auth/reset-password?token={token}`
4. Usuario establece nueva contraseña
5. Token se invalida após uso

## 4. Pruebas Automatizadas

| Test | Resultado |
|------|-----------|
| `auth-forgot-password.test.ts` | ✅ PASS |
| `auth-reset-password.test.ts` | ✅ PASS |

## 5. Consideraciones de Seguridad

- Tokens de recuperación: 32 bytes generados con `crypto.randomBytes`
- Expiración: 30 minutos configurable via `RESET_TOKEN_EXPIRY_MINUTES`
- Respuesta genérica: No revela si el email existe en el sistema
- Token invalidado após uso exitoso

## 6. Configuración Docker

```yaml
# docker-compose.yml incluye:
- DATABASE_URL configurado
- Puerto 5432 (PostgreSQL)
- Puerto 3000 (Frontend Next.js)
```

---

**Fecha de documentación:** Marzo 2026  
**Responsable:** DevOps Squad 3
