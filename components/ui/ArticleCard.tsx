import Link from "next/link";
import { ArrowRight } from "./ArrowRight";
import { CmsImage } from "./CmsImage";
import { Reveal } from "./Reveal";
import { getDictionary } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n/locale";
import type { BlogPost } from "@/lib/types";

const PLACEHOLDER_GRADIENTS = [
  "bg-gradient-to-br from-coral/25 via-coral/10 to-cream",
  "bg-gradient-to-br from-carbon/15 via-mist/40 to-cream",
  "bg-gradient-to-br from-zinc/20 via-fog to-cream",
  "bg-gradient-to-br from-coral/15 via-fog to-mist/30",
  "bg-gradient-to-br from-carbon/10 via-coral/10 to-fog",
] as const;

interface ArticleCardProps {
  post: BlogPost;
  index: number;
}

export async function ArticleCard({ post, index }: ArticleCardProps) {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const placeholderClass =
    PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length];

  return (
    <Reveal delay={index * 0.08}>
      <Link
        href={`/blog/${post.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-mist bg-white no-underline transition-colors hover:border-ash/60"
      >
        <div className={`relative aspect-[16/10] w-full ${placeholderClass}`}>
          {post.coverImage ? (
            <CmsImage
              src={post.coverImage}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : null}
          <span className="absolute right-3 top-3 rounded-[var(--radius-pill)] bg-white px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-carbon">
            {dict.writing.article}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 md:p-6">
          <h3 className="mb-2 text-[18px] font-bold leading-[1.3] tracking-[-0.01em] text-carbon md:text-[20px]">
            {post.title}
          </h3>
          <p className="mb-5 line-clamp-3 flex-1 text-[14px] leading-[1.55] tracking-[-0.005em] text-zinc">
            {post.excerpt}
          </p>
          <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-coral">
            {dict.writing.readArticle}
            <ArrowRight className="arrow-slide h-4 w-4 shrink-0" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
