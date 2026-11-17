/**
 * Pure input normalizers shared by selectors.
 */

/**
 * Returns the 5-digit ZIP for "98225" or "98225-1234" (whitespace trimmed),
 * or `null` when the input is not a valid US ZIP shape.
 */
export function normalizeZip(input: string): string | null {
  const match = /^(\d{5})(?:-\d{4})?$/.exec(input.trim());
  return match?.[1] ?? null;
}

/** Trims and upper-cases a reference code or invoice number for case-insensitive comparison. */
export function normalizeCode(input: string): string {
  return input.trim().toUpperCase();
}
