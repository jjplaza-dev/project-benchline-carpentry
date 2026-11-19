/**
 * PaymentOutcome preview fixtures for `/pay-invoice/result`.
 * Draft copy: never claims a payment is confirmed from a redirect alone.
 */

import type { PaymentOutcome } from "@/domain";

export const paymentOutcomePreviews: readonly PaymentOutcome[] = [
  {
    kind: "pending-confirmation",
    message:
      "Your payment has been submitted and we are waiting for confirmation, which can take a little while. If you do not hear from us, get in touch and quote your invoice number.",
  },
  {
    kind: "cancelled",
    message:
      "You left checkout before paying, so no payment was submitted. You can return to your invoice and try again whenever you are ready.",
  },
  {
    kind: "error",
    message:
      "Something went wrong while starting your payment. Please try again, or contact us and we will sort it out.",
  },
];
