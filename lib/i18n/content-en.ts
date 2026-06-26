import type {
  AboutContent,
  BlogPost,
  HomeContent,
  Project,
  SiteSettings,
} from "@/lib/types";
import { SITE_EMAIL } from "@/lib/site";

export const EN_SITE_SETTINGS: Pick<
  SiteSettings,
  "navLinks" | "footerText"
> = {
  navLinks: [
    { label: "Case studies", href: "/proyectos" },
    { label: "Illustration", href: "/ilustracion" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/sobre-mi" },
  ],
  footerText: "monterrey, mexico — designed as a system",
};

export const EN_HOME: Pick<
  HomeContent,
  | "heroGreeting"
  | "heroSubtitle"
  | "trustBadges"
  | "stats"
  | "stackItems"
  | "aboutTitle"
  | "aboutTeaser"
  | "ctaTitle"
  | "ctaSubtitle"
> = {
  heroGreeting: "Hey, I'm",
  heroSubtitle:
    "From traditional Design Systems to AI design architecture. Lecturer at Tec de Monterrey. The same discipline on and off screen.",
  trustBadges: [
    "10+ Years exp.",
    "5 E2E Platforms",
    "50K+ Users",
    "150+ Countries",
  ],
  stats: [
    { value: "8+", label: "years of experience" },
    { value: "50K+", label: "users in production" },
    { value: "150+", label: "countries reached" },
    { value: "~40%", label: "less design time" },
  ],
  stackItems: [
    {
      number: "01",
      name: "Product Design",
      items: "Research · Flows · Prototyping · Usability",
    },
    {
      number: "02",
      name: "Design Systems",
      items: "Tokens · Components · Figma + code documentation",
    },
    {
      number: "03",
      name: "DesignOps",
      items: "Processes · Onboarding · Team education",
    },
    {
      number: "04",
      name: "AI Design Architecture",
      items: "AI Playground · Automated audits · Prompt-to-UI",
      isToday: true,
    },
  ],
  aboutTitle: "Same process.\nTwo contexts.",
  aboutTeaser:
    "On screen: design systems, AI, and platforms that scale. Off screen: calisthenics and strength with the same logic — process, consistency, iteration. I teach at Tec de Monterrey because systems thinking is shared, not hoarded.",
  ctaTitle: "Let's build something worth it.",
  ctaSubtitle:
    "If you have a project where design and systems matter, I want to hear about it.",
};

export const EN_ABOUT: AboutContent = {
  title: "About",
  heroImage: "/images/about-me.png",
  images: [],
  body: `i'm jorge. mexican, based in monterrey. i train calisthenics. i draw when i can.

i design systems — the kind that keep products from breaking as they grow. i'm currently senior product designer at growrk remote, where i also wear the ai design architect hat. on the side i teach design at tec de monterrey and i'm building prowell, a coaching platform for wellness trainers.

the last five years have been design systems, tokens, components, and decisions that look simple but have three layers underneath. i also write my own designs in code when the project calls for it.

before this i was at spin by oxxo, grupo salinas, and a few projects that taught me design without business context is decoration.

at night i illustrate. manga, ink, paper. no ctrl+z.

i'm building three parallel brands slowly and intentionally: desmond.design for systems consulting, built by des for fitness, and frame & font for design education — the last one with my partner liz.

email me at ${SITE_EMAIL} or find me on linkedin / instagram.

cheers, jorge`,
};

export const EN_BLOG_BY_SLUG: Record<string, Pick<BlogPost, "title" | "excerpt" | "body">> = {
  "design-systems-con-ia": {
    title: "Design Systems in the AI era",
    excerpt:
      "How to integrate AI-assisted UI generation without losing brand coherence or accessibility.",
    body: "Traditional Design Systems assume every component will be designed manually. AI changes that equation. In this article I share the framework I use to maintain 80–90% fidelity in prompt-to-UI generation.",
  },
  "pensamiento-sistemico": {
    title: "Systems thinking beyond Figma",
    excerpt:
      "Calisthenics lessons applied to product design: process, consistency, and iteration.",
    body: "The same logic I use to progress in calisthenics — progressions, consistency, feedback loops — applies directly to how I build and maintain Design Systems.",
  },
};

export const EN_PROJECTS_BY_SLUG: Record<
  string,
  Partial<
    Pick<
      Project,
      | "title"
      | "problem"
      | "description"
      | "body"
      | "learning"
      | "overviewTitle"
      | "overviewBodyText"
      | "challengeTitle"
      | "challengeBodyText"
      | "metrics"
      | "projectSummary"
    >
  >
> = {
  growrk: {
    title: "From chaotic MVP to AI-powered design system",
    problem: "When the MVP doesn't scale with the business",
    description:
      "Full design infrastructure for a global B2B SaaS platform: 3 Design System generations, 5 platforms, and an AI Playground that generates UI with 80–90% fidelity from a prompt.",
    overviewTitle: "A global operation in a single interface",
    overviewBodyText:
      "Growrk is a global IT Asset Management (ITAM) and automated logistics platform. It lets international companies (especially remote and distributed ones) buy, store, deploy, manage, and support all employee hardware (laptops, monitors, peripherals) in 150+ countries, centralizing a global operation in one digital interface.",
    challengeTitle: "From basic inventory to global-scale infrastructure",
    challengeBodyText:
      "I joined GroWrk in its early stages with the mission to transform a complex, manual hardware management operation into a scalable SaaS platform. My challenge evolved from designing basic inventory flows to leading experience strategy across three critical fronts: Clients, Employees, and Internal Operations — while building the design infrastructure (Design System) that would let the team grow from zero to global scale.",
    learning:
      "A Design System isn't a component library. It's the collective decision of how a team wants to work. Without adoption, it doesn't exist. Without engineering, it doesn't scale. Without AI, it doesn't grow.",
    metrics: [
      {
        value: "50K+",
        title: "Users in production",
        description: "Active operation in 150+ countries",
      },
    ],
  },
  "growrk-marketplace": {
    title: "Employee self-service ecosystem",
    problem: "Rigid hardware assignment dependent on managers",
    description:
      "I designed a decentralized ecosystem that transformed hardware assignment. We moved from a rigid manager-driven model to a Marketplace where employees choose their tools from a pre-approved catalog.",
    body: "Impact: drastic reduction in support load, elimination of communication friction, and a smooth onboarding experience for global teams.",
    learning:
      "Decentralization only works with clear boundaries. The employee chooses, but within a catalog the company already approved.",
    metrics: [
      {
        value: "−60%",
        title: "Support load",
        description: "Reduction after the self-service model",
      },
    ],
    projectSummary: {
      duration: "2023 — 2024",
      roles: "Sr. Product Designer · Lead UI Designer",
      team: "1 PO · 1 PM · 5 Devs · 2 Designers",
      tools: "Figma · Nuxt UI · Tailwind · Notion",
    },
  },
  "growrk-smart-packages": {
    title: "Workflow automation to eliminate decision fatigue",
    problem: "Equipping teams item-by-item created bottlenecks",
    description:
      'Equipping entire teams item by item created bottlenecks and logistics errors. I designed a "Smart Packages" solution that lets companies standardize and assign complete hardware configurations by role or department in just a few clicks.',
    body: "Impact: drastic reduction in bulk order creation time and optimization of the international supply chain.",
    learning:
      "Standardizing isn't limiting. Smart packages reduce friction without removing business flexibility.",
    metrics: [
      {
        value: "1-click",
        title: "Role-based assignment",
        description: "Smart packages ready to deploy",
      },
    ],
    projectSummary: {
      duration: "2023 — 2024",
      roles: "Sr. Product Designer · Lead Design System Designer",
      team: "1 PO · 1 PM · 8 Devs · 4 Designers",
      tools: "Figma · Nuxt UI · Tailwind · Cursor · Notion",
    },
  },
  spin: {
    title: "Banking for the unbanked",
    problem: "Financial services without system or trust",
    description:
      "The product's first Design System and critical financial flows — SPEI, onboarding, KYC — for a fintech that scaled to 1M users in 9 months.",
    body: "Spin democratized financial services for millions of users in Mexico. I designed the product's first design system and critical onboarding, KYC, and SPEI transfer flows.",
    learning:
      "In fintech, trust is designed in every micro-interaction. Onboarding isn't a form — it's the user's first contract with you.",
    metrics: [
      {
        value: "1M+",
        title: "Users in 9 months",
        description: "Fintech scale for the unbanked",
      },
    ],
    projectSummary: {
      duration: "2021 — 2022",
      roles: "Lead Product Designer · Design System Lead",
      team: "1 PO · 2 PMs · 12 Devs · 3 Designers",
      tools: "Figma · React Native · Storybook · Notion",
    },
  },
  salinas: {
    title: "4 brands. 4 systems. 1 framework.",
    problem: "Four brands, zero operational consistency",
    description:
      "Loyalty systems for Elektra, Banco Azteca, ITALIKA, and Presta Prenda — distinct identities on a shared interaction architecture.",
    body: "Four brands, four identities, one interaction architecture. I designed loyalty systems that respect each brand's voice while sharing proven usability patterns.",
    learning:
      "Multi-brand doesn't mean multi-chaos. Shared architecture is what lets each identity breathe without breaking operations.",
    metrics: [
      {
        value: "4",
        title: "Parallel design systems",
        description: "Elektra, Banco Azteca, ITALIKA, and Presta Prenda",
      },
    ],
    projectSummary: {
      duration: "2020 — 2021",
      roles: "Sr. UI Designer · Design System Designer",
      team: "2 POs · 3 PMs · 10 Devs · 5 Designers",
      tools: "Figma · Sketch · Zeplin · InVision · Confluence",
    },
  },
};
