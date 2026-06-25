import { NextResponse } from "next/server";
import {
  createComment,
  getCommentsByPostSlug,
  validateAuthorEmail,
  validateCommentBody,
} from "@/lib/comments";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import type { CommentSort } from "@/lib/types";

const SORT_VALUES: CommentSort[] = ["date", "rating", "activity"];
const COMMENT_RATE_LIMIT = 5;
const COMMENT_WINDOW_MS = 60 * 60 * 1000;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const sortParam = searchParams.get("sort") ?? "date";
  const sort = SORT_VALUES.includes(sortParam as CommentSort)
    ? (sortParam as CommentSort)
    : "date";

  if (!slug) {
    return NextResponse.json(
      { error: "Falta el parámetro slug." },
      { status: 400 },
    );
  }

  const comments = await getCommentsByPostSlug(slug, sort);
  return NextResponse.json({ comments });
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(`comment:${ip}`, COMMENT_RATE_LIMIT, COMMENT_WINDOW_MS)) {
    return NextResponse.json(
      { error: "Has publicado demasiados comentarios. Intenta más tarde." },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  if (!payload || typeof payload !== "object") {
    return NextResponse.json({ error: "Cuerpo inválido." }, { status: 400 });
  }

  const data = payload as Record<string, unknown>;

  if (typeof data.website === "string" && data.website.trim()) {
    return NextResponse.json({ comment: { id: "ok" } });
  }

  const bodyError = validateCommentBody(data.body);
  if (bodyError) {
    return NextResponse.json({ error: bodyError }, { status: 400 });
  }

  const emailError = validateAuthorEmail(data.authorEmail);
  if (emailError) {
    return NextResponse.json({ error: emailError }, { status: 400 });
  }

  const postSlug = typeof data.postSlug === "string" ? data.postSlug : "";
  const postId = typeof data.postId === "string" ? data.postId : "";
  if (!postSlug || !postId) {
    return NextResponse.json(
      { error: "Faltan datos del artículo." },
      { status: 400 },
    );
  }

  const parentId =
    typeof data.parentId === "string" && data.parentId.trim()
      ? data.parentId.trim()
      : undefined;

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
    return NextResponse.json(
      { error: "No se pudo guardar el comentario." },
      { status: 500 },
    );
  }

  return NextResponse.json({ comment }, { status: 201 });
}
