import { type ReactNode } from "react";

interface ProfileCardProps {
  eyebrow: string;
  title: ReactNode;
  subtitle: string;
}

export function ProfileCard({ eyebrow, title, subtitle }: ProfileCardProps) {
  return (
    <div
      className="flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-[19px] shadow-[var(--shadow-card)]"
      style={{ background: "var(--gradient-brand)" }}
    >
      <span className="text-[15px] font-bold tracking-[-0.009em] text-white">
        {eyebrow}
      </span>
      <div>
        <div className="whitespace-pre-line text-[clamp(24px,5vw,30px)] font-normal leading-[1.2] tracking-[-0.013em] text-white">
          {title}
        </div>
        <span className="mono mt-2.5 block text-[11px] tracking-[-0.006em] text-white/80">
          {subtitle}
        </span>
      </div>
    </div>
  );
}
