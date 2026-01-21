<div align="center">🏙️ UrbanPulseAuditoría Ciudadana & Gestión Urbana"Transformando la queja individual en presión social colectiva."Explorar Docs 📄 • Reportar Bug 🐛 • Solicitar Feature ✨</div>🧐 ¿De qué trata?UrbanPulse resuelve la falta de trazabilidad en los reportes de fallas urbanas. A diferencia de los portales gubernamentales tradicionales, utilizamos un modelo de Red Social donde la ciudadanía vota y prioriza las incidencias, generando un mapa de calor de necesidades reales validado por la comunidad.📚 Documentación de Ingeniería (Fase R1)DocumentoDescripción📄 Definición del ProyectoVisión del producto, alcance del MVP y solución al problema.🗺️ Arquitectura de InformaciónDiagramas de flujo, sitemap y reglas de navegación.🔍 Investigación TécnicaBenchmarking de competencia y reglas de Accesibilidad (A11y).🛠️ Stack Tecnológico (PERN)Diseñado con arquitectura de microservicios contenerizados para máxima escalabilidad.<div align="center">FrontendBackendBase de DatosInfraestructuraVite + A11yExpress RESTPostgreSQL 15GitHub Actions</div>🚀 Instalación y Despliegue¡Olvídate de instalar dependencias locales! Este proyecto es Docker First.PrerrequisitosDocker Desktop (Corriendo)Git⚡ Quick StartClonar el repositoriogit clone [https://github.com/CharlyLP04/UrbanPulse.git](https://github.com/CharlyLP04/UrbanPulse.git)
cd UrbanPulse
Configurar Variablescp .env.example .env  # Crea el archivo de entorno
Levantar Infraestructuradocker compose up --build
Acceso🎨 Frontend: http://localhost:5173⚙️ Backend: http://localhost:3000📂 Estructura del Repositorio/UrbanPulse
├── .github/workflows   # 🤖 Automatización CI/CD
├── docs/               # 📘 Documentación y Entregables
├── src/
│   ├── backend/        # 🧠 API y Lógica de Negocio
│   └── frontend/       # 👁️ Interfaz de Usuario
├── docker-compose.yml  # 🐳 Orquestación
└── README.md
👥 Equipo de Desarrollo (Squad 3)RolMiembroResponsabilidad (R1)👑 Tech LeadCarlosArquitectura y Gestión de Repositorio🎨 FrontendKevinUX, Sitemap y Accesibilidad⚙️ BackendAlexisModelo de Datos y API REST🐳 DevOpsJarumiDockerización y CI/CD🔍 QABreyanPruebas y Validación Documental<div align="center"><sub>Desarrollado con ❤️ por el Equipo 3 para Ingeniería de Software - Enero 2026</sub></div>