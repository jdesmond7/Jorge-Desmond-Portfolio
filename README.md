# Portafolio — Jorge Desmond

Portafolio personal estático con Next.js, Design System propio y contenido gestionado en Strapi.

## Stack

- **Frontend:** Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- **CMS:** Strapi v5 (headless)
- **Deploy:** Vercel (sitio) + Railway (Strapi + PostgreSQL)

## Estructura

```
portafolio/
├── app/              # Rutas Next.js
├── components/       # UI, layout y secciones
├── lib/              # Cliente Strapi, tipos, mock data, tokens
├── public/images/    # Assets estáticos
└── strapi/           # CMS Strapi
```

## Desarrollo local

### Requisitos

- Node.js 20–24 (Strapi no soporta Node 26+)
- npm

### 1. Frontend (funciona sin Strapi con datos mock)

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### 2. Strapi CMS

```bash
cd strapi
cp .env.example .env
# Genera secrets únicos para APP_KEYS, JWT, salts, etc.
npm install
npm run develop
```

Abre [http://localhost:1337/admin](http://localhost:1337/admin), crea tu usuario admin. El seed inicial se carga automáticamente en el primer arranque.

### 3. Conectar Next.js con Strapi

1. En Strapi Admin → Settings → API Tokens → Create new API Token (Read-only)
2. En `.env.local` del frontend:

```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=tu-token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Home |
| `/proyectos` | Casos de estudio |
| `/proyectos/[slug]` | Detalle de proyecto |
| `/ilustracion` | Galería |
| `/blog` | Blog |
| `/blog/[slug]` | Artículo |
| `/sobre-mi` | Bio extendida |

## Design System

Tokens (colores, tipografía, radios, gradiente y sombra) centralizados en `app/globals.css`:

- **Coral** `#fc5f2b` — solo CTAs, marca y acentos
- **Carbon** `#18181b` — nav y texto principal
- **Bebas Neue** — display, uppercase
- **Montserrat** — cuerpo
- **JetBrains Mono** — labels y metadata

## Deploy

### Vercel (Next.js)

1. Conecta el repo en [vercel.com](https://vercel.com)
2. Root directory: `/` (raíz del monorepo)
3. Variables de entorno:
   - `STRAPI_URL` — URL pública de Strapi en Railway
   - `STRAPI_API_TOKEN` — token read-only
   - `NEXT_PUBLIC_SITE_URL` — URL del sitio en producción
4. Crea un Deploy Hook en Vercel → Settings → Git → Deploy Hooks

### Railway (Strapi)

1. Crea proyecto en [railway.app](https://railway.app)
2. Añade PostgreSQL + servicio desde carpeta `strapi/`
3. Variables de entorno (ver `strapi/.env.example`)
4. Build: `npm run build` · Start: `npm run start`
5. Usa Node 20 o 22 en Railway
6. **Importante — uploads persistentes:** monta un volumen en `/app/public/uploads` y configura Watch Paths `strapi/**`. Ver [strapi/RAILWAY.md](strapi/RAILWAY.md)

### Webhook rebuild

En Strapi Admin → Settings → Webhooks:

- **URL:** tu Vercel Deploy Hook URL
- **Events:** `entry.create`, `entry.update`, `entry.delete`, `entry.publish`, `entry.unpublish`

Al publicar contenido, Vercel reconstruye el sitio en ~1–2 min.

## Scripts

```bash
npm run dev      # Next.js dev
npm run build    # Build producción
npm run lint     # ESLint

cd strapi && npm run develop  # Strapi dev
cd strapi && npm run build    # Strapi build
cd strapi && npm run start    # Strapi producción
```
