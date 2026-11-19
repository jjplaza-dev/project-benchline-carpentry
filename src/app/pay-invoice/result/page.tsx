import type { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { PaymentResultPanel } from "@/components/payments/PaymentResultPanel";
import { getPaymentOutcomePreviews } from "@/lib/selectors";

export const metadata: Metadata = {
  title: "Payment Result",
  description: "What you will see after returning from checkout.",
};

/** P14 Payment result: static previews of every outcome state. */
export default function PaymentResultPage() {
  const outcomes = getPaymentOutcomePreviews();

  return (
    <>
      <PageHero
        eyebrow="Payment result"
        title={
          <>
            What you&rsquo;ll see
            <br />
            after checkout.
          </>
        }
        intro={<p>Three possible results, shown here as static previews.</p>}
        titleId="result-title"
      />
      <Section aria-labelledby="result-states-title" padded={false} className="pb-24">
        <h2 id="result-states-title" className="sr-only">
          Payment result states
        </h2>
        <Alert className="mb-10">
          <AlertTitle>A redirect alone never confirms payment</AlertTitle>
          <AlertDescription>
            Returning to this site from checkout does not prove a payment went through, so the
            success state says confirmation is pending and never claims the invoice is paid.
          </AlertDescription>
        </Alert>
        <div className="grid gap-8 lg:grid-cols-3">
          {outcomes.map((outcome) => (
            <PaymentResultPanel key={outcome.kind} outcome={outcome} />
          ))}
        </div>
      </Section>
    </>
  );
}
