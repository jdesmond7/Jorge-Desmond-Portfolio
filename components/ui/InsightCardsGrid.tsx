import fs from "node:fs";
import path from "node:path";
import { sanitizeImageSrc } from "@/lib/safe-url";
import { ZoomableImage } from "./ZoomableImage";

export interface InsightCardData {
  title: string;
  body: string;
  paragraphs?: string[];
  imageSrc?: string;
  note?: string;
  fullWidth?: boolean;
}

function resolveImage(src: string): string | null {
  const href = src.startsWith("/") ? src : `/images/projects/growrk-design-system/${src}`;
  if (!fs.existsSync(path.join(process.cwd(), "public", href))) return null;
  return sanitizeImageSrc(href) ?? null;
}

export function InsightCardsGrid({ cards }: { cards: InsightCardData[] }) {
  const fullWidth = cards.length === 1 && Boolean(cards[0]?.fullWidth);

  return (
    <div
      className={`mb-8 grid grid-cols-1 gap-4 ${fullWidth ? "" : "md:grid-cols-2"} md:gap-5`}
    >
      {cards.map((card) => {
        const paragraphs = card.paragraphs?.length
          ? card.paragraphs
          : card.body
            ? [card.body]
            : [];
        const safeSrc = card.imageSrc ? resolveImage(card.imageSrc) : null;

        const imageCaption = card.title;

        return (
          <article
            key={card.title}
            className="rounded-[var(--radius-card)] border border-mist bg-white p-6 md:p-7"
          >
            <h3 className="mb-3 text-[17px] font-semibold leading-[1.35] tracking-[-0.009em] text-carbon md:text-[18px]">
              {card.title}
            </h3>
            <div className="space-y-4">
              {paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="text-[15px] leading-[1.7] tracking-[-0.005em] text-zinc"
                >
                  {paragraph}
                </p>
              ))}
            </div>
            {safeSrc ? (
              <div className="mt-5">
                <ZoomableImage
                  src={safeSrc}
                  alt={card.title}
                  caption={imageCaption}
                  showCaption={paragraphs.length === 0}
                  width={1072}
                  height={604}
                  sizes="(max-width: 1072px) 100vw, 1072px"
                  containerClassName="self-start"
                  className="h-auto w-full max-w-full rounded-[var(--radius-card)]"
                />
              </div>
            ) : null}
            {card.note ? (
              <blockquote className="mt-5 border-l-2 border-coral pl-4 text-[15px] italic leading-[1.7] tracking-[-0.005em] text-carbon">
                {card.note}
              </blockquote>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
