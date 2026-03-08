# Decisión Técnica – Autenticación

## Enfoque elegido
Se utilizará autenticación basada en **JWT (JSON Web Tokens)** junto con cookies seguras para gestionar sesiones de usuario.

---

## Por qué se eligió
- Permite autenticación segura en aplicaciones web modernas.
- Es compatible con frameworks como Next.js.
- Facilita el control de sesiones y validación de usuarios.

---

## Riesgos mitigados
- Uso de cookies **httpOnly** para evitar acceso desde JavaScript.
- Expiración de tokens para limitar sesiones activas.
- Validación de roles para restringir accesos no autorizados.