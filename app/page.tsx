import { Marquee } from "@/components/ui/Marquee";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { getHomeContent, getRecentProjects } from "@/lib/data";

export default async function Home() {
  const [home, projects] = await Promise.all([
    getHomeContent(),
    getRecentProjects(),
  ]);

  return (
    <>
      <Hero content={home} />
      <Marquee />
      <Skills />
      <Manifesto />
      <Projects projects={projects} className="pt-16 pb-16 md:pt-24 md:pb-24" />
    </>
  );
}
