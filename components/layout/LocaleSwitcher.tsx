"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/i18n/I18nProvider";
import type { Locale } from "@/lib/i18n/types";

interface LocaleSwitcherProps {
  variant?: "dark" | "light";
  className?: string;
  fullWidth?: boolean;
}

export function LocaleSwitcher({
  variant = "dark",
  className = "",
  fullWidth = false,
}: LocaleSwitcherProps) {
  const { locale, dict } = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const setLocale = (next: Locale) => {
    if (next === locale || pending) return;
    setOpen(false);
    startTransition(async () => {
      await fetch("/api/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: next }),
      });
      router.refresh();
    });
  };

  const selectedLabel = locale === "es" ? dict.nav.spanish : dict.nav.english;

  const ghostClass =
    variant === "light"
      ? "text-white/70 hover:bg-white/10 hover:text-white"
      : "text-white/60 hover:bg-white/10 hover:text-white";

  const menuClass =
    variant === "light"
      ? "border-white/15 bg-ink text-white"
      : "border-mist/20 bg-carbon text-white";

  const options: { value: Locale; label: string }[] = [
    { value: "es", label: dict.nav.spanish },
    { value: "en", label: dict.nav.english },
  ];

  return (
    <div ref={rootRef} className={`relative ${fullWidth ? "w-full" : ""} ${className}`}>
      <button
        type="button"
        className={`inline-flex min-h-11 items-center gap-1.5 rounded-[10px] px-3 py-1.5 text-[13px] font-normal tracking-[-0.005em] transition-colors ${ghostClass} ${
          fullWidth ? "w-full justify-between" : ""
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={dict.nav.language}
        onClick={() => setOpen((value) => !value)}
        disabled={pending}
      >
        <span>
          {dict.nav.language}: {selectedLabel}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={dict.nav.language}
          className={`absolute z-50 mt-2 overflow-hidden rounded-[14px] border p-1 shadow-lg ${menuClass} ${
            fullWidth ? "left-0 right-0" : "right-0 min-w-[148px]"
          }`}
        >
          {options.map((option) => (
            <li key={option.value} role="option" aria-selected={locale === option.value}>
              <button
                type="button"
                className={`flex w-full items-center justify-between rounded-[10px] px-3 py-2 text-left text-[13px] transition-colors ${
                  locale === option.value
                    ? "bg-white/10 text-primary"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => setLocale(option.value)}
              >
                <span>{option.label}</span>
                <span className="mono text-[10px] uppercase opacity-70">
                  {option.value}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
