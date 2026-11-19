import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Terms",
  description:
    "Estimate, deposit and invoice terms for Benchline Carpentry & Home Repair (draft outline).",
};

/** Structured placeholder outline. Bracketed statements are for the owner and a lawyer to complete. */
const sections: readonly LegalSection[] = [
  {
    heading: "Estimates",
    paragraphs: [
      "Estimates are written for a specific scope of work after we review your request and photos or visit the site.",
      "[Owner and counsel to state how long an estimate stays open, whether estimates are free, and what can change the price.]",
    ],
  },
  {
    heading: "Approval and deposits",
    paragraphs: [
      "Work is scheduled after an estimate is approved and any required deposit is paid.",
      "[Owner to define the deposit amount or percentage, when it is due and how it is applied to the final balance.]",
    ],
  },
  {
    heading: "Final invoices and payment",
    paragraphs: [
      "The remaining balance is invoiced when the work is complete.",
      "[Owner to define payment due dates, accepted payment methods and any late-payment terms.]",
    ],
  },
  {
    heading: "Scheduling and weather",
    paragraphs: [
      "Dates are agreed with you. Exterior work can be affected by weather.",
      "[Owner to define how weather delays and rescheduling are handled.]",
    ],
  },
  {
    heading: "Changes to the scope",
    paragraphs: [
      "[Owner to define how changes or surprises found during the work are discussed, priced and approved.]",
    ],
  },
  {
    heading: "Cancellations and refunds",
    paragraphs: ["[Owner and counsel to define cancellation windows and refund rules for deposits.]"],
  },
  {
    heading: "Workmanship",
    paragraphs: [
      "[Owner and counsel to define any workmanship assurance, what it covers and how to make a claim. No warranty is promised by this prototype.]",
    ],
  },
  {
    heading: "Governing law",
    paragraphs: ["[Counsel to confirm governing law and the process for resolving disputes.]"],
  },
];

/** P17 Terms. */
export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Estimate and payment terms"
      intro="A draft outline of the terms that cover estimates, deposits and invoices. It is placeholder text."
      sections={sections}
    />
  );
}
