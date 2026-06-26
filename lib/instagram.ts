import "server-only";

import {
  ILLUSTRATION_INSTAGRAM_URL,
  type InstagramMedia,
} from "./instagram-layout";

export {
  ILLUSTRATION_INSTAGRAM_HANDLE,
  ILLUSTRATION_INSTAGRAM_URL,
  type InstagramMedia,
} from "./instagram-layout";

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

/** Instagram media URLs expire; refresh often. */
const INSTAGRAM_REVALIDATE_SECONDS = 300;

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

function logInstagramIssue(message: string, detail?: string) {
  if (process.env.NODE_ENV === "development") {
    console.warn(`[instagram] ${message}`, detail ?? "");
    return;
  }
  console.error(`[instagram] ${message}`, detail ?? "");
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

async function fetchInstagramMedia(
  userId: string,
  token: string,
): Promise<InstagramMedia[] | null> {
  const url = new URL(`https://graph.instagram.com/${userId}/media`);
  url.searchParams.set("fields", MEDIA_FIELDS);
  url.searchParams.set("limit", "24");
  // graph.instagram.com expects access_token as query param (Bearer is unreliable here).
  url.searchParams.set("access_token", token);

  const res = await fetch(url.toString(), {
    next: { revalidate: INSTAGRAM_REVALIDATE_SECONDS },
  });

  const json = (await res.json()) as InstagramApiResponse & {
    error?: { message: string; code: number };
  };

  if (!res.ok) {
    logInstagramIssue(
      "Error de API",
      json.error?.message ?? String(res.status),
    );
    return null;
  }

  if (!json.data?.length) {
    logInstagramIssue("La API respondió sin publicaciones.");
    return null;
  }

  const items = json.data
    .map(resolveMediaItem)
    .filter((item): item is InstagramMedia => item !== null);

  if (!items.length) {
    logInstagramIssue("Hay publicaciones pero ninguna es imagen compatible.");
    return null;
  }

  return items;
}

export async function getInstagramIllustrations(): Promise<InstagramMedia[]> {
  if (!isInstagramConfigured()) {
    logInstagramIssue(
      "INSTAGRAM_USER_ID o INSTAGRAM_ACCESS_TOKEN no configurados. Usando imágenes mock.",
    );
    return MOCK_INSTAGRAM_MEDIA;
  }

  const userId = process.env.INSTAGRAM_USER_ID!;
  const token = process.env.INSTAGRAM_ACCESS_TOKEN!;

  try {
    const items = await fetchInstagramMedia(userId, token);
    return items ?? MOCK_INSTAGRAM_MEDIA;
  } catch (error) {
    logInstagramIssue("Falló la petición", String(error));
    return MOCK_INSTAGRAM_MEDIA;
  }
}