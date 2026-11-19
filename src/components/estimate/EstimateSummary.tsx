import { SampleChip } from "@/components/primitives/SampleChip";
import type { Estimate } from "@/domain";
import { formatCents } from "@/lib/format";
import { estimateStatusLabels } from "@/lib/labels";

/** Read-only estimate: reference, scope, line items, total, deposit, balance, terms placeholder. */
export function EstimateSummary({ estimate }: { estimate: Estimate }) {
  const balanceCents = estimate.totalCents - estimate.depositCents;

  return (
    <div className="rounded-xl border border-oak bg-card p-6 shadow-card md:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <h2 className="text-3xl">Estimate {estimate.referenceCode}</h2>
        <span className="sample-chip">{estimateStatusLabels[estimate.status]}</span>
        <SampleChip isSample={estimate.isSample} />
      </div>
      <p className="mt-2 text-sm text-ink-soft">{estimate.validUntilLabel}</p>

      <h3 className="mt-8 text-2xl">Scope of work</h3>
      <p className="mt-2">{estimate.scopeSummary}</p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[20rem] border-collapse text-left">
          <caption className="sr-only">Line items for estimate {estimate.referenceCode}</caption>
          <thead>
            <tr className="border-b-2 border-ink text-sm">
              <th scope="col" className="py-2 pr-4 font-semibold">
                Item
              </th>
              <th scope="col" className="py-2 text-right font-semibold">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {estimate.lineItems.map((item) => (
              <tr key={item.label} className="border-b border-oak">
                <th scope="row" className="py-3 pr-4 font-normal">
                  {item.label}
                </th>
                <td className="py-3 text-right tabular-nums">{formatCents(item.amountCents)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th scope="row" className="pt-4 pr-4 text-lg font-semibold">
                Total
              </th>
              <td className="pt-4 text-right text-lg font-semibold tabular-nums">
                {formatCents(estimate.totalCents)}
              </td>
            </tr>
            <tr>
              <th scope="row" className="pt-2 pr-4 font-normal text-ink-soft">
                Deposit to start
              </th>
              <td className="pt-2 text-right tabular-nums">{formatCents(estimate.depositCents)}</td>
            </tr>
            <tr>
              <th scope="row" className="pt-2 pr-4 font-normal text-ink-soft">
                Balance after the work
              </th>
              <td className="pt-2 text-right tabular-nums">{formatCents(balanceCents)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <p className="mt-8 border-t border-oak pt-4 text-sm text-ink-soft">
        Terms summary: placeholder text that needs owner and legal review. Amounts shown are sample
        figures that demonstrate the payment flow, not prices Benchline charges.
      </p>
    </div>
  );
}
