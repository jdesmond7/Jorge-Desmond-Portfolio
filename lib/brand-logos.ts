export type LogoSize = "md" | "lg";

export interface BrandLogo {
  name: string;
  src: string;
  size?: LogoSize;
  /** Extra Tailwind classes for logos that need wider bounds (e.g. Presta Prenda). */
  className?: string;
}

export const BRAND_LOGOS: BrandLogo[] = [
  { name: "GroWrk", src: "/svgs/Growrk.svg" },
  { name: "Spin by OXXO", src: "/svgs/Spin.svg", size: "lg" },
  { name: "OXXO", src: "/svgs/Oxxo.svg" },
  { name: "FEMSA", src: "/svgs/Blue.svg" },
  { name: "Grupo Salinas", src: "/svgs/GrupoSalinas.svg", size: "lg" },
  { name: "Banco Azteca", src: "/svgs/BancoAzteca.svg", size: "lg" },
  { name: "Elektra", src: "/svgs/Elektra.svg" },
  { name: "ITALIKA", src: "/svgs/Italika.svg" },
  {
    name: "Presta Prenda",
    src: "/svgs/PrestaPrenda.svg?v=2",
    size: "lg",
    className: "max-w-none",
  },
  { name: "Wacom", src: "/svgs/Wacom.svg" },
  { name: "Tec de Monterrey", src: "/svgs/Itesm.svg" },
];

export const LOGO_SIZE_CLASSES: Record<LogoSize, string> = {
  md: "h-7 w-auto max-w-[140px] object-contain opacity-90 md:h-8",
  lg: "h-10 w-auto max-w-[180px] object-contain opacity-90 md:h-11",
};
