import Link from "next/link";
import { ArrowRight } from "./ArrowRight";
import { CmsImage } from "./CmsImage";
import { Reveal } from "./Reveal";
import { Tag } from "./Tag";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/locale";
import type { Project } from "@/lib/types";

const PLACEHOLDER_GRADIENTS = [
  "bg-gradient-to-br from-coral/20 via-coral/5 to-cream",
  "bg-gradient-to-br from-carbon/10 via-mist/50 to-cream",
  "bg-gradient-to-br from-zinc/15 via-fog to-mist/40",
] as const;

interface ProjectCardProps {
  project: Project;
  index: number;
  /** "alternate" intercala el lado de la imagen según el índice; "right"/"left" lo fija. */
  imageSide?: "alternate" | "left" | "right";
}

export async function ProjectCard({
  project,
  index,
  imageSide = "alternate",
}: ProjectCardProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const imageFirst =
    imageSide === "alternate" ? index % 2 === 0 : imageSide === "left";
  const placeholderClass =
    PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length];
  const caseNumber = String(index + 1).padStart(2, "0");

  return (
    <Reveal delay={index * 0.08}>
      <article className="project-card group relative cursor-pointer overflow-hidden rounded-[var(--radius-card)] border border-mist bg-white transition-colors duration-250 hover:border-ash/60">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-0">
          <div
            className={`relative aspect-[4/3] md:aspect-auto md:min-h-[300px] ${placeholderClass} ${
              imageFirst ? "md:order-1" : "md:order-2"
            }`}
          >
            {project.coverImage ? (
              <CmsImage
                src={project.coverImage}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-end p-6">
                <span className="font-body text-[13px] font-semibold tracking-[-0.005em] text-carbon/40">
                  {project.company}
                </span>
              </div>
            )}
          </div>

          <div
            className={`flex flex-col justify-center px-6 py-8 md:px-10 md:py-10 lg:px-12 ${
              imageFirst ? "md:order-2" : "md:order-1"
            }`}
          >
            {project.problem && (
              <p className="mb-3 text-[12px] leading-normal tracking-[-0.005em] md:mb-4">
                <span className="mono text-coral">{caseNumber}</span>{" "}
                <span className="text-ash">{project.problem}</span>
              </p>
            )}

            <h3 className="font-body mb-3 line-clamp-2 text-[clamp(22px,2.6vw,30px)] font-bold leading-[1.15] tracking-[-0.015em] text-carbon md:mb-4">
              {project.title}
            </h3>

            <p className="mb-5 line-clamp-3 max-w-[520px] text-[13px] leading-[1.55] tracking-[-0.005em] text-zinc md:mb-6 md:text-[14px]">
              {project.description}
            </p>

            <div className="mb-6 flex flex-wrap gap-2 md:mb-7">
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>

            <Link
              href={`/proyectos/${project.slug}`}
              aria-label={dict.projects.readCaseStudyAria(project.title)}
              className="leer-link inline-flex items-center gap-1.5 self-start text-[14px] font-semibold tracking-[-0.005em] text-carbon no-underline transition-colors before:absolute before:inset-0 before:content-[''] hover:text-coral"
            >
              {dict.projects.readCaseStudy}
              <ArrowRight className="arrow-slide h-4 w-4 shrink-0" />
            </Link>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
