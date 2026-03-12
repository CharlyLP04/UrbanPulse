# Criterios de Aceptación - Arquitectura de Autenticación

**Proyecto:** UrbanPulse  
**Fecha:** 2026-03-10  
**Responsable:** QA Team  
**Versión:** 1.0

---

## 1. Criterios para Autenticación

| ID | Criterio | Descripción | Prioridad |
|----|----------|--------------|-----------|
| AUTH-001 | El sistema debe permitir registro de nuevos usuarios con email y contraseña | El usuario puede crear una cuenta proporcionando email válido y contraseña segura | Alta |
| AUTH-002 | El sistema debe validar formato de email | El email debe cumplir con formato válido (ej: usuario@dominio.com) | Alta |
| AUTH-003 | La contraseña debe cumplir requisitos mínimos de seguridad | Mínimo 8 caracteres, al menos una letra mayúscula y un número | Alta |
| AUTH-004 | El sistema debe autenticar usuarios con credenciales válidas | El login verifica email y contraseña contra la base de datos | Alta |
| AUTH-005 | El sistema debe rechazar credenciales incorrectas | Mensaje de error genérico sin revelar si el email existe | Alta |
| AUTH-006 | El sistema debe generar JWT tras login exitoso | Token JWT con información del usuario y expiration | Alta |
| AUTH-007 | El sistema debe gestionar sesiones mediante cookies seguras | Cookies con flags HttpOnly, Secure y SameSite | Alta |
| AUTH-008 | El token JWT debe tener fecha de expiración | Expiración configurable (recomendado: 24 horas) | Media |
| AUTH-009 | El sistema debe permitir cierre de sesión | Invalidar token y eliminar cookies de sesión | Media |
| AUTH-010 | El sistema debe manejar intentos de login fallidos | Bloqueo temporal tras 5 intentos fallidos (recomendado) | Media |

---

## 2. Criterios para Autorización

| ID | Criterio | Descripción | Prioridad |
|----|----------|--------------|-----------|
| AUTH-011 | El sistema debe verificar token JWT en cada request a rutas protegidas | Middleware de validación de token | Alta |
| AUTH-012 | El sistema debe validar que el token no haya expirado | Verificar claim 'exp' del JWT | Alta |
| AUTH-013 | El sistema debe extraer información del usuario del token | userId, email, rol | Alta |
| AUTH-014 | El sistema debe verificar permisos según el rol del usuario | Acceso basado en rol (RBAC) | Alta |
| AUTH-015 | USER puede crear reportes | Permiso: reporte:create | Alta |
| AUTH-016 | USER puede ver reportes | Permiso: reporte:read | Alta |
| AUTH-017 | ADMIN puede editar cualquier reporte | Permiso: reporte:update | Alta |
| AUTH-018 | ADMIN puede eliminar reportes | Permiso: reporte:delete | Alta |
| AUTH-019 | ADMIN puede eliminar comentarios | Permiso: comentario:delete | Alta |
| AUTH-020 | ADMIN puede gestionar usuarios | Permiso: usuario:manage | Alta |

---

## 3. Criterios para Restricciones por Rol

| ID | Criterio | Descripción | Prioridad |
|----|----------|--------------|-----------|
| ROLE-001 | USER no puede acceder a rutas de administración | Rutas /admin/* bloqueadas para USER | Alta |
| ROLE-002 | USER no puede editar reportes de otros usuarios | Validación de propiedad del recurso | Alta |
| ROLE-003 | ADMIN tiene acceso completo al dashboard administrativo | Rutas /admin/* accesibles para ADMIN | Alta |
| ROLE-004 | El sistema debe devolver 403 Forbidden para accesos no autorizados | Respuesta estándar cuando el usuario no tiene permiso | Alta |
| ROLE-005 | USER no puede acceder a endpoints de gestión de usuarios | Endpoints /api/usuarios/* bloqueados | Alta |
| ROLE-006 | El rol del usuario debe estar incluido en el token JWT | claim 'rol' en el payload del token | Media |
| ROLE-007 | El sistema debe validar rol en backend, no solo frontend | Seguridad en capa de servidor | Alta |

---

## 4. Criterios para Manejo de Errores de Acceso

| ID | Criterio | Descripción | Prioridad |
|----|----------|--------------|-----------|
| ERR-001 | Credenciales inválidas muestran mensaje genérico | "Email o contraseña incorrectos" (no revelar cual falla) | Alta |
| ERR-002 | Token expirado devuelve 401 Unauthorized | El cliente debe redirigir a login | Alta |
| ERR-003 | Token inválido devuelve 401 Unauthorized | "Token no válido o malformado" | Alta |
| ERR-004 | Acceso sin token a ruta protegida devuelve 401 | "Se requiere autenticación" | Alta |
| ERR-005 | Acceso sin permisos devuelve 403 Forbidden | "No tienes permisos para realizar esta acción" | Alta |
| ERR-006 | Recurso no encontrado devuelve 404 | "Recurso no existente" | Media |
| ERR-007 | Error de servidor devuelve 500 | "Error interno del servidor" (sin detalles técnicos) | Alta |
| ERR-008 | El sistema no debe exponer información sensible en errores | No revelar stack traces, queries, o datos de configuración | Alta |
| ERR-009 | Los errores deben incluir código de error para debugging | Estructura: { error: string, code: string } | Baja |
| ERR-010 | Rate limiting debe devolver 429 | "Demasiadas solicitudes, intenta más tarde" | Media |

---

## 5. Criterios de Seguridad

| ID | Criterio | Descripción | Prioridad |
|----|----------|--------------|-----------|
| SEC-001 | Las contraseñas deben estar hasheadas | Algoritmo bcrypt con salt | Alta |
| SEC-002 | Las cookies deben tener flag HttpOnly | Previene XSS | Alta |
| SEC-003 | Las cookies deben tener flag Secure | Solo HTTPS | Alta |
| SEC-004 | Las cookies deben tener SameSite=Strict o Lax | Previene CSRF | Alta |
| SEC-005 | El token JWT debe ser signed | Algoritmo HS256 o RS256 | Alta |
| SEC-006 | Secrets deben estar en variables de entorno | No hardcodear claves | Alta |
| SEC-007 | El sistema debe implementar protección CSRF | Tokens CSRF o SameSite | Alta |
| SEC-008 | El sistema debe sanitizar inputs | Prevenir SQL Injection y XSS | Alta |

---

## 6. Criterios de UX/UI

| ID | Criterio | Descripción | Prioridad |
|----|----------|--------------|-----------|
| UX-001 | El formulario de login debe mostrar errores de validación en tiempo real | Feedback inmediato | Media |
| UX-002 | El sistema debe indicar visualmente si el usuario está logueado | Icono de usuario/Logout visible | Media |
| UX-003 | El sistema debe redirigir a página anterior tras login | UX fluida | Baja |
| UX-004 | El logout debe limpiar completamente el estado de sesión | No dejar datos en storage | Baja |

---

## Historial de Versiones

| Versión | Fecha | Cambios | Autor |
|---------|-------|---------|-------|
| 1.0 | 2026-03-10 | Creación inicial | QA Team |
