# 📖 Glosario Técnico - UrbanPulse

Este documento define la terminología estándar utilizada por el equipo de desarrollo para asegurar una comunicación clara y precisa.

## 🏗️ Infraestructura y Herramientas (INFRA)

| Término | Definición | Contexto en UrbanPulse |
| :--- | :--- | :--- |
| **Infra (Infraestructura)** | El conjunto de hardware, redes y software base necesario para que la aplicación funcione. No es la aplicación en sí, sino "donde vive". | Archivos Docker, servidores, base de datos y configuraciones de nube. |
| **Docker** | Plataforma que permite empaquetar la aplicación y sus dependencias en un "contenedor" ligero. | Garantiza que el proyecto funcione igual en la laptop de Windows de un dev y en el servidor Linux de producción. |
| **Container (Contenedor)** | Una unidad de software estándar que empaqueta el código y todas sus dependencias. | Usamos contenedores para el Frontend y el Backend por separado. |
| **CI/CD** | **Continuous Integration / Continuous Deployment**. Práctica de automatizar la integración de cambios de código y su despliegue. | Usamos **GitHub Actions** para correr pruebas automáticamente cada vez que alguien sube código. |
| **Pipeline** | La secuencia de pasos automatizados que ejecuta el sistema de CI/CD (ej: Bajar código -> Testear -> Construir). | Nuestro pipeline verifica que no haya errores de sintaxis antes de aceptar un Pull Request. |

## 🔄 Gestión del Proyecto (Agile / GitHub)

| Término | Definición |
| :--- | :--- |
| **Backlog** | Lista priorizada de todas las tareas, funcionalidades y correcciones que se deben realizar en el futuro. |
| **Sprint / Rotación** | Ciclo de trabajo con un tiempo definido (en nuestro caso, definido por las fechas de rotación de roles). |
| **To Do** | Tareas seleccionadas del Backlog que el equipo se compromete a completar en el ciclo actual. |
| **WIP (Work In Progress)** | Tareas que están siendo trabajadas activamente. Se debe limitar el WIP para evitar cuellos de botella. |
| **Blocker** | Cualquier impedimento que detenga el progreso de una tarea (ej. falta de accesos, dudas técnicas). |
| **Definition of Done (DoD)** | Criterios que una tarea debe cumplir para considerarse finalizada (ej. Código revisado + Tests pasados). |
| **Power-Up** | Funcionalidad extra en Trello. Usamos el **GitHub Power-Up** para vincular tarjetas con ramas de código. |

## 💻 Desarrollo y Git

| Término | Definición |
| :--- | :--- |
| **Repo (Repositorio)** | Almacenamiento central de los archivos del proyecto (GitHub). |
| **Branch (Rama)** | Línea de desarrollo independiente. `main` es la rama productiva; `feature/*` son ramas de trabajo. |
| **PR (Pull Request)** | Petición para fusionar cambios de una rama a otra. Es el momento clave para la revisión de código (Code Review). |
| **Merge** | Acción de integrar los cambios de un PR en la rama destino. |
| **Commit Semántico** | Estándar de mensajes de confirmación (ej. `feat:`, `fix:`, `docs:`) para mantener un historial limpio. |
| **Linter** | Herramienta que analiza el código estáticamente para buscar errores de programación, bugs o problemas de estilo. |
| **Hot-reload** | Característica del entorno de desarrollo que actualiza la aplicación en tiempo real al guardar cambios en el código. |

## 👥 Roles del Equipo

* **TL (Tech Lead):** Responsable de la arquitectura, estándares y decisiones técnicas.
* **FE (Frontend Engineer):** Responsable de la interfaz de usuario (UI) y experiencia (UX).
* **BE (Backend Engineer):** Responsable de la lógica de servidor, APIs y base de datos.
* **DO (DevOps):** Responsable de la infraestructura, Docker y pipelines CI/CD.
* **QA (Quality Assurance):** Responsable de asegurar la calidad y el cumplimiento de requisitos.