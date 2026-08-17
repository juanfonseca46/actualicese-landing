# Prueba técnica — Parte 5: Corrección de código

Revisión del `index.html` y `estilos.css` entregados. Se detectaron y corrigieron
**7 errores** (3 en HTML y 4 en CSS). Los archivos corregidos están en esta misma carpeta.

---

## 🔴 Errores en `index.html`

| # | Problema | Antes | Después |
|---|----------|-------|---------|
| 1 | Etiqueta `<h1>` mal cerrada | `<h1>Automatiza tu trabajo contable <h1>` | `<h1>Automatiza tu trabajo contable</h1>` |
| 2 | Faltaba el meta `viewport` (sin él, la media query no funciona en móvil) | *(no existía)* | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` |
| 3 | `<img>` sin atributo `alt` (accesibilidad / HTML válido) | `<img src="producto.png">` | `<img src="producto.png" alt="Vista del producto contable de Actualícese">` |

## 🔴 Errores en `estilos.css`

| # | Problema | Antes | Después |
|---|----------|-------|---------|
| 4 | `gap` sin unidad (un valor de longitud ≠ 0 la requiere; sin ella se ignora) | `gap: 24;` | `gap: 24px;` |
| 5 | Propiedad mal escrita (typo) → el fondo no se aplicaba | `bacground-color: #f4f7fa;` | `background-color: #f4f7fa;` |
| 6 | Media query inválida: faltaban los dos puntos → nunca aplicaba | `@media screen and (max-width 600px)` | `@media screen and (max-width: 600px)` |
| 7 | Imagen no responsive: ancho fijo desborda en móvil | `.hero img { width: 600px; }` | `.hero img { width: 100%; max-width: 600px; height: auto; }` |

---

## Resumen

- **HTML:** 1 error de sintaxis (cierre de `<h1>`) y 2 de buenas prácticas/responsive (viewport y `alt`).
- **CSS:** 2 que rompían estilos (typo en `background-color` y unidad faltante en `gap`), 1 que anulaba la media query, y 1 de responsividad de la imagen.

Con estas correcciones el layout funciona correctamente y responde bien en móvil (la columna se apila por debajo de 600px, como pretendía el diseño original).
