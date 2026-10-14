/**
 * The name-tag design a parent made last, kept in localStorage so the
 * name follows them: the homepage designer writes it, the product page
 * form reads it. Every access is guarded, since storage can be blocked.
 */

export const DESIGN_STORAGE_KEY = "nooni:design";

export interface StoredDesign {
  name?: string;
  main_color?: string;
  secondary_color?: string;
}

export function readStoredDesign(): StoredDesign | null {
  try {
    const raw = window.localStorage.getItem(DESIGN_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as StoredDesign) : null;
  } catch {
    return null;
  }
}

export function writeStoredDesign(design: StoredDesign) {
  try {
    window.localStorage.setItem(DESIGN_STORAGE_KEY, JSON.stringify(design));
  } catch {
    // Private mode or blocked storage: everything still works without it.
  }
}
