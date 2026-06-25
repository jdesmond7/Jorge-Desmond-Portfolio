import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { getIllustrations } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Ilustración",
  description: "Galería de ilustraciones y exploraciones visuales personales.",
};

export default async function IlustracionPage() {
  const illustrations = await getIllustrations();

  return (
    <div className="pt-28 md:pt-32">
      <Container className="py-[var(--section-py)]">
        <h1 className="font-display mb-4 text-[clamp(36px,6vw,56px)] uppercase leading-none tracking-[0.02em] text-carbon">
          Ilustración
        </h1>
        <p className="mb-12 max-w-xl text-[17px] leading-[1.4] tracking-[-0.009em] text-zinc">
          Exploraciones visuales fuera del producto digital — editorial,
          conceptual y personal.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {illustrations.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.08}>
              <article className="overflow-hidden rounded-[var(--radius-card)] border border-mist bg-white">
                <div className="relative aspect-[4/3]">
                  <ZoomableImage
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    containerClassName="h-full w-full"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="text-[22px] font-normal tracking-[-0.012em] text-carbon">
                      {item.title}
                    </h2>
                    {item.year && (
                      <span className="mono text-[11px] tracking-[-0.006em] text-ash">
                        {item.year}
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p className="mt-2 text-[15px] leading-normal tracking-[-0.005em] text-zinc">
                      {item.description}
                    </p>
                  )}
                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
