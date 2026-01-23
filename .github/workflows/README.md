<div align="center">

[⬅️ Volver al README Principal](../README.md)

# 🤖 Automatización y CI/CD (.github)

</div>

Esta carpeta contiene la configuración de los flujos de trabajo de GitHub Actions para la Integración Continua (CI) y Entrega Continua (CD).

## 📜 Reglas de Automatización (Estricto Cumplimiento)

### 1. Convención de Commits
Todos los commits deben seguir la especificación [Conventional Commits](https://www.conventionalcommits.org/):
*   `feat:` para nuevas características
*   `fix:` para corrección de errores
*   `docs:` para documentación
*   `chore:` para tareas de mantenimiento

### 2. Workflows Activos
*   **Pull Request Check**: Cada PR a `main` o `develop` dispara automáticamente tests unitarios y linter.
*   **Build Verification**: No se permite merge si el build de Docker falla.

### 3. Gestión de Secretos
*   ⛔ **PROHIBIDO** subir `.env` o credenciales hardcodeadas en los workflows.
*   Utilizar **GitHub Secrets** para todas las variables de entorno sensibles (ej. `DATABASE_URL`, `JWT_SECRET`).

### 4. Estructura de Archivos
*   `/workflows`: Definiciones YAML de los pipelines.
*   `/ISSUE_TEMPLATE`: Plantillas estandarizadas para reportar bugs y solicitar features. **Su uso es obligatorio para crear tickets.**
