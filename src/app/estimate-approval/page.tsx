import type { Metadata } from "next";
import {
  EstimateApprovalPreview,
  type EstimatePreview,
} from "@/components/payments/EstimateApprovalPreview";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { PROTOTYPE_NOTICES } from "@/data/site-flags";
import { getEstimateByReference, getInvoicesByEstimate } from "@/lib/selectors";

export const metadata: Metadata = {
  title: "Your Estimate",
  description: "Review a written estimate, then accept it and pay the deposit online.",
};

/** One sample estimate per status. Codes are fictional demo references. */
const samples = [
  { status: "sent", label: "Open", referenceCode: "BL-DEMO-1004" },
  { status: "accepted", label: "Accepted", referenceCode: "BL-DEMO-1005" },
  { status: "expired", label: "Expired", referenceCode: "BL-DEMO-1009" },
  { status: "declined", label: "Declined", referenceCode: "BL-DEMO-1010" },
] as const;

/** P11 Estimate approval: preview states for open, accepted, expired and declined estimates. */
export default function EstimateApprovalPage() {
  const previews: EstimatePreview[] = [];
  for (const sample of samples) {
    const estimate = getEstimateByReference(sample.referenceCode);
    if (estimate) {
      previews.push({
        status: sample.status,
        label: sample.label,
        estimate,
        invoices: getInvoicesByEstimate(estimate.id),
      });
    }
  }

  return (
    <>
      <PageHero
        eyebrow="Your estimate"
        title={
          <>
            Read it.
            <br />
            Then decide.
          </>
        }
        intro={
          <p>
            Your written estimate lists the scope, the total and the deposit, so you know exactly
            what is included before you agree to anything.
          </p>
        }
        titleId="estimate-title"
      />
      <Section aria-labelledby="estimate-preview-title" padded={false} className="pb-24">
        <h2 id="estimate-preview-title" className="sr-only">
          Estimate details
        </h2>
        <EstimateApprovalPreview previews={previews} showPrototypeNotice={PROTOTYPE_NOTICES} />
      </Section>
    </>
  );
}
