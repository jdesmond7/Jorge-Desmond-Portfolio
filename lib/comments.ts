import "server-only";

import { getAllBlogSlugsFromDisk } from "@/lib/content";
import { MOCK_COMMENTS } from "./mock-data";
import type { Comment } from "./types";

const MAX_BODY_LENGTH = 2000;
const MAX_AUTHOR_NAME_LENGTH = 80;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateCommentBody(body: unknown): string | null {
  if (typeof body !== "string") return "El comentario es obligatorio.";
  const trimmed = body.trim();
  if (!trimmed) return "El comentario es obligatorio.";
  if (trimmed.length > MAX_BODY_LENGTH) {
    return `El comentario no puede superar ${MAX_BODY_LENGTH} caracteres.`;
  }
  return null;
}

export function validateAuthorName(name: unknown): string | null {
  if (name === undefined || name === null || name === "") return null;
  if (typeof name !== "string") return "Nombre inválido.";
  const trimmed = name.trim();
  if (!trimmed) return null;
  if (trimmed.length > MAX_AUTHOR_NAME_LENGTH) {
    return `El nombre no puede superar ${MAX_AUTHOR_NAME_LENGTH} caracteres.`;
  }
  return null;
}

export function validateAuthorEmail(email: unknown): string | null {
  if (email === undefined || email === null || email === "") return null;
  if (typeof email !== "string") return "Correo inválido.";
  const trimmed = email.trim();
  if (!trimmed) return null;
  if (!EMAIL_REGEX.test(trimmed)) return "Correo inválido.";
  return null;
}

function buildCommentTree(flat: Comment[]): Comment[] {
  const byId = new Map<string, Comment>();
  const roots: Comment[] = [];

  for (const comment of flat) {
    byId.set(comment.id, { ...comment, replies: [] });
  }

  for (const comment of byId.values()) {
    if (comment.parentId && byId.has(comment.parentId)) {
      byId.get(comment.parentId)!.replies.push(comment);
    } else {
      roots.push(comment);
    }
  }

  return roots;
}

function sortCommentsByDate(comments: Comment[]): Comment[] {
  const sorted = [...comments];

  sorted.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return sorted.map((comment) => ({
    ...comment,
    replies: sortCommentsByDate(comment.replies),
  }));
}

function resolveBlogPostId(slug: string): string | null {
  // Markdown posts use the slug as a stable id.
  return getAllBlogSlugsFromDisk().includes(slug) ? slug : null;
}

function stripMockSlug(comment: Comment & { blogPostSlug?: string }): Comment {
  const copy = { ...comment };
  delete copy.blogPostSlug;
  return copy;
}

export async function validateCommentTarget(
  postSlug: string,
  postId: string,
  parentId?: string,
): Promise<string | null> {
  const resolvedPostId = resolveBlogPostId(postSlug);
  if (!resolvedPostId) return "Artículo no encontrado.";
  if (resolvedPostId !== postId) return "Datos del artículo inválidos.";

  if (!parentId) return null;

  const parent = MOCK_COMMENTS.find((item) => item.id === parentId);
  if (!parent) return "Comentario padre no encontrado.";
  if (parent.blogPostSlug !== postSlug) {
    return "El comentario padre no pertenece a este artículo.";
  }
  return null;
}

export async function getCommentsByPostSlug(slug: string): Promise<Comment[]> {
  const flat = MOCK_COMMENTS.filter((comment) => comment.blogPostSlug === slug);
  return sortCommentsByDate(buildCommentTree(flat.map(stripMockSlug)));
}

interface CreateCommentInput {
  postSlug: string;
  postId: string;
  body: string;
  authorName?: string;
  authorEmail?: string;
  parentId?: string;
}

export async function createComment(
  input: CreateCommentInput,
): Promise<Comment | null> {
  const now = new Date().toISOString();
  const id = `mock-${Date.now()}`;
  const comment: Comment = {
    id,
    body: input.body.trim(),
    authorName: input.authorName?.trim() || undefined,
    blogPostId: input.postId,
    parentId: input.parentId,
    upvotes: 0,
    downvotes: 0,
    reportCount: 0,
    createdAt: now,
    lastActivityAt: now,
    replies: [],
  };

  MOCK_COMMENTS.push({
    ...comment,
    blogPostSlug: input.postSlug,
  });

  if (input.parentId) {
    const parent = MOCK_COMMENTS.find((item) => item.id === input.parentId);
    if (parent) parent.lastActivityAt = now;
  }

  return comment;
}

export async function voteComment(
  id: string,
  direction: "up" | "down",
): Promise<Comment | null> {
  const comment = MOCK_COMMENTS.find((item) => item.id === id);
  if (!comment) return null;
  if (direction === "up") comment.upvotes += 1;
  else comment.downvotes += 1;
  return stripMockSlug(comment);
}

export async function reportComment(id: string): Promise<Comment | null> {
  const comment = MOCK_COMMENTS.find((item) => item.id === id);
  if (!comment) return null;
  comment.reportCount += 1;
  return stripMockSlug(comment);
}
