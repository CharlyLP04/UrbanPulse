# Backend Issues – Implementación futura

## Issue 1: Middleware de autorización

**Objetivo**  
Implementar middleware que valide roles antes de acceder a rutas protegidas.

**Criterio de aceptación**
- Validar token JWT.
- Verificar rol del usuario.
- Bloquear acceso si el rol no tiene permisos.

**Prioridad**  
Alta

---

## Issue 2: Implementación de refresh tokens

**Objetivo**  
Permitir renovar sesiones sin que el usuario tenga que iniciar sesión nuevamente.

**Criterio de aceptación**
- Crear refresh token seguro.
- Renovar access token automáticamente.

**Prioridad**  
Media

---

## Issue 3: Registro de actividad (logs)

**Objetivo**  
Registrar acciones importantes del sistema.

**Criterio de aceptación**
- Registrar inicio de sesión.
- Registrar acciones de administrador.
- Guardar logs en base de datos.

**Prioridad**  
Media