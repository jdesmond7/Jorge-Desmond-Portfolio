import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

export const DEFAULT_OG_IMAGE = "/images/about-me.png";

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

interface PageMetadataInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}

export function buildPageMetadata({
  title,
  description,
  path = "",
  image = DEFAULT_OG_IMAGE,
  type = "website",
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const ogImage = absoluteUrl(image);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type,
      title,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}
