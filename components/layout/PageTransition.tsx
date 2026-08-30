"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

const FADE_MS = 240;

function isInternalPath(href: string): boolean {
  if (!href.startsWith("/")) return false;
  if (href.startsWith("//")) return false;
  return true;
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [opacity, setOpacity] = useState(1);
  const fadingRef = useRef(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fadingRef.current = false;
    const frame = requestAnimationFrame(() => setOpacity(1));
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const link = (event.target as HTMLElement | null)?.closest("a");
      if (!link) return;
      if (link.target && link.target !== "_self") return;
      if (link.hasAttribute("download")) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("mailto:")) return;
      if (!isInternalPath(href)) return;

      const next = new URL(href, window.location.href);
      if (next.origin !== window.location.origin) return;
      if (
        next.pathname === pathname &&
        next.search === window.location.search
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      if (fadingRef.current) return;

      fadingRef.current = true;
      setOpacity(0);
      window.setTimeout(() => {
        router.push(`${next.pathname}${next.search}${next.hash}`);
      }, FADE_MS);
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [pathname, router]);

  return (
    <div
      className="page-transition flex min-h-0 flex-1 flex-col"
      style={{
        opacity,
        transition: `opacity ${FADE_MS}ms var(--ease-out-expo)`,
      }}
    >
      {children}
    </div>
  );
}
