import v1Primitives from "@/data/design-system-tokens/v1/primitives.json";
import v1Semantics from "@/data/design-system-tokens/v1/semantics.json";
import v2SemanticScales from "@/data/design-system-tokens/v2/primitives-color.json";
import v2PrimitivesPalette from "@/data/design-system-tokens/v2/primitives-palette.json";
import v2PrimitivesRounded from "@/data/design-system-tokens/v2/primitives-rounded.json";
import v2PrimitivesSpacing from "@/data/design-system-tokens/v2/primitives-spacing.json";
import v2PrimitivesTypography from "@/data/design-system-tokens/v2/primitives-typography.json";
import v2Tokens from "@/data/design-system-tokens/v2/semantics.json";
import { filterTokens, flattenFigmaTokens } from "./parse-figma-tokens";
import type {
  DesignToken,
  TokenCategory,
  TokenCategoryMeta,
  TokenLayer,
  TokenLayerMeta,
  TokenVersion,
  TokenVersionMeta,
} from "./types";

const CATEGORY_LABELS: Record<TokenCategory, string> = {
  color: "Color",
  spacing: "Spacing",
  typography: "Typography",
  roundness: "Roundness",
};

/** Primitive color families shown in V2 (image 1). */
const V2_PRIMITIVE_COLOR_GROUPS = new Set([
  "gray",
  "red",
  "orange",
  "amber",
  "green",
  "blue",
  "indigo",
]);

function byPrefix(prefix: string) {
  return (token: DesignToken) =>
    token.name.startsWith(`${prefix}/`) || token.name === prefix;
}

function buildCategories(
  tokensByCategory: Partial<Record<TokenCategory, DesignToken[]>>,
): TokenCategoryMeta[] {
  return (Object.keys(CATEGORY_LABELS) as TokenCategory[])
    .filter((id) => (tokensByCategory[id]?.length ?? 0) > 0)
    .map((id) => ({
      id,
      label: CATEGORY_LABELS[id],
      count: tokensByCategory[id]?.length ?? 0,
    }));
}

function buildLayer(
  id: TokenLayer,
  label: string,
  collectionTitle: string,
  tokensByCategory: Partial<Record<TokenCategory, DesignToken[]>>,
): TokenLayerMeta {
  return {
    id,
    label,
    collectionTitle,
    categories: buildCategories(tokensByCategory),
    tokensByCategory,
  };
}

const v1PrimitiveTokens = flattenFigmaTokens(v1Primitives as Record<string, unknown>);
const v1SemanticTokens = flattenFigmaTokens(v1Semantics as Record<string, unknown>);

const v2PaletteAll = flattenFigmaTokens(v2PrimitivesPalette as Record<string, unknown>);

const v2PrimitiveColorTokens = filterTokens(v2PaletteAll, byPrefix("color")).filter(
  (token) => {
    const family = token.name.split("/")[1]?.toLowerCase();
    return family ? V2_PRIMITIVE_COLOR_GROUPS.has(family) : false;
  },
);

const v2PrimitiveRadiusTokens = filterTokens(v2PaletteAll, byPrefix("radius")).map(
  (token) => ({
    ...token,
    name: token.name.startsWith("radius/") ? token.name : `radius/${token.name}`,
  }),
);

const v2RoundedTokens = flattenFigmaTokens(
  v2PrimitivesRounded as Record<string, unknown>,
);

const v2PrimitiveRoundnessTokens =
  v2PrimitiveRadiusTokens.length > 0 ? v2PrimitiveRadiusTokens : v2RoundedTokens;

const v2PrimitiveSpacingTokens = flattenFigmaTokens(
  v2PrimitivesSpacing as Record<string, unknown>,
).map((token) => ({
  ...token,
  name: `spacing/${token.name}`,
}));

const v2PrimitiveTypographyTokens = flattenFigmaTokens(
  v2PrimitivesTypography as Record<string, unknown>,
);

/** Semantic color scales: primary/50…950, secondary/…, etc. (images 2-3). */
const v2SemanticColorTokens = flattenFigmaTokens(
  v2SemanticScales as Record<string, unknown>,
);

/** Applied Tokens collection: primary → primary/500, text-default → … (image 4). */
const v2TokenCollection = flattenFigmaTokens(v2Tokens as Record<string, unknown>);

export const TOKEN_VERSIONS: TokenVersionMeta[] = [
  {
    id: "v1",
    label: "V1",
    fileLabel: "GroWrk DS · V.1",
    layers: [
      buildLayer("primitives", "Primitivos", "Primitives Tokens", {
        color: filterTokens(v1PrimitiveTokens, byPrefix("Colors")),
        spacing: filterTokens(v1PrimitiveTokens, byPrefix("Spacing")),
        typography: filterTokens(v1PrimitiveTokens, byPrefix("Typography")),
      }),
      buildLayer("semantics", "Semánticos", "Light Mode Tokens", {
        color: filterTokens(v1SemanticTokens, (token) =>
          /^(BackgroundColor|TextColor|BorderColor)\//.test(token.name),
        ),
        spacing: filterTokens(v1SemanticTokens, (token) =>
          /^(BorderRadius|BorderWidth)\//.test(token.name),
        ),
      }),
    ],
  },
  {
    id: "v2",
    label: "V2",
    fileLabel: "GroWrk DS · V.2 (NUXT)",
    layers: [
      buildLayer("primitives", "Primitivos", "_Primitive", {
        color: v2PrimitiveColorTokens,
        typography: v2PrimitiveTypographyTokens,
        spacing: v2PrimitiveSpacingTokens,
        roundness: v2PrimitiveRoundnessTokens,
      }),
      buildLayer("semantics", "Semánticos", "Semantic", {
        color: v2SemanticColorTokens,
      }),
      {
        ...buildLayer("tokens", "Tokens", "Tokens", {
          color: v2TokenCollection,
        }),
        categories: [
          {
            id: "color",
            label: "Tokens",
            count: v2TokenCollection.length,
          },
        ],
      },
    ],
  },
];

export function getTokenVersion(id: TokenVersion) {
  return TOKEN_VERSIONS.find((version) => version.id === id) ?? TOKEN_VERSIONS[0];
}

export function getTokenLayer(
  version: TokenVersionMeta,
  layerId: TokenLayer,
): TokenLayerMeta {
  return version.layers.find((layer) => layer.id === layerId) ?? version.layers[0];
}

export function getVisibleCategories(layer: TokenLayerMeta): TokenCategoryMeta[] {
  return layer.categories;
}
