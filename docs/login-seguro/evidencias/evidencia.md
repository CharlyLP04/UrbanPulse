# Evidencia Funcional: Integración de Login Seguro

Este archivo recopila las evidencias en foto/video que demuestran que las integraciones del `auth-provider` y `api.ts` satisfacen las reglas de convivencia multisesión de UrbanPulse.

### 1. Evidencia: Login Simultáneo
- **Criterio:** Video o capturas que demuestren login en dos pestañas simultáneas.
- **Ubicación Física de Evidencia:** `(Pendiente Adjuntar Video/Screenshots - Recomendado: /login-simultaneo.mp4)`
- **Descripción:** Muestra la pestaña A y la pestaña B. Tras presionar 'Entrar' en la pestaña A, la Pestaña B recarga el contexto automáticamente y muestra el dashboard gracias al `BroadcastChannel(sync)`.

### 2. Evidencia: Logout Multisesión
- **Criterio:** Evidencia de que el logout cierra la sesión en todas las pestañas activas.
- **Ubicación Física de Evidencia:** `(Pendiente Adjuntar Video/Screenshots - Recomendado: /logout-sync.mp4)`
- **Descripción:** Muestra dos pestañas en el dashboard de la aplicación. Al hacer click en *Cerrar Sesión* en una de ellas, la otra recibe el evento `logout` y envía la sesión hacia null, redirigiendo a la ruta `/auth/login`.

### 3. Evidencia: Concurrencia de Expiración sin Loops
- **Criterio:** Evidencia de que no hay refresh simultáneo ni loops al expirar el token.
- **Ubicación Física de Evidencia:** `(Pendiente Adjuntar Video/Screenshots - Recomendado: /refresh-locks.mp4)`
- **Descripción:** Muestra la Consola del Navegador de red (Network Tab). Demuestra que ante 3 peticiones automáticas recibiendo Error 401 estando el token expirado, y en dos pestañas diferentes, **solo existe un** "Fetch POST /api/auth/refresh", y ante fallo, la redirección es de exactamente 1 ejecución sin generar ciclos iterativos de refresco en consola.
