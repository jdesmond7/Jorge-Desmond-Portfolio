export default [
  "strapi::logger",
  "strapi::errors",
  "strapi::security",
  {
    name: "strapi::cors",
    config: {
      origin: [
        process.env.FRONTEND_URL,
        "http://localhost:3000",
        "https://jorgedesmond.com",
        "https://www.jorgedesmond.com",
      ].filter(Boolean),
    },
  },
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
