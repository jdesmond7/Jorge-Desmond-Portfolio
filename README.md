# Portafolio - Jorge Desmond

Portafolio personal estático con Next.js, Design System propio y contenido en Markdown local.

## Stack

- **Frontend:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- **Contenido:** Markdown en `/content` (gray-matter + react-markdown)
- **Deploy:** Vercel

## Estructura

```
portafolio/
├── app/                 # Rutas Next.js
├── components/          # UI, layout y secciones
├── content/             # Markdown (proyectos + páginas) por locale
│   ├── projects/{es,en}/
│   └── pages/{es,en}/
├── lib/                 # Lectura de contenido, i18n, seguridad
├── public/images/       # Assets estáticos
└── types/               # Tipos de frontmatter
```

## Desarrollo local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home |
| `/proyectos` | Casos de estudio |
| `/proyectos/[slug]` | Detalle de proyecto |
| `/ilustracion` | Galería de ilustraciones locales |
| `/blog` | Blog |
| `/blog/[slug]` | Artículo |
| `/sobre-mi` | Bio extendida |
| `/resume` | CV |

## Design System

Tokens centralizados en `app/globals.css`:

- **Coral** - CTAs, marca y acentos
- **Carbon** - nav y texto principal
- **Bebas Neue** - display / hero name
- **Montserrat** - cuerpo y saludo
- **JetBrains Mono** - labels y metadata

## Contenido

Proyectos y About viven en Markdown. El locale activo (`es` | `en`) elige la carpeta correspondiente bajo `content/`.

## Deploy (Vercel)

1. Conecta el repo en [vercel.com](https://vercel.com)
2. Variables de entorno:
   - `NEXT_PUBLIC_SITE_URL` - URL del sitio en producción

## Scripts

```bash
npm run dev      # Next.js dev
npm run build    # Build producción
npm run lint     # ESLint
```
