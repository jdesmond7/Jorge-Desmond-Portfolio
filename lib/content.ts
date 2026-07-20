import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Locale } from "@/lib/i18n/types";
import { rewriteLegacyImageUrl, rewriteLegacyImageUrlsInMarkdown } from "@/lib/images";
import type {
  BlogDocument,
  BlogFrontmatter,
  ContentLocale,
  Project,
  ProjectFrontmatter,
  ProjectMetric,
} from "@/types/content";

const CONTENT_ROOT = path.join(process.cwd(), "content");

function toContentLocale(locale: Locale | ContentLocale): ContentLocale {
  return locale === "en" ? "en" : "es";
}

function projectsDir(locale: ContentLocale): string {
  return path.join(CONTENT_ROOT, "projects", locale);
}

function pagesDir(locale: ContentLocale): string {
  return path.join(CONTENT_ROOT, "pages", locale);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : undefined;
}

function asStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value
    .map((item) => asString(item))
    .filter((item): item is string => Boolean(item));
  return items.length ? items : undefined;
}

function parseMetrics(value: unknown): ProjectMetric[] | undefined {
  if (!Array.isArray(value)) return undefined;

  const metrics = value
    .map((entry) => {
      if (!isRecord(entry)) return null;
      const metricValue = asString(entry.value) ?? "";
      const label =
        asString(entry.label) ?? asString(entry.title) ?? "";
      if (!metricValue && !label) return null;
      return { value: metricValue, label };
    })
    .filter((metric): metric is ProjectMetric => metric !== null);

  return metrics.length ? metrics : undefined;
}

function parseFrontmatter(
  data: Record<string, unknown>,
  fallbackSlug: string,
  locale: ContentLocale,
): ProjectFrontmatter {
  const type = asString(data.type);
  const parsedType =
    type === "parent" || type === "child" ? type : undefined;

  return {
    title: asString(data.title) ?? fallbackSlug,
    slug: asString(data.slug) ?? fallbackSlug,
    locale: (asString(data.locale) as ContentLocale | undefined) ?? locale,
    type: parsedType,
    problem: asString(data.problem),
    description: asString(data.description) ?? "",
    year: asString(data.year),
    client: asString(data.client),
    duration: asString(data.duration),
    roles: asString(data.roles),
    team: asString(data.team),
    tools: asString(data.tools),
    tags: asStringArray(data.tags),
    learning: asString(data.learning),
    metrics: parseMetrics(data.metrics),
    page_title: asString(data.page_title),
    company: asString(data.company),
    order: typeof data.order === "number" ? data.order : undefined,
    showInHome: typeof data.showInHome === "boolean" ? data.showInHome : undefined,
    coverImage: asString(data.coverImage)
      ? rewriteLegacyImageUrl(asString(data.coverImage)!)
      : undefined,
    gallery: asStringArray(data.gallery)?.map(rewriteLegacyImageUrl),
    parentSlug: asString(data.parentSlug),
    overviewTitle: asString(data.overviewTitle),
    overviewBodyText: asString(data.overviewBodyText),
    challengeTitle: asString(data.challengeTitle),
    challengeBodyText: asString(data.challengeBodyText),
    heroImage: asString(data.heroImage)
      ? rewriteLegacyImageUrl(asString(data.heroImage)!)
      : undefined,
    images: asStringArray(data.images)?.map(rewriteLegacyImageUrl),
  };
}

function readMarkdownFile(
  filePath: string,
  locale: ContentLocale,
): Project | null {
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fallbackSlug = path.basename(filePath, path.extname(filePath));
  const frontmatter = parseFrontmatter(
    isRecord(data) ? data : {},
    fallbackSlug,
    locale,
  );

  return {
    frontmatter,
    content: rewriteLegacyImageUrlsInMarkdown(content.trim()),
  };
}

function listMarkdownSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""))
    .sort((a, b) => a.localeCompare(b));
}

function readProjectFile(
  fileSlug: string,
  locale: ContentLocale,
): Project | null {
  return readMarkdownFile(
    path.join(projectsDir(locale), `${fileSlug}.md`),
    locale,
  );
}

/**
 * Resolves a project by frontmatter `slug` (URL slug), not necessarily the
 * markdown filename. Falls back to a same-named file when present.
 */
export function getProjectBySlug(
  slug: string,
  locale: Locale | ContentLocale,
): Project | null {
  const contentLocale = toContentLocale(locale);
  const dir = projectsDir(contentLocale);

  const direct = readProjectFile(slug, contentLocale);
  if (direct?.frontmatter.slug === slug) return direct;

  for (const fileSlug of listMarkdownSlugs(dir)) {
    const doc = readProjectFile(fileSlug, contentLocale);
    if (doc?.frontmatter.slug === slug) return doc;
  }

  return null;
}

/** Reads all project markdown files for a locale (stable order by `order`, then slug). */
export function getAllProjects(
  locale: Locale | ContentLocale,
): Project[] {
  const contentLocale = toContentLocale(locale);
  const dir = projectsDir(contentLocale);

  return listMarkdownSlugs(dir)
    .map((fileSlug) => readProjectFile(fileSlug, contentLocale))
    .filter((doc): doc is Project => doc !== null)
    .sort((a, b) => {
      const orderA = a.frontmatter.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.frontmatter.order ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return a.frontmatter.slug.localeCompare(b.frontmatter.slug);
    });
}

/** Reads `/content/pages/{locale}/{slug}.md` (e.g. about). */
export function getPageBySlug(
  slug: string,
  locale: Locale | ContentLocale,
): Project | null {
  const contentLocale = toContentLocale(locale);
  return readMarkdownFile(
    path.join(pagesDir(contentLocale), `${slug}.md`),
    contentLocale,
  );
}

export function getAllProjectSlugsFromDisk(): string[] {
  const slugs = new Set<string>();

  for (const locale of ["es", "en"] as const) {
    for (const doc of getAllProjects(locale)) {
      slugs.add(doc.frontmatter.slug);
    }
  }

  return [...slugs].sort((a, b) => a.localeCompare(b));
}

function blogRoot(): string {
  return path.join(CONTENT_ROOT, "blog");
}

function walkMarkdownFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function normalizeBlogUploadFilename(filename: string): string {
  return filename
    .replace(/_[a-f0-9]{8,}(?=\.[a-z0-9]+$)/i, "")
    .replace(/_/g, "-");
}

function rewriteBlogImageUrl(src: string): string {
  const rewritten = rewriteLegacyImageUrl(src);
  if (
    rewritten.startsWith("/images/") &&
    !rewritten.startsWith("/images/blog/") &&
    !rewritten.startsWith("/images/projects/")
  ) {
    const file = rewritten.slice("/images/".length);
    return `/images/blog/${normalizeBlogUploadFilename(file)}`;
  }
  return rewritten;
}

function rewriteBlogImageUrlsInMarkdown(markdown: string): string {
  return markdown.replace(
    /(!\[[^\]]*]\()([^)\s]+)(\))/g,
    (_match, prefix: string, url: string, suffix: string) =>
      `${prefix}${rewriteBlogImageUrl(url)}${suffix}`,
  );
}

function parseBlogFrontmatter(
  data: Record<string, unknown>,
  fallbackSlug: string,
  locale: ContentLocale,
): BlogFrontmatter {
  return {
    title: asString(data.title) ?? fallbackSlug,
    slug: asString(data.slug) ?? fallbackSlug,
    locale: (asString(data.locale) as ContentLocale | undefined) ?? locale,
    date: asString(data.date) ?? "1970-01-01",
    excerpt: asString(data.excerpt) ?? "",
    tags: asStringArray(data.tags),
    coverImage: asString(data.coverImage)
      ? rewriteBlogImageUrl(asString(data.coverImage)!)
      : undefined,
  };
}

function stripLeadingH1(content: string): string {
  const trimmed = content.trimStart();
  if (!trimmed.startsWith("# ")) return content;
  const nextNewline = trimmed.indexOf("\n");
  if (nextNewline === -1) return "";
  return trimmed.slice(nextNewline + 1).trimStart();
}

function readBlogFile(
  filePath: string,
  locale: ContentLocale,
): BlogDocument | null {
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fallbackSlug = path.basename(filePath, path.extname(filePath));
  const frontmatter = parseBlogFrontmatter(
    isRecord(data) ? data : {},
    fallbackSlug,
    locale,
  );

  return {
    frontmatter,
    content: stripLeadingH1(rewriteBlogImageUrlsInMarkdown(content.trim())),
  };
}

/**
 * Blog files live at `content/blog/{year}/{month}/{locale}/{slug}.md`.
 * Discovers every markdown file whose path contains `/{locale}/`.
 */
export function getAllBlogPosts(
  locale: Locale | ContentLocale,
): BlogDocument[] {
  const contentLocale = toContentLocale(locale);
  const localeSegment = `${path.sep}${contentLocale}${path.sep}`;

  return walkMarkdownFiles(blogRoot())
    .filter((filePath) => filePath.includes(localeSegment))
    .map((filePath) => readBlogFile(filePath, contentLocale))
    .filter((doc): doc is BlogDocument => doc !== null)
    .sort((a, b) => {
      const byDate = b.frontmatter.date.localeCompare(a.frontmatter.date);
      if (byDate !== 0) return byDate;
      return a.frontmatter.slug.localeCompare(b.frontmatter.slug);
    });
}

export function getBlogPostBySlugFromDisk(
  slug: string,
  locale: Locale | ContentLocale,
): BlogDocument | null {
  return (
    getAllBlogPosts(locale).find((doc) => doc.frontmatter.slug === slug) ??
    null
  );
}

export function getAllBlogSlugsFromDisk(): string[] {
  const slugs = new Set<string>();

  for (const locale of ["es", "en"] as const) {
    for (const doc of getAllBlogPosts(locale)) {
      slugs.add(doc.frontmatter.slug);
    }
  }

  return [...slugs].sort((a, b) => a.localeCompare(b));
}
