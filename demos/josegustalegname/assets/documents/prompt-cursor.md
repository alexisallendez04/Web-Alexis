# Prompt para Cursor — LG | Guastalegname & Asociados

Pegar todo lo de abajo como instrucción inicial en Cursor. Las dos fotos (`hero-leonardo-biblioteca.jpg` y `about-leonardo-tribunales.jpg`) van en `assets/img/` antes de correrlo.

---

## PROMPT

Actuá como desarrollador front-end senior. Vas a construir la Home de un sitio web para un estudio jurídico, con un concepto editorial ya definido y aprobado por el cliente. **No inventes dirección de diseño nueva**: seguí exactamente las especificaciones de este documento. El diseño ya fue validado como prototipo estático; tu trabajo es reconstruirlo de forma prolija y mantenible con el stack pedido.

### Stack técnico (obligatorio)

- HTML5 semántico.
- **Bootstrap 5** (vía CDN) solo para grid, utilidades de spacing y breakpoints responsive. **No uses componentes de Bootstrap tal cual salen de fábrica** (cards con sombra, botones redondeados, navbar default, etc.) — se van a sobrescribir sus estilos para que no se note que es Bootstrap.
- CSS propio en `assets/css/style.css` para todo lo que define la identidad (tipografía, colores, spine, hover, reveals).
- JS vanilla (sin jQuery, sin frameworks) en `assets/js/main.js` para: scroll reveal (IntersectionObserver), la línea vertical animada (spine) y micro-interacciones de hover.
- Sin build tools. Debe poder abrirse el `index.html` directo o servirse con Live Server.

### Estructura de archivos

```
/index.html
/assets/css/style.css
/assets/js/main.js
/assets/img/hero-leonardo-biblioteca.jpg
/assets/img/about-leonardo-tribunales.jpg
```

### Concepto de diseño — "Editorial Criminal Defense"

No es un sitio de "law firm" genérico. Es una publicación jurídica de autor: revista de alta gama + despacho boutique. Cero cards, cero iconos de balanza de la justicia, cero sliders, cero degradados, cero sombras decorativas, `border-radius: 0` en absolutamente todo (botones, imágenes, inputs).

### Design tokens — usar como CSS custom properties en `:root`

```css
:root{
  --onyx:#0B0B0D;      /* fondo de tramos oscuros */
  --paper:#F7F6F2;     /* fondo base, blanco roto */
  --navy:#16223C;      /* único acento de color. Uso: máx 3–5% del área visible */
  --ink:#1A1A18;        /* texto principal sobre paper */
  --line:#D8D5CD;       /* líneas finas sobre fondo claro */
  --line-dark: rgba(247,246,242,.16); /* líneas finas sobre fondo oscuro */
  --font-serif: 'EB Garamond', Georgia, serif;
  --font-sans: 'Inter', -apple-system, sans-serif;
}
```

Tipografía vía Google Fonts:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
```

**Reglas de uso:**
- `--font-serif` (EB Garamond): titulares, frase del hero, citas, nombres de sección. Interlineado suelto, tracking negativo en tamaños grandes. Cursiva reservada para una palabra o frase puntual por sección, no para párrafos.
- `--font-sans` (Inter): nav, eyebrows (versalitas, letter-spacing +0.12em, uppercase), botones, captions, metadatos.
- `--navy` nunca como fondo de bloque grande. Solo: hover de links/líneas, eyebrow de área penal, subrayado puntual.
- Divisores siempre `border: 1px solid var(--line)` (o `--line-dark` sobre fondo oscuro). Nunca `box-shadow`.

### Elemento firma (signature element) — el "spine"

Una línea vertical de 1px, fija en el margen izquierdo del contenido (desktop, `≥992px` — ocultarla en mobile/tablet), que **crece de 0% a 100% de altura según el progreso de scroll de toda la página**. Funciona como el lomo de un expediente: todo el contenido cuelga de ella.

Implementación JS (vanilla):
```js
const fill = document.getElementById('spineFill');
function updateSpine(){
  const scrolled = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const pct = max > 0 ? Math.min(100, (scrolled/max)*100) : 0;
  fill.style.height = pct + '%';
}
window.addEventListener('scroll', updateSpine, {passive:true});
updateSpine();
```

### Movimiento — disciplina, no espectáculo

Cero rebotes, cero partículas, cero efectos "tech". Solo:
- **Reveal al hacer scroll**: bloques con clase `.reveal` empiezan en `opacity:0; transform:translateY(25px)`, pasan a `opacity:1; transform:translateY(0)` una sola vez al entrar en viewport (`IntersectionObserver`, `threshold:0.15`), transición `0.8s cubic-bezier(.22,.61,.36,1)`.
- **Hover en lista de áreas**: la línea inferior del ítem cambia de color, la flecha se desplaza `translateX(7px)`, el nombre sube levemente de peso (`font-weight`). Transición `0.35s cubic-bezier(.22,.61,.36,1)`.
- **Transiciones entre estados generales**: `0.6–0.9s`, mismo easing.
- Respetar `prefers-reduced-motion: reduce` desactivando todas las animaciones (mostrar todo con `opacity:1` directo).

### Fotografía

Dos fotos reales del abogado, ya tratadas (B&N, contraste ajustado, recortadas). No reemplazar ni generar otras — van directo en `assets/img/`:
- `hero-leonardo-biblioteca.jpg` → hero, proporción contenedor 4:5, `object-fit:cover; object-position:50% 22%`.
- `about-leonardo-tribunales.jpg` → sección "Sobre el estudio", proporción contenedor 3:4, `object-fit:cover`.

Ambas con `filter: grayscale(1) contrast(1.05)` aplicado en CSS además del tratamiento ya hecho en el archivo (por si en el futuro se reemplazan por fotos a color, el filtro las neutraliza igual).

---

## Estructura de la página (Home) — contenido ya definido, no inventar copy nuevo

### 1. Header (sticky)

- Logo/wordmark izquierda: `LG | GUASTALEGNAME & ASOCIADOS` (Inter, 13px, uppercase, tracking .06em; el `|` en `--navy`).
- Nav derecha (ocultar en mobile, dejar solo logo o agregar un toggle simple si querés, pero sin el navbar-toggler default de Bootstrap — rehacer el ícono a algo minimal, ej. dos líneas horizontales finas): Áreas de defensa / Accidentes de tránsito / Estudio / Contacto.
- Fondo `--paper` con leve transparencia + blur al hacer scroll (`backdrop-filter: blur(6px)`), borde inferior 1px `--line`.

### 2. Hero

Grid asimétrico 60/40 (Bootstrap: `col-lg-7` / `col-lg-5`), alineado al final (`align-items:end`).

**Columna izquierda** (con borde izquierdo 1px `--line`, padding-left ~40px, simulando que nace del spine):
- Eyebrow línea 1: `ESTUDIO GUASTALEGNAME` (Inter, bold, tracking .1em)
- Eyebrow línea 2, en `--navy`: `DERECHO PENAL`
- H1 (Garamond, 500, clamp(34px,5vw,64px), max-width 14ch):
  > La defensa comienza *mucho antes* de llegar a juicio.
  (la palabra "mucho antes" en cursiva y color `--navy`)
- Párrafo (Inter, 15px, color `#514F49`, max-width 44ch):
  > Asesoramiento penal y en accidentes de tránsito, con atención presencial en PBA y CABA, y virtual en todo el país. Cada caso se analiza con una estrategia propia — no con un procedimiento estándar.
- CTA con flecha que se desplaza en hover: `Consulta personalizada →`

**Columna derecha:** imagen `hero-leonardo-biblioteca.jpg` en contenedor 4:5, con caption debajo (línea superior 1px `--line`, flex space-between):
`Dr. Leonardo Ariel Guastalegname` / `Fundador — UBA`

**Fila de stats** debajo del hero, borde superior 1px `--line`, 3 columnas (Bootstrap `row` con `col-4`), separadas por borde izquierdo 1px entre ellas:
- `15+` / Años de ejercicio
- `UBA` / Docente desde 2018
- `24hs` / Urgencias penales

### 3. Áreas de defensa (spread oscuro — fondo `--onyx`, texto `--paper`)

- Section head: título `Áreas de defensa` (Garamond, clamp(30px,4vw,48px)) a la izquierda, nota descriptiva a la derecha (Inter, 13px, `#9C9A93`, max-width 26ch): *"Derecho Penal — representación y defensa técnica en cada instancia del proceso."* Borde inferior 1px `--line-dark`.
- Lista numerada real (porque es una enumeración real de áreas de práctica, no decorativa). Cada fila: grid `60px / 1fr / auto` → número (Inter, `#726F67`) / nombre (Garamond, clamp(20px,2.4vw,30px)) / "Ver más →" (Inter uppercase, `#9C9A93`). Borde inferior 1px `--line-dark` en cada fila, hover: borde a `#4B5570`, nombre sube peso, flecha se desplaza, "Ver más" pasa a `--paper`.
  1. Defensas penales
  2. Denuncias
  3. Querella / particular damnificado
  4. Excarcelaciones y eximición de prisión
  5. Prisión domiciliaria
  6. Apelaciones y juicios orales
- Debajo: indicador con punto verde (`#4CFF7A`, 6px, `border-radius:50%` — única excepción de radius, es un status dot) + texto: `Urgencias penales las 24 horas`.

### 4. Accidentes de tránsito (spread claro — mismo patrón que la sección anterior pero fondo `--paper`, líneas `--line`, texto `--ink`)

- Título: `Accidentes de tránsito`. Nota: *"Reclamos, negociación y juicio contra aseguradoras — gestión completa del caso."*
- Lista:
  1. Daños materiales y lesiones
  2. Negociación y juicios contra aseguradoras
  3. Gestiones extrajudiciales y judiciales
  4. Reclamos por incumplimientos

### 5. Sobre el estudio

Grid `col-lg-5` (foto) / `col-lg-7` (texto).

- Columna izquierda: imagen `about-leonardo-tribunales.jpg`, contenedor 3:4, caption debajo (`Tribunales — PBA` / `Atención presencial`).
- Columna derecha:
  - Cita en Garamond itálica, borde izquierdo 1px `--line`, padding-left ~28px:
    > "Cada caso es una realidad particular que requiere un abordaje serio, estratégico y comprometido."
  - Lede (Garamond, 19px):
    > LG | Guastalegname & Asociados es un estudio jurídico con enfoque integral, especializado en Derecho Penal y Accidentes de Tránsito.
  - Párrafo (Inter, 15px, `#3E3D38`):
    > Fundado por el Dr. Leonardo Ariel Guastalegname, abogado graduado en la Universidad de Buenos Aires (UBA) y docente de esa misma facultad desde 2018. El estudio ofrece atención presencial en la Provincia de Buenos Aires y en la Ciudad Autónoma de Buenos Aires, y atención virtual en todo el país.
  - Link: `Conocer el estudio →`

### 6. Footer / Contacto (fondo `--onyx`, texto `--paper`)

- Headline (Garamond, clamp(28px,4vw,46px), max-width 16ch): `Hablemos de su caso.` Borde inferior 1px `--line-dark`, padding-bottom generoso.
- 3 columnas (Bootstrap `col-md-4`), Inter, `#B9B7B0`:
  1. **Contacto** — Consulta general y penal / Atención virtual y presencial
  2. **Zonas de atención** — Provincia de Buenos Aires / Ciudad Autónoma de Buenos Aires
  3. **Estudio** — LG | Guastalegname & Asociados / Dr. Leonardo Ariel Guastalegname — UBA
- Línea final pequeña (11px, `#5C5A54`): `© 2026 LG | Guastalegname & Asociados.`

---

## Checklist de calidad antes de entregar

- [ ] `border-radius: 0` verificado en todos los elementos (Bootstrap lo trae por default en botones/inputs — sobrescribir).
- [ ] El azul (`--navy`) no ocupa nunca un bloque grande de fondo.
- [ ] Responsive: en `<992px` el spine se oculta, el hero pasa a una columna, los stats pasan a apilados con borde superior en vez de lateral, "Sobre el estudio" apila imagen arriba y texto abajo.
- [ ] Focus visible por teclado en todos los links y botones (outline visible, no `outline:none` sin reemplazo).
- [ ] `prefers-reduced-motion` respetado.
- [ ] Sin dependencias más allá de Bootstrap 5 (CDN), Google Fonts y JS vanilla.
- [ ] Ningún texto nuevo inventado fuera del contenido de este documento — si falta un dato, dejar un comentario HTML `<!-- TODO: confirmar con cliente -->` en vez de rellenar con texto genérico.
