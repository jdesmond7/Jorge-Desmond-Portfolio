type LegacyMetric = {
  value?: string | null;
  title?: string | null;
  label?: string | null;
  description?: string | null;
};

function normalizeMetric(metric: LegacyMetric) {
  const value = metric.value ? String(metric.value).trim() : "";
  const title = metric.title
    ? String(metric.title).trim()
    : metric.label
      ? String(metric.label).trim()
      : value || "Métrica";

  return {
    value,
    title,
    ...(metric.description
      ? { description: String(metric.description).trim() }
      : {}),
  };
}

function metricsNeedMigration(metrics: LegacyMetric[]): boolean {
  return metrics.some((metric) => {
    const normalized = normalizeMetric(metric);
    const currentTitle = metric.title ? String(metric.title).trim() : "";
    return !currentTitle || currentTitle !== normalized.title;
  });
}

export async function migrateProyectoMetrics(strapi) {
  const knex = strapi.db.connection;
  const metricsTable = "components_shared_metrics";
  const hasLabelColumn = await knex.schema.hasColumn(metricsTable, "label");

  if (hasLabelColumn) {
    const rows = await knex(metricsTable).select("id", "title", "label", "value");
    for (const row of rows) {
      const title = row.title || row.label || row.value || "Métrica";
      if (!row.title) {
        await knex(metricsTable).where({ id: row.id }).update({ title });
      }
    }
  }

  const docs = await strapi.documents("api::proyecto.proyecto").findMany({
    status: "draft",
    populate: ["metrics"],
    pagination: { pageSize: 200 },
  });

  for (const doc of docs) {
    const metrics = (doc as { metrics?: LegacyMetric[] }).metrics;
    if (!Array.isArray(metrics) || metrics.length === 0) continue;
    if (!metricsNeedMigration(metrics)) continue;

    const normalized = metrics
      .map(normalizeMetric)
      .filter((metric) => metric.value && metric.title);

    if (!normalized.length) continue;

    await strapi.documents("api::proyecto.proyecto").update({
      documentId: doc.documentId,
      data: { metrics: normalized },
    });
    await strapi
      .documents("api::proyecto.proyecto")
      .publish({ documentId: doc.documentId });
  }
}
