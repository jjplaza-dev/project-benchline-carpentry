import type { Metadata } from "next";
import {
  InvoicePreview,
  type InvoiceLookupPreview,
} from "@/components/payments/InvoicePreview";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { PROTOTYPE_NOTICES } from "@/data/site-flags";
import { getEstimateById, lookupInvoice } from "@/lib/selectors";

export const metadata: Metadata = {
  title: "Pay an Invoice",
  description: "Find your invoice with its number and ZIP code, then pay online.",
};

/** Sample lookups used by the preview toggle. All numbers are fictional demo values. */
const lookups = [
  { key: "due", label: "Due", invoiceNumber: "INV-DEMO-5001", zip: "98230" },
  { key: "paid", label: "Paid", invoiceNumber: "INV-DEMO-5002", zip: "98230" },
  { key: "overdue", label: "Overdue", invoiceNumber: "INV-DEMO-5005", zip: "98225" },
  { key: "void", label: "Void", invoiceNumber: "INV-DEMO-5006", zip: "98264" },
  { key: "not-found", label: "Not found", invoiceNumber: "INV-DEMO-0000", zip: "98225" },
] as const;

/** P13 Pay an Invoice: preview of due, paid, overdue, void and not-found states. */
export default function PayInvoicePage() {
  const previews: InvoiceLookupPreview[] = lookups.map((lookup) => {
    const invoice = lookupInvoice(lookup.invoiceNumber, lookup.zip);
    return {
      ...lookup,
      invoice,
      estimate: invoice ? getEstimateById(invoice.estimateId) : undefined,
    };
  });

  return (
    <>
      <PageHero
        eyebrow="Pay an invoice"
        title={
          <>
            Settle up
            <br />
            in a minute.
          </>
        }
        intro={<p>Enter your invoice number and ZIP code to find your invoice and pay online.</p>}
        titleId="invoice-title"
      />
      <Section aria-labelledby="invoice-preview-title" padded={false} className="pb-24">
        <h2 id="invoice-preview-title" className="sr-only">
          Invoice lookup
        </h2>
        <InvoicePreview previews={previews} showPrototypeNotice={PROTOTYPE_NOTICES} />
      </Section>
    </>
  );
}
