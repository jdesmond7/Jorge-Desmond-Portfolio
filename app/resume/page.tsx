import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getSiteSettings } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "CV de Jorge Desmond — Senior Product Designer con más de 8 años diseñando productos digitales end-to-end en B2B SaaS, fintech y marketplaces.",
};

const CV_PDF = "/cv/jorge-desmond-cv-2026.pdf";

const PROFILE = {
  name: "Jorge Armando Desmond",
  role: "Senior Product Designer",
  tagline: "Diseño de Producto End-to-End · Sistemas Escalables",
  summary: [
    "Product Designer con más de 8 años de experiencia liderando el diseño de productos digitales end-to-end en entornos B2B SaaS, fintech y plataformas tipo marketplace. Me especializo en resolver problemas complejos y ambiguos mediante el diseño de sistemas que reducen fricción y ayudan a los usuarios a tomar mejores decisiones.",
    "Trabajo de forma cercana con equipos de Producto y Desarrollo para definir qué construir, no solo cómo se ve, contribuyendo a la estrategia, arquitectura y validación de producto. Mi enfoque está en transformar la complejidad operativa en experiencias intuitivas, escalables y con impacto medible.",
  ],
};

interface ExperienceEntry {
  role: string;
  detail?: string;
  company: string;
  period: string;
  bullets: string[];
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "Lead Product Designer",
    detail: "Design Systems & Product Strategy",
    company: "GroWrk",
    period: "Abr. 2022 – Actualidad",
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
    period: "Feb. 2021 – Abr. 2022",
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
    period: "Abr. 2020 – Feb. 2021",
    bullets: [
      "Diseñé sistemas de recompensas cross-platform en ecosistemas financieros y retail (Banco Azteca, Italika, Elektra, Presta Prenda).",
      "Definí patrones de interacción escalables para múltiples productos y tipos de usuario.",
      "Lideré iniciativas de investigación para alinear estrategia de negocio con comportamiento del usuario y mejorar la adopción del producto.",
    ],
  },
  {
    role: "Senior Product Designer",
    company: "FEMSA",
    period: "Ago. 2018 – Abr. 2020",
    bullets: [
      "Lideré iniciativas de UX en plataformas a gran escala en LATAM (OXXO Club, e-commerce).",
      "Facilité workshops multidisciplinarios para alinear diseño, ingeniería y negocio.",
      "Introduje flujos basados en sistemas para mejorar la eficiencia del equipo y la consistencia del diseño.",
    ],
  },
];

const SKILLS: { category: string; items: string }[] = [
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
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display mb-8 text-[clamp(22px,3.5vw,30px)] uppercase leading-none tracking-[0.02em] text-carbon">
      {children}
    </h2>
  );
}

function ConnectRow({
  label,
  href,
  children,
  external,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-mist py-3.5 last:border-0">
      <span className="mono w-[68px] shrink-0 pt-0.5 text-[10px] uppercase tracking-[0.08em] text-ash">
        {label}
      </span>
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="min-w-0 flex-1 break-words text-[14px] tracking-[-0.005em] text-carbon no-underline transition-colors hover:text-coral"
      >
        {children}
      </a>
    </div>
  );
}

export default async function ResumePage() {
  const settings = await getSiteSettings();
  const linkedinDisplay = settings.linkedin
    .replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")
    .replace(/\/$/, "");

  return (
    <div className="pt-24 md:pt-28">
      <Container narrow className="pb-[var(--section-py)] pt-4 md:pt-6">
        <div className="grid items-start gap-10 md:grid-cols-[1fr_320px] md:gap-14">
          {/* Columna principal */}
          <div className="min-w-0">
            <Reveal>
              <header>
                <div className="mono mb-4 text-[11px] tracking-[-0.006em] text-zinc">
                  résumé
                </div>
                <h1 className="font-display text-[clamp(36px,7vw,60px)] uppercase leading-[0.95] tracking-[0.02em] text-carbon">
                  {PROFILE.name}
                </h1>
                <p className="mt-3 text-[clamp(16px,2.2vw,19px)] font-semibold tracking-[-0.009em] text-carbon">
                  {PROFILE.role}
                </p>
                <p className="mt-1 text-[15px] tracking-[-0.005em] text-zinc">
                  {PROFILE.tagline}
                </p>
              </header>
            </Reveal>

            <Reveal delay={0.08}>
              <section className="mt-8 flex flex-col gap-4 text-[16px] leading-[1.6] tracking-[-0.009em] text-zinc">
                {PROFILE.summary.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </section>
            </Reveal>

            <Reveal delay={0.12}>
              <section className="mt-12 border-t border-mist pt-12">
                <SectionTitle>Experiencia</SectionTitle>
                <div className="flex flex-col gap-10">
                  {EXPERIENCE.map((entry) => (
                    <div key={`${entry.company}-${entry.period}`}>
                      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                        <h3 className="text-[18px] font-bold leading-[1.25] tracking-[-0.01em] text-carbon md:text-[20px]">
                          {entry.role}
                        </h3>
                        <span className="mono shrink-0 text-[12px] tracking-[-0.006em] text-ash">
                          {entry.period}
                        </span>
                      </div>
                      <div className="mt-1 text-[14px] font-semibold tracking-[-0.005em] text-coral">
                        {entry.company}
                        {entry.detail ? (
                          <span className="text-zinc"> · {entry.detail}</span>
                        ) : null}
                      </div>
                      <ul className="mt-4 list-disc space-y-2.5 pl-5 marker:text-ash">
                        {entry.bullets.map((bullet) => (
                          <li
                            key={bullet.slice(0, 32)}
                            className="text-[15px] leading-[1.55] tracking-[-0.005em] text-zinc"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            <Reveal delay={0.16}>
              <section className="mt-12 border-t border-mist pt-12">
                <SectionTitle>Habilidades</SectionTitle>
                <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
                  {SKILLS.map((skill) => (
                    <div key={skill.category}>
                      <h3 className="mb-1.5 text-[14px] font-bold tracking-[-0.005em] text-carbon">
                        {skill.category}
                      </h3>
                      <p className="text-[15px] leading-[1.55] tracking-[-0.005em] text-zinc">
                        {skill.items}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>
          </div>

          {/* Sidebar Connect */}
          <aside className="min-w-0 md:sticky md:top-28 md:self-start">
            <Reveal delay={0.1}>
              <div className="rounded-[var(--radius-card)] border border-mist p-6">
                <div className="mono mb-2 text-[11px] uppercase tracking-[0.1em] text-ash">
                  Connect
                </div>
                <ConnectRow label="Email" href={`mailto:${settings.email}`}>
                  {settings.email}
                </ConnectRow>
                <ConnectRow label="LinkedIn" href={settings.linkedin} external>
                  {linkedinDisplay} ↗
                </ConnectRow>
                <ConnectRow
                  label="Contacto"
                  href={`mailto:${settings.email}`}
                >
                  Enviar mensaje
                </ConnectRow>
                <p className="mt-5 text-[13px] leading-[1.5] tracking-[-0.005em] text-zinc">
                  Monterrey, México.
                </p>
              </div>

              <a
                href={CV_PDF}
                download
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-card)] bg-coral px-8 py-4 text-[15px] font-semibold tracking-[-0.009em] text-white no-underline transition-colors hover:bg-coral-hover"
              >
                Descargar CV (PDF) →
              </a>
            </Reveal>
          </aside>
        </div>
      </Container>
    </div>
  );
}
