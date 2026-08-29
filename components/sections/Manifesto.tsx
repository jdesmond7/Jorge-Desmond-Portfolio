"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SITE_EMAIL } from "@/lib/site";

const CORAL = { r: 252, g: 95, b: 43 };
const CARBON = { r: 24, g: 24, b: 27 };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function mixColor(
  from: { r: number; g: number; b: number },
  to: { r: number; g: number; b: number },
  t: number,
) {
  const p = clamp(t, 0, 1);
  const r = Math.round(from.r + (to.r - from.r) * p);
  const g = Math.round(from.g + (to.g - from.g) * p);
  const b = Math.round(from.b + (to.b - from.b) * p);
  return `rgb(${r} ${g} ${b})`;
}

function wordVisual(local: number) {
  // local < 0: still ahead — invisible
  // 0..1: fades in to primary
  // 1..2.2: holds primary then settles to text-default
  // > 2.2: carbon
  if (local <= 0) {
    return {
      opacity: 0,
      color: mixColor(CARBON, CARBON, 1),
    };
  }
  if (local < 1) {
    return {
      opacity: local,
      color: mixColor(CORAL, CORAL, 1),
    };
  }
  if (local < 2.2) {
    const settle = (local - 1) / 1.2;
    return {
      opacity: 1,
      color: mixColor(CORAL, CARBON, settle),
    };
  }
  return {
    opacity: 1,
    color: mixColor(CARBON, CARBON, 1),
  };
}

export function Manifesto() {
  const { dict } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const paragraphs = useMemo(
    () => [
      {
        key: "lead",
        words: dict.manifesto.lead.trim().split(/\s+/).filter(Boolean),
        className:
          "font-bold uppercase tracking-[-0.015em]",
      },
      {
        key: "body",
        words: dict.manifesto.body.trim().split(/\s+/).filter(Boolean),
        className:
          "mt-4 text-[clamp(24px,3.6vw,26px)] font-normal leading-[1.45] tracking-[-0.01em] md:mt-5",
      },
    ],
    [dict.manifesto.lead, dict.manifesto.body],
  );

  const words = useMemo(
    () => paragraphs.flatMap((paragraph) => paragraph.words),
    [paragraphs],
  );

  const manifestoLabel = `${dict.manifesto.lead} ${dict.manifesto.body}`;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(mq.matches);
    syncMotion();
    mq.addEventListener("change", syncMotion);

    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      if (mq.matches) {
        setProgress(1);
        return;
      }

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = scrollable > 0 ? clamp(scrolled / scrollable, 0, 1) : 1;
      setProgress(p);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      mq.removeEventListener("change", syncMotion);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const total = words.length;
  // Extra tail so the last words settle to carbon before the section ends
  const wave = progress * (total + 3.5);
  const ctaOpacity = reducedMotion
    ? 1
    : clamp((progress - 0.72) / 0.2, 0, 1);

  return (
    <section
      id="manifiesto"
      ref={sectionRef}
      className="relative bg-cream"
      style={{ height: reducedMotion ? "auto" : "220vh" }}
    >
      <div
        className={
          reducedMotion
            ? "py-24 md:py-32"
            : "sticky top-0 flex min-h-[100svh] items-center py-24 md:py-32"
        }
      >
        <Container narrow>
          <div
            className="font-body text-left text-[clamp(38px,6.5vw,52px)] leading-[1.28] tracking-[-0.02em]"
            aria-label={manifestoLabel}
          >
            {(() => {
              let wordIndex = 0;

              return paragraphs.map((paragraph) => (
                <p key={paragraph.key} className={paragraph.className}>
                  {paragraph.words.map((word) => {
                    const index = wordIndex;
                    wordIndex += 1;
                    const visual = reducedMotion
                      ? { opacity: 1, color: "var(--color-carbon)" }
                      : wordVisual(wave - index);

                    return (
                      <span
                        key={`${paragraph.key}-${word}-${index}`}
                        className="inline"
                        style={{
                          color: visual.color,
                          opacity: visual.opacity,
                          transition: reducedMotion
                            ? undefined
                            : "color 40ms linear, opacity 40ms linear",
                        }}
                      >
                        {word}
                        {index < total - 1 ? " " : ""}
                      </span>
                    );
                  })}
                </p>
              ));
            })()}
          </div>

          <div
            className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap sm:gap-4"
            style={{
              opacity: ctaOpacity,
              transform: `translateY(${(1 - ctaOpacity) * 12}px)`,
              pointerEvents: ctaOpacity < 0.4 ? "none" : "auto",
              transition: reducedMotion
                ? undefined
                : "opacity 120ms linear, transform 120ms linear",
            }}
          >
            <Button href={`mailto:${SITE_EMAIL}`} variant="primary" withArrow>
              {dict.footer.emailCta}
            </Button>
            <Button href="/proyectos" variant="outline" withArrow>
              {dict.manifesto.projectsCta}
            </Button>
          </div>
        </Container>
      </div>
    </section>
  );
}
