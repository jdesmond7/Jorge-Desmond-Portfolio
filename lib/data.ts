import "server-only";

import {
  getAllBlogPosts as getAllMarkdownBlogPosts,
  getAllBlogSlugsFromDisk,
  getAllProjectSlugsFromDisk,
  getAllProjects as getAllMarkdownProjects,
  getBlogPostBySlugFromDisk,
  getPageBySlug,
  getProjectBySlug as getMarkdownProjectBySlug,
} from "@/lib/content";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/locale";
import {
  localizeHome,
  localizeSiteSettings,
} from "@/lib/i18n/localize";
import {
  MOCK_ABOUT,
  MOCK_HOME,
  MOCK_SITE_SETTINGS,
} from "@/lib/mock-data";
import type {
  BlogDocument,
  Project as MarkdownProject,
} from "@/types/content";
import type {
  AboutContent,
  BlogPost,
  HomeContent,
  Project,
  ProjectMetric,
  ProjectNavigation,
  ProjectNavItem,
  ProjectSummary,
  SiteSettings,
} from "@/lib/types";

const HOME_PROJECTS_LIMIT = 4;

function toUiMetrics(
  metrics: MarkdownProject["frontmatter"]["metrics"],
): ProjectMetric[] | undefined {
  if (!metrics?.length) return undefined;
  return metrics.map((metric) => ({
    value: metric.value,
    title: metric.label,
  }));
}

function toProjectSummary(doc: MarkdownProject): ProjectSummary | undefined {
  const { duration, roles, team, tools, year } = doc.frontmatter;
  const summary: ProjectSummary = {
    duration: duration ?? year,
    roles,
    team,
    tools,
  };
  const hasContent = Boolean(
    summary.duration || summary.roles || summary.team || summary.tools,
  );
  return hasContent ? summary : undefined;
}

function toUiProject(
  doc: MarkdownProject,
  options?: { children?: Project[]; parentTitle?: string },
): Project {
  const fm = doc.frontmatter;
  return {
    id: fm.slug,
    slug: fm.slug,
    company: fm.company ?? fm.client ?? "",
    year: fm.year ?? "",
    title: fm.title,
    problem: fm.problem ?? "",
    description: fm.description,
    tags: fm.tags ?? [],
    metrics: toUiMetrics(fm.metrics),
    order: fm.order,
    body: doc.content || undefined,
    coverImage: fm.coverImage,
    cardImage: fm.cardImage,
    gallery: fm.gallery,
    projectSummary: toProjectSummary(doc),
    isParent: fm.type === "parent",
    showInHome: fm.showInHome,
    overviewTitle: fm.overviewTitle,
    overviewBodyText: fm.overviewBodyText,
    challengeTitle: fm.challengeTitle,
    challengeBodyText: fm.challengeBodyText,
    framingQuestion: fm.framingQuestion,
    framingQuestionHighlight: fm.framingQuestionHighlight,
    framingBody: fm.framingBody,
    learning: fm.learning,
    parentSlug: fm.parentSlug,
    parentTitle: options?.parentTitle,
    cardNumber: fm.cardNumber,
    children: options?.children,
  };
}

async function getLocalizedMarkdownProjects(): Promise<Project[]> {
  const locale = await getLocale();
  const docs = getAllMarkdownProjects(locale);
  const bySlug = new Map(docs.map((doc) => [doc.frontmatter.slug, doc]));

  const childrenByParent = new Map<string, MarkdownProject[]>();
  for (const doc of docs) {
    const parentSlug = doc.frontmatter.parentSlug;
    if (!parentSlug) continue;
    const list = childrenByParent.get(parentSlug) ?? [];
    list.push(doc);
    childrenByParent.set(parentSlug, list);
  }

  return docs.map((doc) => {
    const childDocs = childrenByParent.get(doc.frontmatter.slug) ?? [];
    const children = childDocs
      .sort(
        (a, b) =>
          (a.frontmatter.order ?? 0) - (b.frontmatter.order ?? 0),
      )
      .map((child) =>
        toUiProject(child, { parentTitle: doc.frontmatter.title }),
      );

    const parentDoc = doc.frontmatter.parentSlug
      ? bySlug.get(doc.frontmatter.parentSlug)
      : undefined;

    return toUiProject(doc, {
      children: children.length ? children : undefined,
      parentTitle: parentDoc?.frontmatter.title,
    });
  });
}

function topLevelProjects(projects: Project[]): Project[] {
  return projects.filter((project) => !project.parentSlug);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const locale = await getLocale();
  return localizeSiteSettings(MOCK_SITE_SETTINGS, locale);
}

export async function getHomeContent(): Promise<HomeContent> {
  const locale = await getLocale();
  return localizeHome(MOCK_HOME, locale);
}

export async function getProjects(): Promise<Project[]> {
  const projects = await getLocalizedMarkdownProjects();
  return topLevelProjects(projects);
}

export async function getRecentProjects(
  limit = HOME_PROJECTS_LIMIT,
): Promise<Project[]> {
  const projects = await getLocalizedMarkdownProjects();
  const home = projects.filter((project) => project.showInHome);
  const pool = home.length ? home : topLevelProjects(projects);
  return pool
    .slice()
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
    .slice(0, limit);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const locale = await getLocale();
  const doc = getMarkdownProjectBySlug(slug, locale);
  if (!doc) return null;

  const all = await getLocalizedMarkdownProjects();
  return all.find((project) => project.slug === slug) ?? null;
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
  const projects = await getLocalizedMarkdownProjects();
  return buildFlatProjectList(topLevelProjects(projects));
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
  const locale = await getLocale();
  const posts = getAllMarkdownBlogPosts(locale).map(toUiBlogPost);
  return typeof limit === "number" ? posts.slice(0, limit) : posts;
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const locale = await getLocale();
  const doc = getBlogPostBySlugFromDisk(slug, locale);
  return doc ? toUiBlogPost(doc) : null;
}

function toUiBlogPost(doc: BlogDocument): BlogPost {
  const fm = doc.frontmatter;
  return {
    id: fm.slug,
    slug: fm.slug,
    title: fm.title,
    excerpt: fm.excerpt,
    publishedAt: fm.date,
    coverImage: fm.coverImage,
    body: doc.content || undefined,
  };
}

export async function getAboutContent(): Promise<AboutContent> {
  const locale = await getLocale();
  const page = getPageBySlug("about", locale);

  if (!page) {
    return MOCK_ABOUT;
  }

  return {
    title: page.frontmatter.page_title ?? page.frontmatter.title,
    body: page.content || MOCK_ABOUT.body,
    heroImage: page.frontmatter.heroImage ?? MOCK_ABOUT.heroImage,
    images: page.frontmatter.images ?? MOCK_ABOUT.images,
  };
}

export async function getAllProjectSlugs(): Promise<string[]> {
  return getAllProjectSlugsFromDisk();
}

export async function getAllBlogSlugs(): Promise<string[]> {
  return getAllBlogSlugsFromDisk();
}
