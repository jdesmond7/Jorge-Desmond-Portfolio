import type { Locale } from "./types";
import type {
  AboutContent,
  BlogPost,
  HomeContent,
  NavLink,
  Project,
  SiteSettings,
} from "@/lib/types";
import {
  EN_ABOUT,
  EN_BLOG_BY_SLUG,
  EN_HOME,
  EN_PROJECTS_BY_SLUG,
  EN_SITE_SETTINGS,
} from "./content-en";
import { getDictionary } from "./index";

function localizeNavLinks(links: NavLink[], locale: Locale): NavLink[] {
  if (locale === "es") return links;
  const dict = getDictionary(locale);
  return links.map((link) => ({
    ...link,
    label: dict.nav.links[link.href as keyof typeof dict.nav.links] ?? link.label,
  }));
}

export function localizeSiteSettings(
  settings: SiteSettings,
  locale: Locale,
): SiteSettings {
  if (locale === "es") return settings;
  return {
    ...settings,
    navLinks: localizeNavLinks(EN_SITE_SETTINGS.navLinks, locale),
    footerText: EN_SITE_SETTINGS.footerText,
  };
}

export function localizeHome(home: HomeContent, locale: Locale): HomeContent {
  if (locale === "es") return home;
  return { ...home, ...EN_HOME };
}

export function localizeAbout(about: AboutContent, locale: Locale): AboutContent {
  if (locale === "es") return about;
  return { ...about, ...EN_ABOUT };
}

export function localizeBlogPost(post: BlogPost, locale: Locale): BlogPost {
  if (locale === "es") return post;
  const overlay = EN_BLOG_BY_SLUG[post.slug];
  return overlay ? { ...post, ...overlay } : post;
}

export function localizeProject(project: Project, locale: Locale): Project {
  if (locale === "es") return project;

  const overlay = EN_PROJECTS_BY_SLUG[project.slug];
  const localized: Project = overlay ? { ...project, ...overlay } : { ...project };

  if (project.children?.length) {
    localized.children = project.children.map((child) =>
      localizeProject(child, locale),
    );
  }

  if (project.parentSlug && EN_PROJECTS_BY_SLUG[project.parentSlug]) {
    localized.parentTitle =
      EN_PROJECTS_BY_SLUG[project.parentSlug]?.title ?? project.parentTitle;
  }

  return localized;
}

export function localizeProjects(projects: Project[], locale: Locale): Project[] {
  return projects.map((project) => localizeProject(project, locale));
}
