# Matriz de Escenarios de Prueba - Autenticación y Autorización

**Proyecto:** UrbanPulse  
**Fecha:** 2026-03-10  
**Responsable:** QA Team  
**Versión:** 1.0

---

## Resumen

| Tipo | Cantidad |
|------|----------|
| Escenarios Positivos | 7 |
| Escenarios Negativos | 8 |
| **Total** | **15** |

---

## 1. Escenarios Positivos

| ID | Escenario | Precondición | Pasos | Resultado Esperado |
|----|-----------|--------------|-------|-------------------|
| POS-001 | Registro exitoso de usuario | Ninguna | 1. Ir a página de registro 2. Ingresar email válido 3. Ingresar contraseña válida 4. Confirmar contraseña 5. Click en "Registrarse" | Usuario creado, redirección a login, mensaje de éxito |
| POS-002 | Login exitoso con credenciales válidas | Usuario registrado | 1. Ir a página de login 2. Ingresar email registrado 3. Ingresar contraseña correcta 4. Click en "Iniciar Sesión" | Redirección a dashboard, cookie de sesión creada, token JWT generado |
| POS-003 | Acceso a ruta pública con usuario autenticado | Usuario logueado | 1. Estar autenticado 2. Navegar a página pública (/public/explore) | Acceso permitido, contenido visible |
| POS-004 | USER crea reporte exitosamente | Usuario con rol USER autenticado | 1. Estar logueado como USER 2. Navegar a /dashboard/create-report 3. Llenar formulario 4. Click en "Enviar" | Reporte creado, mensaje de éxito, redirección |
| POS-005 | ADMIN accede a dashboard administrativo | Usuario con rol ADMIN autenticado | 1. Estar logueado como ADMIN 2. Navegar a /admin/dashboard | Acceso permitido, panel de administración visible |
| POS-006 | Cierre de sesión exitoso | Usuario autenticado | 1. Estar logueado 2. Click en "Cerrar Sesión" | Sesión invalidada, redirección a página principal, cookies eliminadas |
| POS-007 | TOKEN válido permite acceso a ruta protegida | TOKEN JWT válido | 1.Tener token JWT válido 2. Realizar request a ruta protegida con header Authorization | Request exitoso, datos devueltos |

---

## 2. Escenarios Negativos

| ID | Escenario | Precondición | Pasos | Resultado Esperado |
|----|-----------|--------------|-------|-------------------|
| NEG-001 | Login con email incorrecto | Usuario no existe | 1. Ir a página de login 2. Ingresar email no registrado 3. Ingresar cualquier contraseña 4. Click en "Iniciar Sesión" | Mensaje de error genérico "Email o contraseña incorrectos" |
| NEG-002 | Login con contraseña incorrecta | Usuario registrado | 1. Ir a página de login 2. Ingresar email registrado 3. Ingresar contraseña incorrecta 4. Click en "Iniciar Sesión" | Mensaje de error genérico "Email o contraseña incorrectos" |
| NEG-003 | Acceso a ruta protegida sin token | Ninguna | 1. Sin estar autenticado 2. Intentar acceder a /dashboard/home | Redirección a /auth/login, mensaje de "Debes iniciar sesión" |
| NEG-004 | Acceso a ruta de ADMIN con rol USER | Usuario con rol USER | 1. Estar logueado como USER 2. Intentar acceder a /admin/dashboard | Error 403 Forbidden, mensaje "No tienes permisos" |
| NEG-005 | TOKEN expirado | TOKEN JWT expirado | 1. Usar token JWT expirado 2. Realizar request a ruta protegida | Error 401 Unauthorized, mensaje "Token expirado" |
| NEG-006 | TOKEN manipulado | Token modificado | 1. Modificar contenido del token JWT 2. Realizar request a ruta protegida | Error 401 Unauthorized, mensaje "Token no válido" |
| NEG-007 | Registro con email ya existente | Email registrado | 1. Ir a página de registro 2. Ingresar email ya registrado 3. Ingresar contraseña válida 4. Click en "Registrarse" | Mensaje de error "El email ya está registrado" |
| NEG-008 | Registro con contraseña débil | Ninguna | 1. Ir a página de registro 2. Ingresar email válido 3. Ingresar contraseña "123" 4. Click en "Registrarse" | Mensaje de error indicando requisitos de contraseña |

---

## 3. Escenarios de Restricción por Rol

| ID | Escenario | Precondición | Pasos | Resultado Esperado |
|----|-----------|--------------|-------|-------------------|
| ROL-001 | USER intenta editar reporte de otro | Usuario USER autenticado, reporte de otro usuario | 1. Estar logueado como USER 2. Intentar editar reporte de otro usuario | Error 403 Forbidden |
| ROL-002 | USER intenta eliminar reporte | Usuario USER autenticado | 1. Estar logueado como USER 2. Intentar eliminar cualquier reporte | Error 403 Forbidden |
| ROL-003 | USER intenta eliminar comentario de otro | Usuario USER autenticado | 1. Estar logueado como USER 2. Intentar eliminar comentario de otro usuario | Error 403 Forbidden |
| ROL-004 | ADMIN elimina cualquier reporte | Usuario ADMIN autenticado | 1. Estar logueado como ADMIN 2. Solicitar eliminación de cualquier reporte | Reporte eliminado exitosamente |

---

## 4. Escenarios de Manejo de Errores

| ID | Escenario | Precondición | Pasos | Resultado Esperado |
|----|-----------|--------------|-------|-------------------|
| ERR-001 | Error de servidor (500) | Backend con error | 1. Realizar request que cause error interno | Mensaje "Error interno del servidor" sin detalles técnicos |
| ERR-002 | Recurso no encontrado (404) | Recurso inexistente | 1. Solicitar recurso que no existe | Mensaje "Recurso no encontrado" |
| ERR-003 | Rate limiting excedido | Muchas solicitudes | 1. Realizar más de X requests en poco tiempo | Mensaje "Demasiadas solicitudes, intenta más tarde" |

---

## 5. Matriz Resumen

| Módulo | Positivos | Negativos | Total |
|--------|-----------|-----------|-------|
| Autenticación (Login/Registro) | 2 | 4 | 6 |
| Autorización (Rutas protegidas) | 2 | 3 | 5 |
| Roles y Permisos | 2 | 2 | 4 |
| Manejo de Errores | 1 | 1 | 2 |
| **Total** | **7** | **10** | **17** |

---

## 6. Criterios de Priorización

| Prioridad | Descripción | Escenarios |
|-----------|-------------|------------|
| Alta | Afectan seguridad directly | POS-002, POS-003, POS-004, POS-005, NEG-001, NEG-002, NEG-003, NEG-004, NEG-005, NEG-006, ROL-001, ROL-002 |
| Media | Afectan funcionalidad core | POS-001, POS-006, POS-007, NEG-007, NEG-008, ROL-003, ROL-004, ERR-001, ERR-002 |
| Baja | Mejora de UX | ERR-003 |

---

## Historial de Versiones

| Versión | Fecha | Cambios | Autor |
|---------|-------|---------|-------|
| 1.0 | 2026-03-10 | Creación inicial | QA Team |
