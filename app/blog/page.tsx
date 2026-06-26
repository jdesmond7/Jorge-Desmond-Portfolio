import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/format-date";
import { getDictionary } from "@/lib/i18n";
import { getLocale, localeToDateLocale } from "@/lib/i18n/locale";
import { getBlogPosts } from "@/lib/strapi";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.blog.title,
    description: dict.blog.description,
  };
}

export default async function BlogPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const dateLocale = localeToDateLocale(locale);
  const posts = await getBlogPosts();

  return (
    <div className="pt-28 md:pt-32">
      <Container narrow className="py-[var(--section-py)]">
        <h1 className="font-display mb-4 text-[clamp(36px,6vw,56px)] uppercase leading-none tracking-[0.02em] text-carbon">
          {dict.blog.title}
        </h1>
        <p className="mb-12 w-full text-[17px] leading-[1.4] tracking-[-0.009em] text-zinc">
          {dict.blog.intro}
        </p>

        <div className="border-t border-mist">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="block border-b border-mist py-8 no-underline transition-colors hover:bg-fog"
              >
                <div className="mono mb-2 text-[11px] tracking-[-0.006em] text-ash">
                  {formatDate(post.publishedAt, dateLocale)}
                </div>
                <h2 className="mb-2 text-[clamp(24px,4vw,30px)] font-normal leading-[1.2] tracking-[-0.013em] text-carbon">
                  {post.title}
                </h2>
                <p className="w-full text-[15px] leading-normal tracking-[-0.005em] text-zinc">
                  {post.excerpt}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
