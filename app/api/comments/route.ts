import { NextResponse } from "next/server";
import {
  createComment,
  getCommentsByPostSlug,
  validateAuthorEmail,
  validateAuthorName,
  validateCommentBody,
  validateCommentTarget,
} from "@/lib/comments";
import { enforceRateLimit, jsonError, parseJsonBody } from "@/lib/api/route-utils";
import { getClientIp } from "@/lib/rate-limit";

const COMMENT_RATE_LIMIT = 5;
const COMMENT_READ_RATE_LIMIT = 120;
const COMMENT_WINDOW_MS = 60 * 60 * 1000;

export async function GET(request: Request) {
  const ip = getClientIp(request);
  const limited = enforceRateLimit(
    `comments-read:${ip}`,
    COMMENT_READ_RATE_LIMIT,
    COMMENT_WINDOW_MS,
    "Demasiadas solicitudes. Intenta más tarde.",
  );
  if (limited) return limited;

  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return jsonError("Falta el parámetro slug.", 400);
  }

  const comments = await getCommentsByPostSlug(slug);
  return NextResponse.json({ comments });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const limited = enforceRateLimit(
    `comment:${ip}`,
    COMMENT_RATE_LIMIT,
    COMMENT_WINDOW_MS,
    "Has publicado demasiados comentarios. Intenta más tarde.",
  );
  if (limited) return limited;

  const payload = await parseJsonBody(request);
  if (payload === null) return jsonError("Cuerpo inválido.", 400);
  if (!payload || typeof payload !== "object") {
    return jsonError("Cuerpo inválido.", 400);
  }

  const data = payload as Record<string, unknown>;

  if (typeof data.website === "string" && data.website.trim()) {
    return NextResponse.json({ comment: { id: "ok" } });
  }

  const bodyError = validateCommentBody(data.body);
  if (bodyError) return jsonError(bodyError, 400);

  const nameError = validateAuthorName(data.authorName);
  if (nameError) return jsonError(nameError, 400);

  const emailError = validateAuthorEmail(data.authorEmail);
  if (emailError) return jsonError(emailError, 400);

  const postSlug = typeof data.postSlug === "string" ? data.postSlug : "";
  const postId = typeof data.postId === "string" ? data.postId : "";
  if (!postSlug || !postId) {
    return jsonError("Faltan datos del artículo.", 400);
  }

  const parentId =
    typeof data.parentId === "string" && data.parentId.trim()
      ? data.parentId.trim()
      : undefined;

  const targetError = await validateCommentTarget(postSlug, postId, parentId);
  if (targetError) return jsonError(targetError, 400);

  const authorName =
    typeof data.authorName === "string" ? data.authorName : undefined;
  const authorEmail =
    typeof data.authorEmail === "string" ? data.authorEmail : undefined;

  const comment = await createComment({
    postSlug,
    postId,
    body: String(data.body),
    authorName,
    authorEmail,
    parentId,
  });

  if (!comment) {
    return jsonError("No se pudo guardar el comentario.", 500);
  }

  return NextResponse.json({ comment }, { status: 201 });
}
