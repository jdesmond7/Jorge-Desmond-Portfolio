export default ({ env }) => ({
  upload: {
    config: {
      provider: "local",
      sizeLimit: 10 * 1024 * 1024,
    },
  },
  "users-permissions": {
    config: {
      jwtSecret: env("JWT_SECRET"),
    },
  },
});
