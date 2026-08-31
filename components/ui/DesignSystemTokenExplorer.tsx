"use client";

import { useMemo, useState } from "react";
import {
  getTokenLayer,
  getTokenVersion,
  getVisibleCategories,
} from "@/lib/design-system-tokens/datasets";
import {
  buildTokenGroups,
  displayTokenName,
  filterTokensByGroup,
} from "@/lib/design-system-tokens/groups";
import type {
  TokenCategory,
  TokenLayer,
  TokenVersion,
} from "@/lib/design-system-tokens/types";

function PaletteIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 1.5C4.1 1.5 1.75 3.85 1.75 6.75C1.75 8.55 2.95 10.05 4.55 10.75C4.85 10.9 5.05 11.2 5.05 11.55V12.1C5.05 12.35 5.25 12.55 5.5 12.55H7.75C10.65 12.55 13 10.2 13 7.3C13 4.15 10.25 1.5 7 1.5Z"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <circle cx="4.6" cy="6.2" r="0.75" fill="currentColor" />
      <circle cx="6.4" cy="4.6" r="0.75" fill="currentColor" />
      <circle cx="8.8" cy="5.1" r="0.75" fill="currentColor" />
      <circle cx="9.4" cy="7.4" r="0.75" fill="currentColor" />
    </svg>
  );
}

function HashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2.5 5.25H11.5M2.5 8.75H11.5M5.25 2.5L4.25 11.5M9.75 2.5L8.75 11.5"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function TypeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3 3H11M7 3V11M5.25 11H8.75"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
  );
}

function RoundIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <rect
        x="2.5"
        y="2.5"
        width="9"
        height="9"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </svg>
  );
}

function categoryIcon(category: TokenCategory) {
  if (category === "color") return <PaletteIcon />;
  if (category === "spacing") return <HashIcon />;
  if (category === "roundness") return <RoundIcon />;
  return <TypeIcon />;
}

function SegmentedControl<T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
}: {
  value: T;
  options: { id: T; label: string }[];
  onChange: (value: T) => void;
  ariaLabel: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex rounded-[10px] border border-[#E4E4E7] bg-[#F4F4F5] p-1"
    >
      {options.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(option.id)}
            className={`rounded-[8px] px-4 py-1.5 text-[13px] font-medium transition ${
              active
                ? "bg-white text-[#18181B] shadow-sm"
                : "text-[#71717A] hover:text-[#18181B]"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

function TokenValuePill({
  token,
}: {
  token: {
    type: "color" | "number" | "string";
    value: string;
    swatch?: string;
    alias?: string;
  };
}) {
  const label = token.alias ?? token.value;

  return (
    <div className="inline-flex max-w-full items-center gap-2 rounded-[8px] border border-[#E4E4E7] bg-white px-2 py-1">
      {token.type === "color" && token.swatch ? (
        <span
          className="h-4 w-4 shrink-0 rounded-[4px] border border-black/10"
          style={{ backgroundColor: token.swatch }}
        />
      ) : null}
      <span className="truncate font-mono text-[12px] text-[#52525B]">{label}</span>
    </div>
  );
}

export function DesignSystemTokenExplorer() {
  const [versionId, setVersionId] = useState<TokenVersion>("v1");
  const [layerId, setLayerId] = useState<TokenLayer>("primitives");
  const [categoryId, setCategoryId] = useState<TokenCategory>("color");
  const [groupId, setGroupId] = useState("all");

  const version = getTokenVersion(versionId);

  const layerOptions = version.layers.map((item) => ({
    id: item.id,
    label: item.label,
  }));

  const activeLayerId = version.layers.some((item) => item.id === layerId)
    ? layerId
    : version.layers[0].id;

  const activeLayer = getTokenLayer(version, activeLayerId);
  const activeCategories = getVisibleCategories(activeLayer);

  const activeCategory = activeCategories.some((category) => category.id === categoryId)
    ? categoryId
    : (activeCategories[0]?.id ?? "color");

  const categoryTokens = useMemo(
    () => activeLayer.tokensByCategory[activeCategory] ?? [],
    [activeLayer, activeCategory],
  );

  const groups = useMemo(() => buildTokenGroups(categoryTokens), [categoryTokens]);

  const activeGroup = groups.some((group) => group.id === groupId) ? groupId : "all";

  const tokens = useMemo(
    () => filterTokensByGroup(categoryTokens, activeGroup),
    [categoryTokens, activeGroup],
  );

  const resetGroups = () => setGroupId("all");

  const panelTitle =
    activeLayer.id === "tokens"
      ? "Tokens"
      : activeLayer.id === "semantics"
        ? "Semantic"
        : `${activeCategory.charAt(0).toUpperCase()}${activeCategory.slice(1)}${
            activeGroup !== "all" ? ` · ${activeGroup}` : ""
          }`;

  return (
    <div className="my-10">
      <div className="overflow-hidden rounded-[16px] border border-[#E4E4E7] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E4E7] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-[8px] bg-[#F4F4F5] text-[#71717A]">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <rect x="2" y="2" width="4" height="4" rx="1" fill="currentColor" />
                <rect x="8" y="2" width="4" height="4" rx="1" fill="currentColor" />
                <rect x="2" y="8" width="4" height="4" rx="1" fill="currentColor" />
                <rect x="8" y="8" width="4" height="4" rx="1" fill="currentColor" />
              </svg>
            </span>
            <span className="text-[14px] font-semibold text-[#18181B]">
              {version.fileLabel}
            </span>
          </div>

          <SegmentedControl
            ariaLabel="Capa de tokens"
            value={activeLayerId}
            onChange={(nextLayer) => {
              setLayerId(nextLayer);
              const next = getTokenLayer(version, nextLayer);
              const firstCategory = getVisibleCategories(next)[0]?.id ?? "color";
              setCategoryId(firstCategory);
              resetGroups();
            }}
            options={layerOptions}
          />
        </div>

        <div className="flex min-h-[420px] flex-col md:min-h-[520px] md:flex-row">
          <aside className="flex max-h-[520px] flex-col border-b border-[#E4E4E7] md:w-[220px] md:border-b-0 md:border-r">
            <div className="shrink-0 px-4 py-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">
                Collections
              </p>
              <div className="space-y-1">
                {activeCategories.map((category) => {
                  const active = category.id === activeCategory;
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => {
                        setCategoryId(category.id);
                        resetGroups();
                      }}
                      className={`flex w-full items-center justify-between rounded-[8px] px-2.5 py-2 text-left text-[13px] transition ${
                        active
                          ? "bg-[#EEF4FF] text-[#2563EB]"
                          : "text-[#52525B] hover:bg-[#F4F4F5]"
                      }`}
                    >
                      <span>{category.label}</span>
                      <span className="font-mono text-[11px]">{category.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col border-t border-[#E4E4E7] px-4 py-3">
              <p className="mb-2 shrink-0 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">
                Groups
              </p>
              <div className="min-h-0 flex-1 space-y-1 overflow-y-auto pr-1">
                {groups.map((group) => {
                  const active = group.id === activeGroup;
                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setGroupId(group.id)}
                      className={`flex w-full items-center justify-between rounded-[8px] px-2.5 py-2 text-left text-[13px] transition ${
                        active
                          ? "bg-[#EEF4FF] text-[#2563EB]"
                          : "text-[#52525B] hover:bg-[#F4F4F5]"
                      }`}
                    >
                      <span className="truncate">{group.label}</span>
                      <span className="ml-2 shrink-0 font-mono text-[11px]">
                        {group.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="border-b border-[#E4E4E7] px-4 py-3">
              <h3 className="text-[14px] font-semibold text-[#18181B]">{panelTitle}</h3>
            </div>

            <div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] border-b border-[#E4E4E7] bg-[#FAFAFA] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">
              <span>Name</span>
              <span>Light</span>
            </div>

            <div className="max-h-[360px] overflow-y-auto md:max-h-[440px]">
              {tokens.map((token) => (
                <div
                  key={token.name}
                  className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-center gap-3 border-b border-[#F4F4F4] px-4 py-2.5 last:border-b-0"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="text-[#A1A1AA]">{categoryIcon(activeCategory)}</span>
                    <span className="truncate font-mono text-[13px] text-[#18181B]">
                      {activeLayer.id === "tokens"
                        ? token.name
                        : displayTokenName(token.name, activeGroup)}
                    </span>
                  </div>
                  <TokenValuePill token={token} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <SegmentedControl
          ariaLabel="Versión del design system"
          value={versionId}
          onChange={(nextVersion) => {
            setVersionId(nextVersion);
            setLayerId("primitives");
            setCategoryId("color");
            resetGroups();
          }}
          options={[
            { id: "v1", label: "GroWrk DS · V.1" },
            { id: "v2", label: "GroWrk DS · V.2 (NUXT)" },
          ]}
        />
      </div>
    </div>
  );
}
