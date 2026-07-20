/**
 * Rewrites legacy CMS/Railway upload URLs to local `/images/{filename}` paths.
 * Keeps already-local paths and non-legacy absolute URLs unchanged.
 */
const LEGACY_HOST_MARKERS = [
  "railway.app",
  "up.railway.app",
  "jorge-desmond-portfolio-production",
];

export function rewriteLegacyImageUrl(src: string): string {
  const trimmed = src.trim();
  if (!trimmed) return trimmed;

  if (trimmed.startsWith("/images/")) return trimmed;

  try {
    const url = new URL(
      trimmed.startsWith("//") ? `https:${trimmed}` : trimmed,
      "https://local.invalid",
    );

    const isLegacy =
      LEGACY_HOST_MARKERS.some((marker) => url.hostname.includes(marker)) ||
      url.pathname.startsWith("/uploads/");

    if (!isLegacy && url.origin !== "https://local.invalid") {
      return trimmed;
    }

    const filename = url.pathname.split("/").filter(Boolean).pop();
    if (!filename) return trimmed;

    return `/images/${decodeURIComponent(filename)}`;
  } catch {
    if (trimmed.startsWith("/uploads/")) {
      const filename = trimmed.split("/").filter(Boolean).pop();
      return filename ? `/images/${decodeURIComponent(filename)}` : trimmed;
    }
    return trimmed;
  }
}

export function rewriteLegacyImageUrlsInMarkdown(markdown: string): string {
  return markdown.replace(
    /(!\[[^\]]*]\()([^)\s]+)(\))/g,
    (_match, prefix: string, url: string, suffix: string) =>
      `${prefix}${rewriteLegacyImageUrl(url)}${suffix}`,
  );
}
