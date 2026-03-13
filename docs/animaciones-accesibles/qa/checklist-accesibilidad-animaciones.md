# Checklist de Accesibilidad para Animaciones

**Proyecto:** UrbanPulse  
**Fecha:** 2026-03-03  
**Responsable:** QA Team  
**Versión:** 1.0

---

## 1. Preferencias de Movimiento Reducido

| # | Criterio | Método de Verificación | Pass | Fail | Observaciones |
|---|----------|------------------------|------|------|----------------|
| 1.1 | Se respeta `prefers-reduced-motion: reduce` | Mockear matchMedia en tests + verificación visual con DevTools | ☐ | ☐ | |
| 1.2 | Las animaciones se deshabilitan o reducen significativamente | Inspeccionar que `animation-duration` y `transition-duration` sean ~0ms | ☐ | ☐ | |
| 1.3 | No hay animaciones que duren más de 5 segundos | Revisar CSS y keyframes | ☐ | ☐ | |
| 1.4 | Las animaciones no parpadean más de 3 veces por segundo | Revisar keyframes | ☐ | ☐ | |

---

## 2. Navegación por Teclado

| # | Criterio | Método de Verificación | Pass | Fail | Observaciones |
|---|----------|------------------------|------|------|----------------|
| 2.1 | El foco de teclado no queda atrapado en elementos animados | Tabular por toda la página, verificar continuidad | ☐ | ☐ | |
| 2.2 | El orden de foco es lógico y sigue el orden visual | Verificar tabindex y orden del DOM | ☐ | ☐ | |
| 2.3 | Los elementos animados son alcanzables via teclado | Navegar con Tab + Shift+Tab | ☐ | ☐ | |
| 2.4 | Los botones/links animados tienen indicadores de foco visibles | Verificar outline en `:focus` | ☐ | ☐ | |

---

## 3. Manejo de Foco

| # | Criterio | Método de Verificación | Pass | Fail | Observaciones |
|---|----------|------------------------|------|------|----------------|
| 3.1 | Las animaciones no desplazan el foco involuntariamente | Verificar que no haya `autofocus` problemático | ☐ | ☐ | |
| 3.2 | Al abrir modales/overlays, el foco se mueve al contenido | Pruebas con CreateReportSuccessModal | ☐ | ☐ | |
| 3.3 | Al cerrar modales, el foco retorna al elemento que lo abrió | Pruebas con ESC o botón cerrar | ☐ | ☐ | |
| 3.4 | No hay pérdida de foco durante transiciones | Pruebas manuales con tabulador | ☐ | ☐ | |

---

## 4. Compatibilidad con Lectores de Pantalla

| # | Criterio | Método de Verificación | Pass | Fail | Observaciones |
|---|----------|------------------------|------|------|----------------|
| 4.1 | Las animaciones no announcean contenido innecesariamente | Verificar que no haya cambios de rol ARIA inesperados | ☐ | ☐ | |
| 4.2 | Los cambios de estado son anunciados | Verificar con axe-core o NVDA/VoiceOver | ☐ | ☐ | |
| 4.3 | No hay contenido que parpadee sin control del usuario | Inspección visual + axe | ☐ | ☐ | |
| 4.4 | Los elementos animados tienen roles ARIA apropiados | Revisar componentes con animation | ☐ | ☐ | |

---

## 5. Rendimiento

| # | Criterio | Método de Verificación | Pass | Fail | Observaciones |
|---|----------|------------------------|------|------|----------------|
| 5.1 | Las animaciones usan solo `transform` y `opacity` | Revisar CSS de animaciones | ☐ | ☐ | |
| 5.2 | No hay animaciones que causen reflow | Evitar animaciones en `width`, `height`, `top`, `left` | ☐ | ☐ | |
| 5.3 | Las animaciones no bloquean el hilo principal | Lighthouse performance > 90 | ☐ | ☐ | |
| 5.4 | Las animaciones no afectan el First Contentful Paint | DevTools Performance | ☐ | ☐ | |

---

## 6. Flujos a Verificar

Referencia: `docs/animaciones-accesibles/frontend/flujo-animaciones.md`

| # | Flujo | Descripción | Pass | Fail |
|---|-------|-------------|------|------|
| 6.1 | Apertura de formulario | Transición al crear reporte desde página principal | ☐ | ☐ |
| 6.2 | Envío de reporte | Animación de carga → éxito/error | ☐ | ☐ |
| 6.3 | Estados: cargando/error/éxito | Transiciones entre estados | ☐ | ☐ |
| 6.4 | ReportCard | Animación de entrada e interacción hover | ☐ | ☐ |

---

## 7. Dispositivos y Viewports

| # | Dispositivo/Viewport | Pass | Fail | Observaciones |
|---|----------------------|------|------|----------------|
| 7.1 | Desktop (1920x1080) | ☐ | ☐ | |
| 7.2 | Laptop (1366x768) | ☐ | ☐ | |
| 7.3 | Tablet (768x1024) | ☐ | ☐ | |
| 7.4 | Mobile (375x667) | ☐ | ☐ | |

---

## Resumen de Ejecución

| Métrica | Valor |
|---------|-------|
| Total de criterios | 26 |
| Criterios marcados Pass | |
| Criterios marcados Fail | |
| Porcentaje de cumplimiento | |

---

## Firmas

| Rol | Nombre | Fecha | Firma |
|-----|--------|-------|-------|
| QA Tester | | | |
| Revisor | | | |

---

## Historial de Versiones

| Versión | Fecha | Cambios | Autor |
|---------|-------|---------|-------|
| 1.0 | 2026-03-03 | Creación inicial del checklist | QA Team |
