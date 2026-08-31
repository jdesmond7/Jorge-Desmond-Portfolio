import type { DesignToken } from "./types";

type FigmaTokenNode = {
  $type?: string;
  $value?: unknown;
  $extensions?: {
    "com.figma.aliasData"?: {
      targetVariableName?: string;
    };
  };
};

function getAlias(node: FigmaTokenNode): string | undefined {
  return node.$extensions?.["com.figma.aliasData"]?.targetVariableName;
}

function formatValue(type: string, value: unknown): { display: string; swatch?: string } {
  if (type === "color" && value && typeof value === "object" && "hex" in value) {
    const hex = String((value as { hex?: string }).hex ?? "");
    return { display: hex, swatch: hex };
  }

  if (type === "number") {
    return { display: `${value}px` };
  }

  return { display: String(value ?? "") };
}

export function flattenFigmaTokens(
  source: Record<string, unknown>,
  prefix = "",
): DesignToken[] {
  const tokens: DesignToken[] = [];

  for (const [key, raw] of Object.entries(source)) {
    if (key.startsWith("$")) continue;

    const path = prefix ? `${prefix}/${key}` : key;
    const node = raw as FigmaTokenNode | Record<string, unknown>;

    if (node && typeof node === "object" && "$type" in node && node.$type) {
      const type = node.$type as DesignToken["type"];
      const { display, swatch } = formatValue(type, node.$value);

      tokens.push({
        name: path,
        type,
        value: display,
        swatch,
        alias: getAlias(node as FigmaTokenNode),
      });
      continue;
    }

    if (node && typeof node === "object") {
      tokens.push(...flattenFigmaTokens(node as Record<string, unknown>, path));
    }
  }

  return tokens;
}

export function filterTokens(
  tokens: DesignToken[],
  predicate: (token: DesignToken) => boolean,
): DesignToken[] {
  return tokens.filter(predicate);
}
