interface CaseSectionLabelProps {
  number: string;
  label: string;
}

export function CaseSectionLabel({ number, label }: CaseSectionLabelProps) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="mono text-[11px] font-bold text-coral">{number}</span>
      <span className="text-[11px] uppercase tracking-[0.12em] text-ash">
        {label}
      </span>
    </div>
  );
}
