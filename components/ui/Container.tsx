import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
}

export function Container({
  children,
  className = "",
  as: Tag = "div",
  id,
}: ContainerProps) {
  return (
    <Tag
      id={id}
      className={`mx-auto w-full max-w-[var(--container-max)] px-6 ${className}`}
    >
      {children}
    </Tag>
  );
}
