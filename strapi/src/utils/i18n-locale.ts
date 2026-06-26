const LOCALES = [
  { code: "es", name: "Spanish (es)" },
  { code: "en", name: "English (en)" },
] as const;

export async function ensureLocales(strapi: {
  db: {
    query: (uid: string) => {
      findOne: (args: { where: { code: string } }) => Promise<unknown>;
      create: (args: { data: { name: string; code: string } }) => Promise<unknown>;
    };
  };
  log: { info: (message: string) => void };
}) {
  for (const locale of LOCALES) {
    const existing = await strapi.db.query("plugin::i18n.locale").findOne({
      where: { code: locale.code },
    });

    if (existing) continue;

    await strapi.db.query("plugin::i18n.locale").create({
      data: {
        name: locale.name,
        code: locale.code,
      },
    });

    strapi.log.info(`i18n: registered ${locale.name} (${locale.code}) locale`);
  }
}
