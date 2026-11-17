/**
 * Builds `tel:` and `mailto:` hrefs from BusinessProfile display values.
 * Assumes a US number (Benchline is a US business).
 */

export function toTelHref(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  const national = digits.length === 11 && digits.startsWith("1") ? digits.slice(1) : digits;
  return `tel:+1${national}`;
}

export function toMailHref(email: string): string {
  return `mailto:${email}`;
}
