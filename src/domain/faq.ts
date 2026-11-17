/**
 * Faq: one question/answer pair. Grouped by category on `/faq`;
 * optionally tied to a service for the service detail pages.
 * Fixtures live in `src/data/faqs.ts`.
 */

import type { ServiceId } from "./service";

export type FaqId = `faq-${string}`;

export type FaqCategory =
  | "estimates"
  | "scheduling"
  | "payments"
  | "work-and-materials"
  | "service-area";

export interface Faq {
  readonly id: FaqId;
  readonly category: FaqCategory;
  readonly question: string;
  readonly answer: string;
  readonly serviceId?: ServiceId;
}
