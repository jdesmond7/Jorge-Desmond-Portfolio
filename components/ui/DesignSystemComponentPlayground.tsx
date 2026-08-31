"use client";

import { useMemo, useState } from "react";

type DsVersion = "v1" | "v1.2" | "v2";
type ComponentId = "button" | "form-field" | "checkbox" | "radio";

const COMPONENTS: { id: ComponentId; label: string }[] = [
  { id: "button", label: "Button" },
  { id: "form-field", label: "Form Field" },
  { id: "checkbox", label: "Checkbox" },
  { id: "radio", label: "Radio Button" },
];

const VERSIONS: { id: DsVersion; label: string }[] = [
  { id: "v1", label: "V.1" },
  { id: "v1.2", label: "V.1.2" },
  { id: "v2", label: "V.2" },
];

const AMBER = "#FFB100";
const AMBER_HOVER = "#E69F00";
const BLUE = "#3B82F6";
const GREEN = "#22C55E";
const RED = "#EF4444";
const NEUTRAL_800 = "#1F2937";
const NEUTRAL_400 = "#9CA3AF";
const NEUTRAL_200 = "#E5E7EB";
const WHITE = "#FFFFFF";

type Control =
  | { kind: "select"; key: string; label: string; options: string[] }
  | { kind: "toggle"; key: string; label: string }
  | { kind: "text"; key: string; label: string }
  | { kind: "textarea"; key: string; label: string };

type PropMap = Record<string, string | boolean>;
type PropChange = (key: string, value: string | boolean) => void;

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
            className={`rounded-[8px] px-3.5 py-1.5 text-[13px] font-medium transition ${
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

function MagicIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M15 4V2M15 16V14M8 9H10M20 9H22M12.2 6.8L10.8 5.4M19.2 13.8L17.8 12.4M12.2 11.2L10.8 12.6M19.2 4.2L17.8 5.6M4 20L13 11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M7 6.2V10"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="7" cy="4.2" r="0.7" fill="currentColor" />
    </svg>
  );
}

function CheckIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2.5 6L5 8.5L9.5 3.5"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function getButtonControls(version: DsVersion): Control[] {
  if (version === "v1") {
    return [
      {
        kind: "select",
        key: "type",
        label: "Type",
        options: ["fill", "outline", "ghost"],
      },
      {
        kind: "select",
        key: "color",
        label: "Color",
        options: ["Amber", "Blue", "Green", "Red", "Charcoal"],
      },
      {
        kind: "select",
        key: "size",
        label: "Size",
        options: ["sm", "base", "lg"],
      },
      { kind: "toggle", key: "disabled", label: "Disabled" },
      {
        kind: "select",
        key: "state",
        label: "State",
        options: ["Default", "Hover", "Focus"],
      },
      { kind: "toggle", key: "showIcon", label: "Icon" },
      { kind: "toggle", key: "showText", label: "Text" },
      { kind: "text", key: "label", label: "Text" },
      { kind: "toggle", key: "showTrailingIcon", label: "Show icon trailing" },
    ];
  }

  if (version === "v1.2") {
    return [
      {
        kind: "select",
        key: "variant",
        label: "Variant",
        options: ["Primary", "Secondary", "Tertiary", "Destructive"],
      },
      { kind: "select", key: "size", label: "Size", options: ["S", "M", "L"] },
      {
        kind: "select",
        key: "state",
        label: "State",
        options: ["Default", "Hover", "Focus"],
      },
      { kind: "toggle", key: "disabled", label: "Disabled" },
      { kind: "toggle", key: "showIcon", label: "ShowIcon" },
      { kind: "text", key: "label", label: "Label" },
      { kind: "toggle", key: "showTrailingIcon", label: "Show icon Trailing" },
    ];
  }

  return [
    {
      kind: "select",
      key: "color",
      label: "color",
      options: ["primary", "secondary", "success", "info", "warning", "error", "neutral"],
    },
    {
      kind: "select",
      key: "variant",
      label: "variant",
      options: ["solid", "outline", "soft", "ghost", "link"],
    },
    {
      kind: "select",
      key: "size",
      label: "size",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    {
      kind: "select",
      key: "state",
      label: "state",
      options: ["default", "hover", "focus"],
    },
    { kind: "toggle", key: "square", label: "square" },
    { kind: "toggle", key: "showLabel", label: "show-label" },
    { kind: "text", key: "label", label: "label" },
    { kind: "toggle", key: "showIcon", label: "show-leadingIcon" },
    { kind: "toggle", key: "showTrailingIcon", label: "show-trailingIcon" },
  ];
}

function getDefaultProps(version: DsVersion, component: ComponentId): Record<string, string | boolean> {
  if (component === "button") {
    if (version === "v1") {
      return {
        type: "fill",
        color: "Amber",
        size: "base",
        disabled: false,
        state: "Default",
        showIcon: true,
        showText: true,
        label: "Button text",
        showTrailingIcon: false,
      };
    }
    if (version === "v1.2") {
      return {
        variant: "Primary",
        size: "M",
        state: "Default",
        disabled: false,
        showIcon: false,
        label: "Label",
        showTrailingIcon: false,
      };
    }
    return {
      color: "primary",
      variant: "solid",
      size: "md",
      state: "default",
      square: false,
      showLabel: true,
      label: "Label",
      showIcon: false,
      showTrailingIcon: false,
    };
  }

  if (component === "form-field") {
    if (version === "v2") {
      return {
        size: "md",
        color: "primary",
        variant: "outline",
        disabled: false,
        "show-label": true,
        label: "Label",
        "show-placeholder": true,
        placeholder: "Placeholder",
      };
    }
    return {
      state: "Default",
      hasValue: false,
      disabled: false,
      showLabel: true,
      label: "Label",
      showMandatory: false,
      showOptional: false,
      showMoreInfo: false,
      showPlaceholder: true,
      placeholder: "Placeholder",
      showHelper: false,
      helper: "Helper text",
    };
  }

  if (component === "checkbox") {
    if (version === "v2") {
      return {
        variant: "list",
        modelValue: "true",
        indicator: "start",
        size: "lg",
        state: "default",
        "show-texts": true,
        "show-label": true,
        label: "Label",
        required: false,
        "show-badge": false,
        "show-description": false,
        description: "Description of what this control will do",
      };
    }
    return {
      title: "Default State",
      showDescription: true,
      description: "Description of what this control will do",
      checked: false,
    };
  }

  if (version === "v2") {
    return {
      variant: "list",
      orientation: "vertical",
      radios: "Default",
      selected: "two",
    };
  }

  return {
    label: "Label",
    showDescription: false,
    description: "Description of what this control will do",
    disabled: false,
    selected: false,
  };
}

function getFieldControls(version: DsVersion): Control[] {
  if (version === "v2") {
    return [
      {
        kind: "select",
        key: "size",
        label: "size",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
      {
        kind: "select",
        key: "color",
        label: "color",
        options: ["primary", "neutral", "success", "error"],
      },
      {
        kind: "select",
        key: "variant",
        label: "variant",
        options: ["outline", "soft", "none"],
      },
      { kind: "toggle", key: "disabled", label: "disabled" },
      { kind: "toggle", key: "show-label", label: "show-label" },
      { kind: "text", key: "label", label: "label" },
      { kind: "toggle", key: "show-placeholder", label: "placeholder" },
      { kind: "text", key: "placeholder", label: "placeholder" },
    ];
  }

  return [
    {
      kind: "select",
      key: "state",
      label: "State",
      options: ["Default", "Hover", "Focus"],
    },
    { kind: "toggle", key: "hasValue", label: "Value" },
    { kind: "toggle", key: "disabled", label: "Disabled" },
    { kind: "toggle", key: "showLabel", label: "ShowLabel" },
    { kind: "text", key: "label", label: "Label" },
    { kind: "toggle", key: "showMandatory", label: "ShowMandatory" },
    { kind: "toggle", key: "showOptional", label: "ShowOptional" },
    { kind: "toggle", key: "showMoreInfo", label: "ShowMoreInfo" },
    { kind: "toggle", key: "showPlaceholder", label: "ShowPlaceholder" },
    { kind: "text", key: "placeholder", label: "Placeholder" },
    { kind: "toggle", key: "showHelper", label: "ShowHelper" },
    { kind: "text", key: "helper", label: "Helper" },
  ];
}

function getCheckboxControls(version: DsVersion): Control[] {
  if (version === "v2") {
    return [
      { kind: "select", key: "variant", label: "variant", options: ["list", "card"] },
      {
        kind: "select",
        key: "modelValue",
        label: "modelValue",
        options: ["true", "false"],
      },
      {
        kind: "select",
        key: "indicator",
        label: "indicator",
        options: ["start", "end"],
      },
      {
        kind: "select",
        key: "size",
        label: "size",
        options: ["xs", "sm", "md", "lg", "xl"],
      },
      {
        kind: "select",
        key: "state",
        label: "state",
        options: ["default", "hover", "focus"],
      },
      { kind: "toggle", key: "show-texts", label: "show-texts" },
      { kind: "toggle", key: "show-label", label: "show-label" },
      { kind: "text", key: "label", label: "label" },
      { kind: "toggle", key: "required", label: "required" },
      { kind: "toggle", key: "show-badge", label: "show-badge" },
      { kind: "toggle", key: "show-description", label: "show-description" },
      { kind: "textarea", key: "description", label: "description" },
    ];
  }

  return [
    { kind: "text", key: "title", label: "Title" },
    { kind: "toggle", key: "showDescription", label: "Show Description" },
    { kind: "textarea", key: "description", label: "Description" },
  ];
}

function getRadioControls(version: DsVersion): Control[] {
  if (version === "v2") {
    return [
      { kind: "select", key: "variant", label: "variant", options: ["list", "card"] },
      {
        kind: "select",
        key: "orientation",
        label: "orientation",
        options: ["vertical", "horizontal"],
      },
      { kind: "select", key: "radios", label: "radios", options: ["Default"] },
    ];
  }

  return [
    { kind: "text", key: "label", label: "Label" },
    { kind: "toggle", key: "showDescription", label: "ShowDescription" },
    { kind: "textarea", key: "description", label: "Description" },
    { kind: "toggle", key: "disabled", label: "Disabled" },
    { kind: "toggle", key: "selected", label: "Selected" },
  ];
}

function visibleControls(controls: Control[], props: PropMap): Control[] {
  return controls.filter((control) => {
    if (control.key === "description") {
      return Boolean(props.showDescription) || props["show-description"] === true;
    }
    if (control.key === "label") {
      if (props.showLabel === false || props["show-label"] === false) return false;
    }
    if (control.key === "placeholder") {
      if (props.showPlaceholder === false || props["show-placeholder"] === false) {
        return false;
      }
    }
    if (control.key === "helper" && props.showHelper === false) return false;
    return true;
  });
}

function resolveColor(name: string): string {
  const map: Record<string, string> = {
    Amber: AMBER,
    Blue: BLUE,
    Green: GREEN,
    Red: RED,
    Charcoal: NEUTRAL_800,
    primary: AMBER,
    Primary: AMBER,
    secondary: BLUE,
    Secondary: BLUE,
    success: GREEN,
    info: "#6366F1",
    warning: "#F97316",
    error: RED,
    Destructive: RED,
    Tertiary: NEUTRAL_800,
    neutral: NEUTRAL_800,
  };
  return map[name] ?? AMBER;
}

function buttonSizeClass(version: DsVersion, size: string, square: boolean) {
  if (version === "v1") {
    if (size === "sm") return "h-8 px-3 text-[12px] gap-1.5";
    if (size === "lg") return "h-12 px-5 text-[16px] gap-2.5";
    return "h-11 px-4 text-[14px] gap-2";
  }
  if (version === "v1.2") {
    if (size === "S") return "h-8 px-3 text-[12px] gap-1.5";
    if (size === "L") return "h-11 px-4 text-[15px] gap-2";
    return "h-8 px-3 text-[13px] gap-1.5";
  }
  if (size === "xs") return square ? "h-6 w-6 text-[11px]" : "h-6 px-2.5 text-[11px] gap-1";
  if (size === "sm") return square ? "h-8 w-8 text-[12px]" : "h-8 px-3 text-[12px] gap-1.5";
  if (size === "lg") return square ? "h-11 w-11 text-[15px]" : "h-11 px-4 text-[15px] gap-2";
  if (size === "xl") return square ? "h-12 w-12 text-[16px]" : "h-12 px-5 text-[16px] gap-2";
  return square ? "h-9 w-9 text-[13px]" : "h-8 px-3.5 text-[13px] gap-1.5";
}

function isHover(state: string) {
  return state.toLowerCase() === "hover";
}

function PreviewButton({
  version,
  props,
}: {
  version: DsVersion;
  props: Record<string, string | boolean>;
}) {
  const disabled = Boolean(props.disabled);
  const state = String(props.state);
  const label = String(props.label ?? "Label");
  const showIcon = Boolean(props.showIcon);
  const showTrailing = Boolean(props.showTrailingIcon);
  const showText =
    version === "v1" ? Boolean(props.showText) : version === "v2" ? Boolean(props.showLabel) : true;
  const square = version === "v2" && Boolean(props.square);

  const colorName =
    version === "v1.2" ? String(props.variant) : String(props.color ?? "primary");
  const baseColor = resolveColor(colorName);
  const typeOrVariant =
    version === "v1"
      ? String(props.type)
      : version === "v1.2"
        ? "fill"
        : String(props.variant);

  const hovered = !disabled && isHover(state);
  const fill =
    typeOrVariant === "outline" || typeOrVariant === "ghost" || typeOrVariant === "link"
      ? "transparent"
      : typeOrVariant === "soft"
        ? `${baseColor}22`
        : hovered
          ? AMBER_HOVER
          : baseColor;

  const textColor =
    typeOrVariant === "outline" ||
    typeOrVariant === "ghost" ||
    typeOrVariant === "link" ||
    typeOrVariant === "soft"
      ? baseColor
      : WHITE;

  const border =
    typeOrVariant === "outline" ? `1.5px solid ${baseColor}` : "1.5px solid transparent";

  const radius = version === "v1" ? 10 : version === "v1.2" ? 8 : square ? 8 : 8;

  return (
    <button
      type="button"
      disabled={disabled}
      className={`inline-flex items-center justify-center font-semibold transition ${buttonSizeClass(
        version,
        String(props.size),
        square,
      )} ${disabled ? "opacity-45" : ""}`}
      style={{
        backgroundColor: fill,
        color: textColor,
        border,
        borderRadius: radius,
        boxShadow: hovered && !disabled ? "0 0 0 3px rgba(255,177,0,0.25)" : undefined,
      }}
    >
      {showIcon ? <MagicIcon /> : null}
      {showText ? <span>{label}</span> : null}
      {showTrailing ? <MagicIcon /> : null}
    </button>
  );
}

function checkboxBoxSize(size: string) {
  if (size === "xs") return 14;
  if (size === "sm") return 16;
  if (size === "md") return 18;
  if (size === "xl") return 24;
  return 20;
}

function PreviewFormField({
  version,
  props,
}: {
  version: DsVersion;
  props: PropMap;
}) {
  const v2 = version === "v2";
  const disabled = Boolean(props.disabled);
  const hovered = isHover(String(props.state ?? ""));
  const focused = String(props.state ?? "").toLowerCase() === "focus";
  const showLabel = v2 ? props["show-label"] !== false : props.showLabel !== false;
  const showPlaceholder = v2
    ? props["show-placeholder"] !== false
    : props.showPlaceholder !== false;
  const hasValue = !v2 && Boolean(props.hasValue);
  const placeholder = showPlaceholder ? String(props.placeholder ?? "Placeholder") : "";
  const value = hasValue ? "Value" : "";
  const labelColor = v2 ? "#3F3F46" : "#D4D4D8";
  const helperColor = v2 ? "#71717A" : "rgba(255,255,255,0.45)";
  const borderColor = focused || hovered ? AMBER : v2 ? "#E4E4E7" : NEUTRAL_200;
  const ring = focused
    ? "0 0 0 3px rgba(255,177,0,0.28)"
    : hovered
      ? "0 0 0 3px rgba(255,177,0,0.16)"
      : undefined;

  const inputHeight =
    v2 && props.size === "xs"
      ? "h-7 text-[12px]"
      : v2 && props.size === "sm"
        ? "h-8 text-[13px]"
        : v2 && props.size === "lg"
          ? "h-11 text-[15px]"
          : v2 && props.size === "xl"
            ? "h-12 text-[16px]"
            : "h-10 text-[14px]";

  return (
    <div className="w-[232px]">
      {showLabel ? (
        <div
          className="mb-1.5 flex items-center gap-1.5 text-[13px] font-medium"
          style={{ color: labelColor }}
        >
          <span>{String(props.label ?? "Label")}</span>
          {!v2 && props.showMandatory ? (
            <span className="text-[#EF4444]">*</span>
          ) : null}
          {!v2 && props.showOptional ? (
            <span className="text-[12px] font-normal opacity-60">(optional)</span>
          ) : null}
          {!v2 && props.showMoreInfo ? (
            <span className="opacity-50">
              <InfoIcon />
            </span>
          ) : null}
        </div>
      ) : null}
      <input
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        className={`w-full rounded-[8px] border bg-white px-3 ${inputHeight} text-[#18181B] outline-none placeholder:text-[#A1A1AA]`}
        style={{
          borderColor,
          boxShadow: ring,
          opacity: disabled ? 0.55 : 1,
          backgroundColor:
            v2 && props.variant === "soft"
              ? "#F4F4F5"
              : v2 && props.variant === "none"
                ? "transparent"
                : WHITE,
        }}
        readOnly
      />
      {!v2 && props.showHelper ? (
        <p className="mt-1.5 text-[12px]" style={{ color: helperColor }}>
          {String(props.helper ?? "Helper text")}
        </p>
      ) : null}
    </div>
  );
}

function PreviewCheckbox({
  version,
  props,
  onChange,
}: {
  version: DsVersion;
  props: PropMap;
  onChange: PropChange;
}) {
  const v2 = version === "v2";
  const checked = v2 ? String(props.modelValue) === "true" : Boolean(props.checked);
  const box = v2 ? checkboxBoxSize(String(props.size ?? "lg")) : 16;
  const showTexts = !v2 || props["show-texts"] !== false;
  const showLabel = showTexts && (v2 ? props["show-label"] !== false : true);
  const showDescription = showTexts && (v2 ? props["show-description"] === true : Boolean(props.showDescription));
  const title = v2 ? String(props.label ?? "Label") : String(props.title ?? "Default State");
  const description = String(props.description ?? "");
  const light = !v2;
  const titleColor = light ? "#E4E4E7" : "#3F3F46";
  const descColor = light ? "rgba(255,255,255,0.45)" : "#71717A";
  const hovered = isHover(String(props.state ?? ""));
  const indicatorEnd = v2 && props.indicator === "end";

  const boxEl = (
    <span
      className="flex shrink-0 items-center justify-center"
      style={{
        width: box,
        height: box,
        borderRadius: v2 ? 6 : 4,
        backgroundColor: checked ? AMBER : light ? WHITE : WHITE,
        border: checked
          ? `1.5px solid ${AMBER}`
          : hovered
            ? `1.5px solid ${AMBER}`
            : light
              ? "1.5px solid #E8E8E8"
              : "1.5px solid #D4D4D8",
        boxShadow: hovered ? "0 0 0 3px rgba(255,177,0,0.2)" : undefined,
      }}
    >
      {checked ? <CheckIcon size={Math.max(10, box - 8)} /> : null}
    </span>
  );

  const textEl =
    showLabel || showDescription || (v2 && props["show-badge"]) ? (
      <span className="min-w-0">
        {showLabel ? (
          <span className="flex items-center gap-1.5">
            <span
              className="text-[14px] font-medium leading-[1.3]"
              style={{ color: titleColor }}
            >
              {title}
              {v2 && props.required ? (
                <span className="ml-0.5 text-[#EF4444]">*</span>
              ) : null}
            </span>
            {v2 && showTexts && props["show-badge"] ? (
              <span className="rounded-full bg-[#EEF4FF] px-1.5 py-0.5 text-[10px] font-semibold text-[#2563EB]">
                Badge
              </span>
            ) : null}
          </span>
        ) : null}
        {showDescription ? (
          <span
            className="mt-0.5 block text-[12px] leading-[1.35]"
            style={{ color: descColor }}
          >
            {description}
          </span>
        ) : null}
      </span>
    ) : null;

  return (
    <button
      type="button"
      onClick={() =>
        v2
          ? onChange("modelValue", checked ? "false" : "true")
          : onChange("checked", !checked)
      }
      className={
        v2 && props.variant === "card"
          ? `inline-flex max-w-[280px] cursor-pointer items-start gap-2.5 rounded-[10px] border border-[#E4E4E7] bg-white px-3 py-2.5 text-left ${
              indicatorEnd ? "flex-row-reverse" : ""
            }`
          : `inline-flex max-w-[280px] cursor-pointer items-start gap-2.5 border-0 bg-transparent p-0 text-left ${
              indicatorEnd ? "flex-row-reverse" : ""
            }`
      }
    >
      {boxEl}
      {textEl}
    </button>
  );
}

function PreviewRadio({
  version,
  props,
  onChange,
}: {
  version: DsVersion;
  props: PropMap;
  onChange: PropChange;
}) {
  const v2 = version === "v2";
  const disabled = Boolean(props.disabled);

  if (!v2) {
    const selected = Boolean(props.selected);
    const showDescription = Boolean(props.showDescription);

    return (
      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange("selected", !selected)}
        className={`inline-flex max-w-[280px] cursor-pointer items-start gap-2.5 border-0 bg-transparent p-0 text-left ${
          disabled ? "opacity-45" : ""
        }`}
      >
        <span
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border"
          style={{
            backgroundColor: selected ? AMBER : "transparent",
            borderColor: selected ? AMBER : "rgba(255,255,255,0.45)",
          }}
        >
          {selected ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
        </span>
        <span>
          <span className="block text-[14px] font-medium leading-[1.3] text-[#E4E4E7]">
            {String(props.label ?? "Label")}
          </span>
          {showDescription ? (
            <span className="mt-0.5 block text-[12px] leading-[1.35] text-white/45">
              {String(props.description ?? "")}
            </span>
          ) : null}
        </span>
      </button>
    );
  }

  const selected = String(props.selected ?? "two");
  const horizontal = props.orientation === "horizontal";
  const card = props.variant === "card";

  const item = (id: string) => {
    const isOn = selected === id;
    return (
      <button
        key={id}
        type="button"
        onClick={() => onChange("selected", id)}
        className={
          card
            ? "inline-flex cursor-pointer items-center gap-2.5 rounded-[10px] border border-[#E4E4E7] bg-white px-3 py-2 text-left"
            : "inline-flex cursor-pointer items-center gap-2.5 border-0 bg-transparent p-0 text-left"
        }
      >
        <span
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
          style={{
            backgroundColor: isOn ? AMBER : WHITE,
            border: isOn ? `1.5px solid ${AMBER}` : "1.5px solid #D4D4D8",
          }}
        >
          {isOn ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
        </span>
        <span className="text-[14px] font-semibold text-[#3F3F46]">Label</span>
      </button>
    );
  };

  return (
    <div className={`flex ${horizontal ? "flex-row gap-5" : "flex-col gap-3"}`}>
      {item("one")}
      {item("two")}
    </div>
  );
}

function PropertyRow({
  control,
  value,
  onChange,
}: {
  control: Control;
  value: string | boolean;
  onChange: (value: string | boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-[#F4F4F5] px-4 py-2.5 last:border-b-0">
      <span className="shrink-0 text-[12px] text-[#71717A]">{control.label}</span>

      {control.kind === "toggle" ? (
        <button
          type="button"
          role="switch"
          aria-checked={Boolean(value)}
          onClick={() => onChange(!value)}
          className={`relative h-5 w-9 rounded-full transition ${
            value ? "bg-[#0A84FF]" : "bg-[#D4D4D8]"
          }`}
        >
          <span
            className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition ${
              value ? "left-[18px]" : "left-0.5"
            }`}
          />
        </button>
      ) : null}

      {control.kind === "select" ? (
        <div className="relative min-w-[120px] max-w-[160px] flex-1">
          <select
            value={String(value)}
            onChange={(event) => onChange(event.target.value)}
            className="w-full appearance-none rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] py-1.5 pl-2.5 pr-7 text-[12px] text-[#18181B] outline-none"
          >
            {control.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-[#A1A1AA]">
            <ChevronDown />
          </span>
        </div>
      ) : null}

      {control.kind === "text" ? (
        <input
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-[120px] max-w-[160px] flex-1 rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] px-2.5 py-1.5 text-[12px] text-[#18181B] outline-none"
        />
      ) : null}

      {control.kind === "textarea" ? (
        <textarea
          value={String(value)}
          onChange={(event) => onChange(event.target.value)}
          rows={2}
          className="min-w-[120px] max-w-[160px] flex-1 resize-none rounded-[6px] border border-[#E4E4E7] bg-[#FAFAFA] px-2.5 py-1.5 text-[12px] leading-[1.4] text-[#18181B] outline-none"
        />
      ) : null}
    </div>
  );
}

export function DesignSystemComponentPlayground() {
  const [version, setVersion] = useState<DsVersion>("v1");
  const [component, setComponent] = useState<ComponentId>("button");
  const [propsByKey, setPropsByKey] = useState<
    Record<string, Record<string, string | boolean>>
  >({});

  const propsKey = `${version}:${component}`;
  const props = propsByKey[propsKey] ?? getDefaultProps(version, component);

  const controls = useMemo(() => {
    if (component === "button") return getButtonControls(version);
    if (component === "form-field") return getFieldControls(version);
    if (component === "checkbox") return getCheckboxControls(version);
    return getRadioControls(version);
  }, [component, version]);

  const updateProp = (key: string, value: string | boolean) => {
    setPropsByKey((prev) => ({
      ...prev,
      [propsKey]: {
        ...(prev[propsKey] ?? getDefaultProps(version, component)),
        [key]: value,
      },
    }));
  };

  const description = (() => {
    if (component === "radio" && version === "v2") {
      return "A set of radio buttons to select a single option from a list.";
    }
    if (component === "checkbox" && version === "v2") {
      return "A checkbox to toggle between checked and unchecked.";
    }
    if (component === "form-field") {
      return version === "v2"
        ? "A form input used to collect user data."
        : "A labeled text field with optional helper and validation.";
    }
    if (component === "radio") {
      return "A radio button to select a single option.";
    }
    if (component === "checkbox") {
      return "A checkbox with an optional description.";
    }
    if (version === "v2") {
      return "A button element that can act as a link or trigger an action.";
    }
    if (version === "v1.2") {
      return "Buttons are used to initialize an action. They let users know what will happen next.";
    }
    return "From this file";
  })();

  return (
    <div className="my-10">
      <div className="overflow-hidden rounded-[16px] border border-[#E4E4E7] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.08)]">
        <div className="flex flex-col lg:flex-row">
          <aside className="border-b border-[#E4E4E7] lg:w-[180px] lg:border-b-0 lg:border-r">
            <div className="px-3 py-3">
              <p className="mb-2 px-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#A1A1AA]">
                Component
              </p>
              <div className="space-y-1">
                {COMPONENTS.map((item) => {
                  const active = item.id === component;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setComponent(item.id)}
                      className={`flex w-full rounded-[8px] px-2.5 py-2 text-left text-[13px] transition ${
                        active
                          ? "bg-[#EEF4FF] text-[#2563EB]"
                          : "text-[#52525B] hover:bg-[#F4F4F5]"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <div className="flex min-h-[420px] min-w-0 flex-1 flex-col md:flex-row">
            <div
              className={`relative flex flex-1 items-center justify-center p-10 ${
                version === "v2" ? "bg-[#F4F4F5]" : "bg-[#2A2A2E]"
              }`}
            >
              <div>
                {component === "button" ? (
                  <PreviewButton version={version} props={props} />
                ) : null}
                {component === "form-field" ? (
                  <PreviewFormField version={version} props={props} />
                ) : null}
                {component === "checkbox" ? (
                  <PreviewCheckbox
                    version={version}
                    props={props}
                    onChange={updateProp}
                  />
                ) : null}
                {component === "radio" ? (
                  <PreviewRadio
                    version={version}
                    props={props}
                    onChange={updateProp}
                  />
                ) : null}
              </div>
            </div>

            <div className="w-full border-t border-[#E4E4E7] md:w-[280px] md:border-l md:border-t-0">
              <div className="border-b border-[#E4E4E7] px-4 py-3">
                <p className="text-[13px] font-semibold text-[#18181B]">
                  {COMPONENTS.find((item) => item.id === component)?.label.toLowerCase()}
                </p>
                <p className="mt-1 text-[11px] leading-[1.4] text-[#A1A1AA]">{description}</p>
              </div>
              <div className="max-h-[360px] overflow-y-auto">
                {visibleControls(controls, props).map((control) => (
                  <PropertyRow
                    key={control.key}
                    control={control}
                    value={props[control.key] ?? (control.kind === "toggle" ? false : "")}
                    onChange={(value) => updateProp(control.key, value)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex justify-center">
        <SegmentedControl
          ariaLabel="Versión del componente"
          value={version}
          onChange={(next) => {
            setVersion(next);
          }}
          options={VERSIONS}
        />
      </div>
    </div>
  );
}
