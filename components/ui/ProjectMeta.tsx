interface ProjectMetaProps {
  duration?: string;
  roles?: string;
  team?: string;
  tools?: string;
}

export function ProjectMeta({
  duration,
  roles,
  team,
  tools,
}: ProjectMetaProps) {
  const items = [
    duration ? { label: "Duración", value: duration } : null,
    roles ? { label: "Rol", value: roles } : null,
    team ? { label: "Equipo", value: team } : null,
    tools ? { label: "Herramientas", value: tools } : null,
  ].filter((item): item is { label: string; value: string } => item !== null);

  if (!items.length) return null;

  return (
    <div className="mb-10 overflow-hidden rounded-[var(--radius-card)] border border-mist bg-white">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))]">
        {items.map((item, index) => (
          <div
            key={item.label}
            className={`p-5 ${index > 0 ? "border-t border-mist sm:border-t-0 sm:border-l" : ""}`}
          >
            <div className="mono mb-1.5 text-[10px] uppercase tracking-[0.1em] text-ash">
              {item.label}
            </div>
            <div className="text-[13px] font-semibold leading-[1.4] text-carbon">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
