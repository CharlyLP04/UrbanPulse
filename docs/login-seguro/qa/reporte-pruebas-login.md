# Reporte de Pruebas de Seguridad y Rol - Login

**Proyecto:** UrbanPulse  
**Fecha:** 2026-03-17  
**Tester:**   
**Versión:** 1.0

---

## 1. Resumen Ejecutivo

| Métrica | Valor |
|---------|-------|
| Total de pruebas ejecutadas | 12 |
| Pruebas pasadas | |
| Pruebas fallidas | |
| Defectos encontrados | |

---

## 2. Pruebas de Seguridad

### 2.1 Credenciales Inválidas

| ID | Escenario | Pasos | Resultado Esperado | Resultado Real | Pass | Fail |
|----|-----------|-------|-------------------|----------------|------|------|
| SEC-001 | Login con email no registrado | 1. Ir a /auth/login 2. Ingresar email no existente 3. Ingrerir cualquier contraseña 4. Click en Iniciar Sesión | Mensaje: "Email o contraseña incorrectos" | | ☐ | ☐ |
| SEC-002 | Login con email válido pero contraseña incorrecta | 1. Ir a /auth/login 2. Ingresar email registrado 3. Ingrerir contraseña incorrecta 4. Click en Iniciar Sesión | Mensaje: "Email o contraseña incorrectos" (mismo que SEC-001) | | ☐ | ☐ |
| SEC-003 | Verificar que no se revela si el email existe | Comparar mensajes de SEC-001 y SEC-002 | Ambos mensajes deben ser idénticos | | ☐ | ☐ |
| SEC-004 | Login con email en formato inválido | 1. Ir a /auth/login 2. Ingresar "emailinvalido" 3. Ingrerir cualquier contraseña 4. Click en Iniciar Sesión | Error de validación de formato | | ☐ | ☐ |
| SEC-005 | SQL Injection en campo email | 1. Ir a /auth/login 2. Ingresar "' OR '1'='1" 3. Ingrerir cualquier contraseña 4. Click en Iniciar Sesión | Error de validación, no acceso | | ☐ | ☐ |
| SEC-006 | XSS en campo email | 1. Ir a /auth/login 2. Ingresar "<script>alert('xss')</script>" 3. Ingrerir cualquier contraseña 4. Click en Iniciar Sesión | Input sanitizado, no ejecutado | | ☐ | ☐ |

### 2.2 Manejo de Sesión

| ID | Escenario | Pasos | Resultado Esperado | Resultado Real | Pass | Fail |
|----|-----------|-------|-------------------|----------------|------|------|
| SES-001 | Sesión guardada tras login exitoso | 1. Login con credenciales válidas 2. Verificar localStorage/cookies | Token o sesión guardada | | ☐ | ☐ |
| SES-002 | Sesión expirada redirige a login | 1. Simular sesión expirada 2. Intentar acceder a ruta protegida | Redirección a /auth/login | | ☐ | ☐ |
| SES-003 | Cerrar sesión limpia estado | 1. Estar logueado 2. Click en Cerrar Sesión 3. Verificar localStorage/cookies | Sesión eliminada | | ☐ | ☐ |
| SES-004 | Botón "Recordarme" funciona | 1. Marcar "Recordarme" 2. Login 3. Cerrar navegador 4. Abrir aplicación | Sesión persistida | | ☐ | ☐ |

---

## 3. Pruebas de Control de Roles

### 3.1 Acceso por Rol USER

| ID | Escenario | Pasos | Resultado Esperado | Resultado Real | Pass | Fail |
|----|-----------|-------|-------------------|----------------|------|------|
| ROL-001 | USER accede a dashboard | 1. Login como USER 2. Ir a /dashboard/home | Acceso permitido | | ☐ | ☐ |
| ROL-002 | USER accede a /public/explore | 1. Login como USER 2. Ir a /public/explore | Acceso permitido | | ☐ | ☐ |
| ROL-003 | USER NO accede a /admin/dashboard | 1. Login como USER 2. Ir a /admin/dashboard | Error 403 o redirección | | ☐ | ☐ |
| ROL-004 | USER NO accede a /admin/moderation | 1. Login como USER 2. Ir a /admin/moderation | Error 403 o redirección | | ☐ | ☐ |

### 3.2 Acceso por Rol ADMIN

| ID | Escenario | Pasos | Resultado Esperado | Resultado Real | Pass | Fail |
|----|-----------|-------|-------------------|----------------|------|------|
| ROL-005 | ADMIN accede a dashboard | 1. Login como ADMIN 2. Ir a /dashboard/home | Acceso permitido | | ☐ | ☐ |
| ROL-006 | ADMIN accede a /admin/dashboard | 1. Login como ADMIN 2. Ir a /admin/dashboard | Acceso permitido | | ☐ | ☐ |
| ROL-007 | ADMIN accede a /admin/moderation | 1. Login como ADMIN 2. Ir a /admin/moderation | Acceso permitido | | ☐ | ☐ |
| ROL-008 | ADMIN puede crear reportes | 1. Login como ADMIN 2. Ir a /dashboard/create-report | Acceso permitido | | ☐ | ☐ |

---

## 4. Pruebas de Validación de Entrada

| ID | Escenario | Pasos | Resultado Esperado | Resultado Real | Pass | Fail |
|----|-----------|-------|-------------------|----------------|------|------|
| VAL-001 | Email vacío | 1. Dejar email vacío 2. Enviar formulario | Error: "El email es requerido" | | ☐ | ☐ |
| VAL-002 | Contraseña vacía | 1. Ingresar email válido 2. Dejar contraseña vacía 3. Enviar | Error: "La contraseña es requerida" | | ☐ | ☐ |
| VAL-003 | Email sin formato válido | 1. Ingresar "notemail" 2. Enviar | Error: "Ingrese un email válido" | | ☐ | ☐ |
| VAL-004 | Contraseña muy corta | 1. Ingresar email válido 2. Ingresar "123" 3. Enviar | Error de requisitos mínimos | | ☐ | ☐ |

---

## 5. Defectos Encontrados

### Defecto #1

| Campo | Detalle |
|-------|---------|
| ID | |
| Título | |
| Severidad | ☐ Alta ☐ Media ☐ Baja |
| Pasos para reproducir | |
| Resultado esperado | |
| Resultado actual | |
| Evidencia | |

*(Agregar más defectos según sea necesario)*

---

## 6. Evidencias Adjuntas

| Archivo | Descripción | Fecha |
|---------|-------------|-------|
| | | |
| | | |

---

## 7. Conclusión

| Aspecto | Estado |
|---------|--------|
| Credenciales inválidas no revelan datos | ☐ Aprobado ☐ Reprobado |
| Sesión expirada redirige correctamente | ☐ Aprobado ☐ Reprobado |
| Rol insuficiente bloquea acceso | ☐ Aprobado ☐ Reprobado |
| Validación de entrada funciona | ☐ Aprobado ☐ Reprobado |

**Estado general:** ☐ Aprobado ☐ Aprobado con observaciones ☐ Reprobado

---

## Firmas

| Rol | Nombre | Fecha | Firma |
|-----|--------|-------|-------|
| QA Tester | | | |
| Lead Developer | | | |

---

## Historial de Versiones

| Versión | Fecha | Cambios | Autor |
|---------|-------|---------|-------|
| 1.0 | 2026-03-17 | Creación inicial del reporte | QA Team |
