import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";
import { getAllBlogSlugs, getAllProjectSlugs } from "@/lib/strapi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const [projectSlugs, blogSlugs] = await Promise.all([
    getAllProjectSlugs(),
    getAllBlogSlugs(),
  ]);

  const staticRoutes = [
    "",
    "/proyectos",
    "/ilustracion",
    "/blog",
    "/sobre-mi",
    "/resume",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...projectSlugs.map((slug) => ({
      url: `${siteUrl}/proyectos/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${siteUrl}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
