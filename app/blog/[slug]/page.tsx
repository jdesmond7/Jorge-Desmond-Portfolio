import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/ui/BackLink";
import { BlogBody } from "@/components/ui/BlogBody";
import { Container } from "@/components/ui/Container";
import { ProjectHero } from "@/components/ui/ProjectHero";
import { BlogComments } from "@/components/sections/BlogComments";
import { formatDate } from "@/lib/format-date";
import { getDictionary } from "@/lib/i18n";
import { getLocale, localeToDateLocale } from "@/lib/i18n/locale";
import { getAllBlogSlugs, getBlogPostBySlug } from "@/lib/strapi";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: dict.blog.notFound };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const dateLocale = localeToDateLocale(locale);
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div>
      {post.coverImage && (
        <ProjectHero src={post.coverImage} alt={post.title} />
      )}

      <Container
        narrow
        className={`pb-[var(--section-py)] ${post.coverImage ? "pt-10 md:pt-12" : "pt-28 md:pt-32"}`}
      >
        <BackLink href="/blog">{dict.blog.back}</BackLink>

        <div className="mono mb-4 text-[11px] tracking-[-0.006em] text-ash">
          {formatDate(post.publishedAt, dateLocale)}
        </div>
        <h1 className="font-body mb-6 w-full text-[clamp(28px,5vw,48px)] font-bold leading-[1.15] text-carbon">
          {post.title}
        </h1>
        <p className="mb-10 w-full text-[17px] leading-[1.4] tracking-[-0.009em] text-zinc">
          {post.excerpt}
        </p>

        {post.body && <BlogBody content={post.body} />}

        <BlogComments postSlug={post.slug} postId={post.id} />
      </Container>
    </div>
  );
}
