/** Correo público del portafolio — única dirección visible en el sitio. */
export const SITE_EMAIL = "hola@jorgedesmond.com";

export const LEGACY_CONTACT_EMAIL = "jdesmond7@gmail.com";

export const DEFAULT_SITE_URL = "https://www.jorgedesmond.com";

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  return process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : DEFAULT_SITE_URL;
}

export function normalizePublicEmail(email: unknown): string {
  const value = String(email ?? "").trim().toLowerCase();
  if (!value || value === LEGACY_CONTACT_EMAIL.toLowerCase()) return SITE_EMAIL;
  return String(email ?? SITE_EMAIL);
}
