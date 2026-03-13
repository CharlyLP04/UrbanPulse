# Mapa de rutas y restricciones por rol

Proyecto: UrbanPulse  
Rol responsable: Frontend  

Este documento describe cómo la interfaz controla el acceso a las rutas del sistema según el estado de autenticación del usuario y su rol.

El backend define dos roles principales:

- USER
- ADMIN

---

# 1. Rutas públicas

Las rutas públicas pueden ser accedidas por cualquier usuario sin necesidad de autenticación.

| Ruta | Descripción |
|-----|-------------|
| / | Página principal |
| /explore | Exploración de reportes públicos |
| /login | Inicio de sesión |
| /register | Registro de usuario |

Comportamiento esperado:

- No requieren sesión activa.
- Si un usuario autenticado intenta acceder a `/login` o `/register`, será redirigido a `/dashboard`.

---

# 2. Rutas protegidas por autenticación

Estas rutas requieren que el usuario tenga una sesión válida.

| Ruta | Descripción |
|-----|-------------|
| /dashboard | Panel principal del usuario |
| /create-report | Creación de reportes |
| /profile | Perfil del usuario |

Regla de acceso:

Usuario sin sesión:

Usuario intenta acceder a ruta protegida  
↓  
Sistema detecta ausencia de token  
↓  
Redirección automática a `/login`

---

# 3. Rutas restringidas por rol

Algunas rutas requieren rol ADMIN.

| Ruta | Rol requerido | Descripción |
|-----|---------------|-------------|
| /admin | ADMIN | Panel administrativo |
| /admin/users | ADMIN | Gestión de usuarios |
| /admin/reports | ADMIN | Moderación de reportes |

Regla:

Usuario autenticado  
↓  
Intenta acceder a ruta administrativa  
↓  
Sistema verifica rol del usuario  
↓  
Si el rol es USER  
↓  
Mostrar página de acceso denegado

---

# 4. Redirecciones esperadas

| Situación | Acción |
|----------|-------|
| Usuario sin sesión intenta acceder a ruta protegida | Redirigir a `/login` |
| Usuario autenticado intenta acceder a `/login` | Redirigir a `/dashboard` |
| Usuario con rol USER accede a ruta ADMIN | Mostrar página "Acceso denegado" |
| Token expirado | Redirigir a `/login` |