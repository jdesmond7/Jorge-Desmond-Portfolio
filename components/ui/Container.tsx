import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  id?: string;
  /** Limita el ancho al contenido de lectura (1072px) en vez del máximo del layout. */
  narrow?: boolean;
}

export function Container({
  children,
  className = "",
  as: Tag = "div",
  id,
  narrow = false,
}: ContainerProps) {
  const maxWidth = narrow
    ? "max-w-[var(--container-narrow)]"
    : "max-w-[var(--container-max)]";

  return (
    <Tag id={id} className={`mx-auto w-full ${maxWidth} px-6 ${className}`}>
      {children}
    </Tag>
  );
}
