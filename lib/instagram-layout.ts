export const ILLUSTRATION_INSTAGRAM_URL = "https://www.instagram.com/sr.dsmd/";
export const ILLUSTRATION_INSTAGRAM_HANDLE = "sr.dsmd";

export interface InstagramMedia {
  id: string;
  imageUrl: string;
  /** MP4 de Instagram para reels, loops y GIFs animados. */
  videoUrl?: string;
  permalink: string;
  alt: string;
  width: number;
  height: number;
}

/** Patrones cuadrado o retrato — sin celdas más anchas que altas. */
const BENTO_PATTERNS = [
  "col-span-1 row-span-4 sm:row-span-4 md:col-span-1 md:row-span-5 lg:col-span-2 lg:row-span-5",
  "col-span-1 row-span-3 md:col-span-1 md:row-span-4 lg:col-span-2 lg:row-span-4",
  "col-span-2 row-span-6 md:col-span-2 md:row-span-5 lg:col-span-2 lg:row-span-6",
  "col-span-1 row-span-4 md:col-span-2 md:row-span-4 lg:col-span-2 lg:row-span-5",
  "col-span-2 row-span-5 md:col-span-2 md:row-span-6 lg:col-span-3 lg:row-span-6",
  "col-span-1 row-span-3 md:col-span-1 md:row-span-3 lg:col-span-2 lg:row-span-4",
  "col-span-2 row-span-6 md:col-span-2 md:row-span-6 lg:col-span-3 lg:row-span-7",
  "col-span-1 row-span-4 md:col-span-1 md:row-span-5 lg:col-span-2 lg:row-span-5",
  "col-span-1 row-span-3 md:col-span-2 md:row-span-4 lg:col-span-2 lg:row-span-4",
  "col-span-2 row-span-5 md:col-span-2 md:row-span-5 lg:col-span-3 lg:row-span-6",
] as const;

export function getBentoSpan(index: number): { className: string } {
  return {
    className: BENTO_PATTERNS[index % BENTO_PATTERNS.length]!,
  };
}
