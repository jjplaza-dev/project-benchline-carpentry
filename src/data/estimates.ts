/**
 * Estimate fixtures: FICTIONAL SAMPLES (assumption A2/A4).
 * Dollar amounts exist ONLY here and in `invoices.ts`, solely to demonstrate payment flows.
 * They are not prices Benchline charges. All amounts are integer cents.
 * Each `totalCents` equals the sum of its `lineItems`.
 *
 * Coverage: sent (1004), accepted (1005, 1006, 1007, 1008), expired (1009), declined (1010).
 */

import type { Estimate } from "@/domain";

export const estimates: readonly Estimate[] = [
  {
    id: "est-demo-1004",
    referenceCode: "BL-DEMO-1004",
    scopeSummary:
      "Build and install a mudroom bench with storage cubbies and hooks, finished and ready to paint.",
    lineItems: [
      { label: "Materials", amountCents: 118_000 },
      { label: "Labor", amountCents: 246_000 },
      { label: "Finish and install", amountCents: 62_000 },
    ],
    totalCents: 426_000,
    depositCents: 128_000,
    status: "sent",
    validUntilLabel: "Open until the sample expiry date",
    isSample: true,
  },
  {
    id: "est-demo-1005",
    referenceCode: "BL-DEMO-1005",
    scopeSummary:
      "Replace front porch steps and two rotted porch posts, set level and square, with old materials hauled away.",
    lineItems: [
      { label: "Materials", amountCents: 164_000 },
      { label: "Labor", amountCents: 198_000 },
      { label: "Haul-away", amountCents: 24_000 },
    ],
    totalCents: 386_000,
    depositCents: 116_000,
    status: "accepted",
    validUntilLabel: "Accepted before expiry (sample)",
    isSample: true,
  },
  {
    id: "est-demo-1006",
    referenceCode: "BL-DEMO-1006",
    scopeSummary: "Rebuild one section of wood fence and hang a new side gate with a latch.",
    lineItems: [
      { label: "Materials", amountCents: 92_000 },
      { label: "Labor", amountCents: 138_000 },
      { label: "Gate hardware", amountCents: 18_000 },
    ],
    totalCents: 248_000,
    depositCents: 74_000,
    status: "accepted",
    validUntilLabel: "Accepted before expiry (sample)",
    isSample: true,
  },
  {
    id: "est-demo-1007",
    referenceCode: "BL-DEMO-1007",
    scopeSummary: "Build and install basement shelving and cubbies along one storage wall.",
    lineItems: [
      { label: "Materials", amountCents: 74_000 },
      { label: "Labor", amountCents: 152_000 },
      { label: "Finish", amountCents: 36_000 },
    ],
    totalCents: 262_000,
    depositCents: 78_000,
    status: "accepted",
    validUntilLabel: "Accepted before expiry (sample)",
    isSample: true,
  },
  {
    id: "est-demo-1008",
    referenceCode: "BL-DEMO-1008",
    scopeSummary: "Hang a new interior door and replace worn casing in the upstairs hall.",
    lineItems: [
      { label: "Materials", amountCents: 56_000 },
      { label: "Labor", amountCents: 94_000 },
      { label: "Paint preparation", amountCents: 20_000 },
    ],
    totalCents: 170_000,
    depositCents: 51_000,
    status: "accepted",
    validUntilLabel: "Accepted before expiry (sample)",
    isSample: true,
  },
  {
    id: "est-demo-1009",
    referenceCode: "BL-DEMO-1009",
    scopeSummary: "Repair soft trim at a garage corner and replace a rotted window sill.",
    lineItems: [
      { label: "Labor", amountCents: 82_000 },
      { label: "Materials", amountCents: 28_000 },
    ],
    totalCents: 110_000,
    depositCents: 33_000,
    status: "expired",
    validUntilLabel: "Expired (sample)",
    isSample: true,
  },
  {
    id: "est-demo-1010",
    referenceCode: "BL-DEMO-1010",
    scopeSummary: "Rehang a sagging shed door and replace a few rotted fence boards.",
    lineItems: [
      { label: "Materials", amountCents: 46_000 },
      { label: "Labor", amountCents: 112_000 },
    ],
    totalCents: 158_000,
    depositCents: 47_000,
    status: "declined",
    validUntilLabel: "Declined before expiry (sample)",
    isSample: true,
  },
];
