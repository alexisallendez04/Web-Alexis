# Demos del portafolio

Cada sitio de cliente vive en su propia carpeta dentro de `demos/`.

## Imágenes del portfolio

Las capturas del hero para la landing principal están en `demos/imgdemos/`:

- `Gabriela.png`
- `Antonella.png`

## Proyectos en producción

| Cliente | Rubro | URL |
|---------|-------|-----|
| Gabriela Catania | Abogada | https://gabrielacatania.com/ |
| Antonela Foniciello | Nutricionista | https://www.antofoninutricion.com/ |

## Estructura local

```
demos/
├── gabrielacatania/
│   ├── index.html
│   ├── css/
│   ├── js/
│   └── assets/
│       ├── icons/
│       ├── images/
│       └── fonts/
└── antofoninutricion/
    ├── index.html
    ├── css/
    │   ├── reset.css
    │   ├── variables.css
    │   ├── styles.css
    │   └── animations.css
    ├── js/
    │   └── main.js
    └── assets/
        ├── icons/
        ├── images/
        ├── documents/
        └── fonts/
```

## Agregar un proyecto

1. Creá la carpeta en `demos/` con el código fuente.
2. Agregá una tarjeta en `#proyectos` del `index.html` principal con la **URL real en producción**.
3. Incluí una imagen de preview (captura o foto representativa).
