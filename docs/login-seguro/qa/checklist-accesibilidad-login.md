# Checklist de Accesibilidad y Teclado - Login

**Proyecto:** UrbanPulse  
**Fecha:** 2026-03-17  
**Tester:**   
**Versión:** 1.0

---

## 1. Navegación por Teclado

| # | Criterio | Método de Verificación | Pass | Fail | Observaciones |
|---|----------|------------------------|------|------|---------------|
| 1.1 | Tab navega al campo email primero | Presionar Tab desde cualquier parte del formulario | ☐ | ☐ | |
| 1.2 | Shift+Tab navega hacia atrás correctamente | Presionar Shift+Tab para retroceder | ☐ | ☐ | |
| 1.3 | Tab va del email al campo contraseña | Secuencia lógica de navegación | ☐ | ☐ | |
| 1.4 | Tab va de contraseña al botón de envío | Orden correcto de tabindex | ☐ | ☐ | |
| 1.5 | Enter envía el formulario desde cualquier campo | Presionar Enter en email o contraseña | ☐ | ☐ | |
| 1.6 | El foco no queda atrapado en ningún elemento | Verificar que no hay focus trap | ☐ | ☐ | |
| 1.7 | Todos los elementos interactivos son alcanzables | Tabular por todo el formulario | ☐ | ☐ | |

---

## 2. Estados de Foco

| # | Criterio | Método de Verificación | Pass | Fail | Observaciones |
|---|----------|------------------------|------|------|---------------|
| 2.1 | El campo email tiene indicador de foco visible | Estilo visual cuando está enfocado | ☐ | ☐ | |
| 2.2 | El campo contraseña tiene indicador de foco visible | Estilo visual cuando está enfocado | ☐ | ☐ | |
| 2.3 | El botón tiene indicador de foco visible | Estilo visual cuando está enfocado | ☐ | ☐ | |
| 2.4 | El foco se mueve automáticamente al abrir la página | Al cargar /auth/login, foco en email | ☐ | ☐ | |

---

## 3. Accesibilidad con Lectores de Pantalla

| # | Criterio | Método de Verificación | Pass | Fail | Observaciones |
|---|----------|------------------------|------|------|---------------|
| 3.1 | El campo email tiene etiqueta accesible (label) | Usar NVDA/VoiceOver para verificar | ☐ | ☐ | |
| 3.2 | El campo contraseña tiene etiqueta accesible (label) | Usar NVDA/VoiceOver para verificar | ☐ | ☐ | |
| 3.3 | Los errores utilizan role="alert" | Inspeccionar HTML del mensaje | ☐ | ☐ | |
| 3.4 | Los errores utilizan aria-live="polite" | Inspeccionar HTML del mensaje | ☐ | ☐ | |
| 3.5 | aria-describedby conecta input con mensaje de error | Inspeccionar atributos | ☐ | ☐ | |
| 3.6 | El botón tiene texto accesible | No solo icono, texto o aria-label | ☐ | ☐ | |

---

## 4. Validación de Formulario

| # | Criterio | Método de Verificación | Pass | Fail | Observaciones |
|---|----------|------------------------|------|------|---------------|
| 4.1 | Error de email vacío se muestra correctamente | Enviar sin email | ☐ | ☐ | |
| 4.2 | Error de contraseña vacía se muestra correctamente | Enviar sin contraseña | ☐ | ☐ | |
| 4.3 | Error de formato de email se muestra correctamente | Ingresar email inválido | ☐ | ☐ | |
| 4.4 | El foco se mueve al primer error | Al enviar inválido, foco en campo con error | ☐ | ☐ | |
| 4.5 | Los errores son leídos por lectores de pantalla | Verificar con NVDA/VoiceOver | ☐ | ☐ | |

---

## 5. Mensajes de Error Seguros

| # | Criterio | Método de Verificación | Pass | Fail | Observaciones |
|---|----------|------------------------|------|------|---------------|
| 5.1 | Error de credenciales no revela si el email existe | Mensaje genérico | ☐ | ☐ | |
| 5.2 | Error de credenciales no revela si la contraseña es incorrecta | Mensaje genérico | ☐ | ☐ | |
| 5.3 | El mensaje de error es claro para el usuario | Entendible sin información técnica | ☐ | ☐ | |

---

## 6. Funcionalidad del Formulario

| # | Criterio | Método de Verificación | Pass | Fail | Observaciones |
|---|----------|------------------------|------|------|---------------|
| 6.1 | Login exitoso redirige al dashboard | Credenciales válidas | ☐ | ☐ | |
| 6.2 | Login exitoso guarda sesión | Verificar localStorage/cookies | ☐ | ☐ | |
| 6.3 | Login fallido muestra mensaje de error | Credenciales inválidas | ☐ | ☐ | |
| 6.4 | El botón está deshabilitado durante carga | Mientras procesa | ☐ | ☐ | |
| 6.5 | El formulario se puede reiniciar | Botón limpiar o similar | ☐ | ☐ | |

---

## 7. Diseño Responsive

| # | Criterio | Método de Verificación | Pass | Fail | Observaciones |
|---|----------|------------------------|------|------|---------------|
| 7.1 | El formulario es usable en móvil | Viewport 375px | ☐ | ☐ | |
| 7.2 | Los campos son lo suficientemente grandes | Mínimo 44px de altura toque | ☐ | ☐ | |
| 7.3 | El botón es fácilmente tocable | Mínimo 44px | ☐ | ☐ | |

---

## Resumen de Ejecución

| Métrica | Valor |
|---------|-------|
| Total de criterios | 27 |
| Criterios marcados Pass | |
| Criterios marcados Fail | |
| Porcentaje de cumplimiento | |

---

## Firmas

| Rol | Nombre | Fecha | Firma |
|-----|--------|-------|-------|
| QA Tester | | | |
| Revisor | | | |

---

## Historial de Versiones

| Versión | Fecha | Cambios | Autor |
|---------|-------|---------|-------|
| 1.0 | 2026-03-17 | Creación inicial del checklist | QA Team |
