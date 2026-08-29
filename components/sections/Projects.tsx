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
    <section id="trabajo" className={`overflow-x-clip ${className}`}>
      <div className="flex flex-col">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="relative left-1/2 w-screen -translate-x-1/2"
          >
            <ProjectCard
              project={project}
              index={index}
              fullBleed
              readLabel={dict.projects.readCaseStudy}
              readAria={dict.projects.readCaseStudyAria(project.title)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
