import {
  BRANDS,
  MOCK_ABOUT,
  MOCK_BLOG,
  MOCK_HOME,
  MOCK_ILLUSTRATIONS,
  MOCK_PROJECTS,
  MOCK_SITE_SETTINGS,
} from "./mock-data";
import type {
  AboutContent,
  BlogPost,
  HomeContent,
  Illustration,
  NavLink,
  Project,
  SiteSettings,
  StackItem,
  Stat,
} from "./types";

const STRAPI_URL = process.env.STRAPI_URL?.replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

/** Número de casos de estudio mostrados en home (los más recientes). */
export const HOME_PROJECTS_LIMIT = 3;

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

function mapMetrics(value: unknown): { value: string; label: string }[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((entry) => {
      const item = unwrap(entry as StrapiRecord);
      return {
        value: String(item.value ?? ""),
        label: String(item.label ?? ""),
      };
    })
    .filter((m) => m.value || m.label);
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
    roles: Array.isArray(a.roles) ? (a.roles as string[]) : mock?.roles,
    team: Array.isArray(a.team) ? (a.team as string[]) : mock?.team,
    tools: Array.isArray(a.tools) ? (a.tools as string[]) : mock?.tools,
    isParent: Boolean(a.isParent),
    showInHome: Boolean(a.showInHome),
    overview: a.overview ? String(a.overview) : undefined,
    challenge: a.challenge ? String(a.challenge) : undefined,
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

function mapIllustration(record: StrapiRecord): Illustration {
  const a = unwrap(record);
  return {
    id: String(record.documentId ?? record.id ?? ""),
    slug: String(a.slug ?? ""),
    title: String(a.title ?? ""),
    description: a.description ? String(a.description) : undefined,
    image: getMediaUrl(a.image) ?? "/images/hero.png",
    year: a.year ? String(a.year) : undefined,
    tags: Array.isArray(a.tags) ? (a.tags as string[]) : undefined,
    order: Number(a.order ?? 0),
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const res = await fetchStrapi<StrapiSingleResponse>(
    "/site-setting?populate[navLinks]=*",
  );
  if (!res?.data) return MOCK_SITE_SETTINGS;

  const a = unwrap(res.data);
  const navLinks = Array.isArray(a.navLinks)
    ? (a.navLinks as NavLink[])
    : MOCK_SITE_SETTINGS.navLinks;

  return {
    siteName: String(a.siteName ?? MOCK_SITE_SETTINGS.siteName),
    email: String(a.email ?? MOCK_SITE_SETTINGS.email),
    linkedin: String(a.linkedin ?? MOCK_SITE_SETTINGS.linkedin),
    navLinks,
    footerText: String(a.footerText ?? MOCK_SITE_SETTINGS.footerText),
  };
}

export async function getHomeContent(): Promise<HomeContent> {
  const res = await fetchStrapi<StrapiSingleResponse>(
    "/home?populate[stats]=true&populate[stackItems]=true&populate[heroImage]=true",
  );
  if (!res?.data) return MOCK_HOME;

  const a = unwrap(res.data);
  return {
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
    email: String(a.email ?? MOCK_HOME.email),
    linkedin: String(a.linkedin ?? MOCK_HOME.linkedin),
  };
}

export async function getBrands(): Promise<string[]> {
  const res = await fetchStrapi<StrapiListResponse>(
    "/marcas?sort=order:asc&pagination[pageSize]=50",
  );
  if (!res?.data?.length) return BRANDS;
  return res.data.map((m) => String(unwrap(m).name ?? ""));
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
  if (!res?.data?.length) {
    return sortProjectsByRecency(
      await enrichProjectsWithStrapiMedia(topLevelMockProjects()),
    );
  }
  return sortProjectsByRecency(res.data.map(mapProject));
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
    return enrichProjectsWithStrapiMedia(
      sortProjectsByRecency(fallback).slice(0, limit),
    );
  }
  return res.data.map(mapProject);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const res = await fetchStrapi<StrapiListResponse>(
    `/proyectos?filters[slug][$eq]=${slug}` +
      "&populate[coverImage]=true" +
      "&populate[gallery]=true" +
      "&populate[tags]=true" +
      "&populate[metrics]=true" +
      "&populate[children][populate][coverImage]=true" +
      "&populate[children][populate][tags]=true" +
      "&populate[children][populate][metrics]=true" +
      "&populate[parent][fields][0]=slug" +
      "&populate[parent][fields][1]=title",
  );
  if (!res?.data?.length) {
    const mock = MOCK_PROJECTS.find((p) => p.slug === slug);
    return mock ? withMockChildren(mock) : null;
  }
  return mapProject(res.data[0]);
}

export async function getBlogPosts(limit?: number): Promise<BlogPost[]> {
  const pageSize = limit ?? 100;
  const res = await fetchStrapi<StrapiListResponse>(
    `/blog-posts?sort=publishedAt:desc&populate[coverImage]=true&pagination[pageSize]=${pageSize}`,
  );
  if (!res?.data?.length) return MOCK_BLOG;
  return res.data.map(mapBlogPost);
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const res = await fetchStrapi<StrapiListResponse>(
    `/blog-posts?filters[slug][$eq]=${slug}&populate[coverImage]=true`,
  );
  if (!res?.data?.length) {
    return MOCK_BLOG.find((p) => p.slug === slug) ?? null;
  }
  return mapBlogPost(res.data[0]);
}

export async function getIllustrations(): Promise<Illustration[]> {
  const res = await fetchStrapi<StrapiListResponse>(
    "/ilustraciones?sort=order:asc&populate[image]=true",
  );
  if (!res?.data?.length) return MOCK_ILLUSTRATIONS;
  return res.data.map(mapIllustration);
}

export async function getAboutContent(): Promise<AboutContent> {
  const res = await fetchStrapi<StrapiSingleResponse>("/sobre-mi");
  if (!res?.data) return MOCK_ABOUT;

  const a = unwrap(res.data);
  return {
    title: String(a.title ?? MOCK_ABOUT.title),
    body: String(a.body ?? MOCK_ABOUT.body),
    cardTitle: String(a.cardTitle ?? MOCK_ABOUT.cardTitle),
    cardSubtitle: String(a.cardSubtitle ?? MOCK_ABOUT.cardSubtitle),
    cardEyebrow: String(a.cardEyebrow ?? MOCK_ABOUT.cardEyebrow),
  };
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
