/**
 * Estimate and line items. Money is integer cents throughout.
 * Dollar amounts exist only in clearly labeled sample fixtures (assumption A2).
 * Fixtures live in `src/data/estimates.ts`.
 */

import type { ReferenceCode } from "./status";

export type EstimateId = `est-${string}`;

/** Integer cents. The type cannot enforce integrality; fixtures and server code must. */
export type Cents = number;

/** Only US dollars are supported. */
export type Currency = "usd";

export type EstimateStatus = "sent" | "accepted" | "declined" | "expired";

export interface EstimateLineItem {
  readonly label: string;
  readonly amountCents: Cents;
}

export interface Estimate {
  readonly id: EstimateId;
  /** Shared with ProjectStatusRecord. */
  readonly referenceCode: ReferenceCode;
  readonly scopeSummary: string;
  readonly lineItems: readonly EstimateLineItem[];
  readonly totalCents: Cents;
  readonly depositCents: Cents;
  readonly status: EstimateStatus;
  /** Display label such as "Valid for 30 days"; not a real date. */
  readonly validUntilLabel: string;
  readonly isSample: boolean;
}
