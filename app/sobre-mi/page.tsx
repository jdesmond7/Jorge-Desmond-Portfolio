import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
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
      <Container className="grid items-start gap-10 py-[var(--section-py)] md:grid-cols-[1.1fr_0.9fr] md:gap-[60px]">
        <div>
          <Reveal>
            <div className="mono mb-4 text-[11px] tracking-[-0.006em] text-zinc">
              sobre mí
            </div>
            <h1 className="font-display mb-6 text-[clamp(36px,6vw,56px)] uppercase leading-none tracking-[0.02em] text-carbon">
              {about.title}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-xl whitespace-pre-line text-[17px] leading-[1.6] tracking-[-0.009em] text-zinc">
              {about.body}
            </div>
            <div className="mt-10 flex flex-col gap-4 min-[400px]:flex-row">
              <Button href={`mailto:${home.email}`}>Hablemos →</Button>
              <Button href={home.linkedin} variant="outline" external>
                LinkedIn ↗
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div
            className="flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] p-[19px] shadow-[rgba(0,0,0,0.05)_0px_2px_2px_0px]"
            style={{
              background:
                "linear-gradient(88deg, #fc5f2b, #ff8b64 70%, #ffd9c4 100%)",
            }}
          >
            <div className="text-[15px] font-bold tracking-[-0.009em] text-white">
              {about.cardEyebrow}
            </div>
            <div>
              <div className="whitespace-pre-line text-[clamp(24px,5vw,30px)] font-normal leading-[1.2] tracking-[-0.013em] text-white">
                {about.cardTitle}
              </div>
              <div className="mono mt-2.5 text-[11px] tracking-[-0.006em] text-white/80">
                {about.cardSubtitle}
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
