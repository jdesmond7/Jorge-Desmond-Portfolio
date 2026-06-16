import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CmsImage } from "@/components/ui/CmsImage";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectMeta } from "@/components/ui/ProjectMeta";
import { Tag } from "@/components/ui/Tag";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/strapi";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Proyecto no encontrado" };

  return {
    title: project.title,
    description: project.description,
  };
}

function TextSection({ title, body }: { title: string; body: string }) {
  return (
    <section className="mb-10">
      <h2 className="mb-3 text-[20px] font-bold tracking-[-0.015em] text-carbon">
        {title}
      </h2>
      <p className="w-full whitespace-pre-line text-[16px] leading-[1.6] tracking-[-0.009em] text-zinc">
        {body}
      </p>
    </section>
  );
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const backHref = project.parentSlug
    ? `/proyectos/${project.parentSlug}`
    : "/proyectos";
  const backLabel = project.parentSlug
    ? `← ${project.parentTitle ?? "Volver"}`
    : "← Todos los proyectos";

  const children = project.children ?? [];
  // Un proyecto con hijos vinculados se renderiza como padre aunque el
  // toggle isParent no se haya activado en el CMS.
  const isParentView = project.isParent || children.length > 0;

  return (
    <div>
      {project.coverImage && (
        <div className="relative h-[400px] w-full overflow-hidden">
          <CmsImage
            src={project.coverImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      <Container
        className={`pb-[var(--section-py)] ${project.coverImage ? "pt-10 md:pt-12" : "pt-28 md:pt-32"}`}
      >
        <div className="mx-auto w-full max-w-[1072px]">
        <Link
          href={backHref}
          className="mono mb-8 inline-block text-[13px] tracking-[-0.006em] text-zinc no-underline hover:text-coral"
        >
          {backLabel}
        </Link>

        <div className="mono mb-4 text-[11px] tracking-[-0.006em] text-ash">
          {project.year} · {project.company}
        </div>
        <h1 className="font-body mb-6 w-full text-[clamp(28px,5vw,48px)] font-bold leading-[1.15] text-carbon">
          {project.title}
        </h1>
        <p className="mb-8 w-full text-[17px] leading-[1.4] tracking-[-0.009em] text-zinc">
          {project.description}
        </p>

        <div className="mb-10 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>

        {project.metrics && project.metrics.length > 0 && (
          <div className="mb-12 flex flex-wrap gap-4">
            {project.metrics.map((metric, index) => (
              <div
                key={`${metric.value}-${index}`}
                className="rounded-[var(--radius-card)] bg-fog px-6 py-7"
              >
                <div className="font-display text-[clamp(32px,6vw,45px)] uppercase leading-none tracking-[0.02em] text-carbon">
                  {metric.value}
                </div>
                <div className="font-body mt-1.5 text-[13px] text-zinc">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {isParentView ? (
          <>
            {project.overview && (
              <TextSection title="Overview" body={project.overview} />
            )}
            {project.challenge && (
              <TextSection title="Challenge" body={project.challenge} />
            )}

            {children.length > 0 && (
              <section className="mt-16">
                <h2 className="font-body mb-10 text-[clamp(24px,3.5vw,34px)] font-bold leading-[1.15] tracking-[-0.015em] text-carbon">
                  Iniciativas Clave
                </h2>
                <div className="flex flex-col gap-16 md:gap-24">
                  {children.map((child, index) => (
                    <ProjectCard
                      key={child.id}
                      project={child}
                      index={index}
                      imageSide="right"
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <>
            <div className="mb-12">
              <ProjectMeta
                roles={project.roles}
                team={project.team}
                tools={project.tools}
              />
            </div>

            {project.body && (
              <div className="w-full whitespace-pre-line text-[17px] leading-[1.6] tracking-[-0.009em] text-zinc">
                {project.body}
              </div>
            )}

            {project.gallery && project.gallery.length > 0 && (
              <section className="mt-16">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {project.gallery.map((src, index) => (
                    <div
                      key={src}
                      className="relative aspect-[4/3] overflow-hidden rounded-lg bg-fog"
                    >
                      <CmsImage
                        src={src}
                        alt={`${project.title} — imagen ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(min-width: 640px) 50vw, 100vw"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
        </div>
      </Container>
    </div>
  );
}
