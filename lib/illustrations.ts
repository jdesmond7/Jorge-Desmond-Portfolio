import "server-only";

import fs from "node:fs";
import path from "node:path";
import type { Locale } from "@/lib/i18n/types";
import type { InstagramMedia } from "./instagram-layout";

const ILLUSTRATIONS_DIR = path.join(
  process.cwd(),
  "public/images/illustrations",
);
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export function getLocalIllustrations(locale: Locale): InstagramMedia[] {
  if (!fs.existsSync(ILLUSTRATIONS_DIR)) return [];

  const altLabel =
    locale === "es" ? "Ilustración personal" : "Personal illustration";

  return fs
    .readdirSync(ILLUSTRATIONS_DIR)
    .filter((file) =>
      IMAGE_EXTENSIONS.has(path.extname(file).toLowerCase()),
    )
    .map((file) => {
      const fullPath = path.join(ILLUSTRATIONS_DIR, file);

      return {
        file,
      };
    })
    .sort((a, b) => a.file.localeCompare(b.file, undefined, { numeric: true }))
    .map(({ file }, index) => ({
      id: path.parse(file).name,
      imageUrl: `/images/illustrations/${file}`,
      alt: `${altLabel} ${index + 1}`,
      width: 1080,
      height: 1350,
    }));
}
