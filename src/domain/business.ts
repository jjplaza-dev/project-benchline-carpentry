/**
 * BusinessProfile and NavItem.
 * Referenced by the global shell, About and Contact.
 * Fixtures live in `src/data/business-profile.ts` and `src/data/navigation.ts`.
 */

/**
 * Which profile details are placeholders and not owner-verified (assumption A3).
 * `true` means "still a placeholder".
 */
export interface PlaceholderFlags {
  readonly phone: boolean;
  readonly email: boolean;
  readonly address: boolean;
  readonly hours: boolean;
  readonly registration: boolean;
}

export interface BusinessProfile {
  readonly name: string;
  readonly tagline: string;
  /** Display format, for example "(360) 555-0100". `tel:` hrefs are derived elsewhere. */
  readonly phone: string;
  readonly email: string;
  readonly serviceAreaSummary: string;
  readonly hoursNote: string;
  readonly registrationNote: string;
  readonly placeholderFlags: PlaceholderFlags;
}

export type NavItemKind = "primary" | "secondary" | "cta";

export interface NavItem {
  readonly label: string;
  readonly href: string;
  readonly kind: NavItemKind;
}
