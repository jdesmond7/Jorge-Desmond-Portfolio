import Link from "next/link";
import { ArticleCard } from "@/components/ui/ArticleCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import type { BlogPost } from "@/lib/types";

interface WritingProps {
  posts: BlogPost[];
}

export function Writing({ posts }: WritingProps) {
  return (
    <section className="border-t border-mist bg-fog">
      <Container className="py-[var(--section-py)]">
        <div className="mx-auto w-full max-w-[1072px]">
          <Reveal>
            <p className="mono mb-3 text-[11px] uppercase tracking-[0.12em] text-ash">
              Artículos
            </p>
            <div className="mb-11 flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="font-display text-[clamp(36px,6vw,52px)] uppercase leading-none tracking-[0.02em] text-carbon">
                Blog Personal
              </h2>
              <Link
                href="/blog"
                className="font-body text-[13px] text-zinc no-underline transition-colors hover:text-carbon"
              >
                Ver todos →
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <ArticleCard key={post.id} post={post} index={i} />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
