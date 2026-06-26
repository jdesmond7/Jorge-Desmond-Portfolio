import Link from "next/link";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/locale";
import type { ProjectNavItem } from "@/lib/types";

interface ProjectNavProps {
  prev?: ProjectNavItem;
  next?: ProjectNavItem;
  hasLearningAbove?: boolean;
}

export async function ProjectNav({
  prev,
  next,
  hasLearningAbove = false,
}: ProjectNavProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  if (!prev && !next) return null;

  return (
    <nav
      className={`grid grid-cols-1 gap-4 border-t border-mist sm:grid-cols-2 ${hasLearningAbove ? "mt-16 pt-16" : "pt-16"}`}
      aria-label={dict.projects.navAria}
    >
      {prev ? (
        <Link
          href={`/proyectos/${prev.slug}`}
          className="block rounded-[var(--radius-card)] border border-mist p-6 no-underline transition-colors hover:border-carbon"
        >
          <div className="mono mb-2 text-[10px] uppercase tracking-[0.1em] text-ash">
            {dict.projects.prev}
          </div>
          <div className="text-[15px] font-semibold text-carbon">{prev.title}</div>
          {prev.subtitle && (
            <div className="mt-1 text-[12px] text-coral">{prev.subtitle}</div>
          )}
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={`/proyectos/${next.slug}`}
          className="block rounded-[var(--radius-card)] border border-mist p-6 text-left no-underline transition-colors hover:border-coral sm:text-right"
        >
          <div className="mono mb-2 text-[10px] uppercase tracking-[0.1em] text-ash">
            {dict.projects.next}
          </div>
          <div className="text-[15px] font-semibold text-carbon">{next.title}</div>
          {next.subtitle && (
            <div className="mt-1 text-[12px] text-coral">{next.subtitle}</div>
          )}
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
