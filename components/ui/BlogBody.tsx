import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

interface BlogBodyProps {
  content: string;
}

const components: Components = {
  h1({ children }) {
    return (
      <h2 className="mb-5 mt-12 text-[clamp(24px,3.5vw,30px)] font-semibold leading-[1.2] tracking-[-0.013em] text-carbon first:mt-0">
        {children}
      </h2>
    );
  },

  h2({ children }) {
    return (
      <h3 className="mb-4 mt-10 text-[19px] font-semibold leading-[1.3] tracking-[-0.009em] text-carbon">
        {children}
      </h3>
    );
  },

  h3({ children }) {
    return (
      <h4 className="mb-3 mt-8 text-[17px] font-semibold leading-[1.35] tracking-[-0.009em] text-carbon">
        {children}
      </h4>
    );
  },

  p({ children }) {
    return (
      <p className="mb-5 text-[17px] leading-[1.6] tracking-[-0.009em] text-zinc">
        {children}
      </p>
    );
  },

  strong({ children }) {
    return <strong className="font-semibold text-carbon">{children}</strong>;
  },

  em({ children }) {
    return <em className="italic">{children}</em>;
  },

  ul({ children }) {
    return (
      <ul className="mb-6 list-disc space-y-2 pl-5 text-[17px] leading-[1.6] tracking-[-0.009em] text-zinc">
        {children}
      </ul>
    );
  },

  ol({ children }) {
    return (
      <ol className="mb-6 list-decimal space-y-2 pl-5 text-[17px] leading-[1.6] tracking-[-0.009em] text-zinc">
        {children}
      </ol>
    );
  },

  li({ children }) {
    return <li>{children}</li>;
  },

  blockquote({ children }) {
    return (
      <blockquote className="my-8 border-l-2 border-coral pl-5 italic [&>p]:mb-0 [&>p]:text-[17px] [&>p]:leading-[1.6] [&>p]:tracking-[-0.009em] [&>p]:text-carbon">
        {children}
      </blockquote>
    );
  },

  hr() {
    return <div className="my-12 border-t border-mist" />;
  },

  a({ href, children }) {
    return (
      <a
        href={href}
        target={href?.startsWith("http") ? "_blank" : undefined}
        rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
        className="text-coral underline-offset-2 hover:underline"
      >
        {children}
      </a>
    );
  },
};

export function BlogBody({ content }: BlogBodyProps) {
  return (
    <div className="w-full">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
