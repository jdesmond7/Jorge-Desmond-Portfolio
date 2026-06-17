import type { ProjectMetric } from "@/lib/types";

interface ProjectMetricsProps {
  metrics: ProjectMetric[];
}

export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  if (!metrics.length) return null;

  return (
    <div className="mb-10 flex max-w-full flex-wrap gap-3">
      {metrics.map((metric, index) => (
        <div
          key={`${metric.value}-${index}`}
          className="w-fit rounded-[var(--radius-card)] border border-mist bg-white px-6 py-5"
        >
          <div className="text-[clamp(28px,4vw,40px)] font-normal leading-none tracking-[-0.02em] text-carbon">
            {metric.value}
          </div>
          <div className="mt-1.5 text-[14px] font-semibold leading-snug text-carbon">
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
}
