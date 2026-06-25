import { NextResponse } from "next/server";
import { reportComment } from "@/lib/comments";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const REPORT_RATE_LIMIT = 10;
const REPORT_WINDOW_MS = 60 * 60 * 1000;

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const ip = getClientIp(request);

  if (!checkRateLimit(`report:${ip}`, REPORT_RATE_LIMIT, REPORT_WINDOW_MS)) {
    return NextResponse.json(
      { error: "Demasiados reportes. Intenta más tarde." },
      { status: 429 },
    );
  }

  const comment = await reportComment(id);
  if (!comment) {
    return NextResponse.json(
      { error: "No se pudo reportar el comentario." },
      { status: 404 },
    );
  }

  return NextResponse.json({ comment });
}
