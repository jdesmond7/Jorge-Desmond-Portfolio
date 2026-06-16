import type { MetadataRoute } from "next";
import {
  getAllBlogSlugs,
  getAllProjectSlugs,
} from "@/lib/strapi";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://jorgedesmond.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projectSlugs, blogSlugs] = await Promise.all([
    getAllProjectSlugs(),
    getAllBlogSlugs(),
  ]);

  const staticRoutes = ["", "/proyectos", "/ilustracion", "/blog", "/sobre-mi"];

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...projectSlugs.map((slug) => ({
      url: `${SITE_URL}/proyectos/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...blogSlugs.map((slug) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
