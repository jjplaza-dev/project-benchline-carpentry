import { CircleAlert, Clock, Undo2 } from "lucide-react";
import { CtaLink } from "@/components/primitives/CtaLink";
import { SampleChip } from "@/components/primitives/SampleChip";
import type { PaymentOutcome, PaymentOutcomeKind } from "@/domain";

const titles: Record<PaymentOutcomeKind, string> = {
  "pending-confirmation": "Payment submitted, confirmation pending",
  cancelled: "Payment cancelled",
  error: "We could not start your payment",
};

const icons = {
  "pending-confirmation": Clock,
  cancelled: Undo2,
  error: CircleAlert,
} as const;

/**
 * One payment result state. The pending state never says payment is confirmed:
 * a browser redirect alone cannot prove that.
 */
export function PaymentResultPanel({ outcome }: { outcome: PaymentOutcome }) {
  const Icon = icons[outcome.kind];

  return (
    <section
      aria-labelledby={`result-${outcome.kind}`}
      className="rounded-xl border border-oak bg-card p-6 shadow-card md:p-8"
    >
      <div className="flex flex-wrap items-center gap-3">
        <SampleChip label="Preview state" alwaysShow />
      </div>
      <div className="mt-5 flex items-start gap-4">
        <Icon aria-hidden="true" size={32} strokeWidth={1.5} className="mt-1 shrink-0" />
        <div>
          <h2 id={`result-${outcome.kind}`} className="text-3xl">
            {titles[outcome.kind]}
          </h2>
          <p className="mt-3">{outcome.message}</p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <CtaLink href="/pay-invoice" variant="secondary">
          Return to your invoice
        </CtaLink>
        <CtaLink href="/contact" variant="secondary">
          Contact us
        </CtaLink>
      </div>
    </section>
  );
}
