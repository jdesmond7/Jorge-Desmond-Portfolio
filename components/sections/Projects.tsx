import { Container } from "@/components/ui/Container";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/locale";
import type { Project } from "@/lib/types";

interface ProjectsProps {
  projects: Project[];
  className?: string;
}

export async function Projects({ projects, className = "" }: ProjectsProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <section id="trabajo" className={className}>
      <Container narrow>
        <div className="flex flex-col gap-6 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              fullBleed={false}
              readLabel={dict.projects.readCaseStudy}
              readAria={dict.projects.readCaseStudyAria(project.title)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
