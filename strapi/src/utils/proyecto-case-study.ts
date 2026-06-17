const PROYECTO_UID = "api::proyecto.proyecto";

const CASE_STUDY_FIELDS = new Set([
  "overviewTitle",
  "overviewBodyText",
  "challengeTitle",
  "challengeBodyText",
  "overview",
  "overviewHighlight",
  "challenge",
  "challengeHighlight",
]);

const CASE_STUDY_ROWS = [
  [
    { name: "overviewTitle", size: 4 },
    { name: "overviewBodyText", size: 8 },
  ],
  [
    { name: "challengeTitle", size: 4 },
    { name: "challengeBodyText", size: 8 },
  ],
] as const;

type LayoutField = { name: string; size: number };
type LayoutRow = LayoutField[];

function isCaseStudyLayoutConfigured(edit: LayoutRow[]): boolean {
  return edit.some(
    (row) =>
      row.length === 2 &&
      row[0]?.name === "overviewTitle" &&
      row[1]?.name === "overviewBodyText",
  );
}

function rebuildCaseStudyEditLayout(existingEdit: LayoutRow[]): LayoutRow[] {
  const rowsWithoutCaseStudy = existingEdit
    .map((row) => row.filter((field) => !CASE_STUDY_FIELDS.has(field.name)))
    .filter((row) => row.length > 0);

  const childrenIdx = rowsWithoutCaseStudy.findIndex((row) =>
    row.some((field) => field.name === "children"),
  );
  const insertAt = childrenIdx >= 0 ? childrenIdx : rowsWithoutCaseStudy.length;

  return [
    ...rowsWithoutCaseStudy.slice(0, insertAt),
    ...CASE_STUDY_ROWS.map((row) => [...row]),
    ...rowsWithoutCaseStudy.slice(insertAt),
  ];
}

function patchCaseStudyMetadatas(
  metadatas: Record<string, { edit?: Record<string, unknown>; list?: Record<string, unknown> }>,
) {
  const withLabel = (
    field: string,
    label: string,
  ): { edit?: Record<string, unknown>; list?: Record<string, unknown> } => ({
    ...metadatas[field],
    edit: {
      ...metadatas[field]?.edit,
      label,
    },
  });

  return {
    ...metadatas,
    overviewTitle: withLabel("overviewTitle", "Title"),
    overviewBodyText: withLabel("overviewBodyText", "Body Text"),
    challengeTitle: withLabel("challengeTitle", "Title"),
    challengeBodyText: withLabel("challengeBodyText", "Body Text"),
  };
}

export async function configureProyectoCaseStudyLayout(strapi) {
  const contentTypeService = strapi
    .plugin("content-manager")
    .service("content-types");
  const contentType = contentTypeService.findContentType(PROYECTO_UID);
  if (!contentType) return;

  const current = await contentTypeService.findConfiguration(contentType);
  const edit = current.layouts?.edit ?? [];

  if (isCaseStudyLayoutConfigured(edit)) return;

  await contentTypeService.updateConfiguration(contentType, {
    ...current,
    layouts: {
      ...current.layouts,
      edit: rebuildCaseStudyEditLayout(edit),
    },
    metadatas: patchCaseStudyMetadatas(current.metadatas ?? {}),
  });
}

export async function migrateProyectoCaseStudyFields(strapi) {
  const knex = strapi.db.connection;
  const table = "proyectos";

  const hasOverviewBodyText = await knex.schema.hasColumn(
    table,
    "overview_body_text",
  );
  if (!hasOverviewBodyText) return;

  const hasOverviewHighlight = await knex.schema.hasColumn(
    table,
    "overview_highlight",
  );
  const hasOverview = await knex.schema.hasColumn(table, "overview");
  const hasChallengeHighlight = await knex.schema.hasColumn(
    table,
    "challenge_highlight",
  );
  const hasChallenge = await knex.schema.hasColumn(table, "challenge");

  if (hasOverviewHighlight) {
    await knex(table)
      .whereNull("overview_body_text")
      .whereNotNull("overview_highlight")
      .update({ overview_body_text: knex.ref("overview_highlight") });
  }

  if (hasOverview) {
    await knex(table)
      .whereNull("overview_body_text")
      .whereNotNull("overview")
      .update({ overview_body_text: knex.ref("overview") });
  }

  if (hasChallengeHighlight) {
    await knex(table)
      .whereNull("challenge_body_text")
      .whereNotNull("challenge_highlight")
      .update({ challenge_body_text: knex.ref("challenge_highlight") });
  }

  if (hasChallenge) {
    await knex(table)
      .whereNull("challenge_body_text")
      .whereNotNull("challenge")
      .update({ challenge_body_text: knex.ref("challenge") });
  }
}
