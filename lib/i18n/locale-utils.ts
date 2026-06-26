import type { Locale } from "./types";
import { DEFAULT_LOCALE, LOCALES } from "./types";

export function isLocale(value: string | undefined | null): value is Locale {
  return value === "es" || value === "en";
}

export function parseAcceptLanguage(header: string | null): Locale {
  if (!header) return DEFAULT_LOCALE;

  const preferred = header
    .split(",")
    .map((part) => part.trim().split(";")[0]?.toLowerCase())
    .filter(Boolean);

  for (const lang of preferred) {
    if (lang.startsWith("en")) return "en";
    if (lang.startsWith("es")) return "es";
  }

  return DEFAULT_LOCALE;
}

export function localeToOpenGraph(locale: Locale): string {
  return locale === "en" ? "en_US" : "es_MX";
}

export function localeToDateLocale(locale: Locale): string {
  return locale === "en" ? "en-US" : "es-MX";
}

export function assertLocale(value: string): Locale {
  return isLocale(value) && LOCALES.includes(value) ? value : DEFAULT_LOCALE;
}
