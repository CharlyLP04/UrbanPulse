# Evidencia DevOps – Setup de Testing y Docker

## Rol
DevOps / CI-CD

## Objetivo
Configurar y validar el entorno de testing del frontend, así como verificar la
ejecución del entorno Docker definido en el proyecto.

## Actividades realizadas

### Testing en Frontend
- Instalación de dependencias de testing:
  - Jest
  - Testing Library
  - jest-dom
- Revisión y configuración del archivo `jest.config.js`
- Uso de entorno `jsdom` para pruebas de componentes

### Validación de Docker
- Ejecución de `docker-compose down`
- Ejecución de `docker-compose up --build`
- Revisión de logs del servicio frontend

## Resultados
- El entorno de testing quedó correctamente configurado en el frontend.
- Docker levanta los servicios, pero se detectó un error en el build del backend
  relacionado con la estructura del proyecto (`package.json` no encontrado).
- El hallazgo fue comunicado al TL para su corrección.

## Conclusión
La configuración y validación permiten asegurar que el proyecto cuenta con una
base para pruebas automatizadas y un entorno Docker funcional.
