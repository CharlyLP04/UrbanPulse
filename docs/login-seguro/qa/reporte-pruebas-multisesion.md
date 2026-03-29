# Reporte de Pruebas de Sesión y Multisesión
**Proyecto:** UrbanPulse  
**Módulo:** Autenticación y Seguridad Frontend  
**Fecha:** 29 de Marzo de 2026  
**Estado General:** ✅ APROBADO

---

## 📋 Resumen Ejecutivo
Se han ejecutado las pruebas funcionales para validar el correcto manejo del ciclo de vida de la sesión (login, expiración de tokens y logout) así como la recarga y concurrencia del usuario en múltiples pestañas sincronizadas.

## ✅ Resultados por Requisito

### 1. Token expirado no permite acceso a rutas protegidas
- **Prueba:** Se forzó la expiración del JWT y se intentó navegar a `/dashboard/home` mediante carga directa y navegación cliente.
- **Resultado:** El Middleware y el `AuthProvider` detectan el error 401 y disparan un Broadcast de expiración, bloqueando la renderización.
- **Estado:** ✅ Validado. 

### 2. Logout limpia correctamente las cookies
- **Prueba:** Se dio clic en "Cerrar Sesión" en el Navbar.
- **Resultado:** Se ejecuta la petición a `/api/auth/logout`. La respuesta incluye cabeceras `Set-Cookie` para invalidar las cookies HTTP-Only de sesión y limpieza de estado global.
- **Estado:** ✅ Validado.

### 3. Usuario sin sesión no puede crear reportes
- **Prueba:** Navegación anónima hacia rutas restringidas donde existen formularios (ej. `/dashboard/create-report`).
- **Resultado:** Redirección inmediata hacia `/auth/login`. Los endpoints de creación retornan Error HTTP 401 Unauthorized sin excepción.
- **Estado:** ✅ Validado.

### 4. Refresh token inválido redirige a login sin reintentos
- **Prueba:** Intercepción de respuesta de red simulando falla en endpoint de refresh token por token corrupto / base de datos desconectada.
- **Resultado:** La promesa de rechazo (`catch` en los interceptores API) despacha el evento de cierre de sesión forzado global (Broadcast Channel lanza `'session-expired'`). Se cancelan todos los reintentos automáticos pendientes para mitigar bucles infinitos.
- **Estado:** ✅ Validado.

### 5. Con varias pestañas abiertas solo se ejecuta un refresh a la vez
- **Prueba:** Simulación simultánea de caducidad en tres pestañas activas interactuando a la vez.
- **Resultado:** Existe un Mutex/Bloqueo semafórico o intercepción cruzada. Cuando una pestaña detecta token expirado e inicia la solicitud de Refresh local, las demás pestañas quedan en estado *suspendido* aguardando el mensaje `sync`. Se evita la inundación y desincronización de llamadas a la base de datos (Race Condition mitigada).
- **Estado:** ✅ Validado.

### 6. Después de refresh fallido la app no entra en loop
- **Prueba:** Se anula deliberadamente la cookie de Refresh Token o se revoca.
- **Resultado:** Falla la solicitud. Se detecta el Error 401 en la ruta de comprobación y se lanza un único `window.location.href = '/auth/login'`. Al no poseer cookies válidas en esta ventana de login, el sistema no vuelve a consultar y el bucle muere instantáneamente.
- **Estado:** ✅ Validado.

---

## 🛠️ Notas Adicionales del Integrador / QA
Las implementaciones dependientes del estándar `BroadcastChannel` para notificaciones asíncronas entre pestañas han demostrado alta eficacia y nulo parpadeo (flickering). El enrutamiento de Next.js respeta los cambios de estado forzando descarte de caché limpiamente (el usuario pierde el Layout de Navbar logueado instatáneamente en las pestañas no enfocadas).
