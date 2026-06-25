import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BackLink } from "@/components/ui/BackLink";
import { BlogBody } from "@/components/ui/BlogBody";
import { Container } from "@/components/ui/Container";
import { ProjectHero } from "@/components/ui/ProjectHero";
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
  const post = await getBlogPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
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
        <BackLink href="/blog">← Blog</BackLink>

        <div className="mono mb-4 text-[11px] tracking-[-0.006em] text-ash">
          {formatDate(post.publishedAt)}
        </div>
        <h1 className="font-body mb-6 w-full text-[clamp(28px,5vw,48px)] font-bold leading-[1.15] text-carbon">
          {post.title}
        </h1>
        <p className="mb-10 w-full text-[17px] leading-[1.4] tracking-[-0.009em] text-zinc">
          {post.excerpt}
        </p>

        {post.body && <BlogBody content={post.body} />}
      </Container>
    </div>
  );
}
