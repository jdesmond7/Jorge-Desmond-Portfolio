import type {
  AboutContent,
  BlogPost,
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
    metrics: [{ value: "50K+", label: "usuarios · 150 países" }],
    featured: true,
    order: 1,
    publishedAt: "2024-06-01T00:00:00.000Z",
    isParent: true,
    overview:
      "Growrk es una plataforma global de IT Asset Management (ITAM) y logística automatizada. Permite a empresas internacionales (especialmente remotas y distribuidas) comprar, almacenar, desplegar, gestionar y dar soporte a todo el hardware de sus empleados (laptops, monitores, periféricos) en más de 150 países, centralizando una operación global en una sola interfaz digital.",
    challenge:
      "Me uní a GroWrk en sus etapas iniciales con la misión de transformar una operación compleja y manual de gestión de hardware en una plataforma SaaS escalable. Mi reto evolucionó de diseñar flujos básicos de inventario a liderar la estrategia de experiencia para tres frentes críticos: Clientes, Empleados y Operaciones Internas, mientras construía la infraestructura de diseño (Design System) que permitiría al equipo crecer de 0 a escala global.",
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
    metrics: [{ value: "−60%", label: "carga de soporte" }],
    order: 1,
    showInHome: true,
    publishedAt: "2024-02-01T00:00:00.000Z",
    body: "El impacto: reducción drástica en la carga de soporte, eliminación de la fricción de comunicación y una experiencia de onboarding fluida para equipos globales.",
    roles: ["Sr. Product Designer", "Lead UI Designer"],
    team: ["1 Product Owner", "1 PM", "5 Engineers", "2 Designers"],
    tools: ["Figma", "Figjam", "Nuxt UI", "Tailwind", "Notion"],
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
    metrics: [{ value: "1-click", label: "asignación por rol" }],
    order: 2,
    showInHome: true,
    publishedAt: "2024-04-01T00:00:00.000Z",
    body: "El impacto: reducción drástica en el tiempo de creación de órdenes masivas y optimización en la cadena de suministro internacional.",
    roles: ["Sr. Product Designer", "Lead Design System Designer"],
    team: ["1 Product Owner", "1 PM", "8 Engineers", "4 Designers"],
    tools: ["Figma", "Figjam", "Design Tokens", "Cursor", "ClaudeCode"],
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
    metrics: [{ value: "1M+", label: "usuarios en 9 meses" }],
    featured: true,
    order: 2,
    showInHome: true,
    publishedAt: "2023-03-15T00:00:00.000Z",
    body: "Spin democratizó servicios financieros para millones de usuarios en México. Diseñé el primer sistema de diseño del producto y los flujos críticos de onboarding, KYC y transferencias SPEI.",
    roles: ["Lead Product Designer", "Design System Lead"],
    team: ["1 Product Owner", "2 PMs", "12 Engineers", "3 Designers"],
    tools: ["Figma", "Figjam", "React Native", "Storybook", "Notion"],
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
    metrics: [{ value: "4", label: "design systems paralelos" }],
    featured: true,
    order: 3,
    showInHome: true,
    publishedAt: "2022-01-10T00:00:00.000Z",
    body: "Cuatro marcas, cuatro identidades, una sola arquitectura de interacción. Diseñé sistemas de lealtad que respetan la voz de cada marca mientras comparten patrones de usabilidad probados.",
    roles: ["Sr. UI Designer", "Design System Designer"],
    team: ["2 Product Owners", "3 PMs", "10 Engineers", "5 Designers"],
    tools: ["Figma", "Sketch", "Zeplin", "InVision", "Confluence"],
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
  navLinks: [
    { label: "Casos de estudio", href: "/proyectos" },
    { label: "Ilustración", href: "/ilustracion" },
    { label: "Blog", href: "/blog" },
    { label: "Sobre mí", href: "/sobre-mi" },
  ],
  footerText: "monterrey, méxico — diseñado como un sistema",
};

export const MOCK_ABOUT: AboutContent = {
  title: "Mismo proceso. Dos escenarios.",
  body: "Soy Senior Product Designer con más de 8 años construyendo productos digitales que escalan. Mi trabajo vive en la intersección entre diseño de producto, sistemas de diseño y arquitectura de diseño con IA.\n\nDentro de la pantalla diseño infraestructura que reduce fricción operativa. Fuera de ella aplico la misma disciplina sistémica al entrenamiento físico. Enseño en el Tec de Monterrey porque creo que el pensamiento sistémico se comparte, no se acumula.\n\nHe liderado Design Systems para fintechs, plataformas B2B globales y ecosistemas multi-marca. Mi enfoque actual: usar IA como capa de aceleración sin sacrificar coherencia ni accesibilidad.",
  cardTitle: "Build the body.\nOwn the process.",
  cardSubtitle: "disciplina aplicada — dentro y fuera",
  cardEyebrow: "built by des",
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
