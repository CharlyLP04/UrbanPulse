# AGENTS.md - Guía para Agentes de Código

## 📋 Descripción del Proyecto
**Sistema de Gestión de Servicios Municipales (SGSM)** - Plataforma web para reportar y seguir incidencias de servicios públicos (baches, alumbrado, fugas de agua).

**Estado actual:** Frontend Next.js con tests de accesibilidad configurados, backend por implementar, base de datos PostgreSQL lista en Docker.

## 🏗️ Stack Tecnológico
- **Frontend:** Next.js 14+ con TypeScript, App Router
- **Backend:** Node.js/Express (por implementar)  
- **Base de Datos:** PostgreSQL 15 en Docker
- **Contenedorización:** Docker Compose
- **CI/CD:** GitHub Actions (Node.js 20)

## 🚀 Comandos Esenciales

### Desarrollo
```bash
# Iniciar todos los servicios
docker-compose up -d

# Detener servicios
docker-compose down

# Reconstruir y levantar
docker-compose up --build

# Ver logs de servicio específico
docker-compose logs -f frontend
docker-compose logs -f db

# Verificar configuración
docker-compose config
```

### Base de Datos
```bash
# Conectar a PostgreSQL
docker-compose exec db psql -U admin_municipio -d reportes_db

# Ejecutar script SQL
docker-compose exec -T db psql -U admin_municipio -d reportes_db < script.sql

# Listar tablas
docker-compose exec db psql -U admin_municipio -d reportes_db -c "\dt"
```

### Frontend (desde /frontend)
```bash
# Desarrollo
npm run dev

# Build para producción  
npm run build
npm start

# Linting
npm run lint
npm run lint:fix

# Testing (Jest + Testing Library configurado)
npm test                           # Todos los tests
npm test Navbar.test.tsx          # Test específico
npm run test:watch                # Modo watch
npm run test:coverage             # Coverage report
npm run test:ci                   # Tests para CI/CD
```

### Backend (cuando se implemente)
```bash
# Desarrollo (planned)
npm run dev

# Tests (planned)
npm test
npm run test:integration
```

## 📁 Estructura del Proyecto

```
UrbanPulse/
├── backend/           # API Node.js/Express (vacío actualmente)
├── frontend/          # Next.js App Router (vacío actualmente)
├── infra/             # Configuración de infraestructura (vacío)
├── .github/workflows/ # CI/CD pipeline
├── docker-compose.yml # Configuración de servicios
└── README.md          # Documentación del proyecto
```

### Estructura Frontend Planeada (Next.js App Router)
```
frontend/
├── app/
│   ├── admin/         # Rutas administrativas
│   │   ├── dashboard/page.tsx
│   │   └── moderation/page.tsx
│   ├── auth/          # Autenticación
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── dashboard/     # Panel de usuario
│   │   ├── create-report/page.tsx
│   │   ├── home/page.tsx
│   │   └── profile/page.tsx
│   ├── public/        # Páginas públicas
│   │   └── explore/page.tsx
│   └── page.tsx       # Página principal
```

## 🎨 Guías de Estilo y Convenciones

### General
- **Idioma:** Español para comentarios y mensajes de usuario
- **Encoding:** UTF-8
- **Fin de línea:** LF (Unix style)

### TypeScript/JavaScript
- **Tipado:** TypeScript estricto para todo el código nuevo
- **Nomenclatura:**
  - Componentes: `PascalCase` (ej: `ReportForm`, `UserDashboard`)
  - Funciones/variables: `camelCase` (ej: `createReport`, `userName`)
  - Constantes: `UPPER_SNAKE_CASE` (ej: `API_BASE_URL`)
  - Archivos: `kebab-case` (ej: `report-form.tsx`, `user-service.ts`)

### Imports
```typescript
// 1. React/Next.js imports primero
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 2. Librerías de terceros
import axios from 'axios';
import { format } from 'date-fns';

// 3. Imports locales (relativos)
import { Button } from '@/components/ui/button';
import { Report } from '@/types/report';
import { api } from '@/lib/api';
```

### Componentes React
- Usar functional components con hooks
- Props con TypeScript interfaces
- Manejo de errores con try-catch en operaciones asíncronas
- Loading states con skeletons o spinners

### CSS/Estilos
- **Framework:** Tailwind CSS (recomendado para Next.js)
- **Convenciones:**
  - Clases utilitarias de Tailwind
  - Componentes con variantes consistentes
  - Diseño responsive mobile-first

### Manejo de Errores
```typescript
// API calls
try {
  const response = await api.post('/reports', data);
  return response.data;
} catch (error) {
  console.error('Error creating report:', error);
  throw new Error('No se pudo crear el reporte');
}

// Form validation
const validateReport = (data: ReportData): string[] => {
  const errors = [];
  if (!data.title.trim()) errors.push('El título es requerido');
  if (!data.description.trim()) errors.push('La descripción es requerida');
  return errors;
};
```

## 🧪 Testing (Jest + React Testing Library configurado)
- **Unit/Integration:** Jest + React Testing Library (configurado en frontend)
- **Coverage threshold:** 70% mínimo (branches, functions, lines, statements)
- **E2E:** Por implementar (Cypress o Playwright)
- **API:** Por implementar (Supertest para endpoints backend)

**Configuración Jest:**
- Setup: `jest.setup.js` con `@testing-library/jest-dom`
- Path aliases: `@/components/` → `components/`, `@/pages/` → `pages/`
- Coverage from: `components/**/*.{js,jsx,ts,tsx}`, `app/**/*.{js,jsx,ts,tsx}`

## 🔧 Configuraciones Pendientes
Archivos prioritarios por crear: `next.config.js`, `tsconfig.json`, `.eslintrc.json`, `.env.example`

## 🔐 Variables de Entorno

### Variables Requeridas
| Variable | Descripción | Ubicación |
|----------|-------------|-----------|
| `JWT_SECRET` | Clave secreta para firmar access tokens (15 min) | Raíz + Frontend |
| `JWT_REFRESH_SECRET` | Clave secreta para firmar refresh tokens (7 días) | Raíz + Frontend |
| `NODE_ENV` | Entorno de ejecución (`development` \| `production`) | Raíz + Frontend |
| `DATABASE_URL` | URL de conexión PostgreSQL | Frontend |

### Configuración de Cookies (NODE_ENV)
```bash
# Desarrollo (localhost) - secure: false
NODE_ENV=development

# Producción - secure: true (requiere HTTPS)
NODE_ENV=production
```

**Nota:** `secure: true` en cookies requiere HTTPS. En desarrollo local (HTTP), debe usarse `NODE_ENV=development`.

### Archivos .env.example
- `.env.example` (raíz): Variables generales del proyecto
- `frontend/.env.example`: Variables específicas del frontend

### Archivos .env (NO subir a git)
- `.env` (raíz)
- `frontend/.env`
- `frontend/.env.local`
- `frontend/.env.development`
- `frontend/.env.production`

## 📝 Notas para Agentes

1. **Proyecto en desarrollo:** Estructura creada pero sin implementación funcional aún
2. **Crear antes de modificar:** Siempre leer un archivo antes de editarlo, incluso si está vacío
3. **Seguir convenciones:** Usar TypeScript estricto y naming conventions establecidas
4. **Validar cambios:** Después de cambios significativos, ejecutar `docker-compose config`
5. **Tests prioritarios:** Configurar Jest + Testing Library antes de agregar componentes complejos

## 🚨 Reglas Críticas
- **No comitear secrets:** Nunca agregar contraseñas, API keys o datos sensibles
- **Usar variables de entorno:** Configurar datos sensibles vía .env files
- **Validar en cada PR:** El pipeline de CI/CD validará estructura básica del proyecto
- **Ejecutar lint/typecheck:** Siempre después de cambios significativos: `npm run lint && npm run type-check`