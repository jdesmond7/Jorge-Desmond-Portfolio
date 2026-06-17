import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { Reveal } from "@/components/ui/Reveal";
import { getAboutContent, getHomeContent } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Sobre mí",
  description:
    "Senior Product Designer especializado en Design Systems y arquitectura de diseño con IA.",
};

export default async function SobreMiPage() {
  const [about, home] = await Promise.all([getAboutContent(), getHomeContent()]);

  return (
    <div className="pt-28 md:pt-32">
      {/* ── Intro ─────────────────────────────────────────────────────── */}
      <Container className="py-[var(--section-py)]">
        <Reveal>
          <div className="mono mb-5 text-[11px] uppercase tracking-[0.08em] text-zinc">
            sobre mí
          </div>
          <h1 className="font-display mb-7 text-[clamp(48px,9vw,96px)] uppercase leading-none tracking-[0.02em] text-carbon">
            {about.title}
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-[17px] leading-[1.65] tracking-[-0.009em] text-zinc">
            {home.heroSubtitle}
          </p>
          <div className="mt-10 flex flex-col gap-4 min-[400px]:flex-row">
            <Button href={`mailto:${home.email}`}>Hablemos →</Button>
            <Button href={home.linkedin} variant="outline" external>
              LinkedIn ↗
            </Button>
          </div>
        </Reveal>
      </Container>

      {/* ── Stats strip ───────────────────────────────────────────────── */}
      <div className="bg-[var(--color-carbon)] py-16 md:py-20">
        <Container>
          <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
            {home.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.07}>
                <span className="font-display block text-[clamp(40px,5.5vw,68px)] leading-none tracking-[0.02em] text-[var(--color-coral)]">
                  {stat.value}
                </span>
                <span className="mono mt-2 block text-[11px] uppercase tracking-[0.07em] text-white/50">
                  {stat.label}
                </span>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>

      {/* ── Quién soy + ProfileCard ────────────────────────────────────── */}
      <Container className="grid items-start gap-12 py-[var(--section-py)] md:grid-cols-[1.2fr_0.8fr] md:gap-20">
        <Reveal>
          <div className="mono mb-5 text-[11px] uppercase tracking-[0.08em] text-zinc">
            quién soy
          </div>
          <div className="whitespace-pre-line text-[17px] leading-[1.7] tracking-[-0.009em] text-zinc">
            {about.body}
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <ProfileCard
            eyebrow={about.cardEyebrow}
            title={about.cardTitle}
            subtitle={about.cardSubtitle}
          />
        </Reveal>
      </Container>

      {/* ── Disciplinas ───────────────────────────────────────────────── */}
      <div className="bg-[var(--color-fog)] py-[var(--section-py)]">
        <Container>
          <Reveal>
            <div className="mono mb-4 text-[11px] uppercase tracking-[0.08em] text-zinc">
              lo que hago
            </div>
            <h2 className="font-display mb-12 text-[clamp(32px,5vw,52px)] uppercase leading-none tracking-[0.02em] text-carbon">
              Disciplinas
            </h2>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {home.stackItems.map((item, i) => (
              <Reveal key={item.number} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-4 rounded-[var(--radius-card)] bg-[var(--color-white)] p-6 shadow-[var(--shadow-card)]">
                  <span className="mono text-[11px] tracking-[0.08em] text-[var(--color-coral)]">
                    {item.number}
                  </span>
                  <h3 className="font-display text-[22px] uppercase leading-none tracking-[0.02em] text-carbon">
                    {item.name}
                  </h3>
                  <p className="text-[13px] leading-[1.55] tracking-[-0.004em] text-zinc">
                    {item.items}
                  </p>
                  {item.isToday && (
                    <span className="mono mt-auto inline-flex w-fit items-center rounded-[var(--radius-pill)] bg-[var(--color-coral)] px-3 py-1 text-[10px] uppercase tracking-[0.08em] text-white">
                      hoy
                    </span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </div>

      {/* ── CTA final ─────────────────────────────────────────────────── */}
      <Container className="py-[var(--section-py)]">
        <Reveal>
          <div className="mono mb-4 text-[11px] uppercase tracking-[0.08em] text-zinc">
            siguiente paso
          </div>
          <h2 className="font-display mb-6 text-[clamp(32px,5vw,52px)] uppercase leading-none tracking-[0.02em] text-carbon">
            {home.ctaTitle}
          </h2>
          <p className="mb-10 max-w-xl text-[16px] leading-[1.65] tracking-[-0.009em] text-zinc">
            {home.ctaSubtitle}
          </p>
          <div className="flex flex-col gap-4 min-[400px]:flex-row">
            <Button href={`mailto:${home.email}`}>Hablemos →</Button>
            <Button href={home.linkedin} variant="outline" external>
              LinkedIn ↗
            </Button>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
