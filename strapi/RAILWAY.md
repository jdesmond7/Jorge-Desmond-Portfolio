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

1. Abre **Railway → Jorge-Desmond-Portfolio → Deployments → último deploy → View logs**
2. Busca líneas que empiezan con `[uploads]`
3. Debes ver algo como:

   ```
   [uploads] cwd=/app
   [uploads] directory=/app/public/uploads
   [uploads] RAILWAY_VOLUME_MOUNT_PATH=/app/public/uploads
   [uploads] Volume mount path matches Strapi uploads directory.
   ```

4. Si ves **`Volume mount mismatch`**, el volumen está conectado pero en la **ruta incorrecta**
5. Sube una imagen de prueba en Admin
6. Haz un redeploy manual del servicio Strapi
7. La imagen debe seguir disponible en Media Library y en la API

## El volumen está conectado pero las fotos se borran igual

Esto casi siempre significa que el **mount path no coincide** con donde Strapi guarda archivos.

1. En el canvas de Railway, haz clic en el bloque del volumen (`jorge-desmond-portfolio-vol...`), no en Postgres
2. Revisa el **Mount Path** — debe ser exactamente:

   ```
   /app/public/uploads
   ```

   Rutas incorrectas comunes que no funcionan:
   - `/data`
   - `/public/uploads` (falta el prefijo `/app`)
   - `/app/data`

3. Si el log muestra `cwd=/app/strapi`, entonces el mount path correcto sería:

   ```
   /app/strapi/public/uploads
   ```

4. Corrige el mount path, guarda y redeploy
5. Vuelve a subir las imágenes (las anteriores no se recuperan)

## Cada commit borra las fotos

Si haces `git push` y Railway redeploya Strapi, es normal que el contenedor se recree. Con el volumen **bien montado**, los archivos deben sobrevivir.

Para que un push del frontend no redeploye Strapi:

- **Settings → Deploy → Watch Paths:** `strapi/**`
- **Root Directory:** `strapi`
