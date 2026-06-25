"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type RefObject,
} from "react";
import {
  BRAND_LOGOS,
  LOGO_SIZE_CLASSES,
  type BrandLogo,
} from "@/lib/brand-logos";

const MIN_COPIES = 2;
const MAX_COPIES = 8;

interface MarqueeProps {
  logos?: BrandLogo[];
}

function LogoRow({
  logos,
  copies,
  ariaHidden = false,
  rowRef,
}: {
  logos: BrandLogo[];
  copies: number;
  ariaHidden?: boolean;
  rowRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div
      ref={rowRef}
      className="flex shrink-0 flex-nowrap items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {Array.from({ length: copies }, (_, copyIndex) =>
        logos.map((logo, logoIndex) => (
          <div
            key={`${copyIndex}-${logo.src}-${logoIndex}`}
            className="flex shrink-0 items-center px-10 md:px-12"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logo.src}
              alt={ariaHidden ? "" : logo.name}
              className={`${LOGO_SIZE_CLASSES[logo.size ?? "md"]} ${logo.className ?? ""}`}
              draggable={false}
              loading="eager"
              decoding="async"
            />
          </div>
        )),
      )}
    </div>
  );
}

export function Marquee({ logos = BRAND_LOGOS }: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [copies, setCopies] = useState(MIN_COPIES);
  const [shiftPx, setShiftPx] = useState<number | null>(null);

  const syncCopies = useCallback(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const singleSetWidth = measure.offsetWidth;
    if (singleSetWidth <= 0) return;

    const containerWidth = container.offsetWidth;
    const neededCopies = Math.min(
      MAX_COPIES,
      Math.max(MIN_COPIES, Math.ceil(containerWidth / singleSetWidth) + 1),
    );

    setCopies((prev) => (prev !== neededCopies ? neededCopies : prev));
  }, []);

  const syncShift = useCallback(() => {
    const row = rowRef.current;
    if (!row) return;

    const width = row.offsetWidth;
    if (width <= 0) return;

    setShiftPx((prev) => (prev !== width ? width : prev));
  }, []);

  useEffect(() => {
    const measure = measureRef.current;
    if (!measure) return;

    let frame = 0;
    const scheduleSync = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        syncCopies();
        syncShift();
      });
    };

    const imgs = measure.querySelectorAll("img");
    let pending = 0;

    const onImageReady = () => {
      pending -= 1;
      if (pending <= 0) scheduleSync();
    };

    imgs.forEach((img) => {
      if (img.complete) return;
      pending += 1;
      img.addEventListener("load", onImageReady, { once: true });
      img.addEventListener("error", onImageReady, { once: true });
    });

    scheduleSync();

    const observer = new ResizeObserver(scheduleSync);
    observer.observe(measure);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [logos, syncCopies, syncShift]);

  useLayoutEffect(() => {
    syncShift();
  }, [copies, logos, syncShift]);

  const trackStyle: CSSProperties | undefined = shiftPx
    ? ({ "--marquee-shift": `${shiftPx}px` } as CSSProperties)
    : undefined;

  return (
    <div ref={containerRef} className="relative overflow-hidden bg-carbon py-9">
      <div
        ref={measureRef}
        className="pointer-events-none absolute flex opacity-0"
        aria-hidden
      >
        <LogoRow logos={logos} copies={1} ariaHidden />
      </div>

      <div
        className={`marquee-track${shiftPx ? "" : " marquee-track--paused"}`}
        style={trackStyle}
      >
        <LogoRow logos={logos} copies={copies} rowRef={rowRef} />
        <LogoRow logos={logos} copies={copies} ariaHidden />
      </div>
    </div>
  );
}
