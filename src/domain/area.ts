/**
 * ServiceArea: a town (or the "other Whatcom County" bucket) Benchline serves.
 * Referenced by id from Project, Testimonial and EstimateRequest.
 * Fixtures live in `src/data/service-areas.ts`.
 */

export type AreaId = `area-${string}`;

/**
 * A US ZIP code as a string, so leading zeros and ZIP+4 are never lost.
 * Used by ServiceArea, EstimateRequest, ProjectStatusRecord and Invoice.
 */
export type ZipCode = string;

export interface ServiceArea {
  readonly id: AreaId;
  readonly name: string;
  /** ZIP codes treated as inside this area. May be empty for the "other" bucket. */
  readonly zipCodes: readonly ZipCode[];
  /** True while the owner has not confirmed the ZIP list (assumption A8). */
  readonly zipNeedsConfirmation: boolean;
  readonly note: string;
}
