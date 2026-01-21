🏙️ UrbanPulsePlataforma de Auditoría Ciudadana. > Transformamos la queja individual en presión social colectiva mediante validación comunitaria.📑 Documentación OficialAntes de ver el código, revisa los documentos de ingeniería de la Fase R1:📄 Definición del Proyecto (Visión, Alcance y Problema)🗺️ Arquitectura de Información (Sitemap y Flujos)🔍 Investigación Técnica (Benchmarking y A11y)🛠️ Stack Tecnológico (PERN)El proyecto utiliza una arquitectura de microservicios contenerizados.Frontend: React + Vite (Accesibilidad prioritaria)Backend: Node.js + ExpressBase de Datos: PostgreSQL 15Infraestructura: Docker + GitHub Actions🚀 Instalación y EjecuciónEste proyecto está diseñado para funcionar inmediatamente con Docker. No necesitas instalar Node.js ni PostgreSQL en tu máquina local.PrerrequisitosDocker Desktop (Instalado y corriendo)GitPasos RápidosClonar el repositoriogit clone [https://github.com/CharlyLP04/UrbanPulse.git](https://github.com/CharlyLP04/UrbanPulse.git)
cd UrbanPulse
Configurar entornoCrea un archivo .env en la raíz copiando el ejemplo:# En Windows (PowerShell)
copy .env.example .env
# En Mac/Linux
cp .env.example .env
Levantar el sistemadocker compose up --build
¡Listo! Accede a la aplicación:Frontend: http://localhost:5173Backend API: http://localhost:3000Base de Datos: localhost:5432📂 Estructura del Proyecto/urban-pulse
├── .github/          # Pipelines de CI/CD
├── docs/             # Documentación técnica y entregables
├── src/
│   ├── backend/      # API y Lógica de Negocio
│   └── frontend/     # Interfaz de Usuario (React)
├── docker-compose.yml
└── README.md
👥 Equipo de Desarrollo (Fase R1)RolMiembroResponsabilidadTech LeadCarlosArquitectura y Gestión de RepoFrontendKevinUX, Sitemap y A11yBackendAlexisBase de Datos y APIDevOpsJarumiDocker y CI/CDQABreyanPruebas y DocumentaciónDesarrollado para la materia de Ingeniería de Software - Enero 2026