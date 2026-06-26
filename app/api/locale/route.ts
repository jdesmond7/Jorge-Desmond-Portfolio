import { NextResponse } from "next/server";
import { assertLocale } from "@/lib/i18n/locale-utils";
import { LOCALE_COOKIE } from "@/lib/i18n/types";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const locale =
    payload &&
    typeof payload === "object" &&
    typeof (payload as { locale?: string }).locale === "string"
      ? assertLocale((payload as { locale: string }).locale)
      : null;

  if (!locale) {
    return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
  }

  const response = NextResponse.json({ locale });
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  return response;
}
