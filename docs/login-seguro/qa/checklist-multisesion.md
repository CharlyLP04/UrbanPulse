# Checklist de Pruebas: Multisesión y Refresh Token

## Objetivo
Validar el correcto funcionamiento de la autenticación basada en cookies, el refresco del token sin interrupciones y la sincronización del estado de la sesión a través de múltiples pestañas del navegador utilizando concurrencia mitigada (`navigator.locks`).

## Casos de Prueba

- [x] **Login en múltiples pestañas**
  - *Descripción:* Login desde dos pestañas distintas funciona correctamente. El estado global refleja al usuario en ambas tras iniciarse la sesión.
- [x] **Sincronización de Logout**
  - *Descripción:* Logout en una pestaña refleja cierre en las demás pestañas gracias al uso de `BroadcastChannel`. Ambas redirigen a `/auth/login`.
- [x] **Expiración de Sesión**
  - *Descripción:* Sesión expirada redirige a login automáticamente sin dejar rastros en el cliente si el refresh falla.
- [x] **Renovación Transparente**
  - *Descripción:* Refresh token renueva la sesión llamando a `/api/auth/refresh` sin interrumpir al usuario, y repitiendo la llamada original (401).
- [x] **Bloqueo de Refresh Simultáneo**
  - *Descripción:* No se generan múltiples llamadas de refresh simultáneas al tener varias pestañas abiertas. `navigator.locks` detiene a las peticiones adicionales mientras la primera renueva el token.
- [x] **Prevención de Ciclos Infinitos (Loops)**
  - *Descripción:* No hay loops de redirección o refresh cuando el token expiró definitivamente. La app redirige limpiamente una sola vez y no recarga infinitamente la ruta de login.

---
**Firma QA / Desarrollador:** [Firma Automática - Aprobado]
**Fecha:** 2026-03-29