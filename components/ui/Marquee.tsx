"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  BRAND_LOGOS,
  LOGO_SIZE_CLASSES,
  type BrandLogo,
} from "@/lib/brand-logos";

interface MarqueeProps {
  logos?: BrandLogo[];
}

function LogoRow({
  logos,
  ariaHidden = false,
}: {
  logos: BrandLogo[];
  ariaHidden?: boolean;
}) {
  return (
    <div className="flex shrink-0 items-center" aria-hidden={ariaHidden || undefined}>
      {logos.map((logo, i) => (
        <div
          key={`${logo.src}-${i}`}
          className="flex shrink-0 items-center px-10 md:px-12"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo.src}
            alt={ariaHidden ? "" : logo.name}
            className={`${LOGO_SIZE_CLASSES[logo.size ?? "md"]} ${logo.className ?? ""}`}
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
}

export function Marquee({ logos = BRAND_LOGOS }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [repeats, setRepeats] = useState(4);

  useEffect(() => {
    const updateRepeats = () => {
      const container = containerRef.current;
      const measure = measureRef.current;
      if (!container || !measure) return;

      const containerWidth = container.offsetWidth;
      const singleSetWidth = measure.offsetWidth;
      if (singleSetWidth <= 0) return;

      const needed = Math.max(
        3,
        Math.ceil((containerWidth * 2) / singleSetWidth) + 1,
      );
      setRepeats((prev) => (prev !== needed ? needed : prev));
    };

    updateRepeats();

    const observer = new ResizeObserver(updateRepeats);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [logos]);

  const expandedLogos = useMemo(
    () => Array.from({ length: repeats }, () => logos).flat(),
    [logos, repeats],
  );

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-carbon py-9">
      <div
        ref={measureRef}
        className="pointer-events-none absolute flex opacity-0"
        aria-hidden
      >
        <LogoRow logos={logos} ariaHidden />
      </div>

      <div className="marquee-track">
        <LogoRow logos={expandedLogos} />
        <LogoRow logos={expandedLogos} ariaHidden />
      </div>
    </div>
  );
}
