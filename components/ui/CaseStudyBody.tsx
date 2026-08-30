import type { ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { isExternalHref, sanitizeHref, sanitizeImageSrc } from "@/lib/safe-url";
import type { ProjectMetric } from "@/lib/types";
import { DecisionCard } from "./DecisionCard";
import { ProjectMetrics } from "./ProjectMetrics";
import { VersionCardsCarousel } from "./VersionCardsCarousel";
import { ZoomableImage } from "./ZoomableImage";

interface CaseStudyBodyProps {
  content: string;
}

interface HastNode {
  type?: string;
  tagName?: string;
  value?: string;
  children?: HastNode[];
}

function hastText(node?: HastNode): string {
  if (!node) return "";
  if (node.type === "text") return node.value ?? "";
  if (Array.isArray(node.children)) return node.children.map(hastText).join("");
  return "";
}

/** `## 01 · El problema` → número coral + label en mayúsculas. */
function parseSectionLabel(text: string): { number: string; label: string } | null {
  const match = text.match(/^(\d+)\s*·\s*(.+)$/);
  if (!match) return null;
  return { number: match[1].padStart(2, "0"), label: match[2].trim() };
}

const components: Components = {
  h2({ node, children }) {
    const parsed = parseSectionLabel(hastText(node as HastNode));
    if (parsed) {
      return (
        <div className="mb-5 mt-16 flex items-center gap-3 first:mt-0">
          <span className="mono text-[12px] font-bold text-coral-text">
            {parsed.number}
          </span>
          <span className="text-[12px] font-semibold uppercase tracking-[0.12em] text-zinc">
            {parsed.label}
          </span>
        </div>
      );
    }
    return (
      <h2 className="mb-5 mt-12 text-[clamp(24px,3.5vw,30px)] font-semibold leading-[1.2] tracking-[-0.013em] text-carbon">
        {children}
      </h2>
    );
  },

  h3({ node, children }) {
    const parsed = parseSectionLabel(hastText(node as HastNode));
    if (parsed) {
      return (
        <h3 className="mb-4 mt-10 flex items-baseline gap-3 text-[19px] font-semibold leading-[1.3] tracking-[-0.009em] text-carbon">
          <span className="mono text-[12px] font-bold text-coral-text">
            {parsed.number}
          </span>
          <span>{parsed.label}</span>
        </h3>
      );
    }
    return (
      <h3 className="mb-4 mt-10 text-[19px] font-semibold leading-[1.3] tracking-[-0.009em] text-carbon">
        {children}
      </h3>
    );
  },

  p({ node, children }) {
    const hast = node as HastNode;
    const onlyStrong =
      hast?.children?.length === 1 && hast.children[0]?.tagName === "strong";
    const onlyImg =
      hast?.children?.length === 1 && hast.children[0]?.tagName === "img";

    if (onlyImg) {
      return <>{children}</>;
    }

    if (onlyStrong) {
      return (
        <p className="mb-6 text-[clamp(20px,3vw,26px)] font-bold leading-[1.3] tracking-[-0.013em] text-carbon">
          {hastText(hast.children?.[0])}
        </p>
      );
    }

    return (
      <p className="mb-5 text-[length:var(--text-body)] leading-[length:var(--leading-body)] tracking-[-0.009em] text-zinc">
        {children}
      </p>
    );
  },

  img({ src, alt }) {
    const safeSrc = sanitizeImageSrc(typeof src === "string" ? src : undefined);
    if (!safeSrc) return null;

    return (
      <figure className="my-8 w-full">
        <ZoomableImage
          src={safeSrc}
          alt={alt ?? ""}
          width={1072}
          height={604}
          sizes="(max-width: 1072px) 100vw, 1072px"
          className="h-auto w-full max-w-full rounded-[var(--radius-card)]"
        />
      </figure>
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
      <ul className="mb-6 mt-1 overflow-hidden rounded-[var(--radius-card)] border border-mist bg-white">
        {children}
      </ul>
    );
  },

  ol({ children }) {
    return <ol className="mb-6 mt-1 flex list-none flex-col">{children}</ol>;
  },

  li({ children }) {
    return (
      <li className="flex gap-2.5 border-b border-mist bg-white px-4 py-2.5 last:border-b-0">
        <span className="mt-[3px] shrink-0 text-[12px] text-coral-text">✓</span>
        <span className="text-[14px] leading-[1.6] tracking-[-0.005em] text-carbon">
          {children}
        </span>
      </li>
    );
  },

  blockquote({ children }) {
    return (
      <blockquote className="my-8 border-l-2 border-coral pl-5 italic [&>p]:mb-0 [&>p]:text-[length:var(--text-body)] [&>p]:leading-[length:var(--leading-body)] [&>p]:tracking-[-0.009em] [&>p]:text-carbon">
        {children}
      </blockquote>
    );
  },

  hr() {
    return <div className="my-12 border-t border-mist" />;
  },

  a({ href, children }) {
    const safeHref = sanitizeHref(href);
    if (!safeHref) return <span className="text-coral-text">{children}</span>;

    return (
      <a
        href={safeHref}
        target={isExternalHref(safeHref) ? "_blank" : undefined}
        rel={isExternalHref(safeHref) ? "noopener noreferrer" : undefined}
        className="text-coral-text underline-offset-2 hover:underline"
      >
        {children}
      </a>
    );
  },
};

interface VersionCardData {
  version: string;
  year: string;
  title: string;
  items: string[];
  note?: string;
}

interface DecisionCardData {
  number: string;
  title: string;
  context: string;
  decision: string;
  result: string;
}

type Segment =
  | { type: "md"; text: string }
  | { type: "version"; data: VersionCardData }
  | { type: "decision"; data: DecisionCardData }
  | { type: "metrics"; data: ProjectMetric[] };

const VERSION_HEADING = /^###\s+V\d/i;
const DECISION_HEADING = /^###\s+\d+\s*·/;
const TABLE_ROW = /^\|/;
const BOUNDARY = /^(#{1,3}\s|---\s*$)/;
const TABLE_HEADER = /^(métrica|metrica|metric)$/i;

function parseMetricTableBlock(lines: string[]): ProjectMetric[] {
  const metrics: ProjectMetric[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!TABLE_ROW.test(trimmed)) continue;

    const cells = trimmed
      .split("|")
      .map((cell) => cell.trim())
      .filter(Boolean);

    if (cells.length < 2) continue;
    if (cells.every((cell) => /^:?-+:?$/.test(cell))) continue;
    if (TABLE_HEADER.test(cells[0])) continue;

    const value = cells[0];
    const detail = cells[1];
    const splitIndex = detail.indexOf(". ");

    if (splitIndex > 0) {
      metrics.push({
        value,
        title: detail.slice(0, splitIndex),
        description: detail.slice(splitIndex + 2),
      });
    } else {
      metrics.push({ value, title: detail });
    }
  }

  return metrics;
}

function parseVersionSegment(lines: string[]): VersionCardData {
  const headingParts = lines[0]
    .replace(/^###\s+/, "")
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean);

  const [version = "", year = "", ...titleParts] = headingParts;
  const title = titleParts.join(" · ");

  const items: string[] = [];
  let note: string | undefined;

  for (const line of lines.slice(1)) {
    const trimmed = line.trim();
    if (trimmed.startsWith("- ")) {
      items.push(trimmed.slice(2).trim());
    } else if (trimmed.startsWith(">")) {
      note = trimmed.replace(/^>\s?/, "").trim();
    }
  }

  return { version, year, title, items, note };
}

function parseDecisionSegment(lines: string[]): DecisionCardData {
  const headingMatch = lines[0]
    .replace(/^###\s+/, "")
    .match(/^(\d+)\s*·\s*(.+)$/);

  const number = headingMatch?.[1]?.padStart(2, "0") ?? "01";
  const title = headingMatch?.[2]?.trim() ?? "";

  const paragraphs: string[] = [];
  for (const line of lines.slice(1)) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("- ") && !trimmed.startsWith(">")) {
      paragraphs.push(trimmed);
    }
  }

  return {
    number,
    title,
    context: paragraphs[0] ?? "",
    decision: paragraphs[1] ?? "",
    result: paragraphs[2] ?? "",
  };
}

function splitSegments(content: string): Segment[] {
  const lines = content.split("\n");
  const segments: Segment[] = [];
  let mdBuffer: string[] = [];
  let i = 0;

  const flushMd = () => {
    const text = mdBuffer.join("\n").trim();
    if (text) segments.push({ type: "md", text });
    mdBuffer = [];
  };

  while (i < lines.length) {
    const trimmed = lines[i].trim();

    if (VERSION_HEADING.test(trimmed)) {
      flushMd();
      const block = [lines[i]];
      i += 1;
      while (i < lines.length && !BOUNDARY.test(lines[i].trim())) {
        block.push(lines[i]);
        i += 1;
      }
      segments.push({ type: "version", data: parseVersionSegment(block) });
    } else if (DECISION_HEADING.test(trimmed)) {
      flushMd();
      const block = [lines[i]];
      i += 1;
      while (i < lines.length && !BOUNDARY.test(lines[i].trim())) {
        block.push(lines[i]);
        i += 1;
      }
      segments.push({ type: "decision", data: parseDecisionSegment(block) });
    } else if (TABLE_ROW.test(trimmed)) {
      flushMd();
      const block = [lines[i]];
      i += 1;
      while (i < lines.length && TABLE_ROW.test(lines[i].trim())) {
        block.push(lines[i]);
        i += 1;
      }
      const metrics = parseMetricTableBlock(block);
      if (metrics.length) segments.push({ type: "metrics", data: metrics });
    } else {
      mdBuffer.push(lines[i]);
      i += 1;
    }
  }

  flushMd();
  return segments;
}

export function CaseStudyBody({ content }: CaseStudyBodyProps) {
  const segments = splitSegments(content);
  const firstDecisionIndex = segments.findIndex(
    (segment) => segment.type === "decision",
  );

  const nodes: ReactNode[] = [];
  let index = 0;

  while (index < segments.length) {
    const segment = segments[index];

    if (segment.type === "version") {
      const cards: { key: number; data: VersionCardData }[] = [];
      while (index < segments.length && segments[index].type === "version") {
        const versionSegment = segments[index] as Extract<
          Segment,
          { type: "version" }
        >;
        cards.push({ key: index, data: versionSegment.data });
        index += 1;
      }
      nodes.push(
        <VersionCardsCarousel key={`versions-${cards[0].key}`} cards={cards} />,
      );
      continue;
    }

    if (segment.type === "decision") {
      nodes.push(
        <DecisionCard
          key={index}
          {...segment.data}
          defaultOpen={index === firstDecisionIndex}
        />,
      );
    } else if (segment.type === "metrics") {
      nodes.push(<ProjectMetrics key={index} metrics={segment.data} />);
    } else {
      nodes.push(
        <ReactMarkdown
          key={index}
          remarkPlugins={[remarkGfm]}
          components={components}
        >
          {segment.text}
        </ReactMarkdown>,
      );
    }

    index += 1;
  }

  return <div className="mb-16 w-full">{nodes}</div>;
}
