import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/locale";
import type { Project } from "@/lib/types";

interface ProjectsProps {
  projects: Project[];
  showAllLink?: boolean;
  className?: string;
}

export async function Projects({
  projects,
  showAllLink = true,
  className = "",
}: ProjectsProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <Container as="section" id="trabajo" narrow className={`pb-[124px] ${className}`}>
      <SectionHeader
        title={dict.projects.selectedWork}
        linkHref={showAllLink ? "/proyectos" : undefined}
        linkLabel={dict.projects.viewAll}
      />
      <div className="flex flex-col gap-16 md:gap-24">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </Container>
  );
}
