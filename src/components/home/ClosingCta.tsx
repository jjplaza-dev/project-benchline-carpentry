import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { CtaLink } from "@/components/primitives/CtaLink";
import { SampleChip } from "@/components/primitives/SampleChip";
import { Section } from "@/components/layout/Section";
import type { EstimateIntent, ServiceSlug } from "@/domain";
import { toTelHref } from "@/lib/contact";
import { estimateHref } from "@/lib/links";
import { getBusinessProfile } from "@/lib/selectors";

interface ClosingCtaProps {
  heading?: ReactNode;
  body?: ReactNode;
  /** Preselects a service on the estimate form (query param, used from Phase 4). */
  serviceSlug?: ServiceSlug;
  intent?: EstimateIntent;
  label?: string;
}

/** Closing band: ink background, ivory text, cedar CTA and click-to-call. */
export function ClosingCta({
  heading = (
    <>
      Something that needs fixing?
      <br />
      Send photos. Get a clear estimate.
    </>
  ),
  body = "Tell us what is going on, add a few photos, and we will come back with a written estimate.",
  serviceSlug,
  intent,
  label = "Request an Estimate",
}: ClosingCtaProps) {
  const profile = getBusinessProfile();

  return (
    <Section tone="ink" grid aria-labelledby="closing-cta-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <h2 id="closing-cta-title">{heading}</h2>
          <p className="mt-6 text-lg text-ivory/85">{body}</p>
        </div>
        <div className="flex flex-col items-start gap-4 lg:col-span-5 lg:items-end">
          <CtaLink href={estimateHref(serviceSlug, intent)} large arrow>
            {label}
          </CtaLink>
          <div className="flex flex-wrap items-center gap-3">
            <CtaLink href={toTelHref(profile.phone)} variant="light" large>
              <Phone aria-hidden="true" size={20} strokeWidth={1.75} />
              Call {profile.phone}
            </CtaLink>
            <SampleChip label="Placeholder" isSample={profile.placeholderFlags.phone} />
          </div>
        </div>
      </div>
    </Section>
  );
}
