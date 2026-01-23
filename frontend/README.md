<div align="center">

# 👁️ Frontend (Next.js App Router)

</div>

Interfaz de usuario moderna y responsiva construida con **Next.js 13+ (App Router)**. Prioriza la experiencia de usuario (UX) y la accesibilidad (A11y).

## 🎨 Reglas de Desarrollo Frontend

### 1. Estructura de "App Router"
*   **Rutas**: La estructura de carpetas define las rutas URL (`/app/dashboard` -> `urbanpulse.com/dashboard`).
*   **Componentes de Servidor vs Cliente**: Por defecto, todo es Server Component. Usar `'use client'` solo cuando sea estrictamente necesario (manejo de estado, efectos, eventos de DOM).

### 2. Estilos y Diseño
*   **Framework**: Seguir los lineamientos de diseño definidos en los archivos CSS globales o Tailwind (si aplica).
*   **Responsividad**: Mobile-First. Toda pantalla debe verse perfecta en 320px de ancho antes de escalar a Desktop.

### 3. Componentes y Reutilización
*   Componentes UI genéricos (botones, inputs) deben ir en una carpeta de componentes compartidos (`/components`), no dentro de las rutas de página.
*   Nombres de componentes en `PascalCase`.

### 4. Gestión de Estado
*   Evitar "Prop Drilling" excesivo. Usar Context API o gestores de estado globales solo para datos que realmente son globales (ej. Sesión de usuario). Para lo demás, mantener el estado lo más local posible.

### 5. Navegación
*   Usar siempre el componente `<Link>` de Next.js en lugar de etiquetas `<a>` para navegación interna para aprovechar el prefetching y SPA feel.
