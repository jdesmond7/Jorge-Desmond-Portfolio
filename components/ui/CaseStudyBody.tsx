import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ProjectMetric } from "@/lib/types";
import { DecisionCard } from "./DecisionCard";
import { ProjectMetrics } from "./ProjectMetrics";

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
          <span className="mono text-[11px] font-bold text-coral">
            {parsed.number}
          </span>
          <span className="text-[11px] uppercase tracking-[0.12em] text-ash">
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
          <span className="mono text-[12px] font-bold text-coral">
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

    if (onlyStrong) {
      return (
        <p className="mb-6 text-[clamp(20px,3vw,26px)] font-bold leading-[1.3] tracking-[-0.013em] text-carbon">
          {hastText(hast.children?.[0])}
        </p>
      );
    }

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
      <ul className="mb-6 mt-1 overflow-hidden rounded-[var(--radius-card)] border border-mist">
        {children}
      </ul>
    );
  },

  ol({ children }) {
    return <ol className="mb-6 mt-1 flex list-none flex-col">{children}</ol>;
  },

  li({ children }) {
    return (
      <li className="flex gap-2.5 border-b border-mist px-4 py-2.5 last:border-b-0">
        <span className="mt-[3px] shrink-0 text-[12px] text-coral">✓</span>
        <span className="text-[14px] leading-[1.6] tracking-[-0.005em] text-carbon">
          {children}
        </span>
      </li>
    );
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

function VersionCard({ version, year, title, items, note }: VersionCardData) {
  return (
    <div className="mb-5 rounded-[var(--radius-card)] border border-mist bg-fog p-8">
      <div className="mb-2 flex items-center gap-2.5">
        <span className="rounded-pill bg-carbon px-3 py-1 text-[13px] font-bold leading-none text-white">
          {version}
        </span>
        {year && <span className="mono text-[11px] text-ash">{year}</span>}
      </div>

      {title && (
        <h3 className="mb-5 text-[19px] font-semibold leading-[1.3] tracking-[-0.009em] text-carbon">
          {title}
        </h3>
      )}

      {items.length > 0 && (
        <ul className="mb-5 list-none p-0">
          {items.map((item, index) => (
            <li
              key={index}
              className={`flex gap-2.5 py-2 ${index < items.length - 1 ? "border-b border-mist" : ""}`}
            >
              <span className="mt-[3px] shrink-0 text-[12px] text-coral">✓</span>
              <span className="text-[14px] leading-[1.6] tracking-[-0.005em] text-carbon">
                {item}
              </span>
            </li>
          ))}
        </ul>
      )}

      {note && (
        <div className="rounded-lg bg-white px-4 py-3 text-[13px] italic leading-[1.6] tracking-[-0.005em] text-zinc">
          💡 {note}
        </div>
      )}
    </div>
  );
}

export function CaseStudyBody({ content }: CaseStudyBodyProps) {
  const segments = splitSegments(content);
  let decisionIndex = 0;

  return (
    <div className="mb-16 w-full">
      {segments.map((segment, index) => {
        if (segment.type === "version") {
          return <VersionCard key={index} {...segment.data} />;
        }

        if (segment.type === "decision") {
          const currentDecisionIndex = decisionIndex;
          decisionIndex += 1;
          return (
            <DecisionCard
              key={index}
              {...segment.data}
              defaultOpen={currentDecisionIndex === 0}
            />
          );
        }

        if (segment.type === "metrics") {
          return <ProjectMetrics key={index} metrics={segment.data} />;
        }

        return (
          <ReactMarkdown
            key={index}
            remarkPlugins={[remarkGfm]}
            components={components}
          >
            {segment.text}
          </ReactMarkdown>
        );
      })}
    </div>
  );
}
