import { ArticleCard } from "@/components/ui/ArticleCard";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/locale";
import type { BlogPost } from "@/lib/types";

interface WritingProps {
  posts: BlogPost[];
}

export async function Writing({ posts }: WritingProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <section className="border-t border-mist bg-fog">
      <Container narrow className="py-[var(--section-py)]">
        <SectionHeader
          eyebrow={dict.writing.eyebrow}
          title={dict.writing.title}
          linkHref="/blog"
          linkLabel={dict.projects.viewAll}
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
