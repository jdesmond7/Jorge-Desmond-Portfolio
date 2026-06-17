"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import type { NavLink } from "@/lib/types";

interface NavProps {
  siteName: string;
  navLinks: NavLink[];
  email: string;
  linkedin: string;
  resume?: string;
}

function formatSiteName(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length < 2) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  }
  return parts
    .map((word, i) =>
      i === 0 || i === parts.length - 1
        ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        : word.toLowerCase(),
    )
    .join(" ");
}

function normalizePath(path: string): string {
  const base = path.split("#")[0].split("?")[0];
  if (base === "/") return base;
  return base.replace(/\/$/, "");
}

function isNavLinkActive(pathname: string, href: string): boolean {
  if (href.startsWith("http") || href.startsWith("mailto:")) return false;

  const current = normalizePath(pathname);
  const target = normalizePath(href);

  if (target === "/") return current === "/";
  return current === target || current.startsWith(`${target}/`);
}

function navLinkClass(isActive: boolean): string {
  return `rounded-[10px] px-3 py-1.5 text-[13px] font-normal tracking-[-0.005em] no-underline transition-colors hover:bg-white/10 hover:text-primary ${
    isActive ? "bg-white/10 text-primary" : "text-white/60"
  }`;
}

function mobileNavLinkClass(isActive: boolean): string {
  return `rounded-[10px] px-3 py-1.5 text-2xl font-normal tracking-[-0.015em] no-underline transition-colors hover:bg-white/10 hover:text-primary ${
    isActive ? "bg-white/10 text-primary" : "text-white/60"
  }`;
}

export function Nav({
  siteName,
  navLinks,
  email,
  linkedin,
  resume = "/resume",
}: NavProps) {
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav
        className="fixed left-1/2 z-50 grid w-[min(94%,1120px)] -translate-x-1/2 grid-cols-[1fr_auto] items-center rounded-[var(--radius-card)] bg-carbon px-6 py-4 transition-shadow duration-300 md:grid-cols-[1fr_auto_1fr]"
        style={{
          top: "max(20px, env(safe-area-inset-top))",
          boxShadow:
            scrollY > 40 ? "rgba(0,0,0,0.18) 0px 8px 24px 0px" : "none",
        }}
      >
        <Link
          href="/"
          className={`justify-self-start text-[15px] font-bold tracking-[-0.009em] no-underline transition-colors hover:text-primary ${
            pathname === "/" ? "text-primary" : "text-white"
          }`}
          onClick={() => setMenuOpen(false)}
        >
          {formatSiteName(siteName)}
        </Link>

        <div className="hidden items-center gap-1 justify-self-center md:flex">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={navLinkClass(isNavLinkActive(pathname, item.href))}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-6 justify-self-end md:flex">
          <a
            href={resume}
            className={navLinkClass(isNavLinkActive(pathname, resume))}
          >
            Resume
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${navLinkClass(false)} inline-flex items-center gap-1`}
          >
            LinkedIn
            <ArrowUpRight />
          </a>
        </div>

        <button
          type="button"
          className="col-start-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 justify-self-end md:hidden"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`block h-0.5 w-5 bg-white transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-opacity ${menuOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-white transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col bg-carbon px-6 pt-28 md:hidden"
          style={{ paddingTop: "max(7rem, calc(env(safe-area-inset-top) + 6rem))" }}
        >
          <div className="flex flex-col gap-6">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={mobileNavLinkClass(
                  isNavLinkActive(pathname, item.href),
                )}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={resume}
              className={mobileNavLinkClass(isNavLinkActive(pathname, resume))}
              onClick={() => setMenuOpen(false)}
            >
              Resume
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${mobileNavLinkClass(false)} inline-flex items-center gap-2`}
              onClick={() => setMenuOpen(false)}
            >
              LinkedIn
              <ArrowUpRight className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${email}`}
              className="pill-cta mt-4 inline-flex min-h-11 items-center justify-center rounded-[var(--radius-pill)] bg-coral px-8 py-4 text-[15px] font-semibold tracking-[-0.009em] text-white no-underline"
              onClick={() => setMenuOpen(false)}
            >
              Hablemos →
            </a>
          </div>
        </div>
      )}
    </>
  );
}
