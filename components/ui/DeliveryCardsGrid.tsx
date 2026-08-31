import fs from "node:fs";
import path from "node:path";
import { sanitizeImageSrc } from "@/lib/safe-url";
import { ZoomableImage } from "./ZoomableImage";

export interface DeliveryCardData {
  title: string;
  body: string;
  imageSrc: string;
}

function resolveImage(src: string): string | null {
  const href = src.startsWith("/") ? src : `/images/projects/growrk-playground/${src}`;
  if (!fs.existsSync(path.join(process.cwd(), "public", href))) return null;
  return sanitizeImageSrc(href) ?? null;
}

export function DeliveryCardsGrid({ cards }: { cards: DeliveryCardData[] }) {
  return (
    <div className="mb-8 grid grid-cols-1 items-start gap-4 md:grid-cols-2 md:gap-5">
      {cards.map((card) => {
        const safeSrc = card.imageSrc ? resolveImage(card.imageSrc) : null;

        return (
          <article
            key={card.title}
            className="flex h-full flex-col rounded-[var(--radius-card)] border border-mist bg-white p-6 md:p-7"
          >
            <h3 className="mb-2 text-[17px] font-semibold leading-[1.35] tracking-[-0.009em] text-carbon md:text-[18px]">
              {card.title}
            </h3>
            <p className="text-[15px] leading-[1.7] tracking-[-0.005em] text-zinc">
              {card.body}
            </p>
            {safeSrc ? (
              <div className="mt-5">
                <ZoomableImage
                  src={safeSrc}
                  alt={card.title}
                  caption={card.body}
                  width={520}
                  height={390}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  containerClassName="self-start"
                  className="h-auto w-full max-w-full rounded-[var(--radius-card)]"
                />
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
