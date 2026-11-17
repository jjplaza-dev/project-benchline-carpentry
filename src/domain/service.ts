/**
 * Service: one of the six Benchline offerings.
 * Projects reference services through `Project.serviceIds`;
 * Faq and Testimonial may reference a service optionally.
 * Fixtures live in `src/data/services.ts`.
 */

import type { AssetId } from "./asset";

export type ServiceId = `svc-${string}`;

/**
 * The six statically generated `/services/[slug]` routes (see PROJECT_PLAN.md §2.3).
 * Adding a service means extending this union and every consumer together.
 */
export type ServiceSlug =
  | "deck-porch-repairs"
  | "fences-gates"
  | "doors-trim"
  | "custom-storage"
  | "general-home-repairs"
  | "half-day-fix-list";

export type ServiceCategory = "exterior" | "interior" | "general";

/** `estimate` → "Request estimate"; `availability` → "Check availability". */
export type ServiceCtaType = "estimate" | "availability";

export interface Service {
  readonly id: ServiceId;
  readonly slug: ServiceSlug;
  readonly name: string;
  readonly summary: string;
  readonly description: string;
  readonly category: ServiceCategory;
  readonly ctaType: ServiceCtaType;
  /** Non-numeric guidance only (assumption A2), for example "Quoted per scope after review". */
  readonly pricingGuidance: string;
  readonly typicalJobs: readonly string[];
  readonly needsFromYou: readonly string[];
  readonly assetId: AssetId;
}
