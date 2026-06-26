import Link from "next/link";
import { type ReactNode } from "react";
import { ArrowRight } from "./ArrowRight";
import { ArrowUpRight } from "./ArrowUpRight";

type ButtonVariant = "primary" | "ghost" | "outline" | "outline-light";

interface ButtonProps {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
  withArrow?: boolean;
  withUpArrow?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-coral text-white font-semibold hover:bg-coral-hover transition-colors duration-200 font-body",
  ghost:
    "text-white font-normal border-b border-transparent hover:border-white/60 transition-colors font-body",
  outline:
    "text-carbon border border-mist font-semibold hover:bg-fog transition-colors font-body",
  "outline-light":
    "border border-white/90 bg-transparent text-white font-semibold hover:bg-white/10 transition-colors font-body",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external,
  withArrow = false,
  withUpArrow = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-[var(--radius-pill)] text-[15px] no-underline min-h-11 px-8 py-3.5";
  const classes = `${base} ${withArrow || withUpArrow ? "group" : ""} ${variants[variant]} ${className}`;

  const content = (
    <>
      {children}
      {withArrow ? <ArrowRight className="arrow-slide shrink-0" /> : null}
      {withUpArrow ? (
        <ArrowUpRight className="shrink-0 opacity-90 transition-opacity group-hover:opacity-100" />
      ) : null}
    </>
  );

  if (external || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={classes}
        {...(external || href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
