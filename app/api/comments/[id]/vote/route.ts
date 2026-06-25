import { NextResponse } from "next/server";
import { voteComment } from "@/lib/comments";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const VOTE_RATE_LIMIT = 30;
const VOTE_WINDOW_MS = 60 * 60 * 1000;

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const ip = getClientIp(request);

  if (!checkRateLimit(`vote:${ip}`, VOTE_RATE_LIMIT, VOTE_WINDOW_MS)) {
    return NextResponse.json(
      { error: "Demasiados votos. Intenta más tarde." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const direction =
    payload &&
    typeof payload === "object" &&
    (payload as { direction?: string }).direction;

  if (direction !== "up" && direction !== "down") {
    return NextResponse.json({ error: "Voto inválido." }, { status: 400 });
  }

  const comment = await voteComment(id, direction);
  if (!comment) {
    return NextResponse.json(
      { error: "No se pudo registrar el voto." },
      { status: 404 },
    );
  }

  return NextResponse.json({ comment });
}
