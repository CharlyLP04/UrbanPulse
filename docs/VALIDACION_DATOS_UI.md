# Validación de Datos entre UI y Backend

## Objetivo
Este documento tiene como objetivo validar que los formularios y vistas de la interfaz de usuario (UI) del proyecto UrbanPulse soliciten únicamente datos que el backend puede procesar, validar y almacenar correctamente, asegurando coherencia entre la UI, la API y la base de datos.

---

## Alcance de la Validación
La validación se realiza desde una perspectiva técnica de backend y contempla:
- Correspondencia entre campos de la UI y el modelo de datos
- Identificación de campos obligatorios
- Definición de validaciones necesarias
- Mensajes de error que la API debe retornar al frontend

El análisis se basa en los wireframes del sistema y en las reglas definidas para el backend.

---

## Vistas Analizadas
Se revisaron las siguientes vistas del sistema:
- Crear Reporte
- Login / Registro
- Feed de Reportes

La vista **Crear Reporte** es el foco principal, ya que es donde se genera información crítica para el sistema.

---

## Validación de Campos: UI vs Backend

| Campo en la UI | Tipo de dato | Obligatorio | Soportado por Backend |
|---------------|-------------|-------------|------------------------|
| Título del reporte | Texto | Sí | Sí |
| Descripción | Texto largo | Sí | Sí |
| Categoría | Texto / Enum | Sí | Sí |
| Ubicación | Texto | Sí | Sí |
| Imagen | Archivo | No | Sí |

Observación:  
Todos los campos solicitados en la UI tienen correspondencia directa con el modelo de datos del backend. No se identifican campos innecesarios ni fuera del alcance del sistema.

---

## Validaciones Requeridas en el Backend
Para garantizar la integridad de la información recibida desde la UI, el backend debe aplicar las siguientes validaciones:

- Verificar que los campos obligatorios no estén vacíos
- Validar una longitud mínima en la descripción del reporte
- Validar que la categoría pertenezca a un conjunto permitido
- Validar tipo y tamaño del archivo de imagen (cuando exista)
- Rechazar solicitudes de usuarios no autenticados

Estas validaciones deben ejecutarse antes de persistir los datos en la base de datos.

---

## Mensajes de Error Definidos para la API

| Código HTTP | Escenario | Mensaje devuelto al Frontend |
|------------|----------|------------------------------|
| 400 | Campos obligatorios faltantes | "Existen campos obligatorios sin completar" |
| 401 | Usuario no autenticado | "Debes iniciar sesión para realizar esta acción" |
| 403 | Acción no permitida | "No tienes permisos para realizar esta acción" |
| 404 | Recurso no encontrado | "El recurso solicitado no existe" |
| 500 | Error interno del servidor | "Ocurrió un error inesperado. Intenta más tarde" |

Los mensajes están diseñados para ser claros y comprensibles, permitiendo al frontend mostrar retroalimentación adecuada al usuario.

---

## Conclusión
La validación entre la UI y el backend confirma que los wireframes actuales están alineados con el modelo de datos y las reglas del backend.  
Este análisis ayuda a prevenir errores de integración, reduce retrabajo y mejora la estabilidad general del sistema.
