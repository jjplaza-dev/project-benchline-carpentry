import { Section } from "@/components/layout/Section";
import { CtaLink } from "@/components/primitives/CtaLink";
import { MeasureRule } from "@/components/primitives/MeasureRule";
import { SectionLabel } from "@/components/primitives/SectionLabel";

/** P18 404. Helpful links back to the main routes. */
export default function NotFound() {
  return (
    <Section grid aria-labelledby="not-found-title">
      <SectionLabel>Page not found</SectionLabel>
      <h1 id="not-found-title" className="mt-6">
        That cut
        <br />
        came up short.
      </h1>
      <p className="mt-8 text-lg">
        We could not find the page you were looking for. It may have moved, or the link may have a
        typo.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <CtaLink href="/public" large arrow>
          Back to home
        </CtaLink>
        <CtaLink href="/request-estimate" variant="secondary" large>
          Request an Estimate
        </CtaLink>
        <CtaLink href="/services" variant="secondary" large>
          Our services
        </CtaLink>
      </div>
      <MeasureRule className="mt-16" label="404" />
    </Section>
  );
}
