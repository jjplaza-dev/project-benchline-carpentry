/**
 * Invoice fixtures: FICTIONAL SAMPLES (assumption A2/A4).
 * Amounts are sample integer cents used only to demonstrate payment flows.
 * Each deposit invoice equals its estimate's `depositCents`; the final invoice for
 * est-demo-1008 equals total minus deposit (170_000 - 51_000 = 119_000).
 * Each invoice ZIP matches the ZIP of the request behind its estimate.
 *
 * Coverage: due (5001), paid (5002, 5003, 5004), overdue (5005), void (5006).
 */

import type { Invoice } from "@/domain";

export const invoices: readonly Invoice[] = [
  {
    id: "inv-demo-5001",
    number: "INV-DEMO-5001",
    estimateId: "est-demo-1005",
    kind: "deposit",
    amountCents: 116_000,
    currency: "usd",
    status: "due",
    description: "Deposit for porch steps and post replacement (sample).",
    zip: "98230",
    isSample: true,
  },
  {
    id: "inv-demo-5002",
    number: "INV-DEMO-5002",
    estimateId: "est-demo-1006",
    kind: "deposit",
    amountCents: 74_000,
    currency: "usd",
    status: "paid",
    description: "Deposit for fence section and gate (sample).",
    zip: "98230",
    isSample: true,
  },
  {
    id: "inv-demo-5003",
    number: "INV-DEMO-5003",
    estimateId: "est-demo-1007",
    kind: "deposit",
    amountCents: 78_000,
    currency: "usd",
    status: "paid",
    description: "Deposit for basement shelving and cubbies (sample).",
    zip: "98229",
    isSample: true,
  },
  {
    id: "inv-demo-5004",
    number: "INV-DEMO-5004",
    estimateId: "est-demo-1008",
    kind: "deposit",
    amountCents: 51_000,
    currency: "usd",
    status: "paid",
    description: "Deposit for interior door and casing (sample).",
    zip: "98225",
    isSample: true,
  },
  {
    id: "inv-demo-5005",
    number: "INV-DEMO-5005",
    estimateId: "est-demo-1008",
    kind: "final",
    amountCents: 119_000,
    currency: "usd",
    status: "overdue",
    description: "Final balance for interior door and casing (sample).",
    zip: "98225",
    isSample: true,
  },
  {
    id: "inv-demo-5006",
    number: "INV-DEMO-5006",
    estimateId: "est-demo-1010",
    kind: "deposit",
    amountCents: 47_000,
    currency: "usd",
    status: "void",
    description: "Deposit for shed door and fence boards. Voided because the estimate was declined (sample).",
    zip: "98264",
    isSample: true,
  },
];
