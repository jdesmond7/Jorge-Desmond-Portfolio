"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { HomeContent } from "@/lib/types";

const HERO_POSTER = "/images/hero.png";
// Secuencia de frames extraída del video (scrub por scroll, sin seeks de video).
const FRAME_COUNT = 117;
const framePath = (i: number) =>
  `/video/frames/frame_${String(i).padStart(3, "0")}.jpg`;
// Porción del scroll dedicada al scrub. El resto (1 - SCRUB_PORTION) es una
// zona de "hold" donde el frame final y el texto quedan fijos para leerlos.
const SCRUB_PORTION = 0.62;

interface HeroProps {
  content: Pick<
    HomeContent,
    | "heroGreeting"
    | "heroName"
    | "heroTitle"
    | "heroSubtitle"
    | "heroImage"
    | "trustBadges"
  >;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function Hero({ content }: HeroProps) {
  const nameLines = content.heroName.split("\n");
  const titleLines = content.heroTitle.replace(/\\n/g, "\n").split("\n");

  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    let dimsSet = false;

    const drawFrame = (idx: number) => {
      const img = images[idx];
      if (!img || !img.complete || !img.naturalWidth) return;
      if (!dimsSet) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        dimsSet = true;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // Precarga de todos los frames.
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      if (i === 1) img.onload = () => drawFrame(0);
      images[i - 1] = img;
    }

    let raf = 0;
    let target = 0; // índice de frame objetivo (float)
    let current = 0; // índice suavizado
    let lastDrawn = -1;

    const onScroll = () => {
      const scrollable = section.offsetHeight - window.innerHeight;
      const top = section.getBoundingClientRect().top;
      const p = scrollable > 0 ? clamp(-top / scrollable, 0, 1) : 0;
      // El scrub se completa en la primera parte del scroll; el resto sostiene.
      const anim = clamp(p / SCRUB_PORTION, 0, 1);
      setProgress(anim);
      target = anim * (FRAME_COUNT - 1);
    };

    const tick = () => {
      current += (target - current) * 0.2;
      if (Math.abs(target - current) < 0.01) current = target;
      const idx = clamp(Math.round(current), 0, FRAME_COUNT - 1);
      if (idx !== lastDrawn) {
        drawFrame(idx);
        lastDrawn = idx;
      }
      raf = requestAnimationFrame(tick);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // El saludo + nombre arrancan visibles y se desvanecen al hacer scroll.
  const introOpacity = clamp(1 - progress / 0.4, 0, 1);
  // El título + descripción + bullets + CTAs entran cerca del frame final.
  const outroOpacity = clamp((progress - 0.5) / 0.4, 0, 1);
  const outroShift = (1 - outroOpacity) * 24;

  return (
    <section ref={sectionRef} className="relative h-[380vh] bg-black">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Poster de respaldo mientras cargan los frames */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={HERO_POSTER}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
          fetchPriority="high"
        />
        <canvas
          ref={canvasRef}
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        {/* Capa para mejorar la legibilidad del texto sobre el video */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/55"
        />

        <div className="relative z-[2] mx-auto flex h-[100svh] w-full max-w-[var(--container-max)] flex-col justify-start px-6 pb-10 pt-[96px] md:justify-center md:px-10 md:pb-20 md:pt-[140px] lg:px-16">
          <div className="grid w-full grid-cols-1 items-start gap-8 max-md:relative max-md:min-h-[34svh] md:gap-12 lg:grid-cols-2 lg:items-center lg:gap-28 xl:gap-36">
            {/* Izquierda — saludo + nombre (frame inicial) */}
            <div
              className="max-md:absolute max-md:inset-x-0 max-md:top-10 lg:pr-6"
              style={{
                opacity: introOpacity,
                visibility: introOpacity <= 0.01 ? "hidden" : "visible",
              }}
            >
              <p className="font-body mb-2 text-[15px] font-normal text-white md:mb-3 md:text-[17px]">
                {content.heroGreeting}
              </p>
              <h1 className="font-display text-[clamp(72px,17vw,128px)] uppercase leading-[0.88] tracking-[0.02em] text-white md:leading-[0.9]">
                {nameLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </h1>
            </div>

            {/* Derecha — título + descripción + CTAs (aparece tras el scroll) */}
            <div
              className="max-w-[540px] max-md:absolute max-md:inset-x-0 max-md:top-[4px] md:max-w-none lg:pl-10 lg:pt-8"
              style={{
                opacity: outroOpacity,
                transform: `translateY(${outroShift}px)`,
                visibility: outroOpacity <= 0.01 ? "hidden" : "visible",
              }}
            >
              <p className="font-body mb-2.5 text-[clamp(20px,2.8vw,32px)] font-bold leading-[1.2] text-white md:mb-5">
                {titleLines.map((line, i) => (
                  <span key={i} className="block">
                    {line}
                  </span>
                ))}
              </p>
              <p className="font-body mb-4 text-[15px] font-semibold leading-[1.55] text-white/90 md:mb-7 md:text-[clamp(15px,1.7vw,17px)]">
                {content.heroSubtitle}
              </p>
              <ul className="mb-0 grid grid-cols-2 gap-x-4 gap-y-2 md:mb-8 md:flex md:flex-wrap md:gap-x-5 md:gap-y-3">
                {content.trustBadges.map((badge) => (
                  <li
                    key={badge}
                    className="flex items-center gap-1.5 font-semibold text-[13px] tracking-[-0.005em] text-white/55 md:text-[14px]"
                  >
                    <span className="inline-flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded bg-coral text-[9px] font-bold text-white">
                      ✓
                    </span>
                    {badge}
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-3 max-md:mt-[320px] sm:flex-row sm:flex-wrap">
                <Button href="/proyectos" variant="primary" withArrow>
                  Ver Casos de Estudio
                </Button>
                <Button href="/resume" variant="outline-light" withArrow>
                  Ver Resume
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Indicador de scroll, se oculta al avanzar */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-6 left-1/2 z-[2] -translate-x-1/2 text-[12px] font-semibold uppercase tracking-[0.2em] text-white/70"
          style={{ opacity: introOpacity }}
        >
          Scroll
        </div>
      </div>
    </section>
  );
}
