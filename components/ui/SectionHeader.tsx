import Link from "next/link";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  title: string;
  eyebrow?: string;
  linkHref?: string;
  linkLabel?: string;
}

export function SectionHeader({
  title,
  eyebrow,
  linkHref,
  linkLabel = "Ver todos →",
}: SectionHeaderProps) {
  return (
    <Reveal>
      {eyebrow && (
        <p className="mono mb-3 text-[11px] uppercase tracking-[0.12em] text-ash">
          {eyebrow}
        </p>
      )}
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-[clamp(36px,6vw,52px)] uppercase leading-none tracking-[0.02em] text-carbon">
          {title}
        </h2>
        {linkHref && (
          <Link
            href={linkHref}
            className="font-body text-[13px] text-zinc no-underline transition-colors hover:text-carbon"
          >
            {linkLabel}
          </Link>
        )}
      </div>
    </Reveal>
  );
}
