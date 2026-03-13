# Frontend Issues – Implementación futura

Este documento describe posibles tareas futuras relacionadas con la implementación del sistema de autenticación y control de acceso desde el lado del frontend.

---

## Issue 1: Protección de rutas en el frontend

**Objetivo**

Implementar un sistema de protección de rutas que verifique si el usuario tiene una sesión válida antes de permitir el acceso a páginas protegidas.

**Criterio de aceptación**

- Detectar si existe una sesión activa.
- Redirigir automáticamente a `/login` si el usuario no está autenticado.
- Permitir acceso normal si el usuario tiene sesión válida.
- Aplicar la protección a rutas como `/dashboard`, `/create-report` y `/profile`.

**Prioridad**

Alta

---

## Issue 2: Manejo de sesión expirada en la interfaz

**Objetivo**

Detectar cuando la sesión del usuario ha expirado y redirigirlo automáticamente al inicio de sesión.

**Criterio de aceptación**

- Detectar respuestas de backend que indiquen token inválido o expirado.
- Mostrar mensaje informativo al usuario.
- Redirigir automáticamente a `/login`.
- Limpiar cualquier dato de sesión almacenado en el cliente.

**Prioridad**

Media

---

## Issue 3: Página de acceso denegado por rol

**Objetivo**

Implementar una pantalla específica para cuando un usuario intenta acceder a una sección para la cual no tiene permisos.

**Criterio de aceptación**

- Mostrar una página de **Acceso denegado** cuando el rol no tenga permisos suficientes.
- Mostrar un mensaje explicando la restricción.
- Incluir un botón para regresar al **dashboard** o página principal.
- Evitar que el contenido restringido se renderice.

**Prioridad**

Media