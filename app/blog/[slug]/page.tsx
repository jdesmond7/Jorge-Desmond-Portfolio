import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
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
    <div className="pt-28 md:pt-32">
      <Container className="py-[var(--section-py)]">
        <Link
          href="/blog"
          className="mono mb-8 inline-block text-[13px] tracking-[-0.006em] text-zinc no-underline hover:text-coral"
        >
          ← Blog
        </Link>

        <div className="mono mb-4 text-[11px] tracking-[-0.006em] text-ash">
          {formatDate(post.publishedAt)}
        </div>
        <h1 className="font-body mb-6 max-w-3xl text-[clamp(28px,5vw,48px)] font-bold leading-[1.15] text-carbon">
          {post.title}
        </h1>
        <p className="mb-10 max-w-2xl text-[17px] leading-[1.4] tracking-[-0.009em] text-zinc">
          {post.excerpt}
        </p>

        {post.body && (
          <div className="max-w-2xl whitespace-pre-line text-[17px] leading-[1.6] tracking-[-0.009em] text-zinc">
            {post.body}
          </div>
        )}
      </Container>
    </div>
  );
}
