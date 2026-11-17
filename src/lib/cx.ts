/**
 * Joins class names, skipping falsy values. No Tailwind conflict resolution:
 * Benchline components avoid conflicting utilities instead of relying on a merge helper.
 */
export function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
