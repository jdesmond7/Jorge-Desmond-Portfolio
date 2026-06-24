import { triggerVercelDeploy } from "./utils/deploy";
import {
  ensureUploadsDirectoryWritable,
  logUploadStorageDiagnostics,
} from "./utils/upload-storage";
import {
  configureProyectoCaseStudyLayout,
  migrateProyectoCaseStudyFields,
} from "./utils/proyecto-case-study";
import {
  configureProyectoSummaryLayout,
  migrateProyectoProjectSummary,
} from "./utils/proyecto-project-summary";
import { migrateProyectoMetrics } from "./utils/proyecto-metrics";

const BRANDS = [
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

// Proyectos de nivel superior (padres y standalone). Se crean primero.
const PARENT_PROJECTS = [
  {
    title: "De MVP caótico a sistema de diseño con IA",
    slug: "growrk",
    company: "GroWrk Remote",
    year: "2022 — Hoy",
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
    isParent: true,
    publishedAt: "2024-06-01T00:00:00.000Z",
    overviewTitle: "Una operación global en una sola interfaz",
    overviewBodyText:
      "Growrk es una plataforma global de IT Asset Management (ITAM) y logística automatizada. Permite a empresas internacionales (especialmente remotas y distribuidas) comprar, almacenar, desplegar, gestionar y dar soporte a todo el hardware de sus empleados (laptops, monitores, periféricos) en más de 150 países, centralizando una operación global en una sola interfaz digital.",
    challengeTitle: "De inventario básico a infraestructura de escala global",
    challengeBodyText:
      "Me uní a GroWrk en sus etapas iniciales con la misión de transformar una operación compleja y manual de gestión de hardware en una plataforma SaaS escalable. Mi reto evolucionó de diseñar flujos básicos de inventario a liderar la estrategia de experiencia para tres frentes críticos: Clientes, Empleados y Operaciones Internas, mientras construía la infraestructura de diseño (Design System) que permitiría al equipo crecer de 0 a escala global.",
    learning:
      "Un Design System no es una librería de componentes. Es la decisión colectiva de cómo un equipo quiere trabajar. Sin adopción, no existe. Sin ingeniería, no escala. Sin IA, no crece.",
  },
  {
    title: "Banca para los no bancarizados",
    slug: "spin",
    company: "Spin by OXXO",
    year: "2021 — 2022",
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
    title: "4 marcas. 4 sistemas. 1 framework.",
    slug: "salinas",
    company: "Grupo Salinas",
    year: "2020 — 2021",
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

// Proyectos hijos. `parentSlug` los enlaza con su padre tras crearlo.
const CHILD_PROJECTS = [
  {
    parentSlug: "growrk",
    title: "Ecosistema de Autoservicio para Empleados",
    slug: "growrk-marketplace",
    company: "GroWrk Remote",
    year: "2023 — 2024",
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
    parentSlug: "growrk",
    title: "Automatización de flujos para erradicar la fatiga de decisión",
    slug: "growrk-smart-packages",
    company: "GroWrk Remote",
    year: "2023 — 2024",
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
];

async function setPublicPermissions(strapi) {
  const publicRole = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({ where: { type: "public" } });

  if (!publicRole) return;

  const permissions = [
    "api::proyecto.proyecto.find",
    "api::proyecto.proyecto.findOne",
    "api::tag.tag.find",
    "api::tag.tag.findOne",
    "api::blog-post.blog-post.find",
    "api::blog-post.blog-post.findOne",
    "api::ilustracion.ilustracion.find",
    "api::ilustracion.ilustracion.findOne",
    "api::marca.marca.find",
    "api::marca.marca.findOne",
    "api::home.home.find",
    "api::sobre-mi.sobre-mi.find",
    "api::site-setting.site-setting.find",
  ];

  for (const action of permissions) {
    const existing = await strapi.db
      .query("plugin::users-permissions.permission")
      .findOne({ where: { action, role: publicRole.id } });

    if (!existing) {
      await strapi.db.query("plugin::users-permissions.permission").create({
        data: { action, role: publicRole.id },
      });
    }
  }
}

// Crea las tags que falten y devuelve sus documentIds para enlazar la relación.
async function ensureTagIds(strapi, names: string[] = []): Promise<string[]> {
  const ids: string[] = [];
  for (const name of names) {
    let tag = await strapi
      .documents("api::tag.tag")
      .findFirst({ filters: { name } });
    if (!tag) {
      tag = await strapi.documents("api::tag.tag").create({ data: { name } });
    }
    ids.push(tag.documentId);
  }
  return ids;
}

async function seedContent(strapi) {
  const existingProjects = await strapi.db
    .query("api::proyecto.proyecto")
    .findMany({ limit: 1 });

  if (existingProjects.length > 0) return;

  const parentIdBySlug = new Map<string, string>();

  for (const { tags, ...project } of PARENT_PROJECTS) {
    const created = await strapi.documents("api::proyecto.proyecto").create({
      data: { ...project, tags: await ensureTagIds(strapi, tags) },
      status: "published",
    });
    parentIdBySlug.set(project.slug, created.documentId);
  }

  for (const { parentSlug, tags, ...child } of CHILD_PROJECTS) {
    const parentId = parentIdBySlug.get(parentSlug);
    await strapi.documents("api::proyecto.proyecto").create({
      data: {
        ...child,
        tags: await ensureTagIds(strapi, tags),
        ...(parentId ? { parent: parentId } : {}),
      },
      status: "published",
    });
  }

  for (const [index, name] of BRANDS.entries()) {
    await strapi.documents("api::marca.marca").create({
      data: { name, order: index + 1 },
      status: "published",
    });
  }

  await strapi.documents("api::home.home").create({
    data: {
      heroGreeting: "Hola hola, soy",
      heroName: "JORGE\nDESMOND",
      heroTitle: "Own the process.\nBuild the system.",
      heroSubtitle:
        "De Design Systems tradicionales a arquitectura de diseño con IA. Profesor en el Tec de Monterrey. La misma disciplina dentro y fuera de la pantalla.",
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
    },
    status: "published",
  });

  await strapi.documents("api::sobre-mi.sobre-mi").create({
    data: {
      title: "Sobre mí",
      heroImage: "/images/about-me.png",
      images: [],
      body: "soy jorge. mexicano, vivo en monterrey. entreno calistenia. dibujo cuando puedo.\n\ndiseño sistemas — los que hacen que los productos no se rompan cuando crecen. ahorita soy senior product designer en growrk remote, donde también cargo el sombrero de ai design architect. en paralelo enseño diseño en el tec de monterrey y estoy construyendo prowell, una plataforma de coaching para entrenadores de bienestar.\n\nlos últimos cinco años han sido sistemas de diseño, tokens, componentes y decisiones que se ven simples pero tienen tres capas abajo. también escribo mis propios diseños en código cuando el proyecto lo pide.\n\nantes de esto estuve en spin by oxxo, grupo salinas y un par de proyectos que me enseñaron que el diseño sin contexto de negocio es decoración.\n\nen las noches ilustro. manga, tinta, papel. sin ctrl+z.\n\ntengo tres marcas paralelas que estoy construyendo despacio y con intención: desmond.design para consultoría de sistemas, built by des para fitness, y frame & font para educación de diseño — esta última con mi socia y pareja liz.\n\nescríbeme a hola@jorgedesmond.com o encuéntrame en linkedin / instagram.\n\ncon gusto, jorge",
    },
    status: "published",
  });

  await strapi.documents("api::site-setting.site-setting").create({
    data: {
      siteName: "jorge desmond",
      email: "jdesmond7@gmail.com",
      linkedin: "https://www.linkedin.com/in/jorgedesmond/",
      instagram: "https://www.instagram.com/jorgedesmond/",
      footerText: "monterrey, méxico — diseñado como un sistema",
      footerHeadline: "Piensa en todo lo que podríamos construir juntos",
      navLinks: [
        { label: "Casos de estudio", href: "/proyectos" },
        { label: "Ilustración", href: "/ilustracion" },
        { label: "Blog", href: "/blog" },
        { label: "Sobre mí", href: "/sobre-mi" },
      ],
    },
  });

  await strapi.documents("api::blog-post.blog-post").create({
    data: {
      title: "Design Systems en la era de la IA",
      slug: "design-systems-con-ia",
      excerpt:
        "Cómo integrar generación de UI asistida por IA sin perder coherencia de marca ni accesibilidad.",
      publishedAt: "2026-01-15",
      body: "Los Design Systems tradicionales asumen que cada componente será diseñado manualmente. La IA cambia esa ecuación. En este artículo comparto el framework que uso para mantener fidelidad del 80–90% en generación prompt-to-UI.",
    },
    status: "published",
  });

  await strapi.documents("api::blog-post.blog-post").create({
    data: {
      title: "Pensamiento sistémico más allá del Figma",
      slug: "pensamiento-sistemico",
      excerpt:
        "Lecciones de calistenia aplicadas al diseño de producto: proceso, consistencia e iteración.",
      publishedAt: "2025-11-02",
      body: "La misma lógica que uso para progresar en calistenia — progresiones, consistencia, feedback loops — aplica directamente a cómo construyo y mantengo Design Systems.",
    },
    status: "published",
  });
}

// Migración idempotente: rellena `metrics` y `tags` (ahora relación) en los
// proyectos que ya existían antes del cambio de esquema. Solo actúa si el
// proyecto aún no tiene métricas, para no pisar ediciones manuales.
const PROJECT_BACKFILL: Record<
  string,
  { metrics: { value: string; title: string; description?: string }[]; tags: string[] }
> = {
  growrk: {
    metrics: [
      {
        value: "50K+",
        title: "Usuarios en producción",
        description: "Operación activa en más de 150 países",
      },
    ],
    tags: ["Design Systems", "AI Architecture", "B2B SaaS"],
  },
  spin: {
    metrics: [
      {
        value: "1M+",
        title: "Usuarios en 9 meses",
        description: "Escala de fintech para no bancarizados",
      },
    ],
    tags: ["Fintech", "0→1", "Mobile"],
  },
  salinas: {
    metrics: [
      {
        value: "4",
        title: "Design systems paralelos",
        description: "Elektra, Banco Azteca, ITALIKA y Presta Prenda",
      },
    ],
    tags: ["Loyalty", "Multi-brand", "Cross-platform"],
  },
  proyecto: {
    metrics: [
      {
        value: "50K+",
        title: "Usuarios en producción",
        description: "Operación activa en más de 150 países",
      },
    ],
    tags: [],
  },
};

async function backfillMetricsAndTags(strapi) {
  for (const [slug, { metrics, tags }] of Object.entries(PROJECT_BACKFILL)) {
    try {
      const docs = await strapi.documents("api::proyecto.proyecto").findMany({
        filters: { slug },
        status: "draft",
        populate: ["metrics"],
      });

      for (const doc of docs) {
        const current = (doc as { metrics?: unknown[] }).metrics;
        if (Array.isArray(current) && current.length > 0) continue;

        await strapi.documents("api::proyecto.proyecto").update({
          documentId: doc.documentId,
          data: { metrics, tags: await ensureTagIds(strapi, tags) },
        });
        await strapi
          .documents("api::proyecto.proyecto")
          .publish({ documentId: doc.documentId });
      }
    } catch (err) {
      strapi.log.error(
        `Backfill de métricas/tags falló para "${slug}": ${
          (err as Error)?.message ?? err
        }`,
      );
    }
  }
}

export default {
  register() {},

  async bootstrap({ strapi }) {
    ensureUploadsDirectoryWritable(strapi);

    // Permisos + seed + migración primero, antes de registrar el middleware de
    // deploy, para que estas escrituras internas no disparen despliegues.
    await setPublicPermissions(strapi);
    await seedContent(strapi);
    await migrateProyectoMetrics(strapi);
    await backfillMetricsAndTags(strapi);
    await migrateProyectoCaseStudyFields(strapi);
    await migrateProyectoProjectSummary(strapi);
    await configureProyectoCaseStudyLayout(strapi);
    await configureProyectoSummaryLayout(strapi);
    logUploadStorageDiagnostics(strapi);

    const CONTENT_TYPES_THAT_TRIGGER_DEPLOY = new Set([
      "api::home.home",
      "api::sobre-mi.sobre-mi",
      "api::site-setting.site-setting",
      "api::proyecto.proyecto",
      "api::blog-post.blog-post",
      "api::ilustracion.ilustracion",
      "api::marca.marca",
    ]);

    const DEPLOY_TRIGGER_ACTIONS = new Set([
      "create",
      "update",
      "delete",
      "publish",
      "unpublish",
    ]);

    strapi.documents.use(async (context, next) => {
      const result = await next();
      if (
        CONTENT_TYPES_THAT_TRIGGER_DEPLOY.has(context.uid) &&
        DEPLOY_TRIGGER_ACTIONS.has(context.action)
      ) {
        await triggerVercelDeploy();
      }
      return result;
    });
  },
};
