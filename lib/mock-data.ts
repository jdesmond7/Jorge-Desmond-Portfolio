import type {
  AboutContent,
  BlogPost,
  Comment,
  HomeContent,
  Illustration,
  Project,
  SiteSettings,
} from "./types";

export const BRANDS = [
  "GroWrk",
  "Spin by OXXO",
  "OXXO",
  "FEMSA",
  "Grupo Salinas",
  "Banco Azteca",
  "Elektra",
  "ITALIKA",
  "Presta Prenda",
  "Wacom",
  "Tec de Monterrey",
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: "1",
    slug: "growrk",
    company: "GroWrk Remote",
    year: "2022 — Hoy",
    title: "De MVP caótico a sistema de diseño con IA",
    problem: "Cuando el MVP no escala con el negocio",
    description:
      "Infraestructura de diseño completa para una plataforma B2B SaaS global: 3 generaciones de Design System, 5 plataformas y un AI Playground que genera UI con 80–90% de fidelidad desde un prompt.",
    tags: ["Design Systems", "AI Architecture", "B2B SaaS"],
    metrics: [
      {
        value: "50K+",
        title: "Usuarios en producción",
        description: "Operación activa en más de 150 países",
      },
    ],
    featured: true,
    order: 1,
    publishedAt: "2024-06-01T00:00:00.000Z",
    coverImage: "/images/banner-growrk-projects.png",
    isParent: true,
    overviewTitle:
      "Una plataforma global de ITAM que centraliza operaciones en 150+ países.",
    overviewBodyText:
      "Growrk es una plataforma global de IT Asset Management (ITAM) y logística automatizada. Permite a empresas internacionales (especialmente remotas y distribuidas) comprar, almacenar, desplegar, gestionar y dar soporte a todo el hardware de sus empleados (laptops, monitores, periféricos) en más de 150 países, centralizando una operación global en una sola interfaz digital.",
    challengeTitle:
      "Transformar una operación manual en una plataforma SaaS escalable.",
    challengeBodyText:
      "Me uní a GroWrk en sus etapas iniciales con la misión de transformar una operación compleja y manual de gestión de hardware en una plataforma SaaS escalable. Mi reto evolucionó de diseñar flujos básicos de inventario a liderar la estrategia de experiencia para tres frentes críticos: Clientes, Empleados y Operaciones Internas, mientras construía la infraestructura de diseño (Design System) que permitiría al equipo crecer de 0 a escala global.",
    learning:
      "Un Design System no es una librería de componentes. Es la decisión colectiva de cómo un equipo quiere trabajar. Sin adopción, no existe. Sin ingeniería, no escala. Sin IA, no crece.",
  },
  {
    id: "1-marketplace",
    slug: "growrk-marketplace",
    parentSlug: "growrk",
    company: "GroWrk Remote",
    year: "2023 — 2024",
    title: "Ecosistema de Autoservicio para Empleados",
    problem: "Asignación de hardware rígida y dependiente de managers",
    description:
      "Diseñé un ecosistema descentralizado que transformó el flujo de asignación de hardware. Pasamos de un modelo rígido gestionado por managers a un Marketplace donde el empleado elige sus herramientas bajo un catálogo pre-aprobado.",
    tags: ["Marketplace", "Self-service", "B2B SaaS"],
    metrics: [
      {
        value: "−60%",
        title: "Carga de soporte",
        description: "Reducción tras el modelo de autoservicio",
      },
    ],
    order: 1,
    showInHome: true,
    publishedAt: "2024-02-01T00:00:00.000Z",
    body: "El impacto: reducción drástica en la carga de soporte, eliminación de la fricción de comunicación y una experiencia de onboarding fluida para equipos globales.",
    projectSummary: {
      duration: "2023 — 2024",
      roles: "Sr. Product Designer · Lead UI Designer",
      team: "1 PO · 1 PM · 5 Devs · 2 Designers",
      tools: "Figma · Nuxt UI · Tailwind · Notion",
    },
    learning:
      "La descentralización solo funciona con límites claros. El empleado elige, pero dentro de un catálogo que la empresa ya aprobó.",
  },
  {
    id: "1-packages",
    slug: "growrk-smart-packages",
    parentSlug: "growrk",
    company: "GroWrk Remote",
    year: "2023 — 2024",
    title: "Automatización de flujos para erradicar la fatiga de decisión",
    problem: "Equipar equipos artículo por artículo generaba cuellos de botella",
    description:
      'Equipar a equipos enteros artículo por artículo generaba cuellos de botella y errores logísticos. Diseñé una solución basada en "Paquetes Inteligentes" que permite a las empresas estandarizar y asignar configuraciones de hardware completas por rol o departamento en solo un par de clics.',
    tags: ["Automation", "Logística", "B2B SaaS"],
    metrics: [
      {
        value: "1-click",
        title: "Asignación por rol",
        description: "Paquetes inteligentes listos para desplegar",
      },
    ],
    order: 2,
    showInHome: true,
    publishedAt: "2024-04-01T00:00:00.000Z",
    body: "El impacto: reducción drástica en el tiempo de creación de órdenes masivas y optimización en la cadena de suministro internacional.",
    projectSummary: {
      duration: "2023 — 2024",
      roles: "Sr. Product Designer · Lead Design System Designer",
      team: "1 PO · 1 PM · 8 Devs · 4 Designers",
      tools: "Figma · Nuxt UI · Tailwind · Cursor · Notion",
    },
    learning:
      "Estandarizar no es limitar. Los paquetes inteligentes reducen fricción sin quitar flexibilidad al negocio.",
  },
  {
    id: "2",
    slug: "spin",
    company: "Spin by OXXO",
    year: "2021 — 2022",
    title: "Banca para los no bancarizados",
    problem: "Servicios financieros sin sistema ni confianza",
    description:
      "Primer Design System del producto y flujos financieros críticos — SPEI, onboarding, KYC — para una fintech que escaló a 1M de usuarios en 9 meses.",
    tags: ["Fintech", "0→1", "Mobile"],
    metrics: [
      {
        value: "1M+",
        title: "Usuarios en 9 meses",
        description: "Escala de fintech para no bancarizados",
      },
    ],
    featured: true,
    order: 2,
    showInHome: true,
    publishedAt: "2023-03-15T00:00:00.000Z",
    body: "Spin democratizó servicios financieros para millones de usuarios en México. Diseñé el primer sistema de diseño del producto y los flujos críticos de onboarding, KYC y transferencias SPEI.",
    projectSummary: {
      duration: "2021 — 2022",
      roles: "Lead Product Designer · Design System Lead",
      team: "1 PO · 2 PMs · 12 Devs · 3 Designers",
      tools: "Figma · React Native · Storybook · Notion",
    },
    learning:
      "En fintech, la confianza se diseña en cada micro-interacción. El onboarding no es un formulario — es el primer contrato con el usuario.",
  },
  {
    id: "3",
    slug: "salinas",
    company: "Grupo Salinas",
    year: "2020 — 2021",
    title: "4 marcas. 4 sistemas. 1 framework.",
    problem: "Cuatro marcas, cero consistencia operativa",
    description:
      "Sistemas de lealtad para Elektra, Banco Azteca, ITALIKA y Presta Prenda — identidades distintas sobre una arquitectura de interacción compartida.",
    tags: ["Loyalty", "Multi-brand", "Cross-platform"],
    metrics: [
      {
        value: "4",
        title: "Design systems paralelos",
        description: "Elektra, Banco Azteca, ITALIKA y Presta Prenda",
      },
    ],
    featured: true,
    order: 3,
    showInHome: true,
    publishedAt: "2022-01-10T00:00:00.000Z",
    body: "Cuatro marcas, cuatro identidades, una sola arquitectura de interacción. Diseñé sistemas de lealtad que respetan la voz de cada marca mientras comparten patrones de usabilidad probados.",
    projectSummary: {
      duration: "2020 — 2021",
      roles: "Sr. UI Designer · Design System Designer",
      team: "2 POs · 3 PMs · 10 Devs · 5 Designers",
      tools: "Figma · Sketch · Zeplin · InVision · Confluence",
    },
    learning:
      "Multi-marca no significa multi-caos. La arquitectura compartida es lo que permite que cada identidad respire sin romper la operación.",
  },
];

export const MOCK_HOME: HomeContent = {
  heroGreeting: "Hola hola, soy",
  heroName: "JORGE\nDESMOND",
  heroTitle:
    "Own the process.\nBuild the system.",
  heroSubtitle:
    "De Design Systems tradicionales a arquitectura de diseño con IA. Profesor en el Tec de Monterrey. La misma disciplina dentro y fuera de la pantalla.",
  heroImage: "/images/hero.png",
  trustBadges: [
    "10+ Años de exp.",
    "5 Plataformas E2E",
    "50K+ Usuarios",
    "150+ Paises",
  ],
  stats: [
    { value: "8+", label: "años de experiencia" },
    { value: "50K+", label: "usuarios en producción" },
    { value: "150+", label: "países alcanzados" },
    { value: "~40%", label: "menos tiempo de diseño" },
  ],
  stackItems: [
    {
      number: "01",
      name: "Product Design",
      items: "Research · Flujos · Prototipado · Usabilidad",
    },
    {
      number: "02",
      name: "Design Systems",
      items: "Tokens · Componentes · Documentación Figma + código",
    },
    {
      number: "03",
      name: "DesignOps",
      items: "Procesos · Onboarding · Educación de equipos",
    },
    {
      number: "04",
      name: "AI Design Architecture",
      items: "AI Playground · Auditoría automatizada · Prompt-to-UI",
      isToday: true,
    },
  ],
  aboutTitle: "Mismo proceso.\nDos escenarios.",
  aboutTeaser:
    "Dentro de la pantalla: sistemas de diseño, IA y plataformas que escalan. Fuera de ella: calistenia y fuerza con la misma lógica — proceso, consistencia, iteración. Enseño en el Tec de Monterrey porque el pensamiento sistémico se comparte, no se acumula.",
  ctaTitle: "¿Construimos algo juntos?",
  ctaSubtitle:
    "Disponible para roles de Product Design, Design Systems y arquitectura de diseño con IA.",
  email: "jdesmond7@gmail.com",
  linkedin: "https://www.linkedin.com/in/jorgedesmond/",
};

export const MOCK_SITE_SETTINGS: SiteSettings = {
  siteName: "jorge desmond",
  email: "jdesmond7@gmail.com",
  linkedin: "https://www.linkedin.com/in/jorgedesmond/",
  instagram: "https://www.instagram.com/jorgedesmond/",
  navLinks: [
    { label: "Casos de estudio", href: "/proyectos" },
    { label: "Ilustración", href: "/ilustracion" },
    { label: "Blog", href: "/blog" },
    { label: "Sobre mí", href: "/sobre-mi" },
  ],
  footerText: "monterrey, méxico — diseñado como un sistema",
};

export const MOCK_ABOUT: AboutContent = {
  title: "Sobre mí",
  heroImage: "/images/about-me.png",
  images: [],
  body: `soy jorge. mexicano, vivo en monterrey. entreno calistenia. dibujo cuando puedo.

diseño sistemas — los que hacen que los productos no se rompan cuando crecen. ahorita soy senior product designer en growrk remote, donde también cargo el sombrero de ai design architect. en paralelo enseño diseño en el tec de monterrey y estoy construyendo prowell, una plataforma de coaching para entrenadores de bienestar.

los últimos cinco años han sido sistemas de diseño, tokens, componentes y decisiones que se ven simples pero tienen tres capas abajo. también escribo mis propios diseños en código cuando el proyecto lo pide.

antes de esto estuve en spin by oxxo, grupo salinas y un par de proyectos que me enseñaron que el diseño sin contexto de negocio es decoración.

en las noches ilustro. manga, tinta, papel. sin ctrl+z.

tengo tres marcas paralelas que estoy construyendo despacio y con intención: desmond.design para consultoría de sistemas, built by des para fitness, y frame & font para educación de diseño — esta última con mi socia y pareja liz.

escríbeme a hola@jorgedesmond.com o encuéntrame en linkedin / instagram.

con gusto, jorge`,
};

export const MOCK_BLOG: BlogPost[] = [
  {
    id: "1",
    slug: "design-systems-con-ia",
    title: "Design Systems en la era de la IA",
    excerpt:
      "Cómo integrar generación de UI asistida por IA sin perder coherencia de marca ni accesibilidad.",
    publishedAt: "2026-01-15",
    body: "Los Design Systems tradicionales asumen que cada componente será diseñado manualmente. La IA cambia esa ecuación. En este artículo comparto el framework que uso para mantener fidelidad del 80–90% en generación prompt-to-UI.",
  },
  {
    id: "2",
    slug: "pensamiento-sistemico",
    title: "Pensamiento sistémico más allá del Figma",
    excerpt:
      "Lecciones de calistenia aplicadas al diseño de producto: proceso, consistencia e iteración.",
    publishedAt: "2025-11-02",
    body: "La misma lógica que uso para progresar en calistenia — progresiones, consistencia, feedback loops — aplica directamente a cómo construyo y mantengo Design Systems.",
  },
];

export const MOCK_COMMENTS: Array<Comment & { blogPostSlug: string }> = [
  {
    id: "mock-comment-1",
    blogPostSlug: "design-systems-con-ia",
    blogPostId: "1",
    body: "Muy buen artículo. Me quedó claro cómo mantener coherencia cuando la IA genera componentes.",
    authorName: "María",
    upvotes: 3,
    downvotes: 0,
    reportCount: 0,
    createdAt: "2026-06-18T10:00:00.000Z",
    lastActivityAt: "2026-06-20T14:30:00.000Z",
    replies: [],
  },
  {
    id: "mock-comment-2",
    blogPostSlug: "design-systems-con-ia",
    blogPostId: "1",
    body: "¿Tienes algún ejemplo del AI Playground en acción?",
    authorName: "Carlos",
    upvotes: 1,
    downvotes: 0,
    reportCount: 0,
    createdAt: "2026-06-19T08:15:00.000Z",
    lastActivityAt: "2026-06-20T14:30:00.000Z",
    replies: [],
    parentId: "mock-comment-1",
  },
];

export const MOCK_ILLUSTRATIONS: Illustration[] = [
  {
    id: "1",
    slug: "disciplina",
    title: "Disciplina",
    description: "Serie personal sobre proceso y constancia.",
    image: "/images/hero.png",
    year: "2025",
    tags: ["Editorial", "Personal"],
    order: 1,
  },
  {
    id: "2",
    slug: "sistemas",
    title: "Sistemas",
    description: "Exploración visual de patrones y modularidad.",
    image: "/images/hero.png",
    year: "2024",
    tags: ["Conceptual"],
    order: 2,
  },
];
