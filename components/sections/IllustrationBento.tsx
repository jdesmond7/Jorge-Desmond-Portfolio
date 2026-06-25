"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { getBentoSpan, type InstagramMedia } from "@/lib/instagram";

interface IllustrationBentoProps {
  items: InstagramMedia[];
}

interface GapFillerRect {
  id: string;
  top: number;
  left: number;
  width: number;
  height: number;
}

function computeGapFillerRects(grid: HTMLElement): GapFillerRect[] {
  const tiles = Array.from(
    grid.querySelectorAll<HTMLElement>("[data-bento-tile]"),
  );
  if (!tiles.length) return [];

  const style = getComputedStyle(grid);
  const columnCount = style.gridTemplateColumns.split(" ").filter(Boolean).length;
  if (!columnCount) return [];

  const gridRect = grid.getBoundingClientRect();
  const columnGap = Number.parseFloat(style.columnGap) || 0;
  const rowGap = Number.parseFloat(style.rowGap) || 0;
  const rowHeight = Number.parseFloat(style.gridAutoRows) || 76;
  const columnWidth =
    (gridRect.width - columnGap * (columnCount - 1)) / columnCount;
  const stepX = columnWidth + columnGap;
  const stepY = rowHeight + rowGap;

  const tileRects = tiles.map((tile) => tile.getBoundingClientRect());

  let maxRow = 0;
  tileRects.forEach((rect) => {
    const rows = Math.ceil((rect.bottom - gridRect.top + rowGap / 2) / stepY);
    maxRow = Math.max(maxRow, rows);
  });

  const occupied = new Set<string>();

  for (let row = 1; row <= maxRow; row += 1) {
    for (let col = 1; col <= columnCount; col += 1) {
      const centerX = gridRect.left + (col - 1) * stepX + columnWidth / 2;
      const centerY = gridRect.top + (row - 1) * stepY + rowHeight / 2;

      const isOccupied = tileRects.some(
        (rect) =>
          centerX >= rect.left &&
          centerX <= rect.right &&
          centerY >= rect.top &&
          centerY <= rect.bottom,
      );

      if (isOccupied) occupied.add(`${col},${row}`);
    }
  }

  const visited = new Set<string>();
  const fillers: GapFillerRect[] = [];

  for (let row = 1; row <= maxRow; row += 1) {
    for (let col = 1; col <= columnCount; col += 1) {
      const key = `${col},${row}`;
      if (occupied.has(key) || visited.has(key)) continue;

      let colSpan = 1;
      while (col + colSpan <= columnCount) {
        const nextKey = `${col + colSpan},${row}`;
        if (occupied.has(nextKey) || visited.has(nextKey)) break;
        colSpan += 1;
      }

      let rowSpan = 1;
      let canGrow = true;

      while (canGrow && row + rowSpan <= maxRow) {
        for (let dc = 0; dc < colSpan; dc += 1) {
          const cellKey = `${col + dc},${row + rowSpan}`;
          if (occupied.has(cellKey) || visited.has(cellKey)) {
            canGrow = false;
            break;
          }
        }
        if (canGrow) rowSpan += 1;
      }

      for (let dr = 0; dr < rowSpan; dr += 1) {
        for (let dc = 0; dc < colSpan; dc += 1) {
          visited.add(`${col + dc},${row + dr}`);
        }
      }

      fillers.push({
        id: `filler-${col}-${row}`,
        left: (col - 1) * stepX,
        top: (row - 1) * stepY,
        width: colSpan * columnWidth + (colSpan - 1) * columnGap,
        height: rowSpan * rowHeight + (rowSpan - 1) * rowGap,
      });
    }
  }

  return fillers;
}

function BentoPlaceholder({
  className = "",
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={`rounded-[var(--radius-card)] bg-primary ${className}`}
      style={style}
    />
  );
}

export function IllustrationBento({ items }: IllustrationBentoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [fillers, setFillers] = useState<GapFillerRect[]>([]);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    let frame = 0;

    const updateFillers = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        frame = requestAnimationFrame(() => {
          setFillers(computeGapFillerRects(grid));
        });
      });
    };

    updateFillers();

    const observer = new ResizeObserver(updateFillers);
    observer.observe(grid);

    const media = grid.querySelectorAll("img, video");
    media.forEach((node) => {
      node.addEventListener("load", updateFillers);
      node.addEventListener("loadeddata", updateFillers);
    });

    window.addEventListener("resize", updateFillers);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", updateFillers);
      media.forEach((node) => {
        node.removeEventListener("load", updateFillers);
        node.removeEventListener("loadeddata", updateFillers);
      });
    };
  }, [items]);

  return (
    <div ref={containerRef} className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0"
      >
        {fillers.map((filler) => (
          <BentoPlaceholder
            key={filler.id}
            className="absolute"
            style={{
              left: filler.left,
              top: filler.top,
              width: filler.width,
              height: filler.height,
            }}
          />
        ))}
      </div>

      <div
        ref={gridRef}
        className="relative z-10 grid auto-rows-[76px] grid-flow-dense grid-cols-2 gap-2 sm:auto-rows-[88px] sm:gap-2.5 md:grid-cols-4 md:auto-rows-[96px] md:gap-3 lg:grid-cols-6 lg:auto-rows-[104px] lg:gap-3"
      >
        {items.map((item, index) => {
          const { className } = getBentoSpan(item.width, item.height, index);

          return (
            <Reveal
              key={item.id}
              delay={index * 0.04}
              data-bento-tile
              className={`group/tile relative min-h-0 overflow-hidden rounded-[var(--radius-card)] ${className}`}
            >
              <ZoomableImage
                src={item.imageUrl}
                alt={item.alt}
                videoUrl={item.videoUrl}
                fill
                className="object-cover object-center transition-transform duration-500 ease-out group-hover/tile:scale-[1.04]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                containerClassName="h-full w-full"
              />
              <a
                href={item.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-2 top-2 z-10 rounded-full bg-carbon/60 p-2 text-white opacity-0 backdrop-blur-sm transition-opacity duration-300 hover:bg-carbon/80 group-hover/tile:opacity-100 focus-visible:opacity-100"
                aria-label={`Abrir en Instagram: ${item.alt}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
