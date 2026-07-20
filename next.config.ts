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
    remotePatterns: [...getInstagramImagePatterns()],
  },
  async headers() {
    return [{ source: "/(.*)", headers: [...SECURITY_HEADERS] }];
  },
};

export default nextConfig;
