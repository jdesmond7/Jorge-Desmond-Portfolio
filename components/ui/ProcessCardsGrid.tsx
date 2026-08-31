interface ProcessCardData {
  title: string;
  body: string;
}

function AnalyzeIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="11" cy="11" r="6.25" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M16 16l4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M8.5 11h5M11 8.5v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AskIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M5.5 16.5 4 20l3.5-1.5A8 8 0 1 0 5.5 16.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.75 9.6a2.25 2.25 0 0 1 4.35.85c0 1.5-2.1 1.9-2.1 3.05"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="12" cy="16.25" r="0.9" fill="currentColor" />
    </svg>
  );
}

function BuildIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3.5"
        y="3.5"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="13.5"
        y="3.5"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <rect
        x="3.5"
        y="13.5"
        width="7"
        height="7"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M14.5 15.5h5M17 13v5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ICONS = [AnalyzeIcon, AskIcon, BuildIcon] as const;

export function ProcessCardsGrid({ cards }: { cards: ProcessCardData[] }) {
  return (
    <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
      {cards.map((card, index) => {
        const Icon = ICONS[index % ICONS.length];
        return (
          <article
            key={card.title}
            className="flex h-full flex-col rounded-[var(--radius-card)] border border-mist bg-white p-6 md:p-7"
          >
            <div className="mb-4 text-primary">
              <Icon />
            </div>
            <h3 className="mb-2 text-[17px] font-semibold leading-[1.35] tracking-[-0.009em] text-carbon md:text-[18px]">
              {card.title}
            </h3>
            <p className="text-[15px] leading-[1.7] tracking-[-0.005em] text-zinc">
              {card.body}
            </p>
          </article>
        );
      })}
    </div>
  );
}
