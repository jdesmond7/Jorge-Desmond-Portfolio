"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MagnifyingGlass } from "./MagnifyingGlass";

const BACKDROP_DURATION_MS = 360;
const CONTENT_DELAY_MS = 280;
const CONTENT_DURATION_MS = 420;
const CONTENT_EXIT_MS = 180;
const BACKDROP_EXIT_MS = 340;

function isExternalUrl(src: ImageProps["src"]) {
  return (
    typeof src === "string" &&
    (src.startsWith("http://") || src.startsWith("https://"))
  );
}

function resolveSrc(src: ImageProps["src"]): string {
  if (typeof src === "string") return src;
  if (src && typeof src === "object" && "src" in src) return src.src;
  return "";
}

interface ZoomableImageProps extends ImageProps {
  containerClassName?: string;
  videoUrl?: string;
}

function isGifUrl(url: string): boolean {
  return /\.gif(?:[?#]|$)/i.test(url);
}

const mediaFillClass = "absolute inset-0 h-full w-full";

export function ZoomableImage({
  containerClassName = "",
  className = "",
  alt = "",
  videoUrl,
  ...imageProps
}: ZoomableImageProps) {
  const [isPresent, setIsPresent] = useState(false);
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const unmountTimerRef = useRef<number | null>(null);

  const altText = typeof alt === "string" ? alt : "Imagen";
  const modalSrc = resolveSrc(imageProps.src);
  const isVideo = Boolean(videoUrl);
  const isGif = !isVideo && isGifUrl(modalSrc);
  const mediaClassName = `${mediaFillClass} ${className}`.trim();

  const clearTimers = useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (unmountTimerRef.current !== null) {
      window.clearTimeout(unmountTimerRef.current);
      unmountTimerRef.current = null;
    }
  }, []);

  const openModal = useCallback(() => {
    clearTimers();
    setContentVisible(false);
    setBackdropVisible(false);
    setIsPresent(true);
  }, [clearTimers]);

  const closeModal = useCallback(() => {
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
    if (!isPresent) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setBackdropVisible(true);
      setContentVisible(true);
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setBackdropVisible(true);
    });

    const contentTimer = window.setTimeout(() => {
      setContentVisible(true);
    }, CONTENT_DELAY_MS);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(contentTimer);
    };
  }, [isPresent]);

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

  const wrapperClass = imageProps.fill
    ? `group relative block h-full w-full cursor-zoom-in overflow-hidden border-0 bg-transparent p-0 ${containerClassName}`
    : `group relative block w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-card)] border-0 bg-transparent p-0 ${containerClassName}`;

  return (
    <>
      <button
        type="button"
        className={wrapperClass}
        onClick={openModal}
        aria-label={`Ver ${altText} en tamaño completo`}
      >
        {isVideo ? (
          <video
            src={videoUrl}
            poster={modalSrc !== videoUrl ? modalSrc : undefined}
            autoPlay
            loop
            muted
            playsInline
            aria-label={altText}
            className={mediaClassName}
          />
        ) : isGif ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={modalSrc} alt={altText} className={mediaClassName} />
        ) : (
          <Image
            alt={alt}
            unoptimized={isExternalUrl(imageProps.src)}
            className={className}
            {...imageProps}
          />
        )}

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 border-2 border-transparent bg-primary/50 opacity-0 transition-[opacity,border-color] duration-300 ease-out group-hover:opacity-100 group-hover:border-primary group-focus-visible:opacity-100 group-focus-visible:border-primary"
        />

        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 flex scale-90 items-center justify-center opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
        >
          <MagnifyingGlass className="h-8 w-8 text-white drop-shadow-sm" />
        </span>
      </button>

      {isPresent &&
        (modalSrc || videoUrl) &&
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
              aria-label="Cerrar"
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

            {isVideo ? (
              <video
                src={videoUrl}
                poster={modalSrc !== videoUrl ? modalSrc : undefined}
                autoPlay
                loop
                muted
                playsInline
                aria-label={altText}
                className={`relative z-[101] max-h-[90vh] max-w-[min(1200px,95vw)] object-contain transition-[opacity,transform] ease-out ${
                  contentVisible
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-[0.985] opacity-0"
                }`}
                style={{ transitionDuration: `${CONTENT_DURATION_MS}ms` }}
                onClick={(event) => event.stopPropagation()}
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={modalSrc}
                alt={altText}
                className={`relative z-[101] max-h-[90vh] max-w-[min(1200px,95vw)] object-contain transition-[opacity,transform] ease-out ${
                  contentVisible
                    ? "scale-100 opacity-100"
                    : "pointer-events-none scale-[0.985] opacity-0"
                }`}
                style={{ transitionDuration: `${CONTENT_DURATION_MS}ms` }}
                onClick={(event) => event.stopPropagation()}
              />
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
