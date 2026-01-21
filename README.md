🏙️ UrbanPulse

Plataforma de Auditoría Ciudadana y Gestión Urbana > Transformando la queja individual en presión social colectiva mediante validación comunitaria.

📋 Tabla de Contenidos

Visión del Proyecto

Stack Tecnológico

Arquitectura

Instalación y Ejecución

Estructura del Proyecto

Workflow de Desarrollo

Equipo (Fase R1)

🔭 Visión del Proyecto

UrbanPulse resuelve la falta de trazabilidad en los reportes de fallas urbanas (baches, alumbrado, fugas). A diferencia de los portales gubernamentales tradicionales, utilizamos un modelo de Red Social donde la ciudadanía vota y prioriza las incidencias, generando un mapa de calor de necesidades reales validado por la comunidad.

📄 Documentación Detallada:

Definición del Proyecto y Alcance

Investigación y Fundamentos

Sitemap y Arquitectura de Navegación

💻 Stack Tecnológico

Este proyecto utiliza una arquitectura moderna basada en microservicios contenerizados.

Capa

Tecnología

Descripción

Frontend



SPA reactiva, optimizada para accesibilidad (A11y).

Backend



API RESTful escalable y segura.

Base de Datos



Persistencia relacional con integridad referencial.

Infraestructura



Orquestación de contenedores para desarrollo y producción.

🏗 Arquitectura

El sistema se compone de tres contenedores orquestados:

urbanpulse_db: Base de datos PostgreSQL persistente (Volumen dockerizado).

urbanpulse_backend: API Node.js que expone endpoints REST en puerto 3000.

urbanpulse_frontend: Servidor de desarrollo Vite expuesto en puerto 5173.

🚀 Instalación y Ejecución

Prerrequisitos

Docker Desktop (Running)

Git

Pasos para iniciar (Dev Mode)

Clonar el repositorio:

git clone [https://github.com/CharlyLP04/UrbanPulse.git](https://github.com/CharlyLP04/UrbanPulse.git)
cd UrbanPulse


Configurar Variables de Entorno:
Crea un archivo .env en la raíz (puedes copiar el ejemplo):

cp .env.example .env


Levantar Infraestructura:
Gracias a Docker, no necesitas instalar Node o Postgres localmente. Solo ejecuta:

docker compose up --build


Acceso:

Frontend: http://localhost:5173

Backend API: http://localhost:3000

Base de Datos: localhost:5432

📂 Estructura del Proyecto

/urban-pulse
├── .github/workflows   # Pipelines de CI/CD (GitHub Actions)
├── docs/               # Documentación técnica (PDFs, Diagramas)
├── src/
│   ├── backend/        # API Node.js + Dockerfile
│   └── frontend/       # React App + Dockerfile
├── .gitignore          # Exclusiones de Git
├── docker-compose.yml  # Orquestación de servicios
└── README.md           # Este archivo


🤝 Workflow de Desarrollo

Para mantener la calidad del código, el equipo sigue estrictamente Git Flow:

Rama main protegida: Nadie hace push directo.

Feature Branches: Para cada tarea, crea una rama:

feat/nombre-tarea (Nuevas funciones)

fix/nombre-bug (Correcciones)

docs/nombre-doc (Documentación)

Pull Requests: Todo cambio requiere PR y aprobación de Tech Lead o QA.

Commits Semánticos: Usar prefijos estándar (feat:, fix:, chore:).

👥 Equipo (Fase R1)

Rol

Miembro

Responsabilidad Principal R1

Tech Lead (TL)

Carlos

Arquitectura, Stack y Gestión del Repositorio.

Frontend (FE)

Kevin

UX, Sitemap y Estructura base Accesible.

Backend (BE)

Alexis

Diseño de BD y Configuración de API.

DevOps (DO)

Jarumi

Dockerización y Pipeline CI/CD.

Quality (QA)

Breyan

Plan de Pruebas y Validación Documental.

UrbanPulse - Proyecto Académico con Estándares de Industria.

Enero 2026