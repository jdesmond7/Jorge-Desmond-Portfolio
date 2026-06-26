"use client";

import { useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";

export interface DecisionCardProps {
  number: string;
  title: string;
  context: string;
  decision: string;
  result: string;
  defaultOpen?: boolean;
}

const bodyTextClass =
  "text-[15px] leading-[1.7] tracking-[-0.005em] text-carbon";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`shrink-0 text-ash transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export function DecisionCard({
  number,
  title,
  context,
  decision,
  result,
  defaultOpen = false,
}: DecisionCardProps) {
  const { dict } = useI18n();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-3 rounded-[var(--radius-card)] border border-mist bg-white p-6 transition-colors hover:border-coral">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full cursor-pointer items-start justify-between gap-4 text-left"
        aria-expanded={open}
      >
        <div className="flex min-w-0 items-start gap-3.5">
          <span className="mono pt-0.5 text-[11px] font-bold text-coral">
            {number}
          </span>
          <div className="min-w-0">
            <div className="text-[17px] font-semibold leading-[1.35] tracking-[-0.009em] text-carbon">
              {title}
            </div>
            {!open && context && (
              <p className={`mt-1 ${bodyTextClass}`}>{context}</p>
            )}
          </div>
        </div>
        <Chevron open={open} />
      </button>

      {open && (
        <div className="mt-5 pl-[26px]">
          {context && (
            <div className="mb-4">
              <div className="mono mb-1.5 text-[11px] uppercase tracking-[0.12em] text-ash">
                {dict.projects.decision.context}
              </div>
              <p className={bodyTextClass}>{context}</p>
            </div>
          )}

          {decision && (
            <div className="mb-4">
              <div className="mono mb-1.5 text-[11px] uppercase tracking-[0.12em] text-ash">
                {dict.projects.decision.decision}
              </div>
              <p className={bodyTextClass}>{decision}</p>
            </div>
          )}

          {result && (
            <div className="rounded-lg bg-fog px-4 py-3.5">
              <div className="mono mb-1.5 text-[11px] font-bold uppercase tracking-[0.12em] text-coral">
                {dict.projects.decision.outcome}
              </div>
              <p className={bodyTextClass}>{result}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
