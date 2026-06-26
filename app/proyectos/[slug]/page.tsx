import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyBody } from "@/components/ui/CaseStudyBody";
import { CaseStudySection } from "@/components/ui/CaseStudySection";
import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { ProjectLearning } from "@/components/ui/ProjectLearning";
import { ProjectMeta } from "@/components/ui/ProjectMeta";
import { ProjectMetrics } from "@/components/ui/ProjectMetrics";
import { ProjectNav } from "@/components/ui/ProjectNav";
import { Tag } from "@/components/ui/Tag";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/locale";
import {
  getAllProjectSlugs,
  getProjectBySlug,
  getProjectNavigation,
} from "@/lib/strapi";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const project = await getProjectBySlug(slug);
  if (!project) return { title: dict.projects.notFound };

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const [project, navigation] = await Promise.all([
    getProjectBySlug(slug),
    getProjectNavigation(slug),
  ]);
  if (!project) notFound();

  const children = project.children ?? [];
  const isParentView = project.isParent || children.length > 0;
  const heroImage = project.coverImage ?? project.gallery?.[0];
  const galleryImages =
    project.gallery?.filter((src) => src !== heroImage) ?? [];

  return (
    <div>
      {heroImage && (
        <ProjectHero src={heroImage} alt={project.title} />
      )}

      <Container
        narrow
        className={`pb-[var(--section-py)] ${heroImage ? "pt-10 md:pt-12" : "pt-28 md:pt-32"}`}
      >
        {project.tags.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        )}

        <h1 className="font-body mb-6 w-full text-[clamp(28px,5vw,48px)] font-normal leading-[1.06] tracking-[-0.022em] text-carbon">
          {project.title}
        </h1>

        <p className="mb-10 w-full text-[19px] leading-[1.4] tracking-[-0.009em] text-zinc">
          {project.description}
        </p>

        {!isParentView && project.projectSummary && (
          <ProjectMeta {...project.projectSummary} />
        )}

        {project.metrics && project.metrics.length > 0 && (
          <>
            <ProjectMetrics metrics={project.metrics} />
            <div className="mb-16 border-t border-mist" />
          </>
        )}

        {isParentView ? (
          <>
            <CaseStudySection
              number="01"
              label={dict.projects.overview}
              title={project.overviewTitle}
              body={project.overviewBodyText}
            />

            <div className="my-16 border-t border-mist" />

            <CaseStudySection
              number="02"
              label={dict.projects.challenge}
              title={project.challengeTitle}
              body={project.challengeBodyText}
            />

            {children.length > 0 && (
              <section className="mt-16 border-t border-mist pt-16 pb-4">
                <h2 className="font-body mb-10 text-[clamp(24px,3.5vw,34px)] font-bold leading-[1.15] tracking-[-0.015em] text-carbon">
                  {dict.projects.keyInitiatives}
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
            {project.body && <CaseStudyBody content={project.body} />}

            {galleryImages.length > 0 && (
              <section className="mb-16">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {galleryImages.map((src, index) => (
                    <ZoomableImage
                      key={src}
                      src={src}
                      alt={dict.projects.imageAlt(project.title, index + 1)}
                      fill
                      className="object-cover"
                      sizes="(min-width: 640px) 50vw, 100vw"
                      containerClassName="relative aspect-[4/3] overflow-hidden rounded-lg bg-fog"
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <footer className="mt-24 md:mt-32">
          {project.learning && <ProjectLearning text={project.learning} />}

          <ProjectNav
            prev={navigation.prev}
            next={navigation.next}
            hasLearningAbove={Boolean(project.learning)}
          />
        </footer>
      </Container>
    </div>
  );
}
