export interface ProjectMetric {
  value: string;
  label: string;
}

export interface Project {
  id: string;
  slug: string;
  company: string;
  year: string;
  title: string;
  problem: string;
  description: string;
  tags: string[];
  metrics?: ProjectMetric[];
  featured?: boolean;
  order?: number;
  publishedAt?: string;
  coverImage?: string;
  gallery?: string[];
  roles?: string[];
  team?: string[];
  tools?: string[];
  body?: string;
  isParent?: boolean;
  showInHome?: boolean;
  overview?: string;
  challenge?: string;
  parentSlug?: string;
  parentTitle?: string;
  children?: Project[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface StackItem {
  number: string;
  name: string;
  items: string;
  isToday?: boolean;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  coverImage?: string;
  body?: string;
}

export interface Illustration {
  id: string;
  slug: string;
  title: string;
  description?: string;
  image: string;
  year?: string;
  tags?: string[];
  order?: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface HomeContent {
  heroGreeting: string;
  heroName: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  trustBadges: string[];
  stats: Stat[];
  stackItems: StackItem[];
  aboutTeaser: string;
  aboutTitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
  email: string;
  linkedin: string;
}

export interface SiteSettings {
  siteName: string;
  email: string;
  linkedin: string;
  navLinks: NavLink[];
  footerText: string;
}

export interface AboutContent {
  title: string;
  body: string;
  cardTitle: string;
  cardSubtitle: string;
  cardEyebrow: string;
}
