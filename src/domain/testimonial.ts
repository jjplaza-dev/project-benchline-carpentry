/**
 * Testimonial: social-proof quote. All current records are fictional samples (assumption A4).
 * Fixtures live in `src/data/testimonials.ts`.
 */

import type { AreaId } from "./area";
import type { ServiceId } from "./service";

export type TestimonialId = `tst-${string}`;

export interface Testimonial {
  readonly id: TestimonialId;
  readonly quote: string;
  /** Anonymous display label, for example "Homeowner, Ferndale". Never a real name unless supplied. */
  readonly authorLabel: string;
  /** References `ServiceArea.id`. */
  readonly townId: AreaId;
  readonly serviceId?: ServiceId;
  readonly isSample: boolean;
}
