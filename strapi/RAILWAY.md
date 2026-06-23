# Strapi en Railway — uploads persistentes

## Por qué desaparecen las fotos

Strapi guarda los archivos subidos en `public/uploads/` usando el provider local.

En Railway el filesystem del contenedor es **efímero**: cada redeploy crea un contenedor nuevo y borra los archivos que subiste. La base de datos (PostgreSQL) conserva las referencias, pero las imágenes devuelven 404.

Esto no lo provoca el seed ni los pushes a Vercel. Ocurre cuando **Railway redeploya el servicio Strapi** sin un volumen persistente.

## Solución (una sola vez)

### 1. Crear un volumen en Railway

1. Abre tu proyecto en [railway.app](https://railway.app)
2. Selecciona el servicio **Strapi** (no PostgreSQL)
3. Ve a **Settings → Volumes** (o `Cmd+K` → "Add volume")
4. Crea un volumen y monta en:

   ```
   /app/public/uploads
   ```

5. Redeploy el servicio Strapi

Railway expone `RAILWAY_VOLUME_MOUNT_PATH=/app/public/uploads` cuando el volumen está bien montado. El bootstrap de Strapi deja de mostrar el aviso de uploads efímeros.

### 2. Evitar redeploys innecesarios de Strapi

Si Railway está conectado al monorepo completo, **cada push a `main`** puede redeployar Strapi aunque solo cambies el frontend.

En el servicio Strapi → **Settings → Deploy**:

- **Root Directory:** `strapi`
- **Watch Paths:** `strapi/**`

Así los pushes que solo tocan Next.js no reinician Strapi ni tocan `public/uploads`.

### 3. Vuelve a subir las imágenes (solo esta vez)

Después de montar el volumen, las fotos que subas **permanecerán** en futuros redeploys. Las que se perdieron en deploys anteriores hay que subirlas de nuevo en Strapi Admin.

## Verificación

Tras el redeploy con volumen:

1. En los logs de Strapi no debe aparecer el aviso de uploads efímeros
2. Sube una imagen de prueba en Admin
3. Haz un redeploy manual del servicio Strapi
4. La imagen debe seguir disponible en Media Library y en la API
