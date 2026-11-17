/**
 * PaymentOutcome: derived UI state for `/pay-invoice/result`. Type only; there is no fixture file.
 * A redirect alone never confirms payment (no webhooks are selected), so there is
 * deliberately no "succeeded" kind.
 */

export type PaymentOutcomeKind = "pending-confirmation" | "cancelled" | "error";

export interface PaymentOutcome {
  readonly kind: PaymentOutcomeKind;
  readonly message: string;
}
