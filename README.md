<div align="center">

# 🏙️ UrbanPulse
### Auditoría Ciudadana & Gestión Urbana

_"Transformando la queja individual en presión social colectiva."_

[Explorar Docs 📄](#) • [Reportar Bug 🐛](#) • [Solicitar Feature ✨](#)

</div>

---

## 🧐 ¿De qué trata?

**UrbanPulse** resuelve la falta de trazabilidad en los reportes de fallas urbanas. A diferencia de los portales gubernamentales tradicionales, utilizamos un modelo de **Red Social** donde la ciudadanía vota y prioriza las incidencias, generando un mapa de calor de necesidades reales validado por la comunidad.

## 📚 Documentación de Ingeniería (Fase R1)

| Documento | Descripción |
| :--- | :--- |
| **📄 Definición del Proyecto** | Visión del producto, alcance del MVP y solución al problema. |
| **🗺️ Arquitectura de Información** | Diagramas de flujo, sitemap y reglas de navegación. |
| **🔍 Investigación Técnica** | Benchmarking de competencia y reglas de Accesibilidad (A11y). |

## 🛠️ Stack Tecnológico (PERN)

Diseñado con arquitectura de microservicios contenerizados para máxima escalabilidad.

<div align="center">

| Frontend | Backend | Base de Datos | Infraestructura |
| :---: | :---: | :---: | :---: |
| **Vite (React)** | **Node.js + Express** | **PostgreSQL 15** | **GitHub Actions** |

</div>
</div>

## 🚀 Instalación y Despliegue

¡Olvídate de instalar dependencias locales! Este proyecto es **Docker First**.

### Prerrequisitos
* Docker Desktop (Corriendo)
* Git

### ⚡ Quick Start

1. **Clonar el repositorio**
   ```bash
   git clone [https://github.com/CharlyLP04/UrbanPulse.git](https://github.com/CharlyLP04/UrbanPulse.git)
   cd UrbanPulse

 2. Configurar VariablesBashcp .env.example .env  # Crea el archivo de entorno
     ```
      cp .env.example .env  # Crea el archivo de entorno
     
 Levantar Infraestructura
   `
     docker compose up --build `
     
### Acceso
* 🎨 **Frontend:** http://localhost:5173
* ⚙️ **Backend:** http://localhost:3000

## 📂 Estructura del Repositorio

```text
/UrbanPulse
├── .github/workflows   # 🤖 Automatización CI/CD
├── docs/               # 📘 Documentación y Entregables
├── src/
│   ├── backend/        # 🧠 API y Lógica de Negocio
│   └── frontend/       # 👁️ Interfaz de Usuario
├── docker-compose.yml  # 🐳 Orquestación
└── README.md
```
👥 Equipo de Desarrollo (Squad 3)
👑 Tech Lead,Carlos,Arquitectura y Gestión de Repositorio
🎨 Frontend,Kevin,"UX, Sitemap y Accesibilidad"
⚙️ Backend,Alexis,Modelo de Datos y API REST
🐳 DevOps,Jarumi,Dockerización y CI/CD
🔍 QA,Breyan,Pruebas y Validación Documental
<div align="center"> <sub>Desarrollado con ❤️ por el Equipo 3 para Ingeniería de Software - Enero 2026</sub> </div>

