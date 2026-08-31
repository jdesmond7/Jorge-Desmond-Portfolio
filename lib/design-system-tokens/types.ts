export type TokenCategory = "color" | "spacing" | "typography" | "roundness";

export type TokenLayer = "primitives" | "semantics" | "tokens";

export type TokenVersion = "v1" | "v2";

export interface DesignToken {
  name: string;
  type: "color" | "number" | "string";
  value: string;
  swatch?: string;
  alias?: string;
}

export interface TokenCategoryMeta {
  id: TokenCategory;
  label: string;
  count: number;
}

export interface TokenLayerMeta {
  id: TokenLayer;
  label: string;
  collectionTitle: string;
  categories: TokenCategoryMeta[];
  tokensByCategory: Partial<Record<TokenCategory, DesignToken[]>>;
}

export interface TokenVersionMeta {
  id: TokenVersion;
  label: string;
  fileLabel: string;
  layers: TokenLayerMeta[];
}
