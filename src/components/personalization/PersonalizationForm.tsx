/**
 * PersonalizationForm — schema-driven form for product personalisation.
 *
 * Reads a PersonalizationSchema (see src/lib/shopify/personalization.ts)
 * and renders the corresponding fields. State is held internally; a
 * single onChange callback fires whenever values change, returning
 * both the values map and a validity flag.
 *
 * Chunk 1 scope: the form renders and updates state, but doesn't wire
 * into the cart yet. Chunk 2 connects it to AddToCartButton.
 */

"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import MotifRenderer, { hasMotifRenderer } from "@/components/personalization/motifs";
import {
  NOONI_COLORS,
  isFieldHidden,
  isSchemaValid,
  type ChoiceFieldDef,
  type ColorFieldDef,
  type ColorOption,
  type FieldDef,
  type PersonalizationSchema,
  type SelectFieldDef,
  type TextFieldDef,
} from "@/lib/shopify/personalization";

interface PersonalizationFormProps {
  schema: PersonalizationSchema;
  onChange?: (values: Record<string, string>, isValid: boolean) => void;
}

export default function PersonalizationForm({
  schema,
  onChange,
}: PersonalizationFormProps) {
  const [values, setValues] = useState<Record<string, string>>({});

  // Single source of truth for "set this key to this value, or unset it".
  const setField = useCallback((key: string, value: string | undefined) => {
    setValues((prev) => {
      const next = { ...prev };
      if (value === undefined || value === "") {
        delete next[key];
      } else {
        next[key] = value;
      }
      return next;
    });
  }, []);

  // Whenever values change, notify the parent with the latest validity.
  useEffect(() => {
    if (onChange) onChange(values, isSchemaValid(schema, values));
  }, [values, schema, onChange]);

  return (
    <div className="space-y-6">
      {schema.fields.map((field) => (
        <FieldRow
          key={field.key}
          field={field}
          values={values}
          setField={setField}
        />
      ))}
    </div>
  );
}

/* ── Field router ─────────────────────────────────────────────────── */

interface FieldRowProps {
  field: FieldDef;
  values: Record<string, string>;
  setField: (key: string, value: string | undefined) => void;
}

function FieldRow({ field, values, setField }: FieldRowProps) {
  if (isFieldHidden(field, values)) return null;
  switch (field.type) {
    case "color":
      return (
        <ColorField
          field={field}
          value={values[field.key]}
          onChange={(v) => setField(field.key, v)}
        />
      );
    case "text":
      return (
        <TextField
          field={field}
          value={values[field.key] ?? ""}
          onChange={(v) => setField(field.key, v)}
        />
      );
    case "select":
      return (
        <SelectField
          field={field}
          value={values[field.key] ?? ""}
          onChange={(v) => setField(field.key, v)}
        />
      );
    case "choice":
      return (
        <ChoiceField
          field={field}
          values={values}
          setField={setField}
        />
      );
  }
}

/* ── Color swatch picker ──────────────────────────────────────────── */

interface ColorFieldProps {
  field: ColorFieldDef;
  value: string | undefined;
  onChange: (value: string) => void;
}

function ColorField({ field, value, onChange }: ColorFieldProps) {
  const options: readonly ColorOption[] = field.options ?? NOONI_COLORS;
  const [tooltip, setTooltip] = useState<{
    opt: ColorOption;
    x: number;
    y: number;
  } | null>(null);

  function showAtCursor(opt: ColorOption, e: React.MouseEvent) {
    setTooltip({ opt, x: e.clientX, y: e.clientY });
  }
  function showAtButton(opt: ColorOption, el: HTMLElement) {
    const rect = el.getBoundingClientRect();
    // Anchor near the centre of the focused button when there's no
    // cursor (keyboard navigation).
    setTooltip({ opt, x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
  }

  return (
    <div>
      <FieldLabel htmlFor={field.key} required={field.required}>
        {field.label}
      </FieldLabel>
      <div className="mt-3 flex flex-wrap gap-3 p-1" role="radiogroup" id={field.key}>
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={opt.label}
              onClick={() => onChange(opt.value)}
              onMouseEnter={(e) => showAtCursor(opt, e)}
              onMouseMove={(e) => showAtCursor(opt, e)}
              onMouseLeave={() => setTooltip(null)}
              onFocus={(e) => showAtButton(opt, e.currentTarget)}
              onBlur={() => setTooltip(null)}
              className={`relative h-6 w-6 overflow-hidden rounded-lg transition-transform hover:scale-105 ${
                selected
                  ? "ring-2 ring-nooni-headline ring-offset-2 ring-offset-nooni-bg"
                  : "ring-1 ring-nooni-line-soft"
              }`}
              style={opt.imageUrl ? undefined : { backgroundColor: opt.hex }}
            >
              {opt.imageUrl && (
                <Image
                  src={opt.imageUrl}
                  alt=""
                  fill
                  sizes="48px"
                  className="object-cover"
                />
              )}
            </button>
          );
        })}
      </div>
      {value && (
        <p className="mt-2 text-xs text-nooni-ink-soft">
          {options.find((o) => o.value === value)?.label}
        </p>
      )}

      {tooltip && <ColorTooltip option={tooltip.opt} x={tooltip.x} y={tooltip.y} />}
    </div>
  );
}

/* ── Hover/focus preview tooltip ───────────────────────────────────── */

interface ColorTooltipProps {
  option: ColorOption;
  x: number;
  y: number;
}

/**
 * Floating preview shown while a swatch is hovered or focused.
 *
 * Layout: 50×50 px image of the colour with the colour name below.
 * Anchored so the tooltip's bottom-left corner sits just above-right
 * of the cursor (or the centre of the focused button when there's no
 * cursor) — i.e. the preview lives in the cursor's upper-right
 * quadrant. The fixed positioning + translate(-100% on Y) shifts the
 * box up by its own height so the bottom edge lands on the anchor.
 */
const TOOLTIP_IMAGE_PX = 100;

function ColorTooltip({ option, x, y }: ColorTooltipProps) {
  return (
    <div
      className="pointer-events-none fixed z-50 flex flex-col items-center"
      style={{
        left: x + 10,
        top: y - 10,
        transform: "translateY(-100%)",
      }}
    >
      <div
        className="overflow-hidden rounded-lg shadow-[0_8px_18px_-6px_rgba(61,50,40,0.25)] ring-1 ring-nooni-line-soft"
        style={{ width: TOOLTIP_IMAGE_PX, height: TOOLTIP_IMAGE_PX }}
      >
        {option.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={option.imageUrl}
            alt=""
            width={TOOLTIP_IMAGE_PX}
            height={TOOLTIP_IMAGE_PX}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full" style={{ backgroundColor: option.hex }} />
        )}
      </div>
      <span className="mt-1.5 rounded-md bg-white px-2 py-0.5 text-xs text-nooni-ink shadow-[0_4px_10px_-4px_rgba(61,50,40,0.2)] ring-1 ring-nooni-line-soft">
        {option.label}
      </span>
    </div>
  );
}

/* ── Text input ──────────────────────────────────────────────────── */

interface TextFieldProps {
  field: TextFieldDef;
  value: string;
  onChange: (value: string) => void;
}

function TextField({ field, value, onChange }: TextFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={field.key} required={field.required}>
        {field.label}
      </FieldLabel>
      <input
        id={field.key}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={field.maxLength}
        placeholder={field.placeholder}
        className="mt-2 w-full rounded-full border border-nooni-line bg-nooni-bg px-5 py-3 text-base text-nooni-ink placeholder:text-nooni-ink-soft/50 focus:border-nooni-headline focus:outline-none"
      />
      {field.maxLength && (
        <p className="mt-1 text-right text-xs text-nooni-ink-soft/70">
          {value.length} / {field.maxLength}
        </p>
      )}
    </div>
  );
}

/* ── Select dropdown ─────────────────────────────────────────────── */

interface SelectFieldProps {
  field: SelectFieldDef;
  value: string;
  onChange: (value: string) => void;
}

/**
 * A dropdown that unfolds in place as a two-column list, so a long list
 * of motifs stays short. It opens inline rather than floating, so it
 * pushes the fields below down instead of being cut off by the
 * scrolling right column.
 */
function SelectField({ field, value, onChange }: SelectFieldProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = field.options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    function onPointerDown(e: PointerEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef}>
      <FieldLabel htmlFor={field.key} required={field.required}>
        {field.label}
      </FieldLabel>
      <button
        id={field.key}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`relative mt-2 w-full rounded-full border bg-nooni-bg py-3 pl-5 pr-10 text-left text-base focus:border-nooni-headline focus:outline-none ${
          open ? "border-nooni-headline" : "border-nooni-line"
        } ${selected ? "text-nooni-ink" : "text-nooni-ink-soft"}`}
      >
        <span className="flex items-center gap-2">
          {selected && <OptionIcon value={selected.value} />}
          {selected?.label ?? "Vælg…"}
        </span>
        <svg
          className={`pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-nooni-ink-soft transition-transform ${open ? "rotate-180" : ""}`}
          width="16" height="16" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          aria-hidden
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <div
          role="listbox"
          aria-labelledby={field.key}
          className="mt-2 grid grid-cols-2 gap-1 rounded-2xl border border-nooni-line-soft bg-nooni-bg p-2 shadow-[0_8px_18px_-6px_rgba(61,50,40,0.18)]"
        >
          {field.options.map((opt) => {
            const isSelected = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-left text-sm transition-colors ${
                  isSelected
                    ? "bg-nooni-headline text-white"
                    : "text-nooni-ink hover:bg-nooni-bg-warm hover:text-nooni-headline"
                }`}
              >
                <OptionIcon value={opt.value} />
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Small motif drawing beside an option, so customers see it before choosing. */
function OptionIcon({ value }: { value: string }) {
  if (!hasMotifRenderer(value)) return null;
  return (
    <svg viewBox="0 0 100 100" className="h-5 w-5 flex-none" aria-hidden>
      <MotifRenderer motifKey={value} color="currentColor" />
    </svg>
  );
}

/* ── Choice group (motif vs name, etc.) ──────────────────────────── */

interface ChoiceFieldProps {
  field: ChoiceFieldDef;
  values: Record<string, string>;
  setField: (key: string, value: string | undefined) => void;
}

function ChoiceField({ field, values, setField }: ChoiceFieldProps) {
  const selectedValue = values[field.key];
  const selectedOption = field.options.find((o) => o.value === selectedValue);

  function selectOption(optionValue: string) {
    // Clear any sub-field values from the previously selected option so
    // they don't leak into the cart attributes.
    const previousOption = field.options.find((o) => o.value === selectedValue);
    if (previousOption && previousOption.value !== optionValue) {
      for (const sub of previousOption.fields) {
        setField(sub.key, undefined);
      }
    }
    setField(field.key, optionValue);
  }

  return (
    <div>
      <FieldLabel required={field.required}>{field.label}</FieldLabel>

      {/* Segmented toggle for the option choice */}
      <div className="mt-3 inline-flex rounded-full border border-nooni-line-soft p-1">
        {field.options.map((opt) => {
          const selected = selectedValue === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => selectOption(opt.value)}
              className={`rounded-full px-5 py-1.5 text-sm transition-colors ${
                selected
                  ? "bg-nooni-headline text-white"
                  : "text-nooni-ink-soft hover:text-nooni-headline"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* Sub-fields for the selected option */}
      {selectedOption && selectedOption.fields.length > 0 && (
        <div className="mt-5 space-y-5 border-l-2 border-nooni-line-soft pl-5">
          {selectedOption.fields.map((sub) => (
            <FieldRow
              key={sub.key}
              field={sub}
              values={values}
              setField={setField}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Shared label ────────────────────────────────────────────────── */

function FieldLabel({
  htmlFor,
  required,
  children,
}: {
  htmlFor?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="block text-xs uppercase tracking-[0.2em] text-nooni-sub"
    >
      {children}
      {required && <span aria-hidden> *</span>}
    </label>
  );
}
