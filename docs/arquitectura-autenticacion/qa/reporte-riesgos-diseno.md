# Reporte de Riesgos de Diseño - Arquitectura de Autenticación

**Proyecto:** UrbanPulse  
**Fecha:** 2026-03-10  
**Responsable:** QA Team  
**Versión:** 1.0

---

## 1. Resumen Ejecutivo

Este documento identifica los riesgos potenciales en el diseño de la arquitectura de autenticación y autorización del sistema UrbanPulse, junto con las mitigaciones propuestas para cada uno.

| Nivel de Riesgo | Cantidad |
|-----------------|----------|
| Crítico | 2 |
| Alto | 4 |
| Medio | 3 |
| Bajo | 2 |
| **Total** | **11** |

---

## 2. Riesgos Identificados

### Riesgo R001: Almacenamiento de contraseñas en texto plano

| Campo | Detalle |
|-------|---------|
| **ID** | R001 |
| **Título** | Almacenamiento de contraseñas en texto plano |
| **Descripción** | Si las contraseñas se almacenan sin hashear, una brecha de seguridad expondría todas las credenciales de los usuarios |
| **Categoría** | Seguridad |
| **Probabilidad** | Baja |
| **Impacto** | Crítico |
| **Prioridad** | **Crítica** |
| **Mitigación Propuesta** | Utilizar algoritmo bcrypt con salt para hashear contraseñas. Nunca almacenar contraseñas en texto plano. Implementar verificación en code review. |
| **Referencia** | Criterio: SEC-001 |

---

### Riesgo R002: Exposición de información sensible en errores

| Campo | Detalle |
|-------|---------|
| **ID** | R002 |
| **Título** | Exposición de información sensible en mensajes de error |
| **Descripción** | Mensajes de error detallados pueden revelar información del sistema (stack traces, queries SQL, rutas internas) a atacantes |
| **Categoría** | Seguridad |
| **Probabilidad** | Media |
| **Impacto** | Crítico |
| **Prioridad** | **Crítica** |
| **Mitigación Propuesta** | Implementar handler global de errores que devuelva mensajes genéricos. Configurar entorno de producción para no mostrar errores detallados. Logging interno sin exposición al cliente. |
| **Referencia** | Criterio: ERR-001, SEC-008 |

---

### Riesgo R003: Validación de permisos solo en frontend

| Campo | Detalle |
|-------|---------|
| **ID** | R003 |
| **Título** | Validación de permisos solo en frontend |
| **Descripción** | Si los permisos solo se validan en la interfaz de usuario, un atacante puede evadir restricciones modificando el cliente o enviando requests directos al API |
| **Categoría** | Seguridad |
| **Probabilidad** | Media |
| **Impacto** | Alto |
| **Prioridad** | **Alta** |
| **Mitigación Propuesta** | Implementar middleware de autorización en backend que valide roles y permisos en cada request. El frontend solo es para UX, el backend es la fuente de verdad. |
| **Referencia** | Criterio: ROLE-007, AUTH-014 |

---

### Riesgo R004: Token JWT sin expiración o muy larga

| Campo | Detalle |
|-------|---------|
| **ID** | R004 |
| **Título** | Token JWT sin expiración configurable |
| **Descripción** | Tokens sin expiración o con tiempo muy largo permiten acceso continuado incluso después de que el usuario debería perder acceso |
| **Categoría** | Seguridad |
| **Probabilidad** | Baja |
| **Impacto** | Alto |
| **Prioridad** | **Alta** |
| **Mitigación Propuesta** | Configurar expiración de JWT a 24 horas máximo. Implementar refresh tokens para sesiones largas. Incluir claim 'exp' en el payload. |
| **Referencia** | Criterio: AUTH-008 |

---

### Riesgo R005: Falta de protección CSRF

| Campo | Detalle |
|-------|---------|
| **ID** | R005 |
| **Título** | Ausencia de protección contra CSRF |
| **Descripción** | Sin protección CSRF, atacantes pueden realizar acciones en nombre del usuario autenticado |
| **Categoría** | Seguridad |
| **Probabilidad** | Media |
| **Impacto** | Alto |
| **Prioridad** | **Alta** |
| **Mitigación Propuesta** | Implementar cookies con SameSite=Strict/Lax. Usar tokens CSRF en formularios. Verificar Origin/Referer headers. |
| **Referencia** | Criterio: SEC-004, SEC-007 |

---

### Riesgo R006: Revelación de existencia de email en login

| Campo | Detalle |
|-------|---------|
| **ID** | R006 |
| **Título** | Revelación de existencia de usuario por mensaje de error |
| **Descripción** | Mensajes como "El email no existe" permiten a atacantes enumerar usuarios válidos |
| **Categoría** | Seguridad |
| **Probabilidad** | Alta |
| **Impacto** | Medio |
| **Prioridad** | **Alta** |
| **Mitigación Propuesta** | Usar mensaje genérico "Email o contraseña incorrectos" para ambos casos. Implementar mismo tiempo de respuesta para evitar timing attacks. |
| **Referencia** | Criterio: AUTH-005, ERR-001 |

---

### Riesgo R007: Rate limiting inexistente

| Campo | Detalle |
|-------|---------|
| **ID** | R007 |
| **Título** | Falta de rate limiting en endpoints de autenticación |
| **Descripción** | Sin rate limiting, atacantes pueden realizar ataques de fuerza bruta sin restricciones |
| **Categoría** | Disponibilidad |
| **Probabilidad** | Media |
| **Impacto** | Alto |
| **Prioridad** | **Media** |
| **Mitigación Propuesta** | Implementar rate limiting: máximo 5 intentos de login por IP en 15 minutos. Devolver 429 cuando se exceda. Implementar CAPTCHA después de intentos fallidos. |
| **Referencia** | Criterio: AUTH-010, ERR-010 |

---

### Riesgo R008: Cookies sin flags de seguridad

| Campo | Detalle |
|-------|---------|
| **ID** | R008 |
| **Título** | Cookies de sesión sin HttpOnly, Secure o SameSite |
| **Descripción** | Sin estas banderas, las cookies son vulnerables a XSS y CSRF |
| **Categoría** | Seguridad |
| **Probabilidad** | Baja |
| **Impacto** | Alto |
| **Prioridad** | **Media** |
| **Mitigación Propuesta** | Configurar cookies con: HttpOnly=true, Secure=true (production), SameSite=Strict o Lax. Nunca exponer token JWT en localStorage si se usa cookie. |
| **Referencia** | Criterio: SEC-002, SEC-003, SEC-004 |

---

### Riesgo R009: Falta de logout completo

| Campo | Detalle |
|-------|---------|
| **ID** | R009 |
| **Título** | Logout no invalida el token JWT del servidor |
| **Descripción** | Si el token no se invalida en el servidor, puede ser usado hasta que expire |
| **Categoría** | Seguridad |
| **Probabilidad** | Media |
| **Impacto** | Medio |
| **Prioridad** | **Media** |
| **Mitigación Propuesta** | Implementar blacklist de tokens en Redis/base de datos. O usar tokens de corta duración con refresh. Incluir opción "Cerrar sesión en todos los dispositivos". |
| **Referencia** | Criterio: AUTH-009 |

---

### Riesgo R010: Validación de email débil

| Campo | Detalle |
|-------|---------|
| **ID** | R010 |
| **Título** | Validación de formato de email insuficiente |
| **Descripción** | Emails mal formateados pueden causar errores o ser usados para inyección |
| **Categoría** | Validación |
| **Probabilidad** | Baja |
| **Impacto** | Bajo |
| **Prioridad** | **Baja** |
| **Mitigación Propuesta** | Usar regex de validación de email estándar. Enviar email de verificación. Validar dominios conocidos de spam. |
| **Referencia** | Criterio: AUTH-002 |

---

### Riesgo R011: Secrets hardcodeados

| Campo | Detalle |
|-------|---------|
| **ID** | R011 |
| **Título** | Claves secretas hardcodeadas en el código |
| **Descripción** | Si las claves JWT o de encryption están en el código, una brecha las expone |
| **Categoría** | Seguridad |
| **Probabilidad** | Baja |
| **Impacto** | Alto |
| **Prioridad** | **Baja** |
| **Mitigación Propuesta** | Usar variables de entorno (.env). Never commit .env. Usar secrets management en producción (AWS Secrets Manager, etc). |
| **Referencia** | Criterio: SEC-006 |

---

## 3. Matriz de Priorización

| Prioridad | Riesgos |
|-----------|---------|
| **Crítica** | R001, R002 |
| **Alta** | R003, R004, R005, R006 |
| **Media** | R007, R008, R009 |
| **Baja** | R010, R011 |

---

## 4. Plan de Acción

| Riesgo | Acción | Responsable | Timeline |
|--------|--------|-------------|----------|
| R001 | Implementar bcrypt para contraseñas | Backend | Sprint 1 |
| R002 | Crear handler global de errores | Backend | Sprint 1 |
| R003 | Implementar middleware de autorización | Backend | Sprint 1 |
| R004 | Configurar expiración JWT | Backend | Sprint 1 |
| R005 | Configurar cookies seguras + CSRF | Backend | Sprint 1 |
| R006 | Unificar mensajes de error | Backend/Frontend | Sprint 1 |
| R007 | Implementar rate limiting | Backend | Sprint 2 |
| R008 | Configurar flags de cookies | Backend | Sprint 1 |
| R009 | Implementar blacklist de tokens | Backend | Sprint 2 |
| R010 | Mejorar validación de email | Backend | Sprint 1 |
| R011 | Mover secrets a variables de entorno | DevOps | Sprint 1 |

---

## 5. Conclusión

La arquitectura de autenticación propuesta presenta riesgos manejables si se implementan las mitigaciones descritas. Los riesgos críticos (R001, R002) deben abordarse desde el inicio del desarrollo. La validación de permisos exclusivamente en backend (R003) es fundamental para la seguridad del sistema.

---

## Historial de Versiones

| Versión | Fecha | Cambios | Autor |
|---------|-------|---------|-------|
| 1.0 | 2026-03-10 | Creación inicial | QA Team |
