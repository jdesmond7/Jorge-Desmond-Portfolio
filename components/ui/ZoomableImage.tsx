"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useI18n } from "@/components/i18n/I18nProvider";
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
  /** Visible caption below the image and in fullscreen. Falls back to `alt` when omitted. */
  caption?: string;
  /** When false, hides the inline caption but keeps it in fullscreen. Default: true. */
  showCaption?: boolean;
  /** Cropped inline preview; fullscreen still shows the full image. */
  compactPreview?: boolean;
}

function isGifUrl(url: string): boolean {
  return /\.gif(?:[?#]|$)/i.test(url);
}

const mediaFillClass = "absolute inset-0 h-full w-full";
const captionClassName =
  "mt-3 text-[13px] leading-snug tracking-[-0.005em] text-zinc";
const modalCaptionClassName =
  "mt-3 max-w-full px-2 text-center text-[13px] leading-snug tracking-[-0.005em] text-white/85";

export function ZoomableImage({
  containerClassName = "",
  className = "",
  alt = "",
  caption,
  showCaption = true,
  videoUrl,
  compactPreview = false,
  ...imageProps
}: ZoomableImageProps) {
  const { dict } = useI18n();
  const [isPresent, setIsPresent] = useState(false);
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const closeTimerRef = useRef<number | null>(null);
  const unmountTimerRef = useRef<number | null>(null);
  const openFrameRef = useRef<number | null>(null);
  const openContentTimerRef = useRef<number | null>(null);

  const altText = typeof alt === "string" && alt ? alt : dict.zoom.image;
  const captionText =
    caption !== undefined
      ? caption.trim()
      : typeof alt === "string"
        ? alt.trim()
        : "";
  const modalSrc = resolveSrc(imageProps.src);
  const isVideo = Boolean(videoUrl);
  const isGif = !isVideo && isGifUrl(modalSrc);
  const useCompactPreview = compactPreview && !isVideo && !isGif;
  const mediaClassName = `${mediaFillClass} ${className}`.trim();
  const previewClassName = useCompactPreview
    ? `object-cover object-top ${className}`.trim()
    : className;

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

  const wrapperClass = useCompactPreview
    ? `group relative block h-[240px] w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-card)] border-0 bg-transparent p-0 ${containerClassName}`
    : imageProps.fill
      ? `group relative block min-h-0 flex-1 cursor-zoom-in overflow-hidden border-0 bg-transparent p-0 ${containerClassName}`
      : `group relative block w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-card)] border-0 bg-transparent p-0 ${containerClassName}`;
  const figureClassName = imageProps.fill
    ? "flex h-full w-full min-h-0 flex-col"
    : "block w-full";

  return (
    <>
      <figure className={figureClassName}>
      <button
        type="button"
        className={wrapperClass}
        onClick={openModal}
        aria-label={dict.zoom.viewFull(altText)}
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
        ) : useCompactPreview ? (
          <Image
            alt={alt}
            src={imageProps.src}
            fill
            sizes={
              typeof imageProps.sizes === "string"
                ? imageProps.sizes
                : "(max-width: 1072px) 100vw, 1072px"
            }
            unoptimized={isExternalUrl(imageProps.src)}
            className={previewClassName}
          />
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

      {showCaption && captionText ? (
        <figcaption className={captionClassName}>{captionText}</figcaption>
      ) : null}
      </figure>

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
              {isVideo ? (
                <video
                  src={videoUrl}
                  poster={modalSrc !== videoUrl ? modalSrc : undefined}
                  autoPlay
                  loop
                  muted
                  playsInline
                  aria-label={altText}
                  className="max-h-[calc(90vh-2.5rem)] w-auto max-w-full object-contain"
                />
              ) : (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={modalSrc}
                  alt={altText}
                  className="max-h-[calc(90vh-2.5rem)] w-auto max-w-full object-contain"
                />
              )}
              {captionText ? (
                <figcaption className={modalCaptionClassName}>
                  {captionText}
                </figcaption>
              ) : null}
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
