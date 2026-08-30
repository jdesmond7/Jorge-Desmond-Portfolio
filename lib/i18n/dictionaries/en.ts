import type { Dictionary } from "./es";

export const en: Dictionary = {
  meta: {
    defaultTitle: "Jorge Desmond · Sr. Product Designer",
    defaultDescription:
      "I design systems that turn operational complexity into products that scale. Design Systems, Product Design, and AI design architecture.",
    siteName: "JORGE DESMOND",
  },
  nav: {
    openMenu: "Open menu",
    closeMenu: "Close menu",
    resume: "Resume",
    linkedin: "LinkedIn",
    letsTalk: "Let's talk →",
    language: "Language",
    spanish: "Español",
    english: "English",
    links: {
      "/proyectos": "Case studies",
      "/ilustracion": "Illustration",
      "/blog": "Blog",
      "/sobre-mi": "About",
      "/": "Home",
      "/resume": "Resume",
    },
  },
  footer: {
    siteMap: "Site map",
    contact: "Contact",
    social: "Social",
    writeMe: "Write me",
    emailCta: "Send me an email",
    linkedinCta: "Connect on LinkedIn",
    home: "Home",
  },
  hero: {
    viewProjects: "View Case Studies",
    viewResume: "View Resume",
    scroll: "Scroll",
  },
  projects: {
    selectedWork: "Selected work",
    viewAll: "View all →",
    pageTitle: "Case studies",
    pageDescription:
      "Projects where design, systems, and product strategy come together.",
    pageIntro:
      "Case studies across B2B SaaS, fintech, and multi-brand ecosystems.",
    listIntro:
      "Projects where I designed systems, critical flows, and product architecture at scale.",
    readCaseStudy: "Read Case Study",
    readCaseStudyAria: (title: string) => `Read case study: ${title}`,
    keyInitiatives: "Key initiatives",
    notFound: "Project not found",
    backTo: (title: string) => `Back to ${title}`,
    prev: "← Previous project",
    next: "Next project →",
    navAria: "Project navigation",
    duration: "Duration",
    role: "Role",
    team: "Team",
    tools: "Tools",
    learning: "Key learning",
    overview: "Overview",
    challenge: "Challenge",
    imageAlt: (title: string, n: number) => `${title} — image ${n}`,
    decision: {
      context: "Context",
      decision: "The decision",
      outcome: "Outcome",
    },
  },
  writing: {
    eyebrow: "Articles",
    title: "Personal Blog",
    article: "Article",
    readArticle: "Read article",
  },
  blog: {
    title: "Blog",
    description:
      "Articles on Design Systems, AI design architecture, and systems thinking.",
    intro: "Reflections on product design, systems, and applied discipline.",
    notFound: "Article not found",
    back: "← Blog",
    comments: "Comments",
    loadingComments: "Loading comments…",
    loadError: "Could not load comments.",
    emptyComments: "Be the first to comment on this article.",
  },
  comments: {
    publishNew: "Post a new comment",
    reply: "Reply",
    publish: "Publish",
    publishing: "Publishing…",
    cancel: "Cancel",
    nameOptional: "Name (optional)",
    emailOptional: "Email (optional)",
    bodyLabel: "Comment",
    namePlaceholder: "Your name",
    emailPlaceholder: "you@email.com",
    bodyPlaceholder: "Write your comment here",
    anonymous: "Anonymous",
    report: "Report",
    reported: "Comment reported. Thank you.",
    upvote: "Upvote",
    downvote: "Downvote",
    replySingular: "reply",
    replyPlural: "replies",
    replyHeading: "Reply",
    replySubmit: "Post reply",
    errors: {
      alreadyVoted: "You already voted on this comment.",
      voteFailed: "Could not register your vote.",
      reportFailed: "Could not report this comment.",
      publishFailed: "Could not publish the comment.",
    },
    time: {
      justNow: "just now",
      minutes: (n: number) => `${n} min ago`,
      hours: (n: number) => `${n} h ago`,
      days: (n: number) => `${n} day${n === 1 ? "" : "s"} ago`,
    },
  },
  about: {
    title: "About",
    description:
      "Jorge Desmond — product designer in Monterrey. Design systems, calisthenics, illustration, and three brands in the making.",
    heroAlt: "Jorge Desmond in his studio",
    writePrefix: "email me at",
    writeMiddle: "or find me on",
    signOff: "cheers",
  },
  illustration: {
    title: "Illustration",
    description: "Gallery of illustrations and personal visual explorations.",
    intro:
      "Where I explore visually, outside the screen. Editorial, conceptual, personal.",
    openInstagram: (alt: string) => `Open on Instagram: ${alt}`,
  },
  manifesto: {
    lead: "Brilliant design doesn't shout its presence — it's transparent.",
    body: "I remove friction and make the interface disappear, turning it into an immersive experience that stays with the user.",
    projectsCta: "View case studies",
  },
  skills: {
    title: "What do I do?",
    items: [
      {
        number: "01",
        title: "Design Systems",
        description:
          "I design systems, not one-off screens. Tokens, components, and architecture built so a product can grow without breaking. I've shipped three generations of the same system across five platforms and a global team. The invisible foundation everything else stands on.",
      },
      {
        number: "02",
        title: "AI Design Architecture",
        description:
          "I turn Design System rules into context so AI generates interfaces faithful to the system. I built an AI Playground that produces UI at 80–90% fidelity from the first prompt. Not AI replacing judgment — judgment, scaled.",
      },
      {
        number: "03",
        title: "Product Design (Zero to One)",
        description:
          "I take products from chaotic concept to MVP ready to build. Research, identity, flows, validation with real users, and documented delivery. Design for business, not just screens: without business context, it's decoration.",
      },
      {
        number: "04",
        title: "Design & Front-End Development",
        description:
          "I write my own designs in code when the project calls for it. Next.js, Tailwind, real components. The cleanest handoff is the one that doesn't exist — because the designer understands what can be built.",
      },
      {
        number: "05",
        title: "Design Automation",
        description:
          "I design workflows that remove repetitive hours from teams. From documenting a system for AI to read, to tools that turn 30-minute tasks into 5. Efficiency gets designed too.",
      },
      {
        number: "06",
        title: "Micro-interactions & Motion",
        description:
          "The details that make a product feel alive. Transitions with purpose, responsive states, animations that guide instead of distract. Never decoration — always intention.",
      },
    ],
  },
  resume: {
    title: "Résumé",
    description:
      "Jorge Desmond's CV — Senior Product Designer with 8+ years designing end-to-end digital products in B2B SaaS, fintech, and marketplaces.",
    experience: "Experience",
    skills: "Skills",
    contact: "Contact",
    sendMessage: "Send message",
    location: "Monterrey, Mexico.",
    downloadCv: "Download CV (PDF) →",
  },
  notFound: {
    message: "This page doesn't exist or was moved.",
    backHome: "Back to home →",
  },
  zoom: {
    image: "Image",
    viewFull: (alt: string) => `View ${alt} full size`,
    close: "Close",
  },
};
