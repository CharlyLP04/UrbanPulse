<div align="center">

# 🏗️ Infraestructura y Despliegue (Infra)

</div>

Configuraciones de bajo nivel, scripts de aprovisionamiento y recursos para la orquestación de contenedores y servicios en la nube.

## ⚠️ Reglas de Infraestructura

### 1. Inmutabilidad
*   La infraestructura se define como código (IaC). **Nunca** realizar cambios manuales en servidores de producción ("ClickOps").
*   Cualquier cambio de configuración debe estar versionado en este repositorio.

### 2. Entornos
*   **Dev**: Entorno local (Docker Compose). Debe ser idéntico a producción en versiones de software.
*   **Prod**: Entorno de despliegue final.
*   Las variables de entorno (`.env`) deben estar estrictamente segregadas. **Nunca commitear credenciales de producción**.

### 3. Recuperación ante Desastres
*   Todo script de base de datos aquí alojado debe ser capaz de restaurar el estado del sistema desde cero.
*   Mantener backups de los volúmenes de Docker definidos.
