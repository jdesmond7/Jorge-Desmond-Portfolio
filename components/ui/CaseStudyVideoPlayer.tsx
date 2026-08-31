"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/components/i18n/I18nProvider";

const BACKDROP_DURATION_MS = 360;
const CONTENT_DELAY_MS = 280;
const CONTENT_DURATION_MS = 420;
const CONTENT_EXIT_MS = 180;
const BACKDROP_EXIT_MS = 340;

interface CaseStudyVideoPlayerProps {
  src: string;
  poster: string;
  caption?: string;
}

function PlayIcon() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11.04-6.86a1 1 0 0 0 0-1.72L9.5 4.28A1 1 0 0 0 8 5.14Z" />
    </svg>
  );
}

export function CaseStudyVideoPlayer({
  src,
  poster,
  caption,
}: CaseStudyVideoPlayerProps) {
  const { dict } = useI18n();
  const [isPresent, setIsPresent] = useState(false);
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const unmountTimerRef = useRef<number | null>(null);
  const openFrameRef = useRef<number | null>(null);
  const openContentTimerRef = useRef<number | null>(null);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const altText = caption?.trim() || dict.zoom.image;

  const clearTimers = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (unmountTimerRef.current !== null) {
      window.clearTimeout(unmountTimerRef.current);
      unmountTimerRef.current = null;
    }
    if (openFrameRef.current !== null) {
      window.cancelAnimationFrame(openFrameRef.current);
      openFrameRef.current = null;
    }
    if (openContentTimerRef.current !== null) {
      window.clearTimeout(openContentTimerRef.current);
      openContentTimerRef.current = null;
    }
  }, []);

  const openModal = useCallback(() => {
    clearTimers();
    setContentVisible(false);
    setBackdropVisible(false);
    setIsPresent(true);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setBackdropVisible(true);
      setContentVisible(true);
      return;
    }

    openFrameRef.current = window.requestAnimationFrame(() => {
      setBackdropVisible(true);
      openFrameRef.current = null;
    });
    openContentTimerRef.current = window.setTimeout(() => {
      setContentVisible(true);
      openContentTimerRef.current = null;
    }, CONTENT_DELAY_MS);
  }, [clearTimers]);

  const closeModal = useCallback(() => {
    modalVideoRef.current?.pause();
    clearTimers();
    setContentVisible(false);

    closeTimerRef.current = window.setTimeout(() => {
      setBackdropVisible(false);

      unmountTimerRef.current = window.setTimeout(() => {
        setIsPresent(false);
      }, BACKDROP_EXIT_MS);
    }, CONTENT_EXIT_MS);
  }, [clearTimers]);

  useEffect(() => {
    if (!isPresent || !contentVisible) return;

    const timer = window.setTimeout(() => {
      void modalVideoRef.current?.play();
    }, CONTENT_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [isPresent, contentVisible]);

  useEffect(() => {
    if (!isPresent) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeModal();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isPresent, closeModal]);

  useEffect(() => clearTimers, [clearTimers]);

  return (
    <>
      <figure className="my-8 w-full">
        <button
          type="button"
          className="group relative block w-full cursor-pointer overflow-hidden rounded-[var(--radius-card)] border-0 bg-fog p-0"
          onClick={openModal}
          aria-label={dict.zoom.viewFull(altText)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt={altText}
            className="aspect-[16/9] w-full object-cover"
            loading="lazy"
            decoding="async"
          />

          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-carbon/20 transition-colors duration-300 group-hover:bg-carbon/30 group-focus-visible:bg-carbon/30"
          />

          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 text-carbon shadow-lg transition-transform duration-300 group-hover:scale-105 group-focus-visible:scale-105">
              <PlayIcon />
            </span>
          </span>
        </button>

        {caption ? (
          <figcaption className="mt-3 text-[13px] leading-snug tracking-[-0.005em] text-zinc">
            {caption}
          </figcaption>
        ) : null}
      </figure>

      {isPresent &&
        createPortal(
          <div
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 ${
              backdropVisible ? "" : "pointer-events-none"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label={altText}
            onClick={closeModal}
          >
            <div
              aria-hidden
              className={`absolute inset-0 bg-carbon/85 transition-[opacity,backdrop-filter] ease-out ${
                backdropVisible
                  ? "opacity-100 backdrop-blur-sm"
                  : "opacity-0 backdrop-blur-none"
              }`}
              style={{
                transitionDuration: backdropVisible
                  ? `${BACKDROP_DURATION_MS}ms`
                  : `${BACKDROP_EXIT_MS}ms`,
              }}
            />

            <button
              type="button"
              className={`absolute right-4 top-4 z-[101] rounded-full border-0 bg-white/10 p-2.5 text-white transition-[opacity,transform] ease-out hover:bg-white/20 ${
                contentVisible
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
              style={{ transitionDuration: `${CONTENT_DURATION_MS}ms` }}
              onClick={closeModal}
              aria-label={dict.zoom.close}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>

            <div
              className={`relative z-[101] flex max-h-[90vh] max-w-[min(1200px,95vw)] flex-col items-center transition-[opacity,transform] ease-out ${
                contentVisible
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-[0.985] opacity-0"
              }`}
              style={{ transitionDuration: `${CONTENT_DURATION_MS}ms` }}
              onClick={(event) => event.stopPropagation()}
            >
              <video
                ref={modalVideoRef}
                src={src}
                poster={poster}
                controls
                playsInline
                preload="auto"
                aria-label={altText}
                className="max-h-[calc(90vh-2.5rem)] w-auto max-w-full rounded-[var(--radius-card)] object-contain"
              />
              {caption ? (
                <figcaption className="mt-3 max-w-full px-2 text-center text-[13px] leading-snug tracking-[-0.005em] text-white/85">
                  {caption}
                </figcaption>
              ) : null}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
