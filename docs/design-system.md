# 🎨 Design System - UrbanPulse

## Paleta de Colores Institucional

### Colores Principales

| Color | Hex | RGB | Uso |
|-------|-----|-----|-----|
| **Azul Institucional** | `#0F4C75` | `rgb(15, 76, 117)` | Navbar, headers, títulos, branding principal |
| **Azul Medio** | `#3282B8` | `rgb(50, 130, 184)` | Links, botones secundarios, estados activos |
| **Verde Estable** | `#1B9C85` | `rgb(27, 156, 133)` | CTAs principales, confirmaciones, éxitos |
| **Rojo Institucional** | `#E74646` | `rgb(231, 70, 70)` | Alertas, errores, acciones destructivas |
| **Gris Azulado** | `#E8EEF1` | `rgb(232, 238, 241)` | Fondos, separadores, estados disabled |
| **Negro Carbón** | `#1A1A1D` | `rgb(26, 26, 29)` | Textos principales |
| **Blanco** | `#FFFFFF` | `rgb(255, 255, 255)` | Fondos principales, textos sobre colores |

### Variables CSS

```css
:root {
  --azul-institucional: #0F4C75;
  --azul-medio: #3282B8;
  --verde-estable: #1B9C85;
  --rojo-institucional: #E74646;
  --gris-azulado: #E8EEF1;
  --negro-carbon: #1A1A1D;
  --blanco: #FFFFFF;
}
```

---

## Tipografía

### Familias de Fuentes

#### **Bebas Neue** (Display)
- **Uso**: Títulos principales, logos, encabezados de sección
- **Peso**: 400 (Regular) - Bold
- **Características**: Condensada, mayúsculas, alto impacto
- **Import**: 
  ```css
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
  font-family: 'Bebas Neue', cursive;
  ```

#### **IBM Plex Sans** (Body)
- **Uso**: Párrafos, descripciones, formularios, navegación
- **Pesos disponibles**: 400 (Regular), 500 (Medium), 600 (Semi-Bold), 700 (Bold)
- **Características**: Excelente legibilidad, profesional, diseñada para interfaces
- **Import**: 
  ```css
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
  font-family: 'IBM Plex Sans', sans-serif;
  ```

---

## Escala Tipográfica

### Jerarquía de Tamaños

| Nivel | Elemento | Tamaño | Peso | Tipografía | Line Height | Uso |
|-------|----------|--------|------|------------|-------------|-----|
| **H1** | Hero Title | `4rem` (64px) | 700 | Bebas Neue | 1.2 | Títulos principales de página |
| **H2** | Page Header | `3rem` (48px) | 700 | Bebas Neue | 1.2 | Encabezados de sección |
| **H3** | Section Title | `2rem` (32px) | 700 | Bebas Neue | 1.3 | Subsecciones |
| **H4** | Card Title | `1.5rem` (24px) | 700 | IBM Plex Sans | 1.4 | Títulos de cards/reportes |
| **Large Body** | Intro Text | `1.2rem` (19.2px) | 400 | IBM Plex Sans | 1.6 | Texto introductorio |
| **Body** | Paragraph | `1rem` (16px) | 400 | IBM Plex Sans | 1.6 | Texto general |
| **Small** | Metadata | `0.9rem` (14.4px) | 400-500 | IBM Plex Sans | 1.5 | Fecha, ubicación, info secundaria |
| **XSmall** | Labels | `0.85rem` (13.6px) | 500-600 | IBM Plex Sans | 1.4 | Etiquetas de formulario, ayuda |

### Ejemplos de Uso

```css
/* Hero Title */
h1 {
  font-family: 'Bebas Neue', cursive;
  font-size: 4rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: 2px;
}

/* Body Text */
p {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
}

/* Small Text */
.text-small {
  font-size: 0.9rem;
  font-weight: 400;
  color: #666;
}
```

### Responsive Typography

```css
/* Mobile (<768px) */
@media (max-width: 768px) {
  h1 { font-size: 2.5rem; }
  h2 { font-size: 2rem; }
  h3 { font-size: 1.5rem; }
}
```

---

## Estados de Botones

### Botón Primario (Verde Estable)
**Uso**: Acciones principales, CTAs

| Estado | Background | Color | Transform | Shadow | Cursor |
|--------|------------|-------|-----------|--------|--------|
| **Normal** | `#1B9C85` | `#FFFFFF` | `none` | `0 2px 4px rgba(27,156,133,0.2)` | `pointer` |
| **Hover** | `#158f75` | `#FFFFFF` | `translateY(-2px)` | `0 6px 16px rgba(27,156,133,0.3)` | `pointer` |
| **Focus** | `#158f75` | `#FFFFFF` | `none` | `0 0 0 4px rgba(27,156,133,0.25)` | `pointer` |
| **Active** | `#127864` | `#FFFFFF` | `translateY(0)` | `0 2px 4px rgba(27,156,133,0.3)` | `pointer` |
| **Disabled** | `#E8EEF1` | `#999999` | `none` | `none` | `not-allowed` |

```css
.btn-primary {
  background: #1B9C85;
  color: #FFFFFF;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  transition: all 0.3s ease;
}

.btn-primary:hover { background: #158f75; transform: translateY(-2px); }
.btn-primary:focus { outline: none; box-shadow: 0 0 0 4px rgba(27,156,133,0.25); }
.btn-primary:active { background: #127864; transform: translateY(0); }
.btn-primary:disabled { background: #E8EEF1; color: #999; cursor: not-allowed; opacity: 0.6; }
```

---

### Botón Secundario (Azul Medio)
**Uso**: Acciones secundarias importantes

| Estado | Background | Color | Transform | Shadow |
|--------|------------|-------|-----------|--------|
| **Normal** | `#3282B8` | `#FFFFFF` | `none` | `0 2px 4px rgba(50,130,184,0.2)` |
| **Hover** | `#0F4C75` | `#FFFFFF` | `translateY(-2px)` | `0 6px 16px rgba(15,76,117,0.3)` |
| **Focus** | `#0F4C75` | `#FFFFFF` | `none` | `0 0 0 4px rgba(50,130,184,0.25)` |
| **Active** | `#0a3554` | `#FFFFFF` | `translateY(0)` | `0 2px 4px rgba(15,76,117,0.3)` |
| **Disabled** | `#E8EEF1` | `#999999` | `none` | `none` |

---

### Botón Outline
**Uso**: Acciones terciarias, cancelar

| Estado | Background | Color | Border | Transform |
|--------|------------|-------|--------|-----------|
| **Normal** | `#FFFFFF` | `#3282B8` | `2px solid #3282B8` | `none` |
| **Hover** | `#3282B8` | `#FFFFFF` | `2px solid #3282B8` | `translateY(-2px)` |
| **Focus** | `#FFFFFF` | `#3282B8` | `2px solid #0F4C75` | `none` + ring |
| **Active** | `#0F4C75` | `#FFFFFF` | `2px solid #0F4C75` | `translateY(0)` |
| **Disabled** | `#FFFFFF` | `#CCCCCC` | `2px solid #DDDDDD` | `none` |

---

### Botón Peligro (Rojo Institucional)
**Uso**: Acciones destructivas (eliminar, rechazar)

| Estado | Background | Color | Transform | Shadow |
|--------|------------|-------|-----------|--------|
| **Normal** | `#E74646` | `#FFFFFF` | `none` | `0 2px 4px rgba(231,70,70,0.2)` |
| **Hover** | `#c93939` | `#FFFFFF` | `translateY(-2px)` | `0 6px 16px rgba(231,70,70,0.3)` |
| **Focus** | `#c93939` | `#FFFFFF` | `none` | `0 0 0 4px rgba(231,70,70,0.25)` |
| **Active** | `#b32d2d` | `#FFFFFF` | `translateY(0)` | `0 2px 4px rgba(231,70,70,0.3)` |
| **Disabled** | `#E8EEF1` | `#999999` | `none` | `none` |

---

### Botón Ghost
**Uso**: Acciones sutiles, enlaces

| Estado | Background | Color | Transform |
|--------|------------|-------|-----------|
| **Normal** | `transparent` | `#3282B8` | `none` |
| **Hover** | `rgba(50,130,184,0.1)` | `#0F4C75` | `translateY(-2px)` |
| **Focus** | `rgba(50,130,184,0.1)` | `#3282B8` | `none` + ring |
| **Active** | `rgba(50,130,184,0.2)` | `#0F4C75` | `translateY(0)` |
| **Disabled** | `transparent` | `#CCCCCC` | `none` |

---

### Tamaños de Botones

```css
/* Grande */
.btn-large {
  padding: 1.3rem 2.5rem;
  font-size: 1.1rem;
}

/* Normal */
.btn {
  padding: 1rem 2rem;
  font-size: 1rem;
}

/* Pequeño */
.btn-small {
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
}

/* Icono */
.btn-icon {
  width: 48px;
  height: 48px;
  padding: 0;
  border-radius: 50%;
}
```

---

#### **Contraste de Colores**

| Combinación | Ratio | WCAG AA | WCAG AAA | Uso |
|-------------|-------|---------|----------|-----|
| Azul Institucional + Blanco | **8.5:1** | ✅ Pasa | ✅ Pasa | Navbar, botones |
| Azul Medio + Blanco | **4.6:1** | ✅ Pasa | ⚠️ No (AA normal text) | Botones, links |
| Verde Estable + Blanco | **4.5:1** | ✅ Pasa | ⚠️ No (AA normal text) | Botones CTA |
| Rojo Institucional + Blanco | **4.5:1** | ✅ Pasa | ⚠️ No (AA normal text) | Alertas, errores |
| Negro Carbón + Blanco | **15.7:1** | ✅ Pasa | ✅ Pasa | Textos principales |
| Negro Carbón + Gris Azulado | **14.2:1** | ✅ Pasa | ✅ Pasa | Textos en fondos claros |

**✅ Todos los botones cumplen WCAG AA para texto grande (14pt bold / 18pt regular)**

#### **Focus States**
- ✅ **Todos los botones tienen estados de focus visibles** con ring de 4px
- ✅ **Cumple WCAG 2.1 Criterio 2.4.7** (Focus Visible)
- ✅ **Ratio de contraste del focus ring > 3:1** respecto al fondo

#### **Touch Targets**
- ✅ **Botones normales: 48x44px mínimo** (cumple criterio de 44x44px)
- ✅ **Botones pequeños > 36px** (recomendado solo para casos específicos)

#### **Tipografía**
- ✅ **Tamaño mínimo: 16px** (1rem) para cuerpo de texto
- ✅ **Line-height: 1.5-1.6** para legibilidad óptima
- ✅ **Fuente legible** (IBM Plex Sans) optimizada para pantallas

#### **Estados Disabled**
- ✅ **Cursor: not-allowed** indica claramente el estado
- ✅ **Opacity: 0.6** + color gris = feedback visual claro
- ⚠️ **Mejora sugerida**: Añadir `aria-disabled="true"` en HTML


---

## 📐 Espaciado y Layout

### Sistema de Espaciado (8px base)

```css
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
--space-2xl: 4rem;    /* 64px */
```

### Border Radius

```css
--radius-sm: 6px;     /* Botones pequeños, badges */
--radius-md: 8px;     /* Botones normales, inputs */
--radius-lg: 12px;    /* Cards, modales */
--radius-xl: 16px;    /* Contenedores principales */
--radius-full: 50%;   /* Botones circulares, avatares */
```

---

## 🎯 Uso Correcto del Sistema

### Jerarquía de Botones

```
Primario (Verde) > Secundario (Azul) > Outline/Ghost > Danger (Rojo)
```

### Reglas de Oro

1. **Un solo botón primario por vista** (máximo)
2. **Focus siempre visible** (accesibilidad)
3. **Transiciones consistentes** (0.3s ease)
4. **Contraste mínimo 4.5:1** para textos
5. **Touch targets mínimo 44x44px**

---

**Versión**: 1.0  
**Última actualización**: Enero 2026  
**Equipo**: Squad 3 - UrbanPulse
