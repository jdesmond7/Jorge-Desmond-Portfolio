import Link from "next/link";
import { type ReactNode } from "react";

interface BackLinkProps {
  href: string;
  children: ReactNode;
}

export function BackLink({ href, children }: BackLinkProps) {
  return (
    <Link
      href={href}
      className="mono mb-8 inline-block text-[13px] tracking-[-0.006em] text-zinc no-underline hover:text-coral"
    >
      {children}
    </Link>
  );
}
