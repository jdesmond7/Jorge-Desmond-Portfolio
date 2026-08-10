import type { NextConfig } from "next";
import { SECURITY_HEADERS } from "./lib/security-headers";

function getInstagramImagePatterns() {
  return [
    { protocol: "https" as const, hostname: "*.cdninstagram.com", pathname: "/**" },
    { protocol: "https" as const, hostname: "*.fbcdn.net", pathname: "/**" },
  ];
}

const nextConfig: NextConfig = {
  images: {
    // AVIF primero (mejor compresión), con WebP como respaldo.
    formats: ["image/avif", "image/webp"],
    // Cachea las imágenes optimizadas por 31 días para evitar re-optimizaciones.
    minimumCacheTTL: 2678400,
    remotePatterns: [...getInstagramImagePatterns()],
  },
  async headers() {
    return [{ source: "/(.*)", headers: [...SECURITY_HEADERS] }];
  },
};

export default nextConfig;
