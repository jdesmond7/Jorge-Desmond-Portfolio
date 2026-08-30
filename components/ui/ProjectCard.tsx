"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MediaImage } from "./MediaImage";
import { getProjectCardTheme } from "@/lib/project-card-themes";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Full-bleed showcase (home/list). Nested keeps the card inside its parent. */
  fullBleed?: boolean;
  readLabel: string;
  readAria: string;
}

export function ProjectCard({
  project,
  index,
  fullBleed = true,
  readLabel,
  readAria,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const caseNumber =
    project.cardNumber ?? String(index + 1).padStart(2, "0");
  const theme = getProjectCardTheme(project.slug);
  const imageSrc = project.cardImage ?? project.coverImage;
  const isDark = theme.tone === "dark";

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReducedMotion(mq.matches);
    syncMotion();
    mq.addEventListener("change", syncMotion);

    const node = cardRef.current;
    if (!node) {
      return () => mq.removeEventListener("change", syncMotion);
    }

    if (mq.matches) {
      setVisible(true);
      return () => mq.removeEventListener("change", syncMotion);
    }

    let lastScrollY = window.scrollY;
    let scrollingDown = true;

    const onScroll = () => {
      const y = window.scrollY;
      if (y !== lastScrollY) {
        scrollingDown = y > lastScrollY;
        lastScrollY = y;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        } else if (!scrollingDown) {
          setVisible(false);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    observer.observe(node);
    return () => {
      mq.removeEventListener("change", syncMotion);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  const textPrimary = isDark ? "text-white" : "text-carbon";
  const textSecondary = isDark ? "text-white/75" : "text-carbon/75";
  const numberColor = isDark ? "text-white" : "text-carbon";

  return (
    <Link
      ref={cardRef}
      href={`/proyectos/${project.slug}`}
      aria-label={readAria}
      className={`project-card group relative block cursor-pointer overflow-hidden no-underline transition-[opacity,transform] duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,transform] ${
        fullBleed ? "w-screen max-w-[100vw]" : "w-full rounded-[var(--radius-card)]"
      } ${
        reducedMotion || visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0"
      }`}
      style={{ background: theme.gradient }}
    >
      <div
        className={`mx-auto grid w-full grid-cols-1 items-center gap-10 px-6 py-14 md:grid-cols-2 md:gap-12 md:px-10 md:py-20 lg:gap-16 ${
          fullBleed ? "max-w-[var(--container-narrow)]" : ""
        }`}
      >
        <div className="min-w-0">
          <p
            className={`mono mb-5 text-[clamp(18px,2.4vw,28px)] font-medium tracking-[0.04em] ${numberColor}`}
          >
            [{caseNumber}]
          </p>

          <h3
            className={`font-body mb-4 text-[32px] font-bold leading-[1.12] tracking-[-0.02em] ${textPrimary}`}
          >
            {project.title}
          </h3>

          {project.problem ? (
            <p
              className={`mb-8 max-w-[420px] text-[length:var(--text-body)] leading-[length:var(--leading-body)] tracking-[-0.005em] md:mb-10 ${textSecondary}`}
            >
              {project.problem}
            </p>
          ) : null}

          <span
            className={`inline-flex items-center gap-1.5 text-[14px] font-semibold tracking-[-0.005em] transition-opacity group-hover:opacity-70 ${textPrimary}`}
          >
            {readLabel}
            <span aria-hidden className="arrow-slide">
              →
            </span>
          </span>
        </div>

        <div
          className={`flex items-center justify-center md:min-h-[360px] ${
            project.slug === "spin-by-oxxo"
              ? "min-h-[240px]"
              : "min-h-[280px] max-md:overflow-visible"
          }`}
        >
          {imageSrc ? (
            <MediaImage
              src={imageSrc}
              alt=""
              width={720}
              height={560}
              className={`h-auto w-full object-contain drop-shadow-[0_24px_48px_rgba(0,0,0,0.18)] ${
                project.slug === "spin-by-oxxo"
                  ? "max-w-[340px] md:max-w-[380px]"
                  : "max-w-[560px] max-md:w-[115%] max-md:max-w-none max-md:origin-center"
              }`}
              sizes="(max-width: 768px) 100vw, 45vw"
              priority={index === 0}
            />
          ) : (
            <div
              className={`font-body text-[13px] font-semibold tracking-[-0.005em] ${textSecondary}`}
            >
              {project.company}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
