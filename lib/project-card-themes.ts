export type ProjectCardTone = "light" | "dark";

export interface ProjectCardTheme {
  gradient: string;
  tone: ProjectCardTone;
}

const DEFAULT_THEME: ProjectCardTheme = {
  gradient: "linear-gradient(135deg, #f4f4f5 0%, #e4e4e7 100%)",
  tone: "light",
};

const GROWK_DS_THEME: ProjectCardTheme = {
  gradient:
    "linear-gradient(97deg, #FFE3A5 21.02%, #FFB100 85.35%, #FC3A2F 129.58%)",
  tone: "light",
};

const GROWK_SUPPLIERS_THEME: ProjectCardTheme = {
  gradient: "linear-gradient(99deg, #485765 35.18%, #041321 131.25%)",
  tone: "dark",
};

const THEMES: Record<string, ProjectCardTheme> = {
  growrk: GROWK_DS_THEME,
  "ai-playground": GROWK_DS_THEME,
  "design-system-motor-de-escala": GROWK_DS_THEME,
  "design-system-engine-of-scale": GROWK_DS_THEME,
  "suppliers-platform": GROWK_SUPPLIERS_THEME,
  "spin-by-oxxo": {
    gradient:
      "radial-gradient(153.66% 90.64% at 50% 54.31%, #5B23CC 4.33%, #241543 72.45%)",
    tone: "dark",
  },
  "parque-de-las-calabazas": {
    gradient: "linear-gradient(180deg, #F06920 0%, #652D00 96.88%)",
    tone: "dark",
  },
  "grupo-salinas": {
    gradient: "linear-gradient(90deg, #FFC900 0%, #F49609 100%)",
    tone: "light",
  },
};

export function getProjectCardTheme(slug: string): ProjectCardTheme {
  return THEMES[slug] ?? DEFAULT_THEME;
}
