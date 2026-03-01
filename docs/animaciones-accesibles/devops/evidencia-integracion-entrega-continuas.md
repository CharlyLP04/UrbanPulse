# Evidencia de Integración y Entrega Continuas (CI/CD)

## Pipeline de Integración (GitHub Actions)

El workflow de CI/CD (`.github/workflows/ci-cd.yml`) ha sido actualizado para asegurar la calidad y consistencia del código antes de integrarse a la rama principal.

### Mejoras Implementadas:
1. **Validación de Tipos (type-check)**: Se agregó el comando `npm run type-check` para aprovechar el tipado estricto de TypeScript en el Frontend sin necesidad de generar una compilación completa y lenta, atrapando errores de tipo de forma temprana.
2. **Pruebas Unitarias Obligatorias**: Se removió la bandera `continue-on-error: true` del paso de pruebas unitarias (`npm run test:ci`). Ahora el pipeline fallará de inmediato si algún test no pasa.
3. **Reportes de Cobertura (Coverage Artifacts)**: Todo el resultado generado por Jest (cobertura) en el CI es ahora recolectado usando la acción `actions/upload-artifact@v4`. Esto permite descargar y auditar los reportes desde la interfaz de GitHub Actions ante cualquier eventualidad.
4. **Validación de Orquestación (Docker Compose)**: Se aseguró la integridad del entorno de contenedores validando la configuración de `docker-compose.yml` (`docker compose config`) eliminando el permiso de fallo silencioso.

## Protección de Rama Principal e Integración Obligatoria

Para complementar las métricas de calidad impuestas en el pipeline, a nivel de repositorio se habilitaron las reglas de protección de la rama `main`:
- Opciones activadas: **Require status checks to pass before merging**
- Al activar esta regla en la configuración del repositorio, ningún `Pull Request` podrá ser fusionado sin que las políticas detalladas en el paso anterior (_Linter, Type-Check, Tests y Build_) retornen un estatus verde (aprobadas exitosamente). Esto previene que errores de compilación, de tipado, de testeo o la infraestructura Docker afecten al ambiente de producción.

Todas estas prácticas se apoyan en los principios principales de **DevOps** enfocados en la cultura de automatizar la calidad y construir aplicaciones altamente confiables.
