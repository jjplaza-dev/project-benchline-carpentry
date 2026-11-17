/**
 * Invoice: a deposit or final-payment invoice belonging to one Estimate.
 * Fixtures live in `src/data/invoices.ts`.
 */

import type { ZipCode } from "./area";
import type { Cents, Currency, EstimateId } from "./estimate";

export type InvoiceId = `inv-${string}`;

export type InvoiceKind = "deposit" | "final";

export type InvoiceStatus = "due" | "paid" | "overdue" | "void";

export interface Invoice {
  readonly id: InvoiceId;
  /** Human-facing invoice number used for lookup. Format is defined by fixtures. */
  readonly number: string;
  /** References `Estimate.id`. */
  readonly estimateId: EstimateId;
  readonly kind: InvoiceKind;
  readonly amountCents: Cents;
  readonly currency: Currency;
  readonly status: InvoiceStatus;
  readonly description: string;
  /** Used with `number` for lookup. */
  readonly zip: ZipCode;
  readonly isSample: boolean;
}
