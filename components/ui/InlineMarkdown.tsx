import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { isExternalHref, sanitizeHref } from "@/lib/safe-url";

export const inlineLinkClass =
  "font-semibold text-carbon underline decoration-coral/50 underline-offset-[3px] transition-colors hover:text-coral";

const components: Components = {
  p: ({ children }) => <>{children}</>,
  a: ({ href, children }) => {
    const safeHref = sanitizeHref(href);
    if (!safeHref) return <span>{children}</span>;

    return (
      <a
        href={safeHref}
        target={isExternalHref(safeHref) ? "_blank" : undefined}
        rel={isExternalHref(safeHref) ? "noopener noreferrer" : undefined}
        className={inlineLinkClass}
      >
        {children}
      </a>
    );
  },
};

interface InlineMarkdownProps {
  content: string;
}

/** Renders a single paragraph with inline markdown (links, emphasis). */
export function InlineMarkdown({ content }: InlineMarkdownProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {content}
    </ReactMarkdown>
  );
}
