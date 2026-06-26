import type { NextConfig } from "next";
import { SECURITY_HEADERS } from "./lib/security-headers";

function getStrapiImagePattern() {
  const strapiUrls = [
    process.env.STRAPI_URL,
    process.env.NEXT_PUBLIC_STRAPI_URL,
  ].filter(Boolean);

  const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [];

  for (const strapiUrl of strapiUrls) {
    try {
      const parsed = new URL(strapiUrl!);
      patterns.push({
        protocol: parsed.protocol.replace(":", "") as "http" | "https",
        hostname: parsed.hostname,
        pathname: "/uploads/**",
        ...(parsed.port ? { port: parsed.port } : {}),
      });
    } catch {
      // ignore invalid URLs
    }
  }

  return patterns;
}

function getInstagramImagePatterns() {
  return [
    { protocol: "https" as const, hostname: "*.cdninstagram.com", pathname: "/**" },
    { protocol: "https" as const, hostname: "*.fbcdn.net", pathname: "/**" },
  ];
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [...getStrapiImagePattern(), ...getInstagramImagePatterns()],
  },
  async headers() {
    return [{ source: "/(.*)", headers: [...SECURITY_HEADERS] }];
  },
};

export default nextConfig;
