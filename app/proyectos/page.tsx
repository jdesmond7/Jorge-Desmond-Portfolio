import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Projects } from "@/components/sections/Projects";
import { getProjects } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Casos de estudio",
  description:
    "Casos de estudio de Design Systems, fintech y productos B2B SaaS.",
};

export default async function ProyectosPage() {
  const projects = await getProjects();

  return (
    <div className="pt-28 md:pt-32">
      <Container className="pb-6 pt-8">
        <h1 className="font-display text-[clamp(36px,6vw,56px)] uppercase leading-none tracking-[0.02em] text-carbon">
          Casos de estudio
        </h1>
        <p className="font-body mt-4 max-w-xl text-[17px] font-normal leading-[1.4] text-zinc">
          Proyectos donde diseñé sistemas, flujos críticos y arquitectura de
          producto a escala.
        </p>
      </Container>
      <Projects projects={projects} showAllLink={false} />
    </div>
  );
}
