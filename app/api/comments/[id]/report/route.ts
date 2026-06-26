import { NextResponse } from "next/server";
import { reportComment } from "@/lib/comments";
import {
  enforceRateLimit,
  jsonError,
  type IdRouteContext,
} from "@/lib/api/route-utils";
import { getClientIp } from "@/lib/rate-limit";

const REPORT_RATE_LIMIT = 10;
const REPORT_WINDOW_MS = 60 * 60 * 1000;
const REPORT_PER_COMMENT_WINDOW_MS = 24 * 60 * 60 * 1000;

export async function POST(_request: Request, context: IdRouteContext) {
  const { id } = await context.params;
  const ip = getClientIp(_request);

  const perCommentLimit = enforceRateLimit(
    `report:${ip}:${id}`,
    1,
    REPORT_PER_COMMENT_WINDOW_MS,
    "Ya reportaste este comentario.",
  );
  if (perCommentLimit) return perCommentLimit;

  const globalLimit = enforceRateLimit(
    `report:${ip}`,
    REPORT_RATE_LIMIT,
    REPORT_WINDOW_MS,
    "Demasiados reportes. Intenta más tarde.",
  );
  if (globalLimit) return globalLimit;

  const comment = await reportComment(id);
  if (!comment) {
    return jsonError("No se pudo reportar el comentario.", 404);
  }

  return NextResponse.json({ comment });
}
