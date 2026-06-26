import { NextResponse } from "next/server";
import { voteComment } from "@/lib/comments";
import {
  enforceRateLimit,
  jsonError,
  parseJsonBody,
  type IdRouteContext,
} from "@/lib/api/route-utils";
import { getClientIp } from "@/lib/rate-limit";

const VOTE_RATE_LIMIT = 30;
const VOTE_WINDOW_MS = 60 * 60 * 1000;
const VOTE_PER_COMMENT_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

export async function POST(request: Request, context: IdRouteContext) {
  const { id } = await context.params;
  const ip = getClientIp(request);

  const perCommentLimit = enforceRateLimit(
    `vote:${ip}:${id}`,
    1,
    VOTE_PER_COMMENT_WINDOW_MS,
    "Ya registraste un voto en este comentario.",
  );
  if (perCommentLimit) return perCommentLimit;

  const globalLimit = enforceRateLimit(
    `vote:${ip}`,
    VOTE_RATE_LIMIT,
    VOTE_WINDOW_MS,
    "Demasiados votos. Intenta más tarde.",
  );
  if (globalLimit) return globalLimit;

  const payload = await parseJsonBody(request);
  if (payload === null) return jsonError("Cuerpo inválido.", 400);

  const direction =
    payload &&
    typeof payload === "object" &&
    (payload as { direction?: string }).direction;

  if (direction !== "up" && direction !== "down") {
    return jsonError("Voto inválido.", 400);
  }

  const comment = await voteComment(id, direction);
  if (!comment) {
    return jsonError("No se pudo registrar el voto.", 404);
  }

  return NextResponse.json({ comment });
}
