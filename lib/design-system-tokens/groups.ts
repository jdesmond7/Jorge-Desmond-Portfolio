import type { DesignToken } from "./types";

/** First segment after the collection root - e.g. Colors/Amber/100 → Amber, color/blue/500 → blue. */
export function getTokenGroup(name: string): string {
  const parts = name.split("/").filter(Boolean);

  if (parts[0] === "color" && parts.length >= 2) {
    return parts[1];
  }

  if (name.startsWith("rounded-")) {
    return "All";
  }

  if (parts[0] === "radius") {
    return "All";
  }

  if (parts[0] === "spacing") {
    return "All";
  }

  if (parts.length >= 3) return parts[1];
  if (parts.length === 2) return parts[0];
  // Flat tokens (Tokens collection): only All.
  return "All";
}

export interface TokenGroupMeta {
  id: string;
  label: string;
  count: number;
}

const PRIMITIVE_COLOR_ORDER = [
  "gray",
  "red",
  "orange",
  "amber",
  "green",
  "blue",
  "indigo",
];

const SEMANTIC_COLOR_ORDER = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
  "neutral",
  "alpha",
];

export function buildTokenGroups(tokens: DesignToken[]): TokenGroupMeta[] {
  const counts = new Map<string, number>();

  for (const token of tokens) {
    const group = getTokenGroup(token.name);
    if (group === "All") continue;
    counts.set(group, (counts.get(group) ?? 0) + 1);
  }

  // Flat collections (spacing, roundness, Tokens) only need All.
  if (counts.size === 0) {
    return [{ id: "all", label: "All", count: tokens.length }];
  }

  const groups = Array.from(counts.entries())
    .sort(([a], [b]) => {
      const aPrimitive = PRIMITIVE_COLOR_ORDER.indexOf(a.toLowerCase());
      const bPrimitive = PRIMITIVE_COLOR_ORDER.indexOf(b.toLowerCase());
      if (aPrimitive !== -1 || bPrimitive !== -1) {
        if (aPrimitive === -1) return 1;
        if (bPrimitive === -1) return -1;
        return aPrimitive - bPrimitive;
      }

      const aSemantic = SEMANTIC_COLOR_ORDER.indexOf(a.toLowerCase());
      const bSemantic = SEMANTIC_COLOR_ORDER.indexOf(b.toLowerCase());
      if (aSemantic !== -1 || bSemantic !== -1) {
        if (aSemantic === -1) return 1;
        if (bSemantic === -1) return -1;
        return aSemantic - bSemantic;
      }

      return a.localeCompare(b);
    })
    .map(([label, count]) => ({
      id: label,
      label: formatGroupLabel(label),
      count,
    }));

  return [{ id: "all", label: "All", count: tokens.length }, ...groups];
}

function formatGroupLabel(label: string): string {
  if (label === "General") return label;
  if (/^[A-Z]/.test(label)) return label;
  return label.charAt(0).toUpperCase() + label.slice(1);
}

export function filterTokensByGroup(
  tokens: DesignToken[],
  groupId: string,
): DesignToken[] {
  if (groupId === "all") return tokens;
  return tokens.filter((token) => getTokenGroup(token.name) === groupId);
}

export function displayTokenName(name: string, groupId: string): string {
  const parts = name.split("/").filter(Boolean);

  if (groupId !== "all" && parts.length >= 3) {
    return parts[parts.length - 1];
  }

  if (groupId === "all" && parts.length >= 3) {
    return parts.slice(-2).join("/");
  }

  if (parts.length === 2) {
    return parts[1];
  }

  return parts[parts.length - 1] ?? name;
}
