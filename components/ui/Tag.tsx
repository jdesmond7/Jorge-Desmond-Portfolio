interface TagProps {
  children: string;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="inline-block rounded-[var(--radius-pill)] border border-mist bg-white px-3 py-[5px] text-[11px] tracking-[-0.005em] text-zinc">
      {children}
    </span>
  );
}
