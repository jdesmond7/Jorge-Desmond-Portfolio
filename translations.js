// Translations object for i18n
const translations = {
  es: {
    // Meta tags
    meta: {
      title: "Jorge Desmond - Diseñador de Productos Digitales",
      description: "Diseñador de productos digitales especializado en UX/UI, con experiencia en herramientas SaaS, apps financieras y programas de lealtad.",
      keywords: "diseñador, UX, UI, productos digitales, SaaS, apps, fintech"
    },
    // Loading screen
    loading: {
      text: "Cargando..."
    },
    // Navigation
    nav: {
      projects: "Proyectos"
    },
    // Hero section
    hero: {
      intro: "👋🏽👋🏽 Hey, soy",
      tagline: {
        highlight: "Diseñador de Producto Digital",
        rest: "apasionado por transformar la complejidad en claridad."
      },
      description: "Diseño experiencias significativas, eficientes y escalables, combinando UX, sistemas de diseño y automatización para ayudar a los equipos a trabajar de manera más inteligente y a que los usuarios se sientan verdaderamente empoderados."
    },
    // Featured Projects section
    featuredProjects: {
      title: "Lo que he estado construyendo",
      button: "Ver caso de estudio",
      growrk: {
        title: "Escalando Operaciones Remotas a Través del Diseño",
        description: "Lideré la estrategia de diseño de producto para la plataforma de espacios de trabajo remotos globales de GroWrk, transformando flujos de trabajo operativos complejos en dashboards intuitivos y escalables."
      },
      spin: {
        title: "Del Primer Sistema de Diseño a una Experiencia Financiera Escalable",
        description: "Jugué un papel fundamental en la formación de Spin by OXXO durante sus primeras etapas, ayudando a establecer su primer sistema de diseño para traer estructura, consistencia y claridad al producto."
      },
      cocacola: {
        title: "Diseñando la Plataforma de Toma de Pedidos de Nueva Generación",
        description: "Como Lead Product Designer, guié la creación de la plataforma digital de toma de pedidos de Coca-Cola, una herramienta de extremo a extremo construida para optimizar las operaciones diarias de los equipos de ventas en campo."
      }
    },
    // Footer
    footer: {
      note: "Este sitio no utiliza cookies ni rastreo. Justo como debería ser la web 🍪"
    },
    // Brands carousel
    brands: {
      title: "Empresas con las que he trabajado",
      description: "Una selección de marcas y equipos con los que he colaborado para diseñar experiencias digitales escalables y centradas en el usuario.",
      ariaLabel: "Carrusel de logos de marcas"
    },
    // Let's Connect section
    letsConnect: {
      title: "Conectemos",
      text1: "Actualmente estoy abierto a nuevos proyectos y colaboraciones.",
      text2: "Cuéntame sobre tu idea, alcance, tiempos y objetivos y construyamos algo significativo juntos.",
      email: "hola@jorgedesmond.com"
    }
  },
  en: {
    // Meta tags
    meta: {
      title: "Jorge Desmond - Digital Product Designer",
      description: "Digital product designer specialized in UX/UI, with experience in SaaS tools, financial apps, and loyalty programs.",
      keywords: "designer, UX, UI, digital products, SaaS, apps, fintech"
    },
    // Loading screen
    loading: {
      text: "Loading..."
    },
    // Navigation
    nav: {
      projects: "Projects"
    },
    // Hero section
    hero: {
      intro: "👋🏽👋🏽 Hey, I'm",
      tagline: {
        highlight: "Digital Product Designer",
        rest: "passionate about transforming complexity into clarity."
      },
      description: "I design meaningful, efficient, and scalable experiences, combining UX, design systems, and automation to help teams work smarter and make users feel truly empowered."
    },
    // Featured Projects section
    featuredProjects: {
      title: "What I've Been Building",
      button: "View Case Study",
      growrk: {
        title: "Scaling Remote Operations Through Design",
        description: "Led the product design strategy for GroWrk's global remote workspace platform, transforming complex operational workflows into intuitive, scalable dashboards."
      },
      spin: {
        title: "From the First Design System to a Scalable Financial Experience",
        description: "I played a foundational role in shaping Spin by OXXO during its early stages, helping establish its first design system to bring structure, consistency, and clarity to the product."
      },
      cocacola: {
        title: "Designing the Next-Generation Order Taking Platform",
        description: "As Lead Product Designer, I guided the creation of Coca-Cola's digital order taking platform, an end-to-end tool built to streamline the daily operations of sales teams in the field."
      }
    },
    // Footer
    footer: {
      note: "This site doesn't use cookies or tracking. Just as the web should be 🍪"
    },
    // Brands carousel
    brands: {
      title: "Companies I've Worked With",
      description: "A selection of brands and teams I've collaborated with to design scalable, user focused digital experiences.",
      ariaLabel: "Brand logos carousel"
    },
    // Let's Connect section
    letsConnect: {
      title: "Let's Connect",
      text1: "I'm currently open to new projects and collaborations.",
      text2: "Tell me about your idea, scope, timelines, and goals and let's build something meaningful together.",
      email: "hola@jorgedesmond.com"
    }
  }
};

// Helper function to get nested translation
function getTranslation(lang, key) {
  const keys = key.split('.');
  let value = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
}

