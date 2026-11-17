import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaLink } from "@/components/primitives/CtaLink";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { ProcessStrip } from "@/components/services/ProcessStrip";
import { ServiceGrid } from "@/components/services/ServiceCard";
import { estimateHref } from "@/lib/links";
import { getServices } from "@/lib/selectors";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Deck and porch repairs, fences and gates, doors and trim, custom storage, general home repairs and a half-day fix list in Bellingham and Whatcom County.",
};

/** P02 Our Services: full catalogue, pricing note, process strip. */
export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={
          <>
            What we build
            <br />
            and what we fix.
          </>
        }
        intro={
          <p>
            Six ways we help, from a single wobbly rail to built-in storage sized to your space.
          </p>
        }
        ruleLabel="6 services"
        titleId="services-title"
        actions={
          <CtaLink href={estimateHref()} large arrow>
            Request an Estimate
          </CtaLink>
        }
      />

      <Section aria-labelledby="services-catalogue-title">
        <SectionLabel>The full list</SectionLabel>
        <h2 id="services-catalogue-title" className="mt-5">
          Pick the closest fit.
        </h2>
        <div className="mt-12">
          <ServiceGrid services={getServices()} />
        </div>
      </Section>

      <Section tone="oak" aria-labelledby="pricing-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel>Pricing</SectionLabel>
            <h2 id="pricing-title" className="mt-5">
              Quoted per scope.
            </h2>
          </div>
          <div className="space-y-5 text-lg lg:col-span-7">
            <p>
              We do not publish a price list because no two repairs or builds are alike. Every
              estimate is written for your specific job after we review your photos or visit the
              site, so you see exactly what is included before you decide anything.
            </p>
            <p>
              The Half-Day Fix List works from your list instead. We confirm what fits in a half-day
              before we book it.
            </p>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="services-process-title">
        <SectionLabel>How it works</SectionLabel>
        <h2 id="services-process-title" className="mt-5">
          From photos to scheduled.
        </h2>
        <div className="mt-12">
          <ProcessStrip />
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
