import "server-only";

import { MOCK_BLOG, MOCK_COMMENTS } from "./mock-data";
import type { Comment } from "./types";

const STRAPI_URL = process.env.STRAPI_URL?.replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

const MAX_BODY_LENGTH = 2000;
const MAX_AUTHOR_NAME_LENGTH = 80;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type StrapiRecord = Record<string, unknown>;

interface StrapiListResponse {
  data: StrapiRecord[];
}

interface StrapiSingleResponse {
  data: StrapiRecord | null;
}

function isStrapiConfigured(): boolean {
  return Boolean(STRAPI_URL && STRAPI_TOKEN);
}

function unwrap(record: StrapiRecord): StrapiRecord {
  if (record.attributes && typeof record.attributes === "object") {
    return record.attributes as StrapiRecord;
  }
  return record;
}

function getRelationId(relation: unknown): string | undefined {
  if (!relation) return undefined;
  if (typeof relation === "string") return relation;
  if (typeof relation !== "object") return undefined;
  const obj = relation as StrapiRecord;
  const id = obj.documentId ?? obj.id;
  return id ? String(id) : undefined;
}

function mapComment(record: StrapiRecord): Comment {
  const attrs = unwrap(record);
  const blogPost = attrs.blogPost;
  const parent = attrs.parent;

  return {
    id: String(record.documentId ?? record.id ?? ""),
    body: String(attrs.body ?? ""),
    authorName: attrs.authorName ? String(attrs.authorName) : undefined,
    blogPostId: getRelationId(blogPost) ?? "",
    parentId: getRelationId(parent),
    upvotes: Number(attrs.upvotes ?? 0),
    downvotes: Number(attrs.downvotes ?? 0),
    reportCount: Number(attrs.reportCount ?? 0),
    createdAt: String(attrs.createdAt ?? new Date().toISOString()),
    lastActivityAt: String(
      attrs.lastActivityAt ?? attrs.createdAt ?? new Date().toISOString(),
    ),
    replies: [],
  };
}

async function mutateStrapi<T>(
  path: string,
  method: "POST" | "PUT",
  body: unknown,
): Promise<T | null> {
  if (!isStrapiConfigured()) return null;

  try {
    const res = await fetch(`${STRAPI_URL}/api${path}`, {
      method,
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

async function fetchStrapiComments<T>(path: string): Promise<T | null> {
  if (!isStrapiConfigured()) return null;

  try {
    const res = await fetch(`${STRAPI_URL}/api${path}`, {
      headers: { Authorization: `Bearer ${STRAPI_TOKEN}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

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

async function resolveBlogPostId(slug: string): Promise<string | null> {
  if (!isStrapiConfigured()) {
    return MOCK_BLOG.find((post) => post.slug === slug)?.id ?? null;
  }

  const res = await fetchStrapiComments<StrapiListResponse>(
    `/blog-posts?filters[slug][$eq]=${encodeURIComponent(slug)}&fields[0]=slug&pagination[pageSize]=1`,
  );

  const record = res?.data?.[0];
  if (!record) return null;

  const id = String(record.documentId ?? record.id ?? "");
  return id || null;
}

export async function validateCommentTarget(
  postSlug: string,
  postId: string,
  parentId?: string,
): Promise<string | null> {
  const resolvedPostId = await resolveBlogPostId(postSlug);
  if (!resolvedPostId) return "Artículo no encontrado.";
  if (resolvedPostId !== postId) return "Datos del artículo inválidos.";

  if (!parentId) return null;

  if (!isStrapiConfigured()) {
    const parent = MOCK_COMMENTS.find((item) => item.id === parentId);
    if (!parent) return "Comentario padre no encontrado.";
    if (parent.blogPostSlug !== postSlug) {
      return "El comentario padre no pertenece a este artículo.";
    }
    return null;
  }

  const parentRes = await fetchStrapiComments<StrapiSingleResponse>(
    `/comments/${parentId}?populate[blogPost]=true&status=published`,
  );
  if (!parentRes?.data) return "Comentario padre no encontrado.";

  const parent = mapComment(parentRes.data);
  if (parent.blogPostId !== postId) {
    return "El comentario padre no pertenece a este artículo.";
  }

  return null;
}

export async function getCommentsByPostSlug(slug: string): Promise<Comment[]> {
  if (!isStrapiConfigured()) {
    const flat = MOCK_COMMENTS.filter((comment) => comment.blogPostSlug === slug);
    return sortCommentsByDate(buildCommentTree(flat.map(stripMockSlug)));
  }

  const res = await fetchStrapiComments<StrapiListResponse>(
    `/comments?filters[blogPost][slug][$eq]=${encodeURIComponent(slug)}` +
      "&populate[parent]=true&populate[blogPost]=true" +
      "&pagination[pageSize]=500&status=published",
  );

  if (!res?.data?.length) return [];
  const tree = buildCommentTree(res.data.map(mapComment));
  return sortCommentsByDate(tree);
}

function stripMockSlug(comment: Comment & { blogPostSlug?: string }): Comment {
  const copy = { ...comment };
  delete copy.blogPostSlug;
  return copy;
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

  if (!isStrapiConfigured()) {
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

  const data: StrapiRecord = {
    body: input.body.trim(),
    authorName: input.authorName?.trim() || null,
    authorEmail: input.authorEmail?.trim() || null,
    blogPost: input.postId,
    upvotes: 0,
    downvotes: 0,
    reportCount: 0,
    lastActivityAt: now,
    publishedAt: now,
  };

  if (input.parentId) {
    data.parent = input.parentId;
  }

  const res = await mutateStrapi<StrapiSingleResponse>(
    "/comments?status=published",
    "POST",
    { data },
  );

  if (!res?.data) return null;

  if (input.parentId) {
    await mutateStrapi(`/comments/${input.parentId}`, "PUT", {
      data: { lastActivityAt: now },
    });
  }

  return mapComment(res.data);
}

export async function voteComment(
  id: string,
  direction: "up" | "down",
): Promise<Comment | null> {
  if (!isStrapiConfigured()) {
    const comment = MOCK_COMMENTS.find((item) => item.id === id);
    if (!comment) return null;
    if (direction === "up") comment.upvotes += 1;
    else comment.downvotes += 1;
    return stripMockSlug(comment);
  }

  const current = await fetchStrapiComments<StrapiSingleResponse>(
    `/comments/${id}?status=published`,
  );
  if (!current?.data) return null;

  const mapped = mapComment(current.data);
  const data =
    direction === "up"
      ? { upvotes: mapped.upvotes + 1 }
      : { downvotes: mapped.downvotes + 1 };

  const res = await mutateStrapi<StrapiSingleResponse>(
    `/comments/${id}`,
    "PUT",
    { data },
  );
  if (!res?.data) return null;
  return mapComment(res.data);
}

export async function reportComment(id: string): Promise<Comment | null> {
  if (!isStrapiConfigured()) {
    const comment = MOCK_COMMENTS.find((item) => item.id === id);
    if (!comment) return null;
    comment.reportCount += 1;
    return stripMockSlug(comment);
  }

  const current = await fetchStrapiComments<StrapiSingleResponse>(
    `/comments/${id}?status=published`,
  );
  if (!current?.data) return null;

  const mapped = mapComment(current.data);
  const res = await mutateStrapi<StrapiSingleResponse>(
    `/comments/${id}`,
    "PUT",
    { data: { reportCount: mapped.reportCount + 1 } },
  );
  if (!res?.data) return null;
  return mapComment(res.data);
}
