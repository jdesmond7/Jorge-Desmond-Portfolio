const BLOCKED_PROTOCOLS = /^(javascript|data|vbscript):/i;

function isRelativePath(path: string): boolean {
  return (
    path.startsWith("#") ||
    path.startsWith("./") ||
    path.startsWith("../") ||
    (path.startsWith("/") && !path.startsWith("//"))
  );
}

/** Allows http(s), mailto, and relative paths; blocks dangerous schemes. */
export function sanitizeHref(href: string | undefined): string | undefined {
  if (!href?.trim()) return undefined;

  const trimmed = href.trim();
  if (BLOCKED_PROTOCOLS.test(trimmed)) return undefined;
  if (trimmed.startsWith("//")) return undefined;

  if (isRelativePath(trimmed)) return trimmed;

  try {
    const { protocol } = new URL(trimmed);
    if (protocol === "http:" || protocol === "https:" || protocol === "mailto:") {
      return trimmed;
    }
  } catch {
    if (!/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;
  }

  return undefined;
}

/** Allows same-origin paths and https images (Strapi, Instagram CDN). */
export function sanitizeImageSrc(src: string | undefined): string | undefined {
  if (!src?.trim()) return undefined;

  const trimmed = src.trim();
  if (BLOCKED_PROTOCOLS.test(trimmed)) return undefined;
  if (trimmed.startsWith("//")) return undefined;

  if (isRelativePath(trimmed)) return trimmed;

  try {
    const { protocol } = new URL(trimmed);
    if (protocol === "http:" || protocol === "https:") return trimmed;
  } catch {
    return undefined;
  }

  return undefined;
}

export function isExternalHref(href: string | undefined): boolean {
  if (!href) return false;
  if (href.startsWith("//")) return true;
  return href.startsWith("http://") || href.startsWith("https://");
}
