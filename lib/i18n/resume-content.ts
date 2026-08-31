export interface ResumeExperience {
  role: string;
  detail?: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface ResumeSkill {
  category: string;
  items: string;
}

export interface ResumeContent {
  profile: {
    name: string;
    role: string;
    tagline: string;
    summary: string[];
  };
  experience: ResumeExperience[];
  skills: ResumeSkill[];
}

export const RESUME_ES: ResumeContent = {
  profile: {
    name: "Jorge Armando Desmond",
    role: "Senior Product Designer",
    tagline: "Diseño de Producto End-to-End · Sistemas Escalables",
    summary: [
      "Product Designer con más de 8 años de experiencia liderando el diseño de productos digitales end-to-end en entornos B2B SaaS, fintech y plataformas tipo marketplace. Me especializo en resolver problemas complejos y ambiguos mediante el diseño de sistemas que reducen fricción y ayudan a los usuarios a tomar mejores decisiones.",
      "Trabajo de forma cercana con equipos de Producto y Desarrollo para definir qué construir, no solo cómo se ve, contribuyendo a la estrategia, arquitectura y validación de producto. Mi enfoque está en transformar la complejidad operativa en experiencias intuitivas, escalables y con impacto medible.",
    ],
  },
  experience: [
    {
      role: "Profesor de Cátedra",
      company: "Tecnológico de Monterrey (ITESM), Campus Monterrey",
      period: "Ago. 2025 - Actualidad",
      bullets: [
        "Imparto cátedras de Diseño de Producto, Diseño Visual (creación de producto digital), Configuración del Objeto y Experimentación con Dibujo, enfocadas en metodologías de diseño para productos físicos y digitales.",
        "Enseño a los alumnos las bases de la creación de producto, desde la conceptualización hasta la materialización, aplicando procesos de diseño reales.",
        "Dirijo un curso de representación que va del dibujo tradicional al digital, dando a los estudiantes técnicas para comunicar y prototipar sus ideas.",
      ],
    },
    {
      role: "Lead Product Designer",
      company: "Renova (freelance)",
      period: "Sep. 2025 - Feb. 2026",
      bullets: [
        "Materialicé la idea de dos emprendedores en una app de comunidad y apoyo para personas en proceso de divorcio, diseñando de cero la identidad de marca, el naming y el tono de voz del producto.",
        "Diseñé los flujos happy path para prototipar y validar rápido, más una versión con permisos diferenciados para expertos (abogados, psicólogos, médicos).",
        "Validé un prototipo funcional con 6 expertos y 6 usuarios meta mediante entrevistas semiestructuradas, iterando hacia la versión final.",
        "Construí el Design System y apoyé en la selección del equipo de desarrollo, entregando pantallas y documentación para una implementación sin fricción.",
      ],
    },
    {
      role: "Lead Product Designer",
      detail: "Design Systems & Product Strategy",
      company: "GroWrk",
      period: "Abr. 2022 - Actualidad",
      bullets: [
        "Lideré el diseño de plataformas internas y herramientas para proveedores, transformando flujos fragmentados en sistemas escalables.",
        "Definí estrategia UX y arquitectura de producto, mejorando la toma de decisiones y reduciendo fricción operativa.",
        "Impulsé automatizaciones que redujeron trabajo manual y diseñé el Design System, optimizando consistencia y tiempos de desarrollo (~40%).",
        "Colaboré con Producto, Ingeniería y liderazgo, integrando además herramientas de IA para acelerar procesos de diseño.",
      ],
    },
    {
      role: "Senior Product Designer",
      company: "Spin by OXXO",
      period: "Feb. 2021 - Abr. 2022",
      bullets: [
        "Lideré el diseño de flujos financieros clave como transferencias SPEI, onboarding y dashboards bajo restricciones regulatorias y de seguridad.",
        "Colaboré con UX Research para definir journeys y validar soluciones mediante pruebas de usabilidad.",
        "Participé en la definición de arquitectura de producto y patrones de interacción durante una etapa de crecimiento acelerado (más de 1M de usuarios en 9 meses).",
        "Diseñé y mantuve el primer Design System del producto para asegurar escalabilidad entre plataformas.",
      ],
    },
    {
      role: "Lead Product Designer",
      company: "Grupo Salinas",
      period: "Abr. 2020 - Feb. 2021",
      bullets: [
        "Diseñé sistemas de recompensas cross-platform en ecosistemas financieros y retail (Banco Azteca, Italika, Elektra, Presta Prenda).",
        "Definí patrones de interacción escalables para múltiples productos y tipos de usuario.",
        "Lideré iniciativas de investigación para alinear estrategia de negocio con comportamiento del usuario y mejorar la adopción del producto.",
      ],
    },
    {
      role: "Senior Product Designer",
      company: "FEMSA",
      period: "Ago. 2018 - Abr. 2020",
      bullets: [
        "Lideré iniciativas de UX en plataformas a gran escala en LATAM (OXXO Club, e-commerce).",
        "Facilité workshops multidisciplinarios para alinear diseño, ingeniería y negocio.",
        "Introduje flujos basados en sistemas para mejorar la eficiencia del equipo y la consistencia del diseño.",
      ],
    },
  ],
  skills: [
    {
      category: "Producto y Estrategia",
      items:
        "Estrategia UX, Product thinking, Manejo de ambigüedad, Toma de decisiones",
    },
    {
      category: "Diseño",
      items:
        "Diseño interactivo, Arquitectura de información, Prototipado, Pruebas de usabilidad",
    },
    {
      category: "Design Systems",
      items: "Design systems, Componentes escalables, Flujos operativos",
    },
    {
      category: "Research",
      items: "Entrevistas con usuarios, Usability testing, Mapeo de workflows",
    },
    {
      category: "AI-Assisted Design",
      items: "Cursor, Prototipado con IA, Automatización de flujos",
    },
  ],
};

export const RESUME_EN: ResumeContent = {
  profile: {
    name: "Jorge Armando Desmond",
    role: "Senior Product Designer",
    tagline: "End-to-End Product Design · Scalable Systems",
    summary: [
      "Product Designer with 8+ years leading end-to-end digital product design in B2B SaaS, fintech, and marketplace platforms. I specialize in solving complex, ambiguous problems through systems that reduce friction and help users make better decisions.",
      "I work closely with Product and Engineering to define what to build - not just how it looks - contributing to strategy, architecture, and product validation. My focus is turning operational complexity into intuitive, scalable experiences with measurable impact.",
    ],
  },
  experience: [
    {
      role: "Adjunct Professor",
      company: "Tecnológico de Monterrey (ITESM), Campus Monterrey",
      period: "Aug. 2025 - Present",
      bullets: [
        "Teach Product Design, Visual Design (digital product creation), Object Configuration, and Drawing Experimentation courses, focused on design methodologies for physical and digital products.",
        "Teach students the foundations of product creation, from conceptualization to materialization, applying real design processes.",
        "Lead a representation course spanning traditional to digital drawing, giving students techniques to communicate and prototype their ideas.",
      ],
    },
    {
      role: "Lead Product Designer",
      company: "Renova (freelance)",
      period: "Sep. 2025 - Feb. 2026",
      bullets: [
        "Turned two entrepreneurs' idea into a community and support app for people going through divorce, designing brand identity, naming, and product tone of voice from scratch.",
        "Designed happy path flows for rapid prototyping and validation, plus a version with differentiated permissions for experts (lawyers, psychologists, doctors).",
        "Validated a functional prototype with 6 experts and 6 target users through semi-structured interviews, iterating toward the final version.",
        "Built the Design System and supported development team selection, delivering screens and documentation for friction-free implementation.",
      ],
    },
    {
      role: "Lead Product Designer",
      detail: "Design Systems & Product Strategy",
      company: "GroWrk",
      period: "Apr. 2022 - Present",
      bullets: [
        "Led design for internal platforms and vendor tools, turning fragmented flows into scalable systems.",
        "Defined UX strategy and product architecture, improving decision-making and reducing operational friction.",
        "Drove automations that cut manual work and built the Design System, improving consistency and dev time (~40%).",
        "Collaborated with Product, Engineering, and leadership, integrating AI tools to accelerate design workflows.",
      ],
    },
    {
      role: "Senior Product Designer",
      company: "Spin by OXXO",
      period: "Feb. 2021 - Apr. 2022",
      bullets: [
        "Led design for critical financial flows - SPEI transfers, onboarding, and dashboards - under regulatory and security constraints.",
        "Partnered with UX Research to define journeys and validate solutions through usability testing.",
        "Contributed to product architecture and interaction patterns during rapid growth (1M+ users in 9 months).",
        "Designed and maintained the product's first Design System for cross-platform scalability.",
      ],
    },
    {
      role: "Lead Product Designer",
      company: "Grupo Salinas",
      period: "Apr. 2020 - Feb. 2021",
      bullets: [
        "Designed cross-platform rewards systems across financial and retail ecosystems (Banco Azteca, Italika, Elektra, Presta Prenda).",
        "Defined scalable interaction patterns across multiple products and user types.",
        "Led research initiatives to align business strategy with user behavior and improve product adoption.",
      ],
    },
    {
      role: "Senior Product Designer",
      company: "FEMSA",
      period: "Aug. 2018 - Apr. 2020",
      bullets: [
        "Led UX initiatives on large-scale LATAM platforms (OXXO Club, e-commerce).",
        "Facilitated cross-functional workshops to align design, engineering, and business.",
        "Introduced systems-based workflows to improve team efficiency and design consistency.",
      ],
    },
  ],
  skills: [
    {
      category: "Product & Strategy",
      items: "UX strategy, Product thinking, Ambiguity management, Decision-making",
    },
    {
      category: "Design",
      items: "Interaction design, Information architecture, Prototyping, Usability testing",
    },
    {
      category: "Design Systems",
      items: "Design systems, Scalable components, Operational flows",
    },
    {
      category: "Research",
      items: "User interviews, Usability testing, Workflow mapping",
    },
    {
      category: "AI-Assisted Design",
      items: "Cursor, AI prototyping, Workflow automation",
    },
  ],
};
