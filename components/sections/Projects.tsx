import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { Project } from "@/lib/types";

interface ProjectsProps {
  projects: Project[];
  showAllLink?: boolean;
  className?: string;
}

export function Projects({
  projects,
  showAllLink = true,
  className = "",
}: ProjectsProps) {
  return (
    <Container
      as="section"
      id="trabajo"
      className={`pb-[124px] ${className}`}
    >
      <div className="mx-auto w-full max-w-[1072px]">
        <SectionHeader
          title="Trabajo seleccionado"
          linkHref={showAllLink ? "/proyectos" : undefined}
        />
        <div className="flex flex-col gap-16 md:gap-24">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </Container>
  );
}
