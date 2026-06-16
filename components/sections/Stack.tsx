import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { StackCard } from "@/components/ui/StackCard";
import type { StackItem } from "@/lib/types";

interface StackProps {
  items: StackItem[];
}

export function Stack({ items }: StackProps) {
  return (
    <section className="border-y border-mist bg-fog">
      <Container className="py-[var(--section-py)]">
        <Reveal>
          <h2 className="font-display mb-3 text-[clamp(36px,6vw,52px)] uppercase leading-none tracking-[0.02em] text-carbon">
            El stack
          </h2>
          <p className="font-body mb-11 max-w-[480px] text-[15px] font-normal leading-normal text-zinc">
            Cada capa habilita la siguiente. No llegué a la arquitectura con IA
            por moda — llegué porque construí cada nivel debajo de ella.
          </p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <StackCard key={item.number} item={item} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
