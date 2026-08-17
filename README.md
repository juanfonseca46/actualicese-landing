# Actualícese — Landing Page

Maquetación responsive de la landing de **Actualícese Automation**, construida a partir de un diseño de Figma.

## 🚀 Demo local

```bash
python3 -m http.server 4599
```

Luego abre [http://localhost:4599](http://localhost:4599).

## 🧱 Stack

- **HTML5** semántico
- **CSS3** organizado por módulos (variables, reset, base, componentes, responsive)
- **JavaScript** vanilla (sin dependencias)

## 📁 Estructura

```
actualicese-landing/
├── index.html
├── css/
│   ├── main.css          # Punto de entrada (importa los módulos)
│   ├── variables.css     # Design tokens: colores, tipografía, espaciados
│   ├── reset.css         # Reset / normalize
│   ├── base.css          # Tipografía global, contenedor, botones
│   ├── components.css     # Bloques por sección
│   └── responsive.css    # Breakpoints (≤960px, ≤720px, ≤420px)
├── js/
│   └── main.js           # Menú móvil, autoscroll, carruseles
└── assets/
    └── images/           # Imágenes del sitio
```

## ✨ Características

- Diseño **responsive** (desktop, tablet y móvil) con menú hamburguesa.
- **Header** transparente sobre el hero con degradado (`#2B3D99 → #4766FF`).
- Tipografía **IBM Plex Sans**.
- **Autoscroll** suave desde la barra superior (Planes / Beneficios / Herramientas).
- Sección de **planes** con dos tarjetas de precio.
- **Carrusel de herramientas** (full-bleed, tarjeta central + laterales) con flechas, autoplay y swipe táctil.
- **Carrusel de testimonios** con paginación, autoplay y swipe.
- **CTA** final e imágenes alineadas al borde del fondo.
- Botón flotante de **WhatsApp** y enlaces a redes sociales.

## 🎨 Diseño

Maquetado con fidelidad al frame de Figma, respetando colores, tipografía, espaciados y jerarquía visual.
