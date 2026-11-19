import type { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { FaqAccordion } from "@/components/services/FaqAccordion";
import { PROTOTYPE_NOTICES } from "@/data/site-flags";
import { faqCategoryLabels, faqCategoryOrder } from "@/lib/labels";
import { getFaqsByCategory } from "@/lib/selectors";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about estimates, scheduling, payments, materials and our service area.",
};

/** P15 FAQ: grouped accordions. Answers are draft copy for the owner to confirm. */
export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Straight
            <br />
            answers.
          </>
        }
        intro={<p>The questions we hear most about estimates, scheduling, payments and the work itself.</p>}
        titleId="faq-title"
      />

      <Section aria-labelledby="faq-groups-title" padded={false} className="pb-24">
        <h2 id="faq-groups-title" className="sr-only">
          Questions by topic
        </h2>
        {PROTOTYPE_NOTICES ? (
          <Alert className="mb-12">
            <AlertTitle>Draft answers: owner review needed</AlertTitle>
            <AlertDescription>
              These answers describe how Benchline might work as drafted and must be confirmed by the
              owner before the site is published.
            </AlertDescription>
          </Alert>
        ) : null}

        <div className="space-y-16">
          {faqCategoryOrder.map((category) => {
            const faqs = getFaqsByCategory(category);
            if (faqs.length === 0) return null;
            const headingId = `faq-${category}`;
            return (
              <section key={category} aria-labelledby={headingId} className="grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <SectionLabel>Topic</SectionLabel>
                  <h3 id={headingId} className="mt-4 text-4xl">
                    {faqCategoryLabels[category]}
                  </h3>
                </div>
                <div className="lg:col-span-8">
                  <FaqAccordion faqs={faqs} />
                </div>
              </section>
            );
          })}
        </div>
      </Section>

      <ClosingCta
        heading={
          <>
            Still have a question?
            <br />
            Send it with a photo.
          </>
        }
      />
    </>
  );
}
