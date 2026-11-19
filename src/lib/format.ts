import type { Cents } from "@/domain";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

/** Formats integer cents as US dollars, for example 128000 → "$1,280.00". */
export function formatCents(cents: Cents): string {
  return usd.format(cents / 100);
}

/** Formats a byte count as KB or MB. */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
