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
  /** Transparent PNG used on the home showcase cards. */
  cardImage?: string;
  gallery?: string[];
  parentSlug?: string;
  /** Label inside the card number brackets, e.g. "GroWrk 1.1". */
  cardNumber?: string;
  overviewTitle?: string;
  overviewBodyText?: string;
  challengeTitle?: string;
  challengeBodyText?: string;
  framingQuestion?: string;
  framingQuestionHighlight?: string;
  framingBody?: string;
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
