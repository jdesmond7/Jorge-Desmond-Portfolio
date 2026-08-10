const INSTAGRAM_HOSTS = [
  "https://graph.instagram.com",
  "https://*.cdninstagram.com",
  "https://*.fbcdn.net",
].join(" ");

const isDev = process.env.NODE_ENV === "development";

/**
 * In development, Next/webpack needs `unsafe-eval` (and sometimes broader
 * connect-src for HMR). A strict CSP here silently blocks client hydration,
 * which kills every useEffect animation (hero scrub, nav hide, marquee).
 */
const CONTENT_SECURITY_POLICY = isDev
  ? [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: blob: ${INSTAGRAM_HOSTS}`,
      "font-src 'self' data:",
      `media-src 'self' blob: ${INSTAGRAM_HOSTS}`,
      `connect-src 'self' ws: wss: ${INSTAGRAM_HOSTS}`,
      "worker-src 'self' blob:",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; ")
  : [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      `img-src 'self' data: blob: ${INSTAGRAM_HOSTS}`,
      "font-src 'self' data:",
      `media-src 'self' blob: ${INSTAGRAM_HOSTS}`,
      `connect-src 'self' ${INSTAGRAM_HOSTS}`,
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; ");

export const SECURITY_HEADERS = [
  { key: "Content-Security-Policy", value: CONTENT_SECURITY_POLICY },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  ...(isDev
    ? []
    : [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]),
] as const;
