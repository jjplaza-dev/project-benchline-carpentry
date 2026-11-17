import { Section } from "@/components/layout/Section";
import { CtaLink } from "@/components/primitives/CtaLink";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { ProcessStrip } from "@/components/services/ProcessStrip";
import { estimateHref } from "@/lib/links";

export function HowEstimateWorks() {
  return (
    <Section tone="ink" grid aria-labelledby="process-title">
      <SectionLabel>How an estimate works</SectionLabel>
      <h2 id="process-title" className="mt-5">
        Four steps from
        <br />
        photos to scheduled.
      </h2>
      <div className="mt-14">
        <ProcessStrip />
      </div>
      <div className="mt-14">
        <CtaLink href={estimateHref()} variant="light" large arrow>
          Start your request
        </CtaLink>
      </div>
    </Section>
  );
}
