import type { ProjectMetric } from "@/lib/types";

interface ProjectMetricsProps {
  metrics: ProjectMetric[];
}

export function ProjectMetrics({ metrics }: ProjectMetricsProps) {
  if (!metrics.length) return null;

  return (
    <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => (
        <div
          key={`${metric.value}-${metric.title}-${index}`}
          className="rounded-[var(--radius-card)] border border-mist bg-white px-6 py-5"
        >
          <div className="text-[clamp(28px,4vw,40px)] font-bold leading-none tracking-[-0.02em] text-carbon">
            {metric.value}
          </div>
          <div className="mt-1.5 text-[14px] font-semibold leading-snug text-carbon">
            {metric.title}
          </div>
          {metric.description && (
            <p className="mt-1 text-[13px] font-normal leading-snug text-zinc">
              {metric.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
