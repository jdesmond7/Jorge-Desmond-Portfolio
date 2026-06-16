import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

interface CTAProps {
  title: string;
  subtitle: string;
  email: string;
  linkedin: string;
}

const TRUST_BADGES = ["Respuesta en 24h", "Inglés fluido", "Remoto / Híbrido"];

export function CTA({ title, subtitle, email, linkedin }: CTAProps) {
  return (
    <Container as="section" className="py-[100px] text-center">
      <Reveal>
        <h2 className="font-display mb-5 text-[clamp(40px,6vw,56px)] uppercase leading-none tracking-[0.02em] text-carbon">
          {title}
        </h2>
        <p className="font-body mx-auto mb-9 max-w-[440px] text-[17px] font-normal leading-[1.4] text-zinc">
          {subtitle}
        </p>
        <div className="flex flex-col items-center justify-center gap-4 min-[400px]:flex-row">
          <Button href={`mailto:${email}`}>{email} →</Button>
          <Button href={linkedin} variant="outline" external>
            LinkedIn ↗
          </Button>
        </div>
        <div className="mt-7 flex flex-wrap justify-center gap-5">
          {TRUST_BADGES.map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-1.5 text-[12px] tracking-[-0.005em] text-zinc"
            >
              <span className="text-[11px] text-carbon">✓</span>
              {badge}
            </span>
          ))}
        </div>
      </Reveal>
    </Container>
  );
}
