export async function ensureEnglishLocale(strapi: {
  db: {
    query: (uid: string) => {
      findOne: (args: { where: { code: string } }) => Promise<unknown>;
      create: (args: { data: { name: string; code: string } }) => Promise<unknown>;
    };
  };
  log: { info: (message: string) => void };
}) {
  const existing = await strapi.db.query("plugin::i18n.locale").findOne({
    where: { code: "en" },
  });

  if (existing) return;

  await strapi.db.query("plugin::i18n.locale").create({
    data: {
      name: "English",
      code: "en",
    },
  });

  strapi.log.info("i18n: registered English (en) locale");
}
