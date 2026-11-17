import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/motion/Reveal";
import { CtaLink } from "@/components/primitives/CtaLink";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { ServiceGrid } from "@/components/services/ServiceCard";
import { getServices } from "@/lib/selectors";

export function ServicesOverview() {
  return (
    <Section aria-labelledby="services-title">
      <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel>What we do</SectionLabel>
          <h2 id="services-title" className="mt-5">
            Repairs that stay fixed.
            <br />
            Builds that fit.
          </h2>
          <p className="mt-6 text-lg">
            From a wobbly deck rail to built-in storage, we handle the frustrating repairs and have
            the skills for custom work.
          </p>
        </div>
        <CtaLink href="/services" variant="secondary" arrow>
          View all services
        </CtaLink>
      </Reveal>
      <div className="mt-12">
        <ServiceGrid services={getServices()} />
      </div>
    </Section>
  );
}
