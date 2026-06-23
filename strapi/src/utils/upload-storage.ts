import fs from "node:fs";
import path from "node:path";

export function getUploadsDirectory(): string {
  return path.join(process.cwd(), "public", "uploads");
}

export function ensureUploadsDirectoryWritable(strapi: {
  log: {
    info: (message: string) => void;
    error: (message: string) => void;
  };
}) {
  const uploadsDir = getUploadsDirectory();

  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
    fs.chmodSync(uploadsDir, 0o777);

    const testFile = path.join(uploadsDir, ".write-test");
    fs.writeFileSync(testFile, "ok");
    fs.unlinkSync(testFile);

    strapi.log.info("[uploads] directory is writable");
  } catch (error) {
    strapi.log.error(
      `[uploads] directory is not writable (${uploadsDir}): ${
        error instanceof Error ? error.message : error
      }`,
    );
  }
}

export function logUploadStorageDiagnostics(strapi: {
  log: {
    info: (message: string) => void;
    warn: (message: string) => void;
    error: (message: string) => void;
  };
}) {
  const isProduction = process.env.NODE_ENV === "production";
  const isRailway = Boolean(process.env.RAILWAY_ENVIRONMENT);

  if (!isProduction || !isRailway) return;

  const uploadsDir = getUploadsDirectory();
  const volumeMount = process.env.RAILWAY_VOLUME_MOUNT_PATH;

  try {
    fs.mkdirSync(uploadsDir, { recursive: true });
  } catch {
    // El directorio ya existe o no se puede crear; el aviso sigue siendo útil.
  }

  const fileCount = fs.existsSync(uploadsDir)
    ? fs
        .readdirSync(uploadsDir)
        .filter((name) => !name.startsWith(".") && name !== "lost+found").length
    : 0;

  strapi.log.info(`[uploads] cwd=${process.cwd()}`);
  strapi.log.info(`[uploads] directory=${uploadsDir}`);
  strapi.log.info(`[uploads] filesOnDisk=${fileCount}`);
  strapi.log.info(
    `[uploads] RAILWAY_VOLUME_MOUNT_PATH=${volumeMount ?? "(none)"}`,
  );

  if (!volumeMount) {
    strapi.log.warn(
      "[uploads] No Railway volume detected. Uploaded media will be lost on every redeploy. See strapi/RAILWAY.md",
    );
    return;
  }

  if (path.resolve(volumeMount) !== path.resolve(uploadsDir)) {
    strapi.log.error(
      `[uploads] Volume mount mismatch. Railway mounted at ${volumeMount} but Strapi writes to ${uploadsDir}. Update the volume mount path in Railway to exactly: ${uploadsDir}`,
    );
    return;
  }

  strapi.log.info("[uploads] Volume mount path matches Strapi uploads directory.");
}
