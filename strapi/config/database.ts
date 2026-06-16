import path from "path";

export default ({ env }) => {
  const client = env("DATABASE_CLIENT", "sqlite");

  if (client === "postgres") {
    return {
      connection: {
        client: "postgres",
        connection: {
          connectionString: env("DATABASE_URL"),
          host: env("DATABASE_HOST", "localhost"),
          port: env.int("DATABASE_PORT", 5432),
          database: env("DATABASE_NAME", "strapi"),
          user: env("DATABASE_USERNAME", "strapi"),
          password: env("DATABASE_PASSWORD", "strapi"),
          ssl: env.bool("DATABASE_SSL", false) && {
            rejectUnauthorized: env.bool("DATABASE_SSL_REJECT_UNAUTHORIZED", true),
          },
        },
        pool: { min: env.int("DATABASE_POOL_MIN", 2), max: env.int("DATABASE_POOL_MAX", 10) },
      },
    };
  }

  return {
    connection: {
      client: "sqlite",
      connection: {
        // Use app root (not dist/) so develop-mode rebuilds don't lock the DB.
        filename: path.resolve(
          process.cwd(),
          env("DATABASE_FILENAME", ".tmp/data.db"),
        ),
      },
      useNullAsDefault: true,
    },
  };
};
