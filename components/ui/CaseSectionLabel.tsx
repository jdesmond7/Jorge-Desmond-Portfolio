interface CaseSectionLabelProps {
  number: string;
  label: string;
}

export function CaseSectionLabel({ number, label }: CaseSectionLabelProps) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="mono text-[12px] font-bold text-coral-text">{number}</span>
      <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc">
        {label}
      </span>
    </div>
  );
}
