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
    { label: "About", href: "/sobre-mi" },
  ],
  footerText: "monterrey, mexico - designed as a system",
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
  heroGreeting: "Hi, my name is",
  heroSubtitle:
    "I design systems, from token to full product. I take apps from zero to one, build Design Systems that scale, and explore how AI is changing the way we design. Lecturer at Tec de Monterrey.",
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
    "On screen: design systems, AI, and platforms that scale. Off screen: calisthenics and strength with the same logic - process, consistency, iteration. I teach at Tec de Monterrey because systems thinking is shared, not hoarded.",
  ctaTitle: "Let's build something worth it.",
  ctaSubtitle:
    "If you have a project where design and systems matter, I want to hear about it.",
};

export const EN_ABOUT: AboutContent = {
  title: "About",
  heroImage: "/images/about-me.png",
  images: [],
  body: `I'm jorge. Mexican, based in Monterrey. I train calisthenics. I draw when I can.

I design systems, the kind that keep products from breaking as they grow. Right now I'm a Senior Product Designer at GroWrk Remote, where I also wear the AI Design Architect hat. On the side I teach design at Tec de Monterrey and I'm building Prowell, a coaching platform for wellness trainers.

The last five years have been design systems, tokens, components, and decisions that look simple but have three layers underneath. I also write my own designs in code when the project calls for it.

Before this I was at SPIN by OXXO and Grupo Salinas. I learned that design without business context is decoration.

At night I illustrate. I prefer analog: india ink, alcohol markers, paper. When the project calls for it, I work digital too, in Procreate. No Ctrl+Z if I can help it.

I'm building three brands, slowly and on purpose: desmond.design for systems consulting, Built by Des for fitness, and Frame & Font for design education (this last one with my partner, in work and life, Liz).

Write me at ${SITE_EMAIL} or find me on LinkedIn / Instagram.

Cheers, jorge`,
};

export const EN_BLOG_BY_SLUG: Record<string, Pick<BlogPost, "title" | "excerpt" | "body">> = {
  "design-systems-con-ia": {
    title: "Design Systems in the AI era",
    excerpt:
      "How to integrate AI-assisted UI generation without losing brand coherence or accessibility.",
    body: "Traditional Design Systems assume every component will be designed manually. AI changes that equation. In this article I share the framework I use to maintain 80-90% fidelity in prompt-to-UI generation.",
  },
  "pensamiento-sistemico": {
    title: "Systems thinking beyond Figma",
    excerpt:
      "Calisthenics lessons applied to product design: process, consistency, and iteration.",
    body: "The same logic I use to progress in calisthenics - progressions, consistency, feedback loops - applies directly to how I build and maintain Design Systems.",
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
      | "framingQuestion"
      | "framingQuestionHighlight"
      | "framingBody"
      | "metrics"
      | "projectSummary"
    >
  >
> = {
  growrk: {
    title: "From chaotic MVP to AI-powered design system",
    problem: "When the MVP doesn't scale with the business",
    description:
      "Full design infrastructure for a global B2B SaaS platform: 3 Design System generations, 5 platforms, and an AI Playground where any employee generates prototypes faithful to the system from a prompt.",
    overviewTitle: "A global ITAM platform that centralizes operations across more than 150 countries.",
    overviewBodyText:
      "GroWrk is a global IT Asset Management (ITAM) and automated logistics platform. It lets international companies, especially remote and distributed ones, buy, store, deploy, manage, and support all of their employees' hardware (laptops, monitors, peripherals) across more than 150 countries. An entire global operation, centralized in a single interface.",
    challengeTitle: "Turning a manual operation into a SaaS platform that scales.",
    challengeBodyText:
      "I joined GroWrk in its early stages with one mission: transform a complex, manual hardware operation into a scalable SaaS platform.\n\nThe challenge grew with me. I started designing basic inventory flows and ended up leading the experience strategy across three critical fronts: Clients, Employees, and Internal Operations. All while building the design infrastructure that would let the team grow from zero to global scale.",
    framingQuestion:
      "How do you design infrastructure that lets a global operation grow without breaking?",
    framingQuestionHighlight: "grow without breaking",
    framingBody:
      "GroWrk needed to move from manual processes to a platform that could scale across three fronts at once: the clients managing their hardware, the employees receiving it, and the internal operations moving it.\n\nThe answer wasn't a single screen, but a system of connected initiatives: a Design System that supports everything, a Playground where AI designs within the system's rules, a site that communicates the product, and an app that extends the operation to suppliers.",
    learning:
      "GroWrk holds a special place in my career. I joined in the early stages, when I was the only designer, and grew alongside the product for years until I became Sr. Product Designer and AI Design Architect. Watching an operation go from manual processes to a platform across more than 150 countries, and knowing that the design infrastructure I built supports part of that, is one of the most rewarding experiences I've had as a designer.\n\nHere I learned what now defines how I work: building systems isn't about designing screens, it's about designing the foundation an entire team can grow on without breaking. GroWrk wasn't just a job. It's where I became the designer I am today.",
    metrics: [
      {
        value: "50K+ users",
        title: "Active on the platform",
      },
      {
        value: "+150 countries",
        title: "with active operations",
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
      duration: "2023 - 2024",
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
      duration: "2023 - 2024",
      roles: "Sr. Product Designer · Lead Design System Designer",
      team: "1 PO · 1 PM · 8 Devs · 4 Designers",
      tools: "Figma · Nuxt UI · Tailwind · Cursor · Notion",
    },
  },
  spin: {
    title: "Banking for the unbanked",
    problem: "Financial services without system or trust",
    description:
      "The product's first Design System and critical financial flows - SPEI, onboarding, KYC - for a fintech that scaled to 1M users in 9 months.",
    body: "Spin democratized financial services for millions of users in Mexico. I designed the product's first design system and critical onboarding, KYC, and SPEI transfer flows.",
    learning:
      "In fintech, trust is designed in every micro-interaction. Onboarding isn't a form - it's the user's first contract with you.",
    metrics: [
      {
        value: "1M+",
        title: "Users in 9 months",
        description: "Fintech scale for the unbanked",
      },
    ],
    projectSummary: {
      duration: "2021 - 2022",
      roles: "Lead Product Designer · Design System Lead",
      team: "1 PO · 2 PMs · 12 Devs · 3 Designers",
      tools: "Figma · React Native · Storybook · Notion",
    },
  },
  salinas: {
    title: "4 brands. 4 systems. 1 framework.",
    problem: "Four brands, zero operational consistency",
    description:
      "Loyalty systems for Elektra, Banco Azteca, ITALIKA, and Presta Prenda - distinct identities on a shared interaction architecture.",
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
      duration: "2020 - 2021",
      roles: "Sr. UI Designer · Design System Designer",
      team: "2 POs · 3 PMs · 10 Devs · 5 Designers",
      tools: "Figma · Sketch · Zeplin · InVision · Confluence",
    },
  },
};
