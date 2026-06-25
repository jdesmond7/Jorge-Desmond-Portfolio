import type { Metadata } from "next";
import { IllustrationBento } from "@/components/sections/IllustrationBento";
import { Container } from "@/components/ui/Container";
import {
  getInstagramIllustrations,
  ILLUSTRATION_INSTAGRAM_HANDLE,
  ILLUSTRATION_INSTAGRAM_URL,
} from "@/lib/instagram";

export const metadata: Metadata = {
  title: "Ilustración",
  description: "Galería de ilustraciones y exploraciones visuales personales.",
};

export default async function IlustracionPage() {
  const illustrations = await getInstagramIllustrations();

  return (
    <div className="pt-28 md:pt-32">
      <Container className="py-[var(--section-py)]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display mb-4 text-[clamp(36px,6vw,56px)] uppercase leading-none tracking-[0.02em] text-carbon">
              Ilustración
            </h1>
            <p className="max-w-xl text-[17px] leading-[1.4] tracking-[-0.009em] text-zinc">
              Exploraciones visuales fuera del producto digital — editorial,
              conceptual y personal.
            </p>
          </div>

          <a
            href={ILLUSTRATION_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mono inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-mist bg-white px-5 py-2.5 text-[12px] tracking-[-0.006em] text-carbon no-underline transition-colors hover:border-coral hover:text-coral"
          >
            @{ILLUSTRATION_INSTAGRAM_HANDLE}
            <span aria-hidden>↗</span>
          </a>
        </div>

        <IllustrationBento items={illustrations} />
      </Container>
    </div>
  );
}
