const PROYECTO_UID = "api::proyecto.proyecto";

function findMetricsRowIndex(edit: { name: string; size: number }[][]): number {
  return edit.findIndex((row) => row.some((field) => field.name === "metrics"));
}

function isProjectSummaryBeforeMetrics(
  edit: { name: string; size: number }[][],
): boolean {
  const summaryIdx = edit.findIndex((row) =>
    row.some((field) => field.name === "projectSummary"),
  );
  const metricsIdx = findMetricsRowIndex(edit);
  if (summaryIdx === -1 || metricsIdx === -1) return false;
  return summaryIdx < metricsIdx;
}

export async function configureProyectoSummaryLayout(strapi) {
  const contentTypeService = strapi
    .plugin("content-manager")
    .service("content-types");
  const contentType = contentTypeService.findContentType(PROYECTO_UID);
  if (!contentType) return;

  const current = await contentTypeService.findConfiguration(contentType);
  const edit = [...(current.layouts?.edit ?? [])];

  if (isProjectSummaryBeforeMetrics(edit)) return;

  const withoutSummary = edit
    .map((row) => row.filter((field) => field.name !== "projectSummary"))
    .filter((row) => row.length > 0);

  const metricsIdx = findMetricsRowIndex(withoutSummary);
  const insertAt = metricsIdx >= 0 ? metricsIdx : withoutSummary.length;

  const nextEdit = [
    ...withoutSummary.slice(0, insertAt),
    [{ name: "projectSummary", size: 12 }],
    ...withoutSummary.slice(insertAt),
  ];

  await contentTypeService.updateConfiguration(contentType, {
    ...current,
    layouts: {
      ...current.layouts,
      edit: nextEdit,
    },
    metadatas: {
      ...current.metadatas,
      projectSummary: {
        ...current.metadatas?.projectSummary,
        edit: {
          ...current.metadatas?.projectSummary?.edit,
          label: "Project Summary",
        },
      },
    },
  });
}

function joinLegacyList(value: unknown): string | undefined {
  if (Array.isArray(value)) {
    const items = value.map((item) => String(item).trim()).filter(Boolean);
    return items.length ? items.join(" · ") : undefined;
  }
  if (typeof value === "string" && value.trim()) return value.trim();
  return undefined;
}

function parseLegacyJsonColumn(value: unknown): string | undefined {
  if (value == null) return undefined;
  if (Array.isArray(value)) return joinLegacyList(value);
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return undefined;
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      return joinLegacyList(parsed) ?? trimmed;
    } catch {
      return trimmed;
    }
  }
  return joinLegacyList(value);
}

export async function migrateProyectoProjectSummary(strapi) {
  const knex = strapi.db.connection;
  const table = "proyectos";
  const hasRolesColumn = await knex.schema.hasColumn(table, "roles");

  const docs = await strapi.documents("api::proyecto.proyecto").findMany({
    status: "draft",
    populate: ["projectSummary"],
    pagination: { pageSize: 200 },
  });

  for (const doc of docs) {
    const record = doc as {
      documentId: string;
      isParent?: boolean;
      year?: string;
      projectSummary?: {
        duration?: string;
        roles?: string;
        team?: string;
        tools?: string;
      } | null;
    };

    if (record.isParent) continue;

    const legacyRow = hasRolesColumn
      ? await knex(table)
          .where({ document_id: record.documentId })
          .first()
      : null;

    const current = record.projectSummary ?? {};
    const nextSummary = {
      duration:
        current.duration ||
        record.year ||
        (legacyRow?.year ? String(legacyRow.year) : undefined),
      roles:
        current.roles || parseLegacyJsonColumn(legacyRow?.roles) || undefined,
      team: current.team || parseLegacyJsonColumn(legacyRow?.team) || undefined,
      tools:
        current.tools || parseLegacyJsonColumn(legacyRow?.tools) || undefined,
    };

    const needsUpdate =
      !record.projectSummary ||
      (hasRolesColumn &&
        Boolean(legacyRow?.roles || legacyRow?.team || legacyRow?.tools));

    if (
      !needsUpdate &&
      record.projectSummary &&
      current.duration &&
      current.roles &&
      current.team &&
      current.tools
    ) {
      continue;
    }

    if (
      !nextSummary.duration &&
      !nextSummary.roles &&
      !nextSummary.team &&
      !nextSummary.tools
    ) {
      continue;
    }

    await strapi.documents("api::proyecto.proyecto").update({
      documentId: record.documentId,
      data: { projectSummary: nextSummary },
    });
    await strapi
      .documents("api::proyecto.proyecto")
      .publish({ documentId: record.documentId });
  }
}
