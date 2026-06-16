"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const node = ref.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) return;

    setVisible(false);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (visible) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        transition: `opacity var(--duration-reveal) var(--ease-out-expo) ${delay}s, transform var(--duration-reveal) var(--ease-out-expo) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
