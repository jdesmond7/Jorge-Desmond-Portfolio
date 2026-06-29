import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLocale, parseAcceptLanguage } from "@/lib/i18n/locale-utils";
import { LOCALE_COOKIE } from "@/lib/i18n/types";

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const current = request.cookies.get(LOCALE_COOKIE)?.value;

  if (!isLocale(current)) {
    const detected = parseAcceptLanguage(
      request.headers.get("accept-language"),
    );
    response.cookies.set(LOCALE_COOKIE, detected, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)"],
};
