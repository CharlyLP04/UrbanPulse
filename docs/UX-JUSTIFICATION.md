# 🧠 Justificación UX y Accesibilidad - UrbanPulse

> **Objetivo:** Documentar las decisiones de diseño, asegurar el cumplimiento de accesibilidad y validar la usabilidad teórica basada en estándares de la industria.

---

## 1. Principios de Diseño (Steve Krug - "Don't Make Me Think")

Aplicamos la filosofía de Steve Krug para minimizar la carga cognitiva del usuario en UrbanPulse:

### 🚀 Navegación Evidente
*   **Problema:** Los usuarios deben reportar incidencias rápidamente, a menudo en movimiento.
*   **Solución:** Menú de navegación inferior fijo en móviles con iconos universales (Home, Mapa, Reportar, Perfil).
*   **Krug:** "Si no puedo encontrarlo, no existe". La acción principal (+) está resaltada y al centro.

### 👓 Jerarquía Visual Clara
*   **Problema:** Saturación de información en el feed de reportes.
*   **Solución:** Uso de **Bebas Neue** para títulos importantes y **IBM Plex Sans** para lectura. Las tarjetas de reporte usan espaciado y contraste para separar visualmente cada incidente.
*   **Krug:** Los usuarios escanean, no leen. Los títulos grandes permiten el escaneo rápido.

### 🚫 Sin Preguntas Innecesarias
*   **Problema:** Formularios de registro largos disuaden a los usuarios.
*   **Solución:** Registro simplificado (Email/Password o Social Login). El perfil se completa *después*, solo si es necesario.

---

## 2. Evaluación Heurística (Jakob Nielsen)

Evaluación del prototipo actual frente a las 10 Heurísticas de Usabilidad:

| Heurística | Aplicación en UrbanPulse | Estado |
| :--- | :--- | :--- |
| **1. Visibilidad del estado del sistema** | Feedback inmediato al enviar reporte (Loaders y mensajes de éxito en verde). | ✅ Cumple |
| **2. Relación entre sistema y mundo real** | Uso de iconos familiares (cámara para fotos, pin para mapa) y lenguaje natural ("Reportar bache", no "Crear incidencia tipo #4"). | ✅ Cumple |
| **3. Control y libertad del usuario** | Botones de "Cancelar" y "Atrás" claramente visibles en todos los flujos. Posibilidad de editar reportes antes de enviar. | ✅ Cumple |
| **4. Consistencia y estándares** | Uso consistente de colores (Verde = Acción, Rojo = Peligro) y componentes estándar de UI (Material Design influence). | ✅ Cumple |
| **5. Prevención de errores** | Validación de formularios en tiempo real (email inválido, campos vacíos) antes de permitir el envío. | ✅ Cumple |
| **6. Reconocer antes que recordar** | El menú siempre visible y etiquetas claras evitan que el usuario tenga que memorizar dónde están las funciones. | ✅ Cumple |
| **7. Flexibilidad y eficiencia** | Accesos directos para usuarios expertos, pero flujo guiado paso a paso para novatos. | ⚠️ En proceso |
| **8. Estética y diseño minimalista** | Diseño limpio, mucho espacio en blanco, sin elementos decorativos que distraigan del contenido principal (Reportes). | ✅ Cumple |
| **9. Ayudar a diagnosticar errores** | Mensajes de error en lenguaje claro ("Tu contraseña es muy corta") en lugar de códigos ("Error 500"). | ✅ Cumple |
| **10. Ayuda y documentación** | Sección de FAQ accesible desde el perfil y tooltips en iconos confusos. | ⚠️ Pendiente |

---

## 3. Accesibilidad y Diseño Inclusivo (WCAG 2.1)

Más allá de los colores (ya documentados en el Design System), abordamos la accesibilidad estructural:

### 👁️ Percepción
*   **Contraste:** Todo el texto principal cumple ratio AAA o AA estricto sobre sus fondos.
*   **Texto Alternativo:** Todas las imágenes y reportes incluyen atributos `alt` descriptivos para lectores de pantalla.
*   **No solo color:** Los estados de error usan color rojo Y un icono de advertencia (para daltónicos).

### 👆 Operabilidad
*   **Zonas Táctiles:** Todos los botones interactivos tienen un área mínima de **48x48px** (dedo pulgar).
*   **Navegación por Teclado:** Orden lógico de tabulación (`tabindex`) en formularios web para usuarios sin ratón.

### 🧠 Comprensión
*   **Lenguaje Simple:** Nivel de lectura grado 8 (evitar tecnicismos municipales).
*   **Feedback Constante:** El usuario siempre sabe si su reporte se envió, falló o está cargando.

---

## 4. Errores Comunes de UX Evitados

1.  **"Mystery Meat Navigation":** Evitamos botones sin etiquetas o iconos abstractos que el usuario debe adivinar.
2.  **Formularios interminables:** Dividimos el reporte en pasos (Ubicación -> Foto -> Detalles) para reducir la fatiga (Wizard Pattern).
3.  **Pop-ups intrusivos:** No usamos modales bloqueantes a menos que sea crítico (ej. borrar cuenta).

---

> **Conclusión:** El diseño de UrbanPulse no es solo "bonito", está construido sobre bases sólidas de usabilidad para asegurar que cualquier ciudadano, independientemente de sus capacidades técnicas o físicas, pueda reportar problemas en su ciudad.
