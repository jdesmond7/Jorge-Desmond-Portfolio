import { Marquee } from "@/components/ui/Marquee";
import { CTA } from "@/components/sections/CTA";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Writing } from "@/components/sections/Writing";
import { getBlogPosts, getHomeContent, getRecentProjects } from "@/lib/strapi";

export default async function Home() {
  const [home, projects, posts] = await Promise.all([
    getHomeContent(),
    getRecentProjects(),
    getBlogPosts(5),
  ]);

  return (
    <>
      <Hero content={home} />
      <Marquee />
      <Projects projects={projects} className="pt-[240px]" />
      <Writing posts={posts} />
      <CTA
        title={home.ctaTitle}
        subtitle={home.ctaSubtitle}
        email={home.email}
        linkedin={home.linkedin}
      />
    </>
  );
}
