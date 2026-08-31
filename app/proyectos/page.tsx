import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Projects } from "@/components/sections/Projects";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/locale";
import { getProjects } from "@/lib/data";
import { buildPageMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.projects.pageTitle,
    description: dict.projects.pageDescription,
    path: "/proyectos",
  });
}

export default async function ProyectosPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const projects = await getProjects();

  return (
    <div className="pt-28 md:pt-32">
      <Container narrow className="pb-6 pt-8">
        <h1 className="font-display text-[clamp(36px,6vw,56px)] uppercase leading-none tracking-[0.02em] text-carbon">
          {dict.projects.pageTitle}
        </h1>
        <p className="font-body mt-4 max-w-xl text-[length:var(--text-body)] font-normal leading-[length:var(--leading-body)] text-zinc">
          {dict.projects.listIntro}
        </p>
      </Container>
      <Projects projects={projects} className="pb-16 md:pb-24" />
    </div>
  );
}
