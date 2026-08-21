import type {
  AboutContent,
  Comment,
  HomeContent,
  SiteSettings,
} from "./types";
import { SITE_EMAIL } from "./site";

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
  ctaTitle: "Construyamos algo que valga la pena.",
  ctaSubtitle:
    "Si tienes un proyecto donde el diseño y los sistemas importan, quiero saber de él.",
  email: SITE_EMAIL,
  linkedin: "https://www.linkedin.com/in/jorgedesmond/",
};

export const MOCK_SITE_SETTINGS: SiteSettings = {
  siteName: "jorge desmond",
  email: SITE_EMAIL,
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

escríbeme a ${SITE_EMAIL} o encuéntrame en linkedin / instagram.

con gusto, jorge`,
};

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
