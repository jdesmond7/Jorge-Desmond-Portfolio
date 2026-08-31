import fs from "node:fs";
import path from "node:path";
import type { ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { isExternalHref, sanitizeHref, sanitizeImageSrc } from "@/lib/safe-url";
import type { Locale } from "@/lib/i18n/types";
import type { ProjectMetric } from "@/lib/types";
import { Button } from "./Button";
import { CaseStudyVideoPlayer } from "./CaseStudyVideoPlayer";
import { DecisionCard } from "./DecisionCard";
import { DeliveryCardsGrid } from "./DeliveryCardsGrid";
import type { DeliveryCardData } from "./DeliveryCardsGrid";
import { DesignSystemComponentPlayground } from "./DesignSystemComponentPlayground";
import { DesignSystemTokenExplorer } from "./DesignSystemTokenExplorer";
import { InsightCardsGrid, type InsightCardData } from "./InsightCardsGrid";
import { PdlcArchitectureDiagram } from "./PdlcArchitectureDiagram";
import { ProcessCardsGrid } from "./ProcessCardsGrid";
import { ProjectMetrics } from "./ProjectMetrics";
import { QuestionCardsGrid } from "./QuestionCardsGrid";
import { VersionCardsCarousel } from "./VersionCardsCarousel";
import { ZoomableImage } from "./ZoomableImage";

const CASE_STUDY_IMAGE_DIR = "/images/projects/growrk-design-system";

function publicImageSrc(filename: string): string {
  return filename.startsWith("/")
    ? filename
    : `${CASE_STUDY_IMAGE_DIR}/${filename}`;
}

function publicImageExists(src: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", src));
}

function CaseStudyImageSlot({
  src,
  caption,
}: {
  src: string;
  caption: string;
}) {
  const href = publicImageSrc(src);
  const safeSrc = publicImageExists(href) ? sanitizeImageSrc(href) : null;

  if (safeSrc) {
    return (
      <div className="my-8 w-full">
        <ZoomableImage
          src={safeSrc}
          alt={caption}
          caption={caption}
          width={1072}
          height={604}
          sizes="(max-width: 1072px) 100vw, 1072px"
          className="h-auto w-full max-w-full rounded-[var(--radius-card)]"
        />
      </div>
    );
  }

  return (
    <figure className="my-8 overflow-hidden rounded-[var(--radius-card)] border border-dashed border-mist bg-fog">
      <div className="flex aspect-[16/9] items-center justify-center px-8">
        <figcaption className="max-w-md text-center text-[14px] leading-[1.6] tracking-[-0.005em] text-zinc">
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}

interface CaseStudyBodyProps {
  content: string;
  locale?: Locale;
  liveSiteLabel?: string;
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

    const rawAlt = alt ?? "";
    const compactPreview = rawAlt.includes("#compact");
    const label = rawAlt.replace(/#compact/g, "").trim();

    return (
      <div className="my-8 w-full">
        <ZoomableImage
          src={safeSrc}
          alt={label}
          caption={label}
          compactPreview={compactPreview}
          width={1072}
          height={604}
          sizes="(max-width: 1072px) 100vw, 1072px"
          className="h-auto w-full max-w-full rounded-[var(--radius-card)]"
        />
      </div>
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

  blockquote({ node, children }) {
    const text = hastText(node as HastNode).trim();
    if (text.startsWith("[!info]")) {
      const message = text.replace(/^\[!info\]\s*/, "").trim();
      return (
        <div
          role="status"
          className="my-6 flex gap-3 rounded-[var(--radius-card)] border border-[#C7D2FE] bg-[#EEF2FF] px-4 py-3.5"
        >
          <span className="mt-0.5 shrink-0 text-[#6366F1]" aria-hidden>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="9" r="7.25" stroke="currentColor" strokeWidth="1.5" />
              <path
                d="M9 8.25V12.5M9 5.75V6.25"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <p className="m-0 text-[length:var(--text-body)] font-normal leading-[length:var(--leading-body)] tracking-[-0.009em] text-carbon">
            {message}
          </p>
        </div>
      );
    }

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
  | { type: "insight"; data: InsightCardData }
  | { type: "process"; data: InsightCardData[] }
  | { type: "questions"; data: string[] }
  | { type: "delivery"; data: DeliveryCardData[] }
  | { type: "metrics"; data: ProjectMetric[] }
  | { type: "image-slot"; src: string; caption: string }
  | { type: "video-slot"; src: string; poster: string; caption: string }
  | { type: "token-explorer" }
  | { type: "component-playground" }
  | { type: "pdlc-architecture" }
  | { type: "section-columns"; left: string; right: string }
  | { type: "live-site"; url: string };

const TOKEN_EXPLORER_MARKER = "<!-- ds-token-explorer -->";
const COMPONENT_PLAYGROUND_MARKER = "<!-- ds-component-playground -->";
const PDLC_ARCHITECTURE_MARKER = "<!-- pdlc-architecture -->";
const SECTION_COLUMNS_MARKER = "<!-- section-columns -->";
const PROCESS_CARDS_MARKER = "<!-- process-cards -->";
const QUESTION_CARDS_MARKER = "<!-- question-cards -->";
const DELIVERY_CARDS_MARKER = "<!-- delivery-cards -->";
const INSIGHT_FULL_MARKER = "<!-- insight-full -->";
const IMG_SLOT = /^<!--\s*IMG:\s*(\S+)\s+-\s+(.+?)\s*-->$/i;
const VIDEO_SLOT =
  /^<!--\s*VIDEO:\s*(\S+)\s+-\s+(.+?)\s*(?:-\s*poster:\s*(\S+))?\s*-->$/i;
const LIVE_SITE_SLOT = /^<!--\s*LIVE:\s*(\S+)\s*-->$/i;
const DELIVERY_CARD_IMG = /^<!--\s*img:\s*(\S+)\s*-->$/i;
const MARKDOWN_IMAGE = /^!\[[^\]]*\]\(([^)]+)\)/;

const VERSION_HEADING = /^###\s+V\d/i;
const DECISION_HEADING = /^###\s+\d+\s*·/;
const INSIGHT_HEADING = /^###\s+(?!V\d)(?!\d+\s*·).+/;
const TABLE_ROW = /^\|/;
const BOUNDARY = /^(#{1,3}\s|---\s*$)/;
const TABLE_HEADER = /^(métrica|metrica|metric)$/i;
const SECTION_HEADING = /^##\s/;

function parseSectionColumnsBlock(
  lines: string[],
  startIndex: number,
): { left: string; right: string; nextIndex: number } | null {
  let index = startIndex;
  const blocks: string[][] = [];

  for (let blockIndex = 0; blockIndex < 2; blockIndex += 1) {
    while (index < lines.length && !lines[index].trim()) {
      index += 1;
    }

    if (index >= lines.length || !SECTION_HEADING.test(lines[index].trim())) {
      return null;
    }

    const block = [lines[index]];
    index += 1;

    while (index < lines.length) {
      const lineTrimmed = lines[index].trim();

      if (
        SECTION_HEADING.test(lineTrimmed) ||
        lineTrimmed === "---" ||
        isSpecialBlockStart(lineTrimmed)
      ) {
        break;
      }

      block.push(lines[index]);
      index += 1;
    }

    blocks.push(block);
  }

  return {
    left: blocks[0].join("\n").trim(),
    right: blocks[1].join("\n").trim(),
    nextIndex: index,
  };
}

function isSpecialBlockStart(line: string): boolean {
  return (
    line === TOKEN_EXPLORER_MARKER ||
    line === COMPONENT_PLAYGROUND_MARKER ||
    line === PDLC_ARCHITECTURE_MARKER ||
    line === SECTION_COLUMNS_MARKER ||
    line === PROCESS_CARDS_MARKER ||
    line === QUESTION_CARDS_MARKER ||
    line === DELIVERY_CARDS_MARKER ||
    line === INSIGHT_FULL_MARKER ||
    parseImgSlot(line) !== null ||
    parseVideoSlot(line) !== null ||
    parseLiveSiteSlot(line) !== null
  );
}

function parseImgSlot(
  line: string,
): { src: string; caption: string } | null {
  const match = line.match(IMG_SLOT);
  if (!match) return null;
  return { src: match[1], caption: match[2].trim() };
}

function parseVideoSlot(
  line: string,
): { src: string; poster: string; caption: string } | null {
  const match = line.match(VIDEO_SLOT);
  if (!match) return null;

  const src = match[1];
  const caption = match[2].trim();
  const poster =
    match[3] ??
    src.replace(/\.(mp4|webm|mov)$/i, "-poster.jpg");

  return { src, poster, caption };
}

function parseLiveSiteSlot(line: string): string | null {
  const match = line.match(LIVE_SITE_SLOT);
  if (!match) return null;
  return sanitizeHref(match[1]) ?? null;
}

function parseDeliveryCardBlock(lines: string[]): DeliveryCardData {
  const title = lines[0].replace(/^###\s+/, "").trim();
  let imageSrc = "";
  const bodyParts: string[] = [];

  for (const line of lines.slice(1)) {
    const trimmed = line.trim();
    const imgMatch = trimmed.match(DELIVERY_CARD_IMG);
    if (imgMatch) {
      imageSrc = imgMatch[1];
      continue;
    }
    if (trimmed && !trimmed.startsWith("- ") && !trimmed.startsWith(">")) {
      bodyParts.push(trimmed);
    }
  }

  return { title, body: bodyParts.join(" "), imageSrc };
}

function isBlockEnd(line: string): boolean {
  const trimmed = line.trim();
  return (
    BOUNDARY.test(trimmed) ||
    trimmed === TOKEN_EXPLORER_MARKER ||
    trimmed === COMPONENT_PLAYGROUND_MARKER ||
    trimmed === PDLC_ARCHITECTURE_MARKER ||
    trimmed === SECTION_COLUMNS_MARKER ||
    trimmed === PROCESS_CARDS_MARKER ||
    trimmed === QUESTION_CARDS_MARKER ||
    trimmed === DELIVERY_CARDS_MARKER ||
    trimmed === INSIGHT_FULL_MARKER ||
    parseImgSlot(trimmed) !== null ||
    parseVideoSlot(trimmed) !== null ||
    parseLiveSiteSlot(trimmed) !== null
  );
}

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

function parseInsightBlock(
  lines: string[],
  options?: { fullWidth?: boolean },
): InsightCardData {
  const title = lines[0].replace(/^###\s+/, "").trim();
  let imageSrc = "";
  let note = "";
  const paragraphs: string[] = [];

  for (const line of lines.slice(1)) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const imgComment = trimmed.match(DELIVERY_CARD_IMG);
    if (imgComment) {
      imageSrc = imgComment[1];
      continue;
    }

    const mdImage = trimmed.match(MARKDOWN_IMAGE);
    if (mdImage) {
      imageSrc = mdImage[1];
      continue;
    }

    if (trimmed.startsWith(">")) {
      note = trimmed.replace(/^>\s?/, "");
      continue;
    }

    if (!trimmed.startsWith("- ")) {
      paragraphs.push(trimmed);
    }
  }

  return {
    title,
    body: paragraphs.join(" "),
    paragraphs,
    imageSrc: imageSrc || undefined,
    note: note || undefined,
    fullWidth: options?.fullWidth,
  };
}

function CaseStudySectionColumns({
  left,
  right,
}: {
  left: string;
  right: string;
}) {
  const columnClassName =
    "[&>div:first-child]:!mt-0 [&_p:last-child]:mb-0";

  return (
    <div className="my-8 grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
      <div className={columnClassName}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {left}
        </ReactMarkdown>
      </div>
      <div className={columnClassName}>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {right}
        </ReactMarkdown>
      </div>
    </div>
  );
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

    const imageSlot = parseImgSlot(trimmed);
    const videoSlot = parseVideoSlot(trimmed);
    const liveSiteUrl = parseLiveSiteSlot(trimmed);

    if (trimmed === TOKEN_EXPLORER_MARKER) {
      flushMd();
      segments.push({ type: "token-explorer" });
      i += 1;
    } else if (trimmed === COMPONENT_PLAYGROUND_MARKER) {
      flushMd();
      segments.push({ type: "component-playground" });
      i += 1;
    } else if (trimmed === PDLC_ARCHITECTURE_MARKER) {
      flushMd();
      segments.push({ type: "pdlc-architecture" });
      i += 1;
    } else if (trimmed === SECTION_COLUMNS_MARKER) {
      flushMd();
      i += 1;
      const columns = parseSectionColumnsBlock(lines, i);
      if (columns) {
        segments.push({
          type: "section-columns",
          left: columns.left,
          right: columns.right,
        });
        i = columns.nextIndex;
      }
    } else if (trimmed === PROCESS_CARDS_MARKER) {
      flushMd();
      i += 1;
      const cards: InsightCardData[] = [];
      while (i < lines.length) {
        while (i < lines.length && !lines[i].trim()) i += 1;
        if (i >= lines.length || !INSIGHT_HEADING.test(lines[i].trim())) break;

        const block = [lines[i]];
        i += 1;
        while (
          i < lines.length &&
          lines[i].trim() &&
          !isBlockEnd(lines[i]) &&
          !INSIGHT_HEADING.test(lines[i].trim())
        ) {
          block.push(lines[i]);
          i += 1;
        }
        cards.push(parseInsightBlock(block));
      }
      if (cards.length) segments.push({ type: "process", data: cards });
    } else if (trimmed === QUESTION_CARDS_MARKER) {
      flushMd();
      i += 1;
      const questions: string[] = [];
      while (i < lines.length) {
        while (i < lines.length && !lines[i].trim()) i += 1;
        const line = lines[i]?.trim() ?? "";
        if (!line.startsWith("- ")) break;
        questions.push(line.slice(2).trim());
        i += 1;
      }
      if (questions.length) segments.push({ type: "questions", data: questions });
    } else if (trimmed === DELIVERY_CARDS_MARKER) {
      flushMd();
      i += 1;
      const cards: DeliveryCardData[] = [];
      while (i < lines.length) {
        while (i < lines.length && !lines[i].trim()) i += 1;
        if (i >= lines.length || !INSIGHT_HEADING.test(lines[i].trim())) break;

        const block = [lines[i]];
        i += 1;
        while (
          i < lines.length &&
          lines[i].trim() &&
          !isBlockEnd(lines[i]) &&
          !INSIGHT_HEADING.test(lines[i].trim())
        ) {
          block.push(lines[i]);
          i += 1;
        }
        cards.push(parseDeliveryCardBlock(block));
      }
      if (cards.length) segments.push({ type: "delivery", data: cards });
    } else if (trimmed === INSIGHT_FULL_MARKER) {
      flushMd();
      i += 1;
      while (i < lines.length && !lines[i].trim()) i += 1;
      if (i < lines.length && INSIGHT_HEADING.test(lines[i].trim())) {
        const block = [lines[i]];
        i += 1;
        while (i < lines.length && !isBlockEnd(lines[i])) {
          block.push(lines[i]);
          i += 1;
        }
        segments.push({
          type: "insight",
          data: parseInsightBlock(block, { fullWidth: true }),
        });
      }
    } else if (liveSiteUrl) {
      flushMd();
      segments.push({ type: "live-site", url: liveSiteUrl });
      i += 1;
    } else if (videoSlot) {
      flushMd();
      segments.push({ type: "video-slot", ...videoSlot });
      i += 1;
    } else if (imageSlot) {
      flushMd();
      segments.push({ type: "image-slot", ...imageSlot });
      i += 1;
    } else if (VERSION_HEADING.test(trimmed)) {
      flushMd();
      const block = [lines[i]];
      i += 1;
      while (i < lines.length && !isBlockEnd(lines[i])) {
        block.push(lines[i]);
        i += 1;
      }
      segments.push({ type: "version", data: parseVersionSegment(block) });
    } else if (DECISION_HEADING.test(trimmed)) {
      flushMd();
      const block = [lines[i]];
      i += 1;
      while (i < lines.length && !isBlockEnd(lines[i])) {
        block.push(lines[i]);
        i += 1;
      }
      segments.push({ type: "decision", data: parseDecisionSegment(block) });
    } else if (INSIGHT_HEADING.test(trimmed)) {
      flushMd();
      const block = [lines[i]];
      i += 1;
      while (i < lines.length && !isBlockEnd(lines[i])) {
        block.push(lines[i]);
        i += 1;
      }
      segments.push({ type: "insight", data: parseInsightBlock(block) });
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

export function CaseStudyBody({
  content,
  locale = "es",
  liveSiteLabel,
}: CaseStudyBodyProps) {
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
    } else if (segment.type === "insight") {
      const cards: InsightCardData[] = [];
      while (index < segments.length && segments[index].type === "insight") {
        const insightSegment = segments[index] as Extract<
          Segment,
          { type: "insight" }
        >;
        cards.push(insightSegment.data);
        index += 1;
      }
      nodes.push(
        <InsightCardsGrid key={`insights-${cards[0].title}`} cards={cards} />,
      );
      continue;
    } else if (segment.type === "process") {
      nodes.push(
        <ProcessCardsGrid
          key={`process-${segment.data[0]?.title ?? index}`}
          cards={segment.data}
        />,
      );
    } else if (segment.type === "questions") {
      nodes.push(
        <QuestionCardsGrid
          key={`questions-${segment.data[0] ?? index}`}
          questions={segment.data}
        />,
      );
    } else if (segment.type === "delivery") {
      nodes.push(
        <DeliveryCardsGrid
          key={`delivery-${segment.data[0]?.title ?? index}`}
          cards={segment.data}
        />,
      );
    } else if (segment.type === "metrics") {
      nodes.push(<ProjectMetrics key={index} metrics={segment.data} />);
    } else if (segment.type === "token-explorer") {
      nodes.push(<DesignSystemTokenExplorer key={index} />);
    } else if (segment.type === "component-playground") {
      nodes.push(<DesignSystemComponentPlayground key={index} />);
    } else if (segment.type === "live-site") {
      nodes.push(
        <div key={index} className="my-8">
          <Button href={segment.url} variant="primary" external withUpArrow>
            {liveSiteLabel ?? "Visit site"}
          </Button>
        </div>,
      );
    } else if (segment.type === "section-columns") {
      nodes.push(
        <CaseStudySectionColumns
          key={index}
          left={segment.left}
          right={segment.right}
        />,
      );
    } else if (segment.type === "pdlc-architecture") {
      nodes.push(<PdlcArchitectureDiagram key={index} locale={locale} />);
    } else if (segment.type === "video-slot") {
      nodes.push(
        <CaseStudyVideoPlayer
          key={index}
          src={segment.src}
          poster={segment.poster}
          caption={segment.caption}
        />,
      );
    } else if (segment.type === "image-slot") {
      nodes.push(
        <CaseStudyImageSlot
          key={index}
          src={segment.src}
          caption={segment.caption}
        />,
      );
    } else {
      const precedesVersions = segments[index + 1]?.type === "version";
      nodes.push(
        <div
          key={index}
          className={
            precedesVersions
              ? "[&>p:last-of-type]:mb-10"
              : undefined
          }
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
            {segment.text}
          </ReactMarkdown>
        </div>,
      );
    }

    index += 1;
  }

  return <div className="mb-16 w-full">{nodes}</div>;
}
