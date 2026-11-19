"use client";

import { useState } from "react";
import Link from "next/link";
import { ReceiptText, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CtaLink } from "@/components/primitives/CtaLink";
import { PreviewButton } from "@/components/primitives/PreviewButton";
import { PreviewStateToggle } from "@/components/primitives/PreviewStateToggle";
import type { Estimate, Invoice } from "@/domain";
import { formatCents } from "@/lib/format";
import { InvoiceCard } from "../../../phase 2e/InvoiceCard";

export interface InvoiceLookupPreview {
  key: string;
  label: string;
  invoiceNumber: string;
  zip: string;
  /** Undefined means "not found". */
  invoice?: Invoice;
  estimate?: Estimate;
}

interface InvoicePreviewProps {
  previews: readonly InvoiceLookupPreview[];
  showPrototypeNotice: boolean;
}

/**
 * Pay-an-invoice page, PREVIEW ONLY. Lookup fields are read-only and the pay button is disabled.
 * No payment provider is connected until Phase 5.
 */
export function InvoicePreview({ previews, showPrototypeNotice }: InvoicePreviewProps) {
  const [activeKey, setActiveKey] = useState(previews[0]?.key ?? "");
  const active = previews.find((preview) => preview.key === activeKey) ?? previews[0];
  if (!active) return null;
  const { invoice } = active;
  const payable = invoice?.status === "due" || invoice?.status === "overdue";

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-5">
        <PreviewStateToggle
          options={previews.map((preview) => ({ value: preview.key, label: preview.label }))}
          value={activeKey}
          onChange={setActiveKey}
        />
        <div className="space-y-6 rounded-xl border border-oak bg-card p-6 shadow-card">
          <h2 className="text-3xl">Find your invoice</h2>
          <div className="space-y-2">
            <Label htmlFor="invoice-number">Invoice number</Label>
            <Input
              id="invoice-number"
              readOnly
              value={active.invoiceNumber}
              className="min-h-11"
              aria-describedby="invoice-note"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invoice-zip">ZIP code</Label>
            <Input
              id="invoice-zip"
              readOnly
              value={active.zip}
              inputMode="numeric"
              className="min-h-11"
              aria-describedby="invoice-note"
            />
          </div>
          <PreviewButton variant="secondary" describedBy="invoice-note">
            Find invoice
          </PreviewButton>
          <p id="invoice-note" className="text-sm text-ink-soft">
            Preview only: fields are filled in for the selected sample and nothing is searched.
          </p>
        </div>

        <div className="rounded-xl border border-oak bg-oak-soft p-6">
          <h2 className="flex items-center gap-2 text-2xl">
            <ShieldCheck aria-hidden="true" size={22} strokeWidth={1.75} />
            About paying online
          </h2>
          <p className="mt-3 text-ink-soft">
            Card payments are planned to run through a hosted checkout page, so card details are
            entered there and not on this site. Online payment is not connected in this preview.
          </p>
          <p className="mt-3 text-ink-soft">
            Need help or prefer another way to pay?{" "}
            <Link href="/contact" className="font-semibold text-cedar-deep underline underline-offset-4">
              Contact us
            </Link>
            .
          </p>
        </div>

        {showPrototypeNotice ? (
          <Alert>
            <AlertTitle>Prototype notice</AlertTitle>
            <AlertDescription>
              Invoices shown here are fictional samples. Nothing can be paid yet.
            </AlertDescription>
          </Alert>
        ) : null}
      </div>

      <div className="space-y-6 lg:col-span-7" aria-live="polite">
        {invoice ? (
          <>
            <InvoiceCard invoice={invoice} estimate={active.estimate} />

            {payable ? (
              <div className="rounded-xl border border-oak bg-oak-soft p-6">
                <h2 className="text-3xl">
                  {invoice.status === "overdue" ? "This invoice is overdue" : "Payment due"}
                </h2>
                <div className="mt-5">
                  <PreviewButton describedBy="pay-note">
                    Pay {formatCents(invoice.amountCents)}
                  </PreviewButton>
                </div>
                <p id="pay-note" className="mt-3 text-sm text-ink-soft">
                  Preview only: this button is disabled and nothing is charged.
                </p>
              </div>
            ) : null}

            {invoice.status === "paid" ? (
              <div className="rounded-xl border border-oak bg-oak-soft p-6">
                <h2 className="text-3xl">Nothing to pay</h2>
                <p className="mt-3">This sample invoice is marked paid. No further payment is needed.</p>
              </div>
            ) : null}

            {invoice.status === "void" ? (
              <div className="rounded-xl border border-oak bg-oak-soft p-6">
                <h2 className="text-3xl">This invoice is void</h2>
                <p className="mt-3">
                  This sample invoice was cancelled, so nothing is owed on it. Contact us if you have
                  questions.
                </p>
                <div className="mt-5">
                  <CtaLink href="/contact" variant="secondary">
                    Contact us
                  </CtaLink>
                </div>
              </div>
            ) : null}
          </>
        ) : (
          <div className="rounded-xl border border-oak bg-card p-8 text-center shadow-card">
            <ReceiptText aria-hidden="true" size={36} strokeWidth={1.5} className="mx-auto text-ink-soft" />
            <h2 className="mt-4 text-3xl">We could not find that invoice</h2>
            <p className="mx-auto mt-3 text-ink-soft">
              Check the invoice number and ZIP code, then try again. If it still does not appear,
              contact us and we will help.
            </p>
            <div className="mt-6">
              <CtaLink href="/contact" variant="secondary">
                Contact us
              </CtaLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
