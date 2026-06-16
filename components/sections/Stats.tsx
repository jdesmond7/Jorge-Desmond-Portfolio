import { Container } from "@/components/ui/Container";
import { StatCard } from "@/components/ui/StatCard";
import type { Stat } from "@/lib/types";

interface StatsProps {
  stats: Stat[];
}

export function Stats({ stats }: StatsProps) {
  return (
    <Container as="section" className="py-[var(--section-py)]">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, i) => (
          <StatCard
            key={stat.label}
            value={stat.value}
            label={stat.label}
            index={i}
            showBorder={i > 0}
          />
        ))}
      </div>
    </Container>
  );
}
