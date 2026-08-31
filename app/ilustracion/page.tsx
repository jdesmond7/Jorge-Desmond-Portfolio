import type { Metadata } from "next";
import { IllustrationBento } from "@/components/sections/IllustrationBento";
import { Container } from "@/components/ui/Container";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/locale";
import { getLocalIllustrations } from "@/lib/illustrations";
import {
  ILLUSTRATION_INSTAGRAM_HANDLE,
  ILLUSTRATION_INSTAGRAM_URL,
} from "@/lib/instagram-layout";
import { buildPageMetadata, DEFAULT_OG_IMAGE } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return buildPageMetadata({
    title: dict.illustration.title,
    description: dict.illustration.description,
    path: "/ilustracion",
    image: DEFAULT_OG_IMAGE,
  });
}

export default async function IlustracionPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const illustrations = getLocalIllustrations(locale);

  return (
    <div className="pt-28 md:pt-32">
      <Container className="py-[var(--section-py)]">
        <div className="mb-10 max-w-xl">
          <h1 className="font-display mb-4 text-[clamp(36px,6vw,56px)] uppercase leading-none tracking-[0.02em] text-carbon">
            {dict.illustration.title}
          </h1>

          <a
            href={ILLUSTRATION_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mono mb-4 inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-mist bg-white px-5 py-2.5 text-[12px] tracking-[-0.006em] text-carbon no-underline transition-colors hover:border-coral hover:text-coral"
          >
            @{ILLUSTRATION_INSTAGRAM_HANDLE}
            <span aria-hidden>↗</span>
          </a>

          <p className="text-[length:var(--text-body)] leading-[length:var(--leading-body)] tracking-[-0.009em] text-zinc">
            {dict.illustration.intro}
          </p>
        </div>

        <IllustrationBento items={illustrations} />
      </Container>
    </div>
  );
}
