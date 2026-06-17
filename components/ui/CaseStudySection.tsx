import { CaseSectionLabel } from "./CaseSectionLabel";

interface CaseStudySectionProps {
  number: string;
  label: string;
  title?: string;
  body?: string;
}

export function CaseStudySection({
  number,
  label,
  title,
  body,
}: CaseStudySectionProps) {
  if (!body && !title) return null;

  return (
    <section className="mb-16">
      <CaseSectionLabel number={number} label={label} />
      {title && (
        <h2 className="mb-5 text-[clamp(24px,3.5vw,30px)] font-semibold leading-[1.2] tracking-[-0.013em] text-carbon">
          {title}
        </h2>
      )}
      {body && (
        <p className="w-full whitespace-pre-line text-[17px] leading-[1.6] tracking-[-0.009em] text-zinc">
          {body}
        </p>
      )}
    </section>
  );
}
