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

interface InstagramApiMedia {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  width?: number;
  height?: number;
  children?: { data: InstagramApiMedia[] };
}

interface InstagramApiResponse {
  data?: InstagramApiMedia[];
}

const MEDIA_FIELDS =
  "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,width,height,children{media_url,media_type,thumbnail_url,width,height}";

const MOCK_INSTAGRAM_MEDIA: InstagramMedia[] = [
  {
    id: "mock-1",
    imageUrl: "/images/about-me.png",
    permalink: ILLUSTRATION_INSTAGRAM_URL,
    alt: "Ilustración editorial",
    width: 900,
    height: 1200,
  },
  {
    id: "mock-2",
    imageUrl: "/images/hero.png",
    permalink: ILLUSTRATION_INSTAGRAM_URL,
    alt: "Exploración visual",
    width: 1600,
    height: 900,
  },
  {
    id: "mock-3",
    imageUrl: "/images/banner-growrk-projects.png",
    permalink: ILLUSTRATION_INSTAGRAM_URL,
    alt: "Poster conceptual",
    width: 1080,
    height: 1080,
  },
  {
    id: "mock-4",
    imageUrl: "/images/about-me.png",
    permalink: ILLUSTRATION_INSTAGRAM_URL,
    alt: "Retrato ilustrado",
    width: 1080,
    height: 1350,
  },
  {
    id: "mock-5",
    imageUrl: "/images/hero.png",
    permalink: ILLUSTRATION_INSTAGRAM_URL,
    alt: "Composición en tinta",
    width: 1200,
    height: 1500,
  },
  {
    id: "mock-6",
    imageUrl: "/images/banner-growrk-projects.png",
    permalink: ILLUSTRATION_INSTAGRAM_URL,
    alt: "Serie personal",
    width: 1400,
    height: 1000,
  },
  {
    id: "mock-7",
    imageUrl: "/images/hero-mobile.png",
    permalink: ILLUSTRATION_INSTAGRAM_URL,
    alt: "Detalle editorial",
    width: 1080,
    height: 1080,
  },
  {
    id: "mock-8",
    imageUrl: "/images/hero-mobile.png",
    permalink: ILLUSTRATION_INSTAGRAM_URL,
    alt: "Exploración en color",
    width: 900,
    height: 1300,
  },
];

function isInstagramConfigured(): boolean {
  return Boolean(
    process.env.INSTAGRAM_USER_ID && process.env.INSTAGRAM_ACCESS_TOKEN,
  );
}

function resolveChildMedia(child: InstagramApiMedia): InstagramMedia | null {
  if (child.media_type === "IMAGE" && child.media_url) {
    return {
      id: child.id,
      imageUrl: child.media_url,
      permalink: "",
      alt: "",
      width: child.width ?? 1080,
      height: child.height ?? 1080,
    };
  }

  if (child.media_type === "VIDEO" && child.media_url) {
    return {
      id: child.id,
      imageUrl: child.thumbnail_url ?? child.media_url,
      videoUrl: child.media_url,
      permalink: "",
      alt: "",
      width: child.width ?? 1080,
      height: child.height ?? 1350,
    };
  }

  return null;
}

function resolveMediaItem(item: InstagramApiMedia): InstagramMedia | null {
  const alt = item.caption?.trim() || "Ilustración de @sr.dsmd";

  if (item.media_type === "IMAGE" && item.media_url) {
    return {
      id: item.id,
      imageUrl: item.media_url,
      permalink: item.permalink,
      alt,
      width: item.width ?? 1080,
      height: item.height ?? 1080,
    };
  }

  if (item.media_type === "VIDEO" && item.media_url) {
    return {
      id: item.id,
      imageUrl: item.thumbnail_url ?? item.media_url,
      videoUrl: item.media_url,
      permalink: item.permalink,
      alt,
      width: item.width ?? 1080,
      height: item.height ?? 1350,
    };
  }

  if (item.media_type === "CAROUSEL_ALBUM") {
    const firstVisual = item.children?.data?.find(
      (child) =>
        (child.media_type === "IMAGE" || child.media_type === "VIDEO") &&
        child.media_url,
    );

    if (!firstVisual) return null;

    const resolved = resolveChildMedia(firstVisual);
    if (!resolved) return null;

    return {
      ...resolved,
      id: item.id,
      permalink: item.permalink,
      alt,
      width: resolved.width ?? item.width ?? 1080,
      height: resolved.height ?? item.height ?? 1080,
    };
  }

  return null;
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

export function getBentoSpan(
  _width: number,
  _height: number,
  index: number,
): { className: string } {
  return {
    className: BENTO_PATTERNS[index % BENTO_PATTERNS.length]!,
  };
}

export async function getInstagramIllustrations(): Promise<InstagramMedia[]> {
  if (!isInstagramConfigured()) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "[instagram] INSTAGRAM_USER_ID o INSTAGRAM_ACCESS_TOKEN no configurados en .env.local (raíz del proyecto, no strapi/.env). Usando imágenes mock.",
      );
    }
    return MOCK_INSTAGRAM_MEDIA;
  }

  const userId = process.env.INSTAGRAM_USER_ID!;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN!;

  try {
    const res = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=${MEDIA_FIELDS}&limit=24&access_token=${token}`,
      { next: { revalidate: 3600 } },
    );

    const json = (await res.json()) as InstagramApiResponse & {
      error?: { message: string; code: number };
    };

    if (!res.ok) {
      if (process.env.NODE_ENV === "development") {
        console.error(
          "[instagram] Error de API:",
          json.error?.message ?? res.status,
        );
      }
      return MOCK_INSTAGRAM_MEDIA;
    }

    if (!json.data?.length) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[instagram] La API respondió sin publicaciones.");
      }
      return MOCK_INSTAGRAM_MEDIA;
    }

    const items = json.data
      .map(resolveMediaItem)
      .filter((item): item is InstagramMedia => item !== null);

    if (!items.length) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[instagram] Hay publicaciones pero ninguna es imagen compatible.",
        );
      }
      return MOCK_INSTAGRAM_MEDIA;
    }

    return items;
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("[instagram] Falló la petición:", error);
    }
    return MOCK_INSTAGRAM_MEDIA;
  }
}
