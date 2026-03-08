# Flujo de Autenticación y Autorización

## Inicio de sesión
1. El usuario envía email y contraseña.
2. El backend valida las credenciales.
3. Si son correctas:
   - Se genera un token de autenticación (JWT).
   - Se crea una sesión mediante cookies seguras.
4. El usuario obtiene acceso a rutas protegidas.

---

## Validación de acceso a ruta protegida
1. El usuario intenta acceder a una ruta protegida.
2. El backend verifica si existe un token válido.
3. Si el token es válido, se permite el acceso.

---

## Restricción por rol insuficiente
1. El usuario accede a una ruta restringida.
2. El backend verifica el rol del usuario.
3. Si el rol no tiene permisos suficientes:
   - Se devuelve error **403 Forbidden**.

---

## Sesión expirada
1. El token de autenticación expira.
2. El sistema solicita renovación del token.
3. Si no es válido, el usuario debe iniciar sesión nuevamente.

---

## Cierre de sesión
1. El usuario solicita cerrar sesión.
2. El backend elimina las cookies de autenticación.
3. La sesión queda invalidada.