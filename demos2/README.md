# demos2 — Demos de prospección

Carpeta para preparar **webs demo antes del contacto**. Cada prospecto = una carpeta independiente, lista para personalizar y publicar rápido.

## Estructura

```
demos2/
├── _template/          # Plantilla base (no editar directamente)
├── _shared/            # Recursos comunes (iconos, presets, mensajes)
├── scripts/            # Script para crear demos nuevas
├── registry.json       # Índice de todas las demos
├── CHECKLIST.md        # Lista rápida por demo
└── nombre-del-prospecto/   # Una carpeta por demo
    ├── brief.md        # Investigación del prospecto
    ├── status.json     # Estado: borrador → publicada → contactada
    ├── index.html
    ├── css/
    ├── js/config.js    # Datos editables (contacto, nav)
    └── assets/
```

## Crear una demo nueva

Desde PowerShell, en la carpeta `demos2/`:

```powershell
.\scripts\new-demo.ps1 -Nombre "Estudio García" -Rubro abogado
```

Eso copia `_template/`, genera el slug (`estudio-garcia`), actualiza `brief.md`, `status.json`, `config.js` y agrega la entrada en `registry.json`.

## Flujo de trabajo (rápido)

| Paso | Archivo | Qué hacer |
|------|---------|-----------|
| 1 | `brief.md` | Investigar al prospecto (5–10 min) |
| 2 | `js/config.js` | Nombre, teléfono, WhatsApp, email |
| 3 | `css/variables.css` | Colores (ver presets en `_shared/color-presets.json`) |
| 4 | `index.html` | Textos de secciones y meta tags |
| 5 | `assets/images/` | Hero y foto about |
| 6 | Publicar | Subir carpeta al hosting |
| 7 | `_shared/outreach/` | Enviar mensaje con link de la demo |

## Diferencia con `demos/`

| | `demos/` | `demos2/` |
|---|----------|-----------|
| Uso | Proyectos reales / en producción | Demos previas al contacto |
| Estado | Cliente confirmado | Prospecto en prospección |
| Portfolio | Aparecen en la landing principal | No (hasta cerrar el cliente) |

## Tips para ir más rápido

- No reinventes: copiá textos del Instagram o Google Maps al `brief.md` y después al HTML.
- Cambiá solo colores en `variables.css` — el resto del CSS ya está armado.
- Usá los SVG de placeholder hasta tener fotos reales.
- Marcá el estado en `status.json` cuando publiques o contactes.

## Ejemplo

Ver carpeta `ejemplo-demo/` (creada con el script como referencia).
