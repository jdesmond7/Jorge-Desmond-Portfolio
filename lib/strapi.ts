import "server-only";

import {
  MOCK_ABOUT,
  MOCK_BLOG,
  MOCK_HOME,
  MOCK_PROJECTS,
  MOCK_SITE_SETTINGS,
} from "./mock-data";
import { getDictionary } from "./i18n";
import { getLocale } from "./i18n/locale";
import {
  localizeAbout,
  localizeBlogPost,
  localizeHome,
  localizeProject,
  localizeProjects,
  localizeSiteSettings,
} from "./i18n/localize";
import { normalizePublicEmail } from "./site";
import type {
  AboutContent,
  BlogPost,
  HomeContent,
  NavLink,
  Project,
  ProjectMetric,
  ProjectNavigation,
  ProjectNavItem,
  ProjectSummary,
  SiteSettings,
  StackItem,
  Stat,
} from "./types";

const STRAPI_URL = process.env.STRAPI_URL?.replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

/** Número de casos de estudio mostrados en home (los más recientes). */
const HOME_PROJECTS_LIMIT = 3;

function joinStrapiUrl(path: string): string {
  if (!STRAPI_URL) return path;
  return `${STRAPI_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function isStrapiConfigured(): boolean {
  return Boolean(STRAPI_URL);
}

async function fetchStrapi<T>(path: string): Promise<T | null> {
  if (!isStrapiConfigured()) return null;

  const headers: HeadersInit = {};
  if (STRAPI_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }

  try {
    const isDev = process.env.NODE_ENV === "development";
    const res = await fetch(`${STRAPI_URL}/api${path}`, {
      headers,
      ...(isDev ? { cache: "no-store" } : { next: { revalidate: 60 } }),
    });
    if (!res.ok) return null;
    return res.json() as Promise<T>;
  } catch {
    return null;
  }
}

type StrapiRecord = Record<string, unknown>;

interface StrapiListResponse {
  data: StrapiRecord[];
}

interface StrapiSingleResponse {
  data: StrapiRecord | null;
}

function unwrap(record: StrapiRecord): StrapiRecord {
  if (record.attributes && typeof record.attributes === "object") {
    return record.attributes as StrapiRecord;
  }
  return record;
}

function getMediaUrl(media: unknown): string | undefined {
  if (!media) return undefined;

  if (typeof media === "object") {
    const obj = media as StrapiRecord;

    if (typeof obj.url === "string" && obj.url.length > 0) {
      return obj.url.startsWith("http") ? obj.url : joinStrapiUrl(obj.url);
    }

    const formats = obj.formats as StrapiRecord | undefined;
    if (formats && typeof formats === "object") {
      for (const key of ["large", "medium", "small", "thumbnail"]) {
        const format = formats[key] as StrapiRecord | undefined;
        if (format && typeof format.url === "string" && format.url.length > 0) {
          return format.url.startsWith("http")
            ? format.url
            : joinStrapiUrl(format.url);
        }
      }
    }

    const data = obj.data as StrapiRecord | StrapiRecord[] | null | undefined;
    if (Array.isArray(data)) {
      const first = data[0];
      return first ? getMediaUrl(first) : undefined;
    }
    if (data && typeof data === "object") {
      return getMediaUrl(unwrap(data));
    }
  }

  return undefined;
}

function getMediaUrls(media: unknown): string[] {
  if (!media) return [];

  if (Array.isArray(media)) {
    return media.flatMap((item) => {
      const url = getMediaUrl(item);
      return url ? [url] : [];
    });
  }

  if (typeof media === "object") {
    const obj = media as StrapiRecord;
    const data = obj.data;
    if (Array.isArray(data)) {
      return data.flatMap((item) => {
        const url = getMediaUrl(item);
        return url ? [url] : [];
      });
    }
  }

  const single = getMediaUrl(media);
  return single ? [single] : [];
}

function dedupeProjectsBySlug(projects: Project[]): Project[] {
  const bySlug = new Map<string, Project>();

  for (const project of projects) {
    const existing = bySlug.get(project.slug);
    if (!existing) {
      bySlug.set(project.slug, project);
      continue;
    }

    const projectDate = project.publishedAt ?? "";
    const existingDate = existing.publishedAt ?? "";
    if (projectDate.localeCompare(existingDate) > 0) {
      bySlug.set(project.slug, project);
    }
  }

  return [...bySlug.values()];
}
function sortProjectsByRecency(projects: Project[]): Project[] {
  return dedupeProjectsBySlug(projects).sort((a, b) => {
    const dateA = a.publishedAt ?? "";
    const dateB = b.publishedAt ?? "";
    if (dateA !== dateB) return dateB.localeCompare(dateA);
    return (a.order ?? 0) - (b.order ?? 0);
  });
}

function unwrapRelationList(value: unknown): StrapiRecord[] {
  if (!value) return [];
  if (Array.isArray(value)) return value as StrapiRecord[];
  if (typeof value === "object") {
    const data = (value as StrapiRecord).data;
    if (Array.isArray(data)) return data as StrapiRecord[];
  }
  return [];
}

function unwrapRelation(value: unknown): StrapiRecord | undefined {
  if (!value || typeof value !== "object") return undefined;
  const obj = value as StrapiRecord;
  if (obj.data && typeof obj.data === "object") {
    return obj.data as StrapiRecord;
  }
  if (obj.slug || obj.id || obj.documentId) return obj;
  return undefined;
}

function mapMetrics(value: unknown): ProjectMetric[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      const item = unwrap(entry as StrapiRecord);
      const title = String(item.title ?? item.label ?? "");
      const description = item.description
        ? String(item.description)
        : undefined;
      return {
        value: String(item.value ?? ""),
        title,
        description,
      };
    })
    .filter((m) => m.value || m.title);
}

function joinLegacyList(value: unknown): string | undefined {
  if (Array.isArray(value)) {
    const items = value.map((item) => String(item).trim()).filter(Boolean);
    return items.length ? items.join(" · ") : undefined;
  }
  if (typeof value === "string" && value.trim()) return value.trim();
  return undefined;
}

function mapProjectSummary(
  value: unknown,
  attrs: StrapiRecord,
  mock?: Project,
): ProjectSummary | undefined {
  const item =
    value && typeof value === "object"
      ? unwrap(value as StrapiRecord)
      : undefined;

  const summary: ProjectSummary = {
    duration: item?.duration
      ? String(item.duration)
      : (mock?.projectSummary?.duration ??
        (attrs.year ? String(attrs.year) : undefined)),
    roles: item?.roles
      ? String(item.roles)
      : joinLegacyList(attrs.roles) ?? mock?.projectSummary?.roles,
    team: item?.team
      ? String(item.team)
      : joinLegacyList(attrs.team) ?? mock?.projectSummary?.team,
    tools: item?.tools
      ? String(item.tools)
      : joinLegacyList(attrs.tools) ?? mock?.projectSummary?.tools,
  };

  const hasContent = Boolean(
    summary.duration || summary.roles || summary.team || summary.tools,
  );
  return hasContent ? summary : undefined;
}

function mapProject(record: StrapiRecord): Project {
  const a = unwrap(record);
  const slug = String(a.slug ?? "");
  const mock = MOCK_PROJECTS.find((p) => p.slug === slug);

  const children = unwrapRelationList(a.children)
    .map(mapProject)
    .sort((c1, c2) => (c1.order ?? 0) - (c2.order ?? 0));

  const parentRecord = unwrapRelation(a.parent);
  const parentAttrs = parentRecord ? unwrap(parentRecord) : undefined;

  return {
    id: String(record.documentId ?? record.id ?? ""),
    slug,
    company: String(a.company ?? ""),
    year: String(a.year ?? ""),
    title: String(a.title ?? ""),
    problem: String(a.problem ?? mock?.problem ?? ""),
    description: String(a.description ?? ""),
    tags: unwrapRelationList(a.tags)
      .map((t) => String(unwrap(t).name ?? ""))
      .filter(Boolean),
    metrics: mapMetrics(a.metrics),
    featured: Boolean(a.featured),
    order: Number(a.order ?? 0),
    publishedAt: a.publishedAt ? String(a.publishedAt) : undefined,
    body: a.body ? String(a.body) : undefined,
    coverImage: getMediaUrl(a.coverImage),
    gallery: getMediaUrls(a.gallery),
    projectSummary: mapProjectSummary(a.projectSummary, a, mock),
    isParent: Boolean(a.isParent),
    showInHome: Boolean(a.showInHome),
    overviewTitle: a.overviewTitle ? String(a.overviewTitle) : undefined,
    overviewBodyText: a.overviewBodyText
      ? String(a.overviewBodyText)
      : a.overviewHighlight
        ? String(a.overviewHighlight)
        : a.overview
          ? String(a.overview)
          : undefined,
    challengeTitle: a.challengeTitle ? String(a.challengeTitle) : undefined,
    challengeBodyText: a.challengeBodyText
      ? String(a.challengeBodyText)
      : a.challengeHighlight
        ? String(a.challengeHighlight)
        : a.challenge
          ? String(a.challenge)
          : undefined,
    learning: a.learning ? String(a.learning) : undefined,
    children: children.length ? children : undefined,
    parentSlug: parentAttrs?.slug ? String(parentAttrs.slug) : undefined,
    parentTitle: parentAttrs?.title ? String(parentAttrs.title) : undefined,
  };
}

function mapBlogPost(record: StrapiRecord): BlogPost {
  const a = unwrap(record);
  return {
    id: String(record.documentId ?? record.id ?? ""),
    slug: String(a.slug ?? ""),
    title: String(a.title ?? ""),
    excerpt: String(a.excerpt ?? ""),
    publishedAt: String(a.publishedAt ?? ""),
    coverImage: getMediaUrl(a.coverImage),
    body: a.body ? String(a.body) : undefined,
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const res = await fetchStrapi<StrapiSingleResponse>(
    "/site-setting?populate[navLinks]=*",
  );
  if (!res?.data) {
    const locale = await getLocale();
    return localizeSiteSettings(MOCK_SITE_SETTINGS, locale);
  }

  const a = unwrap(res.data);
  const navLinks = Array.isArray(a.navLinks)
    ? (a.navLinks as NavLink[])
    : MOCK_SITE_SETTINGS.navLinks;

  const settings: SiteSettings = {
    siteName: String(a.siteName ?? MOCK_SITE_SETTINGS.siteName),
    email: normalizePublicEmail(a.email ?? MOCK_SITE_SETTINGS.email),
    linkedin: String(a.linkedin ?? MOCK_SITE_SETTINGS.linkedin),
    instagram: a.instagram
      ? String(a.instagram)
      : MOCK_SITE_SETTINGS.instagram,
    navLinks,
    footerText: String(a.footerText ?? MOCK_SITE_SETTINGS.footerText),
  };
  const locale = await getLocale();
  return localizeSiteSettings(settings, locale);
}

export async function getHomeContent(): Promise<HomeContent> {
  const res = await fetchStrapi<StrapiSingleResponse>(
    "/home?populate[stats]=true&populate[stackItems]=true&populate[heroImage]=true",
  );
  if (!res?.data) {
    const locale = await getLocale();
    return localizeHome(MOCK_HOME, locale);
  }

  const a = unwrap(res.data);
  const home: HomeContent = {
    heroGreeting: String(a.heroGreeting ?? MOCK_HOME.heroGreeting),
    heroName: String(a.heroName ?? MOCK_HOME.heroName),
    heroTitle: String(a.heroTitle ?? MOCK_HOME.heroTitle),
    heroSubtitle: String(a.heroSubtitle ?? MOCK_HOME.heroSubtitle),
    heroImage: getMediaUrl(a.heroImage) ?? MOCK_HOME.heroImage,
    trustBadges: Array.isArray(a.trustBadges)
      ? (a.trustBadges as string[])
      : MOCK_HOME.trustBadges,
    stats: Array.isArray(a.stats) ? (a.stats as Stat[]) : MOCK_HOME.stats,
    stackItems: Array.isArray(a.stackItems)
      ? (a.stackItems as StackItem[])
      : MOCK_HOME.stackItems,
    aboutTitle: String(a.aboutTitle ?? MOCK_HOME.aboutTitle),
    aboutTeaser: String(a.aboutTeaser ?? MOCK_HOME.aboutTeaser),
    ctaTitle: String(a.ctaTitle ?? MOCK_HOME.ctaTitle),
    ctaSubtitle: String(a.ctaSubtitle ?? MOCK_HOME.ctaSubtitle),
    email: normalizePublicEmail(a.email ?? MOCK_HOME.email),
    linkedin: String(a.linkedin ?? MOCK_HOME.linkedin),
  };
  const locale = await getLocale();
  return localizeHome(home, locale);
}

function mergeProjectMedia(base: Project, fromStrapi?: Project): Project {
  if (!fromStrapi) return base;
  return {
    ...base,
    coverImage: fromStrapi.coverImage ?? base.coverImage,
    gallery: fromStrapi.gallery?.length ? fromStrapi.gallery : base.gallery,
  };
}

async function enrichProjectsWithStrapiMedia(
  projects: Project[],
): Promise<Project[]> {
  if (!projects.length || !isStrapiConfigured()) return projects;

  const res = await fetchStrapi<StrapiListResponse>(
    "/proyectos?populate[coverImage]=true&populate[gallery]=true&pagination[pageSize]=200",
  );
  if (!res?.data?.length) return projects;

  const bySlug = new Map(
    res.data.map((record) => {
      const project = mapProject(record);
      return [project.slug, project] as const;
    }),
  );

  return projects.map((project) =>
    mergeProjectMedia(project, bySlug.get(project.slug)),
  );
}

/** Solo proyectos de nivel superior (padres y proyectos sin padre). */
function topLevelMockProjects(): Project[] {
  return MOCK_PROJECTS.filter((p) => !p.parentSlug);
}

/** Adjunta los hijos (mock) a un proyecto a partir de parentSlug. */
function withMockChildren(project: Project): Project {
  const children = MOCK_PROJECTS.filter(
    (p) => p.parentSlug === project.slug,
  ).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  const parent = project.parentSlug
    ? MOCK_PROJECTS.find((p) => p.slug === project.parentSlug)
    : undefined;
  return {
    ...project,
    children: children.length ? children : undefined,
    parentTitle: parent?.title,
  };
}

export async function getProjects(): Promise<Project[]> {
  const res = await fetchStrapi<StrapiListResponse>(
    "/proyectos?sort=publishedAt:desc&filters[parent][id][$null]=true&populate[coverImage]=true&populate[tags]=true&populate[metrics]=true&pagination[pageSize]=100",
  );
  const locale = await getLocale();
  if (!res?.data?.length) {
    return localizeProjects(
      sortProjectsByRecency(
        await enrichProjectsWithStrapiMedia(topLevelMockProjects()),
      ),
      locale,
    );
  }
  return localizeProjects(
    sortProjectsByRecency(res.data.map(mapProject)),
    locale,
  );
}

/** Proyectos marcados para mostrarse en la home. */
export async function getRecentProjects(
  limit = HOME_PROJECTS_LIMIT,
): Promise<Project[]> {
  const res = await fetchStrapi<StrapiListResponse>(
    `/proyectos?sort=order:asc&filters[showInHome][$eq]=true&populate[coverImage]=true&populate[tags]=true&populate[metrics]=true&pagination[pageSize]=${limit}`,
  );
  if (!res?.data?.length) {
    const mockHome = MOCK_PROJECTS.filter((p) => p.showInHome);
    const fallback = mockHome.length ? mockHome : topLevelMockProjects();
    const locale = await getLocale();
    return localizeProjects(
      await enrichProjectsWithStrapiMedia(
        sortProjectsByRecency(fallback).slice(0, limit),
      ),
      locale,
    );
  }
  const locale = await getLocale();
  return localizeProjects(res.data.map(mapProject), locale);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const res = await fetchStrapi<StrapiListResponse>(
    `/proyectos?filters[slug][$eq]=${slug}` +
      "&populate[coverImage]=true" +
      "&populate[gallery]=true" +
      "&populate[tags]=true" +
      "&populate[metrics]=true" +
      "&populate[projectSummary]=true" +
      "&populate[children][populate][coverImage]=true" +
      "&populate[children][populate][tags]=true" +
      "&populate[children][populate][metrics]=true" +
      "&populate[children][populate][projectSummary]=true" +
      "&populate[parent][fields][0]=slug" +
      "&populate[parent][fields][1]=title",
  );
  if (!res?.data?.length) {
    const mock = MOCK_PROJECTS.find((p) => p.slug === slug);
    if (!mock) return null;
    const withChildren = withMockChildren(mock);
    const [enriched] = await enrichProjectsWithStrapiMedia([withChildren]);
    const locale = await getLocale();
    return localizeProject(enriched ?? withChildren, locale);
  }
  const locale = await getLocale();
  return localizeProject(mapProject(res.data[0]), locale);
}

function sortProjectsByOrder(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

function buildFlatProjectList(topLevel: Project[]): Project[] {
  const flat: Project[] = [];

  for (const project of sortProjectsByOrder(topLevel)) {
    flat.push(project);
    if (project.children?.length) {
      flat.push(
        ...sortProjectsByOrder(project.children).map((child) => ({
          ...child,
          parentSlug: child.parentSlug ?? project.slug,
          parentTitle: child.parentTitle ?? project.title,
        })),
      );
    }
  }

  return flat;
}

async function getNavigableProjectsFlat(): Promise<Project[]> {
  const res = await fetchStrapi<StrapiListResponse>(
    "/proyectos?sort=order:asc&filters[parent][id][$null]=true" +
      "&populate[children][sort]=order:asc" +
      "&populate[children][fields][0]=slug" +
      "&populate[children][fields][1]=title" +
      "&populate[children][fields][2]=order" +
      "&populate[children][fields][3]=company" +
      "&populate[children][populate][tags]=true" +
      "&fields[0]=slug&fields[1]=title&fields[2]=order&fields[3]=company&fields[4]=isParent" +
      "&pagination[pageSize]=100",
  );

  if (!res?.data?.length) {
    return buildFlatProjectList(
      topLevelMockProjects().map((project) => withMockChildren(project)),
    );
  }

  return buildFlatProjectList(res.data.map(mapProject));
}

function toNavItem(
  target: Project,
  current: Project,
  direction: "prev" | "next",
  backTo: (title: string) => string,
): ProjectNavItem {
  if (
    direction === "prev" &&
    current.parentSlug &&
    target.slug === current.parentSlug
  ) {
    return {
      slug: target.slug,
      title: backTo(target.title),
    };
  }

  const subtitle =
    direction === "next" && target.parentSlug
      ? (target.tags[0] ?? target.problem)
      : undefined;

  return {
    slug: target.slug,
    title: target.title,
    subtitle,
  };
}

export async function getProjectNavigation(
  slug: string,
): Promise<ProjectNavigation> {
  const flat = await getNavigableProjectsFlat();
  const index = flat.findIndex((project) => project.slug === slug);
  if (index === -1) return {};

  const locale = await getLocale();
  const dict = getDictionary(locale);
  const backTo = dict.projects.backTo;

  const current = flat[index];
  const prevProject = index > 0 ? flat[index - 1] : undefined;
  const nextProject = index < flat.length - 1 ? flat[index + 1] : undefined;

  return {
    prev: prevProject
      ? toNavItem(prevProject, current, "prev", backTo)
      : undefined,
    next: nextProject
      ? toNavItem(nextProject, current, "next", backTo)
      : undefined,
  };
}

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  const pageSize = limit ?? 100;
  const res = await fetchStrapi<StrapiListResponse>(
    `/blog-posts?sort=publishedAt:desc&populate[coverImage]=true&pagination[pageSize]=${pageSize}`,
  );
  const locale = await getLocale();
  const posts = !res?.data?.length
    ? MOCK_BLOG
    : res.data.map(mapBlogPost);
  return posts.map((post) => localizeBlogPost(post, locale));
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const res = await fetchStrapi<StrapiListResponse>(
    `/blog-posts?filters[slug][$eq]=${slug}&populate[coverImage]=true`,
  );
  if (!res?.data?.length) {
    const post = MOCK_BLOG.find((p) => p.slug === slug) ?? null;
    if (!post) return null;
    const locale = await getLocale();
    return localizeBlogPost(post, locale);
  }
  const locale = await getLocale();
  return localizeBlogPost(mapBlogPost(res.data[0]), locale);
}

export async function getAboutContent(): Promise<AboutContent> {
  const res = await fetchStrapi<StrapiSingleResponse>("/sobre-mi");
  if (!res?.data) {
    const locale = await getLocale();
    return localizeAbout(MOCK_ABOUT, locale);
  }

  const a = unwrap(res.data);
  const about: AboutContent = {
    title: String(a.title ?? MOCK_ABOUT.title),
    body: String(a.body ?? MOCK_ABOUT.body),
    heroImage: String(a.heroImage ?? MOCK_ABOUT.heroImage),
    images: Array.isArray(a.images)
      ? a.images.map(String)
      : MOCK_ABOUT.images,
  };
  const locale = await getLocale();
  return localizeAbout(about, locale);
}

export async function getAllProjectSlugs(): Promise<string[]> {
  const res = await fetchStrapi<StrapiListResponse>(
    "/proyectos?fields[0]=slug&pagination[pageSize]=200",
  );
  if (!res?.data?.length) {
    return MOCK_PROJECTS.map((p) => p.slug);
  }
  return res.data.map((record) => String(unwrap(record).slug ?? "")).filter(Boolean);
}

export async function getAllBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((p) => p.slug);
}
