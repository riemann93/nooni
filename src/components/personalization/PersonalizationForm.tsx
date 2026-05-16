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

import { useCallback, useEffect, useState } from "react";
import {
  NOONI_COLORS,
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

  return (
    <div>
      <FieldLabel htmlFor={field.key} required={field.required}>
        {field.label}
      </FieldLabel>
      <div className="mt-3 flex flex-wrap gap-3" role="radiogroup" id={field.key}>
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={opt.label}
              title={opt.label}
              onClick={() => onChange(opt.value)}
              className={`relative h-10 w-10 rounded-full transition-transform hover:scale-105 ${
                selected
                  ? "ring-2 ring-nooni-headline ring-offset-2 ring-offset-nooni-bg"
                  : "ring-1 ring-nooni-line-soft"
              }`}
              style={{ backgroundColor: opt.hex }}
            />
          );
        })}
      </div>
      {value && (
        <p className="mt-2 text-xs text-nooni-ink-soft">
          {options.find((o) => o.value === value)?.label}
        </p>
      )}
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

function SelectField({ field, value, onChange }: SelectFieldProps) {
  return (
    <div>
      <FieldLabel htmlFor={field.key} required={field.required}>
        {field.label}
      </FieldLabel>
      <select
        id={field.key}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-full border border-nooni-line bg-nooni-bg px-5 py-3 text-base text-nooni-ink focus:border-nooni-headline focus:outline-none"
      >
        <option value="" disabled>
          Vælg…
        </option>
        {field.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
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
