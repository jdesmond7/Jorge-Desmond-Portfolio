export const es = {
  meta: {
    defaultTitle: "Jorge Desmond · Sr. Product Designer",
    defaultDescription:
      "Diseño sistemas que convierten complejidad operativa en productos que escalan. Design Systems, Product Design y arquitectura de diseño con IA.",
    siteName: "JORGE DESMOND",
  },
  nav: {
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    resume: "Resume",
    linkedin: "LinkedIn",
    letsTalk: "Hablemos →",
    language: "Idioma",
    spanish: "Español",
    english: "English",
    links: {
      "/proyectos": "Casos de estudio",
      "/ilustracion": "Ilustración",
      "/blog": "Blog",
      "/sobre-mi": "Sobre mí",
      "/": "Inicio",
      "/resume": "Resume",
    },
  },
  footer: {
    siteMap: "Mapa del sitio",
    contact: "Contacto",
    social: "Redes",
    writeMe: "Escríbeme",
    emailCta: "Mándame un correo",
    linkedinCta: "Conecta en LinkedIn",
    home: "Inicio",
  },
  hero: {
    viewProjects: "Ver Casos de Estudio",
    viewResume: "Ver Resume",
    scroll: "Scroll",
  },
  projects: {
    selectedWork: "Trabajo seleccionado",
    viewAll: "Ver todos →",
    pageTitle: "Casos de estudio",
    pageDescription:
      "Proyectos donde diseño, sistemas y estrategia de producto se encuentran.",
    pageIntro:
      "Casos de estudio de productos digitales en B2B SaaS, fintech y ecosistemas multi-marca.",
    listIntro:
      "Proyectos donde diseñé sistemas, flujos críticos y arquitectura de producto a escala.",
    readCaseStudy: "Leer caso de estudio",
    readCaseStudyAria: (title: string) => `Leer caso de uso: ${title}`,
    keyInitiatives: "Iniciativas Clave",
    notFound: "Proyecto no encontrado",
    backTo: (title: string) => `Volver a ${title}`,
    prev: "← Proyecto anterior",
    next: "Siguiente proyecto →",
    navAria: "Navegación entre proyectos",
    duration: "Duración",
    role: "Rol",
    team: "Equipo",
    tools: "Herramientas",
    learning: "Aprendizaje personal",
    overview: "Overview",
    challenge: "Challenge",
    imageAlt: (title: string, n: number) => `${title} - imagen ${n}`,
    visitLiveSite: "Ver sitio en su estado actual",
    decision: {
      context: "Contexto",
      decision: "La decisión",
      outcome: "Resultado",
    },
  },
  writing: {
    eyebrow: "Artículos",
    title: "Blog Personal",
    article: "Artículo",
    readArticle: "Leer artículo",
  },
  blog: {
    title: "Blog",
    description:
      "Artículos sobre Design Systems, arquitectura de diseño con IA y pensamiento sistémico.",
    intro: "Reflexiones sobre diseño de producto, sistemas y disciplina aplicada.",
    notFound: "Artículo no encontrado",
    back: "← Blog",
    comments: "Comentarios",
    loadingComments: "Cargando comentarios…",
    loadError: "No se pudieron cargar los comentarios.",
    emptyComments: "Sé el primero en comentar este artículo.",
  },
  comments: {
    publishNew: "Publicar un comentario nuevo",
    reply: "Responder",
    publish: "Publicar",
    publishing: "Publicando…",
    cancel: "Cancelar",
    nameOptional: "Nombre (opcional)",
    emailOptional: "Correo (opcional)",
    bodyLabel: "Comentario",
    namePlaceholder: "Tu nombre",
    emailPlaceholder: "tu@correo.com",
    bodyPlaceholder: "Introduce el texto aquí",
    anonymous: "Anónimo",
    report: "Reportar",
    reported: "Comentario reportado. Gracias.",
    upvote: "Voto positivo",
    downvote: "Voto negativo",
    replySingular: "respuesta",
    replyPlural: "respuestas",
    replyHeading: "Responder",
    replySubmit: "Publicar respuesta",
    errors: {
      alreadyVoted: "Ya votaste este comentario.",
      voteFailed: "No se pudo registrar el voto.",
      reportFailed: "No se pudo reportar el comentario.",
      publishFailed: "No se pudo publicar el comentario.",
    },
    time: {
      justNow: "hace un momento",
      minutes: (n: number) => `hace ${n} min`,
      hours: (n: number) => `hace ${n} h`,
      days: (n: number) => `hace ${n} día${n === 1 ? "" : "s"}`,
    },
  },
  about: {
    title: "Sobre mí",
    description:
      "Jorge Desmond · product designer en Monterrey. Sistemas de diseño, calistenia, ilustración y tres marcas en construcción.",
    heroAlt: "Jorge Desmond en su estudio",
    writePrefix: "escríbeme a",
    writeMiddle: "o encuéntrame en",
    signOff: "con gusto",
  },
  illustration: {
    title: "Ilustración",
    description: "Galería de ilustraciones y exploraciones visuales personales.",
    intro:
      "Exploraciones visuales fuera del producto digital - editorial, conceptual y personal.",
    openInstagram: (alt: string) => `Abrir en Instagram: ${alt}`,
  },
  manifesto: {
    lead: "El diseño brillante no grita su presencia, es transparente.",
    body: "Elimino la fricción y hago desaparecer la interfaz para transformarla en una experiencia inmersiva que se queda con el usuario.",
    projectsCta: "Ver casos de estudio",
  },
  skills: {
    title: "¿Qué es lo que hago?",
    items: [
      {
        number: "01",
        title: "Design Systems",
        description:
          "Diseño sistemas, no pantallas sueltas. Tokens, componentes y arquitectura pensados para que un producto crezca sin romperse. He construido tres generaciones de un mismo sistema, sirviendo a cinco plataformas y un equipo global. La base invisible sobre la que todo lo demás se sostiene.",
      },
      {
        number: "02",
        title: "AI Design Architecture",
        description:
          "Convierto las reglas de un Design System en contexto para que la IA genere producto con él. Diseñé un AI Playground donde cualquier empleado describe una idea y recibe un prototipo fiel al sistema, listo para revisar. No es la IA reemplazando el criterio. Es el criterio, escalado.",
      },
      {
        number: "03",
        title: "Product Design (Zero to One)",
        description:
          "Llevo productos del concepto caótico al MVP listo para programar. Investigación, identidad, flujos, validación con usuarios reales y entrega documentada. Diseño para negocios, no solo para pantallas: si no entiende el contexto de negocio, es decoración.",
      },
      {
        number: "04",
        title: "Diseño y desarrollo Front-End",
        description:
          "Escribo mis propios diseños en código cuando el proyecto lo pide. Next.js, Tailwind, componentes reales. El handoff más limpio es el que no existe, porque el diseñador entiende lo que se puede construir.",
      },
      {
        number: "05",
        title: "Automatización de diseño",
        description:
          "Diseño flujos de trabajo que le quitan horas repetitivas a los equipos. De documentar un sistema para que la IA lo lea, a herramientas que convierten tareas de 30 minutos en 5. La eficiencia también se diseña.",
      },
      {
        number: "06",
        title: "Micro-interacciones y Motion",
        description:
          "Los detalles que hacen que un producto se sienta vivo. Transiciones con propósito, estados que responden, animaciones que guían en lugar de distraer. Nunca decoración: siempre intención.",
      },
    ],
  },
  resume: {
    title: "Résumé",
    description:
      "CV de Jorge Desmond · Senior Product Designer con más de 8 años diseñando productos digitales end-to-end en B2B SaaS, fintech y marketplaces.",
    experience: "Experiencia",
    skills: "Habilidades",
    contact: "Contacto",
    sendMessage: "Enviar mensaje",
    location: "Monterrey, México.",
    downloadCv: "Descargar CV (PDF) →",
  },
  notFound: {
    message: "Esta página no existe o fue movida.",
    backHome: "Volver al inicio →",
  },
  zoom: {
    image: "Imagen",
    viewFull: (alt: string) => `Ver ${alt} en tamaño completo`,
    close: "Cerrar",
  },
};

export type Dictionary = typeof es;
