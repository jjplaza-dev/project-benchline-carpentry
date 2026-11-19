"use client";

import { useState } from "react";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CtaLink } from "@/components/primitives/CtaLink";
import { PreviewButton } from "@/components/primitives/PreviewButton";
import { PreviewStateToggle } from "@/components/primitives/PreviewStateToggle";
import type { Estimate, EstimateStatus, Invoice } from "@/domain";
import { formatCents } from "@/lib/format";
import { invoiceKindLabels, invoiceStatusLabels } from "@/lib/labels";
import { EstimateSummary } from "../estimate/EstimateSummary";

export interface EstimatePreview {
  status: EstimateStatus;
  label: string;
  estimate: Estimate;
  invoices: readonly Invoice[];
}

interface EstimateApprovalPreviewProps {
  previews: readonly EstimatePreview[];
  showPrototypeNotice: boolean;
}

/**
 * Estimate approval, PREVIEW ONLY. Accept and deposit buttons are disabled and nothing is
 * accepted, charged or stored. Stripe is not introduced until Phase 5.
 */
export function EstimateApprovalPreview({
  previews,
  showPrototypeNotice,
}: EstimateApprovalPreviewProps) {
  const [activeStatus, setActiveStatus] = useState<EstimateStatus>(previews[0]?.status ?? "sent");
  const active = previews.find((preview) => preview.status === activeStatus) ?? previews[0];
  if (!active) return null;
  const { estimate } = active;

  return (
    <div className="space-y-8">
      <PreviewStateToggle
        options={previews.map((preview) => ({ value: preview.status, label: preview.label }))}
        value={activeStatus}
        onChange={setActiveStatus}
      />

      {showPrototypeNotice ? (
        <Alert>
          <AlertTitle>Prototype notice</AlertTitle>
          <AlertDescription>
            Estimates and amounts are fictional samples. Nothing here can be accepted or paid yet.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <EstimateSummary estimate={estimate} />
        </div>

        <div className="space-y-6 lg:col-span-5" aria-live="polite">
          {estimate.status === "sent" ? (
            <div className="rounded-xl border border-oak bg-oak-soft p-6">
              <h2 className="text-3xl">Ready when you are</h2>
              <ol className="mt-5 space-y-4">
                <li>
                  <p className="mb-2 font-semibold">1. Accept the estimate</p>
                  <PreviewButton describedBy="approval-note">Accept estimate</PreviewButton>
                </li>
                <li>
                  <p className="mb-2 font-semibold">2. Pay the deposit</p>
                  <PreviewButton variant="secondary" describedBy="approval-note">
                    Pay deposit {formatCents(estimate.depositCents)}
                  </PreviewButton>
                </li>
              </ol>
              <p id="approval-note" className="mt-5 text-sm text-ink-soft">
                Preview only: these buttons are disabled and nothing is submitted or charged.
              </p>
              <p className="mt-4">
                Questions, or not the right fit?{" "}
                <Link href="/contact" className="font-semibold text-cedar-deep underline underline-offset-4">
                  Contact us
                </Link>
                .
              </p>
            </div>
          ) : null}

          {estimate.status === "accepted" ? (
            <div className="rounded-xl border border-oak bg-oak-soft p-6">
              <h2 className="text-3xl">Estimate accepted</h2>
              <p className="mt-3">This sample estimate was accepted. Related invoices:</p>
              <ul className="mt-4 space-y-3">
                {active.invoices.map((invoice) => (
                  <li
                    key={invoice.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-oak bg-card p-4"
                  >
                    <div>
                      <p className="font-semibold">{invoice.number}</p>
                      <p className="text-sm text-ink-soft">
                        {invoiceKindLabels[invoice.kind]} · {invoiceStatusLabels[invoice.status]}
                      </p>
                    </div>
                    <p className="font-semibold tabular-nums">{formatCents(invoice.amountCents)}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-5">
                <CtaLink href="/pay-invoice" variant="secondary" arrow>
                  Go to Pay an Invoice
                </CtaLink>
              </div>
            </div>
          ) : null}

          {estimate.status === "expired" ? (
            <div className="rounded-xl border border-oak bg-oak-soft p-6">
              <h2 className="text-3xl">This estimate has expired</h2>
              <p className="mt-3">
                Estimates are only open for a limited time. If you still want the work done, ask us
                for an updated estimate.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <CtaLink href="/contact">Ask for an update</CtaLink>
                <CtaLink href="/request-estimate" variant="secondary">
                  Start a new request
                </CtaLink>
              </div>
            </div>
          ) : null}

          {estimate.status === "declined" ? (
            <div className="rounded-xl border border-oak bg-oak-soft p-6">
              <h2 className="text-3xl">Estimate declined</h2>
              <p className="mt-3">
                This sample estimate was declined, so no deposit is due. You can still reach out if
                you change your mind.
              </p>
              <div className="mt-5">
                <CtaLink href="/contact" variant="secondary">
                  Contact us
                </CtaLink>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
