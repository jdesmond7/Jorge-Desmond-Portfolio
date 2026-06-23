import fs from "node:fs";
import path from "node:path";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");
const RAILWAY_UPLOADS_MOUNT = "/app/public/uploads";

export function warnIfUploadsAreEphemeral(strapi: {
  log: { warn: (message: string) => void };
}) {
  const isProduction = process.env.NODE_ENV === "production";
  const isRailway = Boolean(process.env.RAILWAY_ENVIRONMENT);

  if (!isProduction || !isRailway) return;

  const volumeMount = process.env.RAILWAY_VOLUME_MOUNT_PATH;
  if (volumeMount === RAILWAY_UPLOADS_MOUNT) return;

  try {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  } catch {
    // El directorio ya existe o no se puede crear; el aviso sigue siendo útil.
  }

  strapi.log.warn(
    [
      "Uploads are stored locally in public/uploads.",
      "Without a Railway volume mounted at /app/public/uploads,",
      "every Strapi redeploy will delete uploaded media files.",
      "Attach a persistent volume in Railway → Strapi service → Settings → Volumes.",
      "See strapi/RAILWAY.md for setup steps.",
    ].join(" "),
  );
}
