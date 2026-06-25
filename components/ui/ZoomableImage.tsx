"use client";

import Image, { type ImageProps } from "next/image";
import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MagnifyingGlass } from "./MagnifyingGlass";

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
}

export function ZoomableImage({
  containerClassName = "",
  className = "",
  alt = "",
  ...imageProps
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);

  const altText = typeof alt === "string" ? alt : "Imagen";
  const modalSrc = resolveSrc(imageProps.src);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, close]);

  const wrapperClass = imageProps.fill
    ? `group relative block h-full w-full cursor-zoom-in overflow-hidden border-0 bg-transparent p-0 ${containerClassName}`
    : `group relative block w-full cursor-zoom-in overflow-hidden rounded-[var(--radius-card)] border-0 bg-transparent p-0 ${containerClassName}`;

  return (
    <>
      <button
        type="button"
        className={wrapperClass}
        onClick={() => setOpen(true)}
        aria-label={`Ver ${altText} en tamaño completo`}
      >
        <Image
          alt={alt}
          unoptimized={isExternalUrl(imageProps.src)}
          className={className}
          {...imageProps}
        />

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

      {open &&
        modalSrc &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-carbon/85 p-4 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={altText}
            onClick={close}
          >
            <button
              type="button"
              className="absolute right-4 top-4 rounded-full border-0 bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
              onClick={close}
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

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={modalSrc}
              alt={altText}
              className="max-h-[90vh] max-w-[min(1200px,95vw)] object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
