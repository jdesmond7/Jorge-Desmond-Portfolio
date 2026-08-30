"use client";

import { useState } from "react";

export interface VersionCardData {
  version: string;
  year: string;
  title: string;
  items: string[];
  note?: string;
}

const CARD_WIDTH_CLASS = "w-[min(100%,480px)] md:w-[600px]";
const CARD_MAX_WIDTH = "max-w-[600px]";

function VersionCard({ version, year, title, items, note }: VersionCardData) {
  return (
    <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-white/10 bg-carbon p-6 shadow-[0_20px_50px_rgba(0,0,0,0.22)] md:p-8">
      <div className="mb-2 flex items-center gap-2.5">
        <span className="rounded-pill bg-white px-3 py-1 text-[15px] font-bold leading-none text-carbon">
          {version}
        </span>
        {year && <span className="mono text-[14px] text-white/45">{year}</span>}
      </div>

      {title && (
        <h3 className="mb-5 text-[20px] font-semibold leading-[1.3] tracking-[-0.009em] text-cream md:text-[22px]">
          {title}
        </h3>
      )}

      {items.length > 0 && (
        <ul className="mb-5 list-none p-0">
          {items.map((item, index) => (
            <li
              key={index}
              className={`flex gap-2.5 py-2.5 ${index < items.length - 1 ? "border-b border-white/10" : ""}`}
            >
              <span className="mt-[3px] shrink-0 text-[14px] text-coral-soft">✓</span>
              <span className="text-[16px] leading-[1.65] tracking-[-0.005em] text-white/82">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}

      {note && (
        <div className="mt-auto rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-[15px] italic leading-[1.6] tracking-[-0.005em] text-white/70">
          💡 {note}
        </div>
      )}
    </div>
  );
}

function CarouselChevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className="text-zinc"
    >
      <path
        d={direction === "left" ? "M13 4L7 10L13 16" : "M7 4L13 10L7 16"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getCardStyle(offset: number) {
  if (offset === 0) {
    return {
      transform: "translate(-50%, 0) rotate(0deg) scale(1)",
      opacity: 1,
      zIndex: 20,
    };
  }

  const direction = offset < 0 ? -1 : 1;
  const xShift = direction * 420;

  return {
    transform: `translate(calc(-50% + ${xShift}px), 0) rotate(${direction * 7}deg) scale(0.9)`,
    opacity: 0.08,
    zIndex: 10,
  };
}

interface VersionCardsCarouselProps {
  cards: { key: number; data: VersionCardData }[];
}

export function VersionCardsCarousel({ cards }: VersionCardsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (cards.length === 0) return null;

  if (cards.length === 1) {
    return (
      <div className="relative left-1/2 mb-16 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip px-6 md:mb-20 md:px-10">
        <div className={`mx-auto ${CARD_MAX_WIDTH}`}>
          <VersionCard {...cards[0].data} />
        </div>
      </div>
    );
  }

  const canGoPrev = activeIndex > 0;
  const canGoNext = activeIndex < cards.length - 1;
  const activeCard = cards[activeIndex];

  return (
    <div
      className="relative left-1/2 mb-16 w-screen max-w-[100vw] -translate-x-1/2 overflow-x-clip px-6 md:mb-24 md:px-10"
      role="region"
      aria-roledescription="carousel"
      aria-label={`Versiones del design system, ${activeCard.data.version} activa`}
    >
      <div className="relative mx-auto w-full max-w-[1320px] pb-2">
        <div
          className={`pointer-events-none invisible mx-auto ${CARD_WIDTH_CLASS}`}
          aria-hidden
        >
          <VersionCard {...activeCard.data} />
        </div>

        {cards.map(({ key, data }, index) => {
          const offset = index - activeIndex;
          if (Math.abs(offset) > 1) return null;

          const isActive = offset === 0;
          const style = getCardStyle(offset);

          return (
            <div
              key={key}
              className={`absolute left-1/2 top-0 ${CARD_WIDTH_CLASS} transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] motion-reduce:transition-none ${
                isActive ? "z-20" : "z-10 hidden cursor-pointer md:block"
              }`}
              style={style}
              aria-hidden={!isActive}
              onClick={() => {
                if (!isActive) setActiveIndex(index);
              }}
            >
              <VersionCard {...data} />
            </div>
          );
        })}

        {canGoPrev && (
          <button
            type="button"
            onClick={() => setActiveIndex((index) => index - 1)}
            className="absolute left-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-mist bg-white/90 shadow-sm transition hover:border-zinc/30 hover:bg-white md:left-[10%]"
            aria-label={`Ver ${cards[activeIndex - 1].data.version}`}
          >
            <CarouselChevron direction="left" />
          </button>
        )}

        {canGoNext && (
          <button
            type="button"
            onClick={() => setActiveIndex((index) => index + 1)}
            className="absolute right-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-mist bg-white/90 shadow-sm transition hover:border-zinc/30 hover:bg-white md:right-[10%]"
            aria-label={`Ver ${cards[activeIndex + 1].data.version}`}
          >
            <CarouselChevron direction="right" />
          </button>
        )}
      </div>
    </div>
  );
}
