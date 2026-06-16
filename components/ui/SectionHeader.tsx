import Link from "next/link";
import { Reveal } from "./Reveal";

interface SectionHeaderProps {
  title: string;
  linkHref?: string;
  linkLabel?: string;
}

export function SectionHeader({
  title,
  linkHref,
  linkLabel = "Ver todos →",
}: SectionHeaderProps) {
  return (
    <Reveal>
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-[clamp(36px,6vw,52px)] uppercase leading-none tracking-[0.02em] text-carbon">
          {title}
        </h2>
        {linkHref && (
          <Link
            href={linkHref}
            className="font-body text-[13px] text-zinc no-underline hover:text-carbon"
          >
            {linkLabel}
          </Link>
        )}
      </div>
    </Reveal>
  );
}
