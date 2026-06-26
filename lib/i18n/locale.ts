import { cookies, headers } from "next/headers";
import type { Locale } from "./types";
import { DEFAULT_LOCALE } from "./types";
import { isLocale, parseAcceptLanguage } from "./locale-utils";

export {
  assertLocale,
  isLocale,
  localeToDateLocale,
  localeToOpenGraph,
  parseAcceptLanguage,
} from "./locale-utils";

export async function getLocale(): Promise<Locale> {
  try {
    const cookieStore = await cookies();
    const fromCookie = cookieStore.get("locale")?.value;
    if (isLocale(fromCookie)) return fromCookie;

    const headerStore = await headers();
    return parseAcceptLanguage(headerStore.get("accept-language"));
  } catch {
    return DEFAULT_LOCALE;
  }
}
