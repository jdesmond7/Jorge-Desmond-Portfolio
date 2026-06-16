import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { HomeContent } from "@/lib/types";

interface AboutProps {
  title: string;
  teaser: string;
}

export function About({ title, teaser }: AboutProps) {
  const lines = title.split("\n");

  return (
    <Container
      as="section"
      id="sobre-mi"
      className="grid items-center gap-10 py-[var(--section-py)] md:grid-cols-[1.1fr_0.9fr] md:gap-[60px]"
    >
      <div>
        <Reveal>
          <div className="mono mb-4 text-[11px] tracking-[-0.006em] text-zinc">
            sobre mí
          </div>
          <h2 className="font-display mb-6 text-[clamp(36px,6vw,52px)] uppercase leading-none tracking-[0.02em] text-carbon">
            {lines.map((line, i) => (
              <span key={i}>
                {line}
                {i < lines.length - 1 && <br />}
              </span>
            ))}
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="font-body mb-8 max-w-[480px] text-[17px] font-normal leading-[1.4] text-zinc">
            {teaser}
          </p>
          <Button href="/sobre-mi">Conoce mi historia →</Button>
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
            built by des
          </div>
          <div>
            <div className="text-[clamp(24px,5vw,30px)] font-normal leading-[1.2] tracking-[-0.013em] text-white">
              Build the body.
              <br />
              Own the process.
            </div>
            <div className="mono mt-2.5 text-[11px] tracking-[-0.006em] text-white/80">
              disciplina aplicada — dentro y fuera
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
