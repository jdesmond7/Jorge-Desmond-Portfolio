export type ContentLocale = "es" | "en";

export interface ProjectMetric {
  value: string;
  label: string;
}

export interface ProjectFrontmatter {
  title: string;
  slug: string;
  locale: ContentLocale;
  type?: "parent" | "child";
  problem?: string;
  description: string;
  year?: string;
  client?: string;
  duration?: string;
  roles?: string;
  team?: string;
  tools?: string;
  tags?: string[];
  learning?: string;
  metrics?: ProjectMetric[];
  page_title?: string;
  /** Optional fields used by the existing UI */
  company?: string;
  order?: number;
  showInHome?: boolean;
  coverImage?: string;
  gallery?: string[];
  parentSlug?: string;
  overviewTitle?: string;
  overviewBodyText?: string;
  challengeTitle?: string;
  challengeBodyText?: string;
  heroImage?: string;
  images?: string[];
}

export interface Project {
  frontmatter: ProjectFrontmatter;
  content: string;
}

export interface BlogFrontmatter {
  title: string;
  slug: string;
  locale: ContentLocale;
  date: string;
  excerpt: string;
  tags?: string[];
  coverImage?: string;
}

export interface BlogDocument {
  frontmatter: BlogFrontmatter;
  content: string;
}
