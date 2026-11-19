import { SampleChip } from "@/components/primitives/SampleChip";
import type { Estimate, Invoice } from "@/domain";
import { formatCents } from "@/lib/format";
import { invoiceKindLabels, invoiceStatusLabels } from "@/lib/labels";

interface InvoiceCardProps {
  invoice: Invoice;
  /** The estimate this invoice belongs to, when known. */
  estimate?: Estimate;
}

/** Invoice summary: number, kind, description, amount and status stated in text. */
export function InvoiceCard({ invoice, estimate }: InvoiceCardProps) {
  return (
    <div className="rounded-xl border border-oak bg-card p-6 shadow-card md:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-3xl">{invoice.number}</h2>
        <span className="sample-chip">{invoiceStatusLabels[invoice.status]}</span>
        <SampleChip isSample={invoice.isSample} />
      </div>
      <p className="mt-2 text-sm font-semibold text-ink-soft">{invoiceKindLabels[invoice.kind]}</p>
      <p className="mt-6">{invoice.description}</p>

      <dl className="mt-8 grid gap-4 sm:grid-cols-2">
        <div>
          <dt className="text-sm font-semibold text-ink-soft">Amount</dt>
          <dd className="font-display text-5xl leading-none font-bold tabular-nums">
            {formatCents(invoice.amountCents)}
          </dd>
        </div>
        {estimate ? (
          <div>
            <dt className="text-sm font-semibold text-ink-soft">Estimate reference</dt>
            <dd className="text-lg font-semibold">{estimate.referenceCode}</dd>
          </div>
        ) : null}
      </dl>
    </div>
  );
}
