import { ArticleCard } from "@/components/ui/ArticleCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import type { BlogPost } from "@/lib/types";

interface WritingProps {
  posts: BlogPost[];
}

export function Writing({ posts }: WritingProps) {
  return (
    <section className="border-t border-mist bg-fog">
      <Container narrow className="py-[var(--section-py)]">
        <SectionHeader
          eyebrow="Artículos"
          title="Blog Personal"
          linkHref="/blog"
        />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <ArticleCard key={post.id} post={post} index={i} />
          ))}
        </div>
      </Container>
    </section>
  );
}
