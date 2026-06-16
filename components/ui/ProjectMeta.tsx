interface ProjectMetaProps {
  roles?: string[];
  team?: string[];
  tools?: string[];
}

function formatList(items: string[]) {
  return items.join(" · ");
}

function MetaSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (!items.length) return null;

  return (
    <div>
      <h2 className="mb-2 text-[15px] font-semibold tracking-[-0.005em] text-carbon">
        {title}
      </h2>
      <p className="text-[15px] leading-[1.5] tracking-[-0.005em] text-zinc">
        {formatList(items)}
      </p>
    </div>
  );
}

export function ProjectMeta({ roles = [], team = [], tools = [] }: ProjectMetaProps) {
  if (!roles.length && !team.length && !tools.length) return null;

  return (
    <div className="rounded-[var(--radius-card)] bg-fog px-6 py-8 md:px-10 md:py-9">
      <div className="grid gap-8 md:grid-cols-2 md:gap-x-12">
        <MetaSection title="Roles (varios)" items={roles} />
        <MetaSection title="Equipo" items={team} />
        {tools.length > 0 && (
          <div className="md:col-span-2">
            <MetaSection title="Herramientas" items={tools} />
          </div>
        )}
      </div>
    </div>
  );
}
