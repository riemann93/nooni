/**
 * Personalization schema engine.
 *
 * Each Shopify product has at most one schema (keyed by handle) describing
 * which fields the customer fills in on the product detail page. Schemas
 * are TypeScript — fast to iterate, type-checked at build time, and
 * editable by anyone touching the codebase.
 *
 * The chosen values flow to Shopify as **line item properties**
 * (key/value strings attached to a cart line). Shopify shows them on
 * the cart, checkout, and order admin without any extra work. They do
 * NOT change SKU or price — anything that does (e.g. Deck's row count)
 * is a Shopify variant instead.
 *
 * Long-term migration: when non-developers need to author schemas,
 * move the per-handle map to Shopify metafields. The schema *shape*
 * stays the same; only the source changes.
 */

/* ── Palette ──────────────────────────────────────────────────────── */

export interface ColorOption {
  /** Internal key — stable, used in code. */
  value: string;
  /** Human-readable name shown on Shopify orders (Danish). */
  label: string;
  /** Swatch hex. */
  hex: string;
}

/**
 * The Nooni colour palette as customer-facing personalisation choices.
 * Order matters — these render left-to-right as swatches.
 *
 * If the brand expands the palette later, add entries here. The form
 * picks them up automatically.
 */
export const NOONI_COLORS: readonly ColorOption[] = [
  { value: "warm", label: "Varm rosa", hex: "#D9B4A7" },
  { value: "cool", label: "Sage", hex: "#D0E1C1" },
  { value: "headline", label: "Dyb rosa", hex: "#B48383" },
  { value: "sub", label: "Mosgrøn", hex: "#678061" },
  { value: "nude", label: "Nude", hex: "#E4C9B6" },
];

/* ── Motifs ───────────────────────────────────────────────────────── */

export interface MotifOption {
  value: string;
  label: string;
}

/**
 * Motif catalogue for Dots and Emblem.
 *
 * The "Nooni logo" entry is treated as a motif option — Emblem uses it,
 * other products may opt in by listing it explicitly in their schema.
 *
 * Extend or rename freely; the schema reference is by value string.
 */
export const MOTIFS: readonly MotifOption[] = [
  { value: "lemon", label: "Citron" },
  { value: "cherry", label: "Kirsebær" },
  { value: "car", label: "Bil" },
  { value: "smiley", label: "Smiley" },
];

export const NOONI_LOGO_MOTIF: MotifOption = {
  value: "nooni_logo",
  label: "Nooni-logo",
};

/* ── Field types ──────────────────────────────────────────────────── */

interface FieldBase {
  /** Stable internal key. */
  key: string;
  /** Danish label shown on the form AND used as the line-item-property key on Shopify orders. */
  label: string;
  required?: boolean;
}

export interface ColorFieldDef extends FieldBase {
  type: "color";
  /** Defaults to NOONI_COLORS if omitted. */
  options?: readonly ColorOption[];
}

export interface TextFieldDef extends FieldBase {
  type: "text";
  maxLength?: number;
  placeholder?: string;
}

export interface SelectFieldDef extends FieldBase {
  type: "select";
  options: readonly { value: string; label: string }[];
}

/**
 * A mutually-exclusive choice between options, each of which can carry
 * its own sub-fields. Used by Dots: the customer picks either "Motiv"
 * or "Navn", and the corresponding sub-field renders below.
 */
export interface ChoiceFieldDef extends FieldBase {
  type: "choice";
  options: readonly {
    value: string;
    label: string;
    fields: readonly FieldDef[];
  }[];
}

export type FieldDef = ColorFieldDef | TextFieldDef | SelectFieldDef | ChoiceFieldDef;

export interface PersonalizationSchema {
  fields: readonly FieldDef[];
}

/* ── Per-handle schemas ───────────────────────────────────────────── */

const dotsLikeFields: readonly FieldDef[] = [
  { type: "color", key: "main_color", label: "Hovedfarve", required: true },
  { type: "color", key: "secondary_color", label: "Sekundær farve", required: true },
  {
    type: "choice",
    key: "personalization",
    label: "Personalisering",
    required: true,
    options: [
      {
        value: "motif",
        label: "Motiv",
        fields: [
          {
            type: "select",
            key: "motif",
            label: "Vælg motiv",
            options: MOTIFS,
            required: true,
          },
        ],
      },
      {
        value: "name",
        label: "Navn",
        fields: [
          {
            type: "text",
            key: "name",
            label: "Navn",
            maxLength: 12,
            placeholder: "Alma",
            required: true,
          },
        ],
      },
    ],
  },
];

/**
 * The single source of truth. Keys are Shopify product handles.
 *
 * `nooni_test_product` gets a Dots-like schema for development —
 * lets us validate the full pipeline (every field type, the choice
 * group, validation) end-to-end before real products exist.
 * Remove this entry once real products are in place.
 */
export const PERSONALIZATION_SCHEMAS: Record<string, PersonalizationSchema> = {
  // ── Dev placeholder. Remove once real products exist. ──────────
  nooni_test_product: { fields: dotsLikeFields },

  // ── Real product lineup (handles will be confirmed when wife
  //    creates the products in Shopify). ───────────────────────────
  dots: { fields: dotsLikeFields },

  loops: {
    fields: [
      { type: "color", key: "main_color", label: "Hovedfarve", required: true },
      {
        type: "color",
        key: "secondary_color",
        label: "Sekundær farve",
        required: true,
      },
      {
        type: "text",
        key: "name",
        label: "Tekst",
        maxLength: 12,
        placeholder: "Viggo",
        required: true,
      },
    ],
  },

  emblem: {
    fields: [
      { type: "color", key: "main_color", label: "Hovedfarve", required: true },
      {
        type: "color",
        key: "secondary_color",
        label: "Sekundær farve",
        required: true,
      },
      {
        type: "select",
        key: "motif",
        label: "Motiv",
        required: true,
        options: [...MOTIFS, NOONI_LOGO_MOTIF],
      },
    ],
  },

  // Deck's 1-row vs 2-row is a Shopify VARIANT — not a personalization
  // field. Only the colour choice lives here.
  deck: {
    fields: [{ type: "color", key: "color", label: "Farve", required: true }],
  },

  "tic-tac-take": {
    fields: [
      {
        type: "color",
        key: "player1_color",
        label: "Spiller 1 — farve",
        required: true,
      },
      {
        type: "color",
        key: "player2_color",
        label: "Spiller 2 — farve",
        required: true,
      },
    ],
  },
};

/** Returns the schema for a handle, or null if the product has no personalization. */
export function getSchemaForHandle(
  handle: string,
): PersonalizationSchema | null {
  return PERSONALIZATION_SCHEMAS[handle] ?? null;
}

/* ── Validation + serialization ───────────────────────────────────── */

/**
 * Walks the schema against the current form values and returns true if
 * every required field has a non-empty value. For the `choice` field
 * type, only sub-fields of the currently-selected option are required.
 */
export function isSchemaValid(
  schema: PersonalizationSchema,
  values: Record<string, string>,
): boolean {
  function check(fields: readonly FieldDef[]): boolean {
    for (const field of fields) {
      if (field.type === "choice") {
        const selected = values[field.key];
        if (field.required && !selected) return false;
        if (selected) {
          const chosen = field.options.find((o) => o.value === selected);
          if (chosen && !check(chosen.fields)) return false;
        }
      } else {
        const v = values[field.key];
        if (field.required && (!v || v.trim() === "")) return false;
      }
    }
    return true;
  }
  return check(schema.fields);
}

/**
 * Converts form values to Shopify line item attributes for the
 * cartLinesAdd `attributes` field. Uses Danish field labels as keys
 * and human-readable values (e.g. "Varm rosa" not "warm") so orders
 * are immediately readable for the production team.
 *
 * Only fields with a non-empty value are included. For `choice` fields,
 * only the selected option's sub-fields are serialized — the choice
 * itself isn't separately included since the sub-fields make it implicit.
 */
export function toLineItemAttributes(
  schema: PersonalizationSchema,
  values: Record<string, string>,
): Array<{ key: string; value: string }> {
  const out: Array<{ key: string; value: string }> = [];

  function emit(fields: readonly FieldDef[]) {
    for (const field of fields) {
      if (field.type === "choice") {
        const selected = values[field.key];
        if (selected) {
          const chosen = field.options.find((o) => o.value === selected);
          if (chosen) emit(chosen.fields);
        }
        continue;
      }

      const v = values[field.key];
      if (!v) continue;

      let displayValue = v;
      if (field.type === "color") {
        const palette = field.options ?? NOONI_COLORS;
        displayValue = palette.find((c) => c.value === v)?.label ?? v;
      } else if (field.type === "select") {
        displayValue = field.options.find((o) => o.value === v)?.label ?? v;
      }

      out.push({ key: field.label, value: displayValue });
    }
  }

  emit(schema.fields);
  return out;
}
