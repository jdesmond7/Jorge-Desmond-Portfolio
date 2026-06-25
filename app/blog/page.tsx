import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { getBlogPosts } from "@/lib/strapi";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artículos sobre Design Systems, arquitectura de diseño con IA y pensamiento sistémico.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("es-MX", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className="pt-28 md:pt-32">
      <Container narrow className="py-[var(--section-py)]">
        <h1 className="font-display mb-4 text-[clamp(36px,6vw,56px)] uppercase leading-none tracking-[0.02em] text-carbon">
          Blog
        </h1>
        <p className="mb-12 w-full text-[17px] leading-[1.4] tracking-[-0.009em] text-zinc">
          Reflexiones sobre diseño de producto, sistemas y disciplina aplicada.
        </p>

        <div className="border-t border-mist">
          {posts.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.05}>
              <Link
                href={`/blog/${post.slug}`}
                className="block border-b border-mist py-8 no-underline transition-colors hover:bg-fog"
              >
                <div className="mono mb-2 text-[11px] tracking-[-0.006em] text-ash">
                  {formatDate(post.publishedAt)}
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
