import type { Metadata } from "next";
import { Mail, Phone, Ruler } from "lucide-react";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { DashList } from "@/components/primitives/DashList";
import { CopyButton } from "@/components/primitives/CopyButton";
import { SampleChip } from "@/components/primitives/SampleChip";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { ServiceAreaChecker } from "@/components/services/ServiceAreaChecker";
import { toMailHref, toTelHref } from "@/lib/contact";
import { estimateHref } from "@/lib/links";
import { getBusinessProfile, getServiceAreas } from "@/lib/selectors";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, email or send photos to Benchline Carpentry & Home Repair in Bellingham, Washington.",
};

const messageTips = [
  "What needs doing, in a sentence or two",
  "Where the job is: town and ZIP code",
  "A few photos, wide and close up",
  "When you would like it done",
] as const;

const cardClass =
  "flex min-h-11 flex-col gap-3 rounded-xl border border-oak bg-card p-6 shadow-card transition-shadow hover:shadow-card-lift";

/** P12 Contact. Phone and email are placeholders and are marked as such. */
export default function ContactPage() {
  const profile = getBusinessProfile();
  const areas = getServiceAreas();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&rsquo;s talk
            <br />
            about the job.
          </>
        }
        intro={<p>Call, email, or send photos with a request. Whichever is easiest for you.</p>}
        ruleLabel={profile.phone}
        titleId="contact-title"
      />

      <Section aria-labelledby="contact-options-title" padded={false} className="pb-16">
        <h2 id="contact-options-title" className="sr-only">
          Contact options
        </h2>
        <ul className="grid gap-6 md:grid-cols-3">
          <li>
            <div className={cardClass}>
              <Phone aria-hidden="true" size={28} strokeWidth={1.5} />
              <span className="text-sm font-semibold text-ink-soft">Call</span>
              <a
                href={toTelHref(profile.phone)}
                className="inline-flex min-h-11 items-center text-2xl font-semibold underline-offset-4 hover:underline"
              >
                {profile.phone}
              </a>
              <SampleChip label="Placeholder" isSample={profile.placeholderFlags.phone} className="self-start" />
              <CopyButton text={profile.phone} label="Copy phone number">
                Copy number
              </CopyButton>
            </div>
          </li>
          <li>
            <div className={cardClass}>
              <Mail aria-hidden="true" size={28} strokeWidth={1.5} />
              <span className="text-sm font-semibold text-ink-soft">Email</span>
              <a
                href={toMailHref(profile.email)}
                className="inline-flex min-h-11 items-center text-2xl font-semibold break-all underline-offset-4 hover:underline"
              >
                {profile.email}
              </a>
              <SampleChip label="Placeholder" isSample={profile.placeholderFlags.email} className="self-start" />
              <CopyButton text={profile.email} label="Copy email address">
                Copy email
              </CopyButton>
            </div>
          </li>
          <li>
            <a href={estimateHref()} className={cardClass}>
              <Ruler aria-hidden="true" size={28} strokeWidth={1.5} />
              <span className="text-sm font-semibold text-ink-soft">Send photos</span>
              <span className="text-2xl font-semibold">Request an estimate</span>
              <span className="text-ink-soft">A guided form takes a few minutes.</span>
            </a>
          </li>
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-4 text-ink-soft">
          <p>{profile.hoursNote}</p>
          <SampleChip label="Placeholder" isSample={profile.placeholderFlags.hours} />
          <CopyButton
            label="Copy all contact details"
            text={`${profile.name}\nPhone: ${profile.phone}\nEmail: ${profile.email}\nService area: ${profile.serviceAreaSummary}`}
          >
            Copy all details
          </CopyButton>
        </div>
      </Section>

      <Section tone="oak" aria-labelledby="contact-area-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel>Where we work</SectionLabel>
            <h2 id="contact-area-title" className="mt-5">
              Whatcom County.
            </h2>
            <p className="mt-6 text-lg">{profile.serviceAreaSummary}</p>
            <ul className="mt-6">
              {areas.map((area) => (
                <li key={area.id} className="flex min-h-11 items-center gap-3 font-semibold">
                  <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-cedar" />
                  {area.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-7">
            <ServiceAreaChecker areas={areas} idPrefix="contact-area" />
          </div>
        </div>
      </Section>

      <Section aria-labelledby="message-tips-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel>Before you reach out</SectionLabel>
            <h2 id="message-tips-title" className="mt-5">
              What to include.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <DashList items={messageTips} className="text-lg" />
          </div>
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
