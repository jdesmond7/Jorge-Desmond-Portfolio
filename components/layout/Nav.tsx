"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n/I18nProvider";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { ArrowUpRight } from "@/components/ui/ArrowUpRight";
import { isExternalHref, sanitizeHref } from "@/lib/safe-url";
import type { NavLink } from "@/lib/types";

interface NavProps {
  siteName: string;
  navLinks: NavLink[];
  email: string;
  linkedin: string;
  resume?: string;
}

const MENU_TRANSITION_MS = 420;
const SCROLL_TOP_SHOW = 24;
const SCROLL_HIDE_MIN = 72;
const SCROLL_DELTA = 6;
const SCROLL_SHADOW_MIN = 40;

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
  return `rounded-[var(--radius-control)] px-3 py-1.5 text-[length:var(--text-sm)] font-normal tracking-[-0.005em] no-underline transition-colors hover:bg-white/10 hover:text-white ${
    isActive ? "bg-white/15 text-primary" : "text-white/60"
  }`;
}

function mobileNavLinkClass(isActive: boolean): string {
  return `rounded-[var(--radius-control)] px-3 py-1.5 text-2xl font-normal tracking-[-0.015em] no-underline transition-colors hover:bg-white/10 hover:text-white ${
    isActive ? "bg-white/15 text-primary" : "text-white/60"
  }`;
}

export function Nav({
  siteName,
  navLinks,
  email,
  linkedin,
  resume = "/resume",
}: NavProps) {
  const { dict } = useI18n();
  const pathname = usePathname();
  const [scrollY, setScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const lastScrollYRef = useRef(0);
  const menuOpenRef = useRef(false);

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY;
      setScrollY(current);

      if (menuOpenRef.current) {
        setNavVisible(true);
        lastScrollYRef.current = current;
        return;
      }

      const delta = current - lastScrollYRef.current;

      if (current < SCROLL_TOP_SHOW) {
        setNavVisible(true);
      } else if (delta > SCROLL_DELTA && current > SCROLL_HIDE_MIN) {
        setNavVisible(false);
      } else if (delta < -SCROLL_DELTA) {
        setNavVisible(true);
      }

      lastScrollYRef.current = current;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const openMenu = () => {
    setMenuOpen(true);
    setMenuMounted(true);
    setNavVisible(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMenuVisible(true));
    });
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setMenuVisible(false);
    window.setTimeout(() => setMenuMounted(false), MENU_TRANSITION_MS);
  };

  const formattedName = formatSiteName(siteName);
  const mobileMenuActive = menuMounted;
  const safeLinkedin = sanitizeHref(linkedin) ?? linkedin;
  const safeEmail = sanitizeHref(`mailto:${email}`) ?? `mailto:${email}`;

  return (
    <>
      <div
        className={`pointer-events-none fixed left-1/2 z-50 w-[min(94%,var(--container-nav))] -translate-x-1/2 transition-opacity duration-300 ${
          mobileMenuActive ? "max-md:invisible max-md:opacity-0" : ""
        }`}
        style={{ top: "max(var(--nav-offset), env(safe-area-inset-top))" }}
        aria-hidden={mobileMenuActive}
      >
        <nav
          className={`grid grid-cols-[1fr_auto] items-center rounded-[var(--radius-card)] bg-carbon px-6 py-4 md:grid-cols-[1fr_auto_1fr] ${
            navVisible && !mobileMenuActive
              ? "pointer-events-auto"
              : "pointer-events-none"
          }`}
          style={{
            transform: navVisible
              ? "translate3d(0, 0, 0)"
              : "translate3d(0, calc(-100% - 24px), 0)",
            transition:
              "transform 0.55s var(--ease-out-expo), box-shadow 0.35s ease",
            willChange: "transform",
            boxShadow:
              scrollY > SCROLL_SHADOW_MIN ? "var(--shadow-nav)" : "none",
          }}
        >
          <Link
            href="/"
            className={`justify-self-start text-[length:var(--text-base)] font-bold tracking-[-0.009em] no-underline transition-colors hover:text-white ${
              pathname === "/" ? "text-white" : "text-white/80"
            }`}
            onClick={closeMenu}
          >
            {formattedName}
          </Link>

          <div className="hidden items-center gap-1 justify-self-center md:flex">
            {navLinks.map((item) => {
              const href = sanitizeHref(item.href) ?? item.href;
              return (
                <Link
                  key={item.href}
                  href={href}
                  className={navLinkClass(isNavLinkActive(pathname, href))}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden items-center gap-4 justify-self-end md:flex">
            <Link
              href={resume}
              className={navLinkClass(isNavLinkActive(pathname, resume))}
            >
              {dict.nav.resume}
            </Link>
            <a
              href={safeLinkedin}
              target={isExternalHref(safeLinkedin) ? "_blank" : undefined}
              rel={
                isExternalHref(safeLinkedin) ? "noopener noreferrer" : undefined
              }
              className={`${navLinkClass(false)} inline-flex items-center gap-1`}
            >
              {dict.nav.linkedin}
              <ArrowUpRight />
            </a>
            <LocaleSwitcher />
          </div>

          <button
            type="button"
            className="col-start-2 flex h-11 w-11 flex-col items-center justify-center gap-1.5 justify-self-end md:hidden"
            aria-label={dict.nav.openMenu}
            aria-expanded={menuOpen}
            onClick={openMenu}
          >
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white" />
            <span className="block h-0.5 w-5 bg-white" />
          </button>
        </nav>
      </div>

      {menuMounted && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          aria-hidden={!menuOpen}
          role="dialog"
          aria-modal="true"
          aria-label={dict.nav.openMenu}
        >
          <button
            type="button"
            className="absolute inset-0 transition-opacity duration-300"
            style={{
              background: "var(--overlay-scrim)",
              opacity: menuVisible ? 1 : 0,
            }}
            aria-label={dict.nav.closeMenu}
            onClick={closeMenu}
          />
          <div
            className="absolute inset-y-0 right-0 flex w-[min(88vw,360px)] flex-col bg-carbon px-6 shadow-2xl transition-transform duration-[var(--duration-menu)] ease-[var(--ease-out-expo)]"
            style={{
              paddingTop: "max(1.25rem, env(safe-area-inset-top))",
              transform: menuVisible ? "translateX(0)" : "translateX(100%)",
            }}
          >
            <div className="mb-8 flex items-center justify-between gap-4 pt-2">
              <Link
                href="/"
                className="text-[length:var(--text-base)] font-bold tracking-[-0.009em] text-white no-underline"
                onClick={closeMenu}
              >
                {formattedName}
              </Link>
              <button
                type="button"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-control)] text-white transition-colors hover:bg-white/10"
                aria-label={dict.nav.closeMenu}
                onClick={closeMenu}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
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
            </div>

            <div className="flex flex-1 flex-col gap-6 overflow-y-auto pb-8">
              {navLinks.map((item) => {
                const href = sanitizeHref(item.href) ?? item.href;
                return (
                  <Link
                    key={item.href}
                    href={href}
                    className={mobileNavLinkClass(
                      isNavLinkActive(pathname, href),
                    )}
                    onClick={closeMenu}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Link
                href={resume}
                className={mobileNavLinkClass(isNavLinkActive(pathname, resume))}
                onClick={closeMenu}
              >
                {dict.nav.resume}
              </Link>
              <a
                href={safeLinkedin}
                target={isExternalHref(safeLinkedin) ? "_blank" : undefined}
                rel={
                  isExternalHref(safeLinkedin)
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`${mobileNavLinkClass(false)} inline-flex items-center gap-2`}
                onClick={closeMenu}
              >
                {dict.nav.linkedin}
                <ArrowUpRight className="h-5 w-5" />
              </a>
              <LocaleSwitcher fullWidth className="w-full" />
              <a
                href={safeEmail}
                className="pill-cta mt-2 inline-flex min-h-11 w-full items-center justify-center rounded-[var(--radius-pill)] bg-coral px-8 py-4 text-[length:var(--text-base)] font-semibold tracking-[-0.009em] text-white no-underline"
                onClick={closeMenu}
              >
                {dict.footer.emailCta}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
