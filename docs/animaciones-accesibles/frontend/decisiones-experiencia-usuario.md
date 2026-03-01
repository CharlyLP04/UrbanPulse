# Decisiones de Experiencia de Usuario – Animaciones Accesibles

## 1. Animación de entrada del formulario

Se implementó una animación suave al mostrar el formulario de creación de reportes con el objetivo de evitar una aparición brusca del contenido.  
Esta transición guía visualmente la atención del usuario hacia la sección principal y mejora la percepción de fluidez del sistema.

No se trata de un efecto decorativo, sino de una mejora en claridad visual y organización de la información.

---

## 2. Retroalimentación al enviar un reporte

Al enviar un reporte exitosamente, se muestra un modal con una transición progresiva.  
Esta animación cumple una función de retroalimentación clara: confirma que la acción fue procesada correctamente.

El movimiento sutil reduce la incertidumbre del usuario y hace evidente el cambio de estado del sistema.

Además, el modal gestiona correctamente el foco de teclado y permite cierre con tecla ESC, reforzando la accesibilidad.

---

## 3. Animación en las tarjetas de reporte (ReportCard)

Las tarjetas de reporte incluyen una animación ligera de entrada y un efecto sutil al interactuar con ellas.

Estas animaciones:
- Refuerzan la percepción de interactividad.
- Mejoran la jerarquía visual.
- Hacen la navegación más dinámica sin afectar el rendimiento.

Se utilizaron únicamente propiedades optimizadas (`transform` y `opacity`) para garantizar eficiencia.

---

## 4. Soporte para reducción de movimiento

Se implementó la regla `@media (prefers-reduced-motion: reduce)` para respetar las preferencias del sistema operativo del usuario.

Cuando esta opción está activada:
- Se reducen o eliminan animaciones no esenciales.
- Se mantiene la funcionalidad sin comprometer accesibilidad.

Esto garantiza una experiencia inclusiva para personas sensibles al movimiento.

---

## Conclusión

Las animaciones implementadas tienen un propósito funcional: mejorar la claridad, la retroalimentación y la percepción de fluidez del sistema, manteniendo buenas prácticas de rendimiento y accesibilidad.