import { paymentOutcomePreviews } from "@/data/payment-outcomes";
import type { PaymentOutcome } from "@/domain";

/** The three static outcome states shown on `/pay-invoice/result`. */
export function getPaymentOutcomePreviews(): readonly PaymentOutcome[] {
  return paymentOutcomePreviews;
}
