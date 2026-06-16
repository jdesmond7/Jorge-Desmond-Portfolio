import { Reveal } from "./Reveal";
import type { StackItem } from "@/lib/types";

interface StackCardProps {
  item: StackItem;
  index: number;
}

export function StackCard({ item, index }: StackCardProps) {
  return (
    <Reveal delay={index * 0.08}>
      <div
        className={`h-full rounded-[var(--radius-card)] border bg-white p-[19px] ${
          item.isToday ? "border-coral" : "border-mist"
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="mono text-[11px] tracking-[-0.006em] text-ash">
            {item.number}
          </span>
          {item.isToday && (
            <span className="rounded-[var(--radius-pill)] bg-coral px-3 py-1 text-[11px] font-bold tracking-[-0.005em] text-white">
              Hoy
            </span>
          )}
        </div>
        <div className="mb-2 text-[22px] font-normal leading-[1.25] tracking-[-0.012em] text-carbon">
          {item.name}
        </div>
        <div className="text-[13px] leading-normal tracking-[-0.005em] text-zinc">
          {item.items}
        </div>
      </div>
    </Reveal>
  );
}
