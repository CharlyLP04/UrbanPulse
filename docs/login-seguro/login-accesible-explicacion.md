# Implementación de Login Accesible – UrbanPulse

## Descripción

Se implementó un formulario de inicio de sesión accesible, seguro y usable por teclado para la plataforma UrbanPulse.

El objetivo fue permitir que cualquier usuario pueda iniciar sesión utilizando únicamente el teclado y que los mensajes de error sean claros sin exponer información sensible.

---

## Accesibilidad del formulario

El formulario implementa prácticas de accesibilidad web:

- Cada input tiene su etiqueta asociada mediante `label` y `htmlFor`.
- Los mensajes de error utilizan `role="alert"` y `aria-live` para que lectores de pantalla puedan detectarlos.
- Se evita bloquear la navegación por teclado.

Esto permite que el formulario sea usable para usuarios con tecnologías asistivas.

---

## Navegación por teclado

El flujo completo del login puede realizarse mediante teclado:

- **Tab** permite navegar entre campos.
- **Shift + Tab** permite retroceder entre campos.
- **Enter** activa el botón de envío del formulario.

Esto cumple con las recomendaciones de accesibilidad WCAG para formularios interactivos.

---

## Manejo seguro de errores

Cuando ocurre un error de autenticación se muestra un mensaje genérico:


Esto evita revelar información sensible como:
- si el correo existe
- si la contraseña es incorrecta

Esta práctica previene ataques de enumeración de usuarios.

---

## Manejo de sesión

La sesión se gestiona mediante un `AuthProvider` que mantiene el estado del usuario en la aplicación.

El proveedor de autenticación

- guarda un token de sesión en `localStorage`
- expone el usuario autenticado
- permite acceder al rol del usuario (`admin` o `user`)

Esto permite que el frontend pueda controlar rutas protegidas y mostrar información según el rol.

---

## Conclusión

La implementación cumple con los requisitos de:

- accesibilidad
- seguridad básica en UI
- navegación por teclado
- manejo de sesión en el frontend

Esto garantiza una experiencia de inicio de sesión usable, segura y compatible con estándares de accesibilidad web.