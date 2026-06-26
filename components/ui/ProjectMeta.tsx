import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/locale";

interface ProjectMetaProps {
  duration?: string;
  roles?: string;
  team?: string;
  tools?: string;
}

export async function ProjectMeta({
  duration,
  roles,
  team,
  tools,
}: ProjectMetaProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  const items: { label: string; value: string }[] = [];
  if (duration) items.push({ label: dict.projects.duration, value: duration });
  if (roles) items.push({ label: dict.projects.role, value: roles });
  if (team) items.push({ label: dict.projects.team, value: team });
  if (tools) items.push({ label: dict.projects.tools, value: tools });

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
