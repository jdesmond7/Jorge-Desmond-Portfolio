import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

export type IdRouteContext = { params: Promise<{ id: string }> };

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export async function parseJsonBody(request: Request): Promise<unknown | null> {
  try {
    return await request.json();
  } catch {
    return null;
  }
}

export function enforceRateLimit(
  key: string,
  max: number,
  windowMs: number,
  message: string,
): NextResponse | null {
  if (!checkRateLimit(key, max, windowMs)) {
    return jsonError(message, 429);
  }
  return null;
}
