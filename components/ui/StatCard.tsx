import { Reveal } from "./Reveal";

interface StatCardProps {
  value: string;
  label: string;
  index: number;
  showBorder?: boolean;
}

export function StatCard({ value, label, index, showBorder }: StatCardProps) {
  return (
    <Reveal delay={index * 0.08}>
      <div
        className={`px-6 py-7 ${showBorder ? "md:border-l md:border-mist" : ""} ${index % 2 === 1 ? "border-l border-mist md:border-l" : ""} ${index >= 2 ? "border-t border-mist md:border-t-0" : ""}`}
      >
        <div className="font-display text-[clamp(36px,8vw,45px)] uppercase leading-none tracking-[0.02em] text-carbon">
          {value}
        </div>
        <div className="font-body mt-1.5 text-[13px] text-zinc">
          {label}
        </div>
      </div>
    </Reveal>
  );
}
