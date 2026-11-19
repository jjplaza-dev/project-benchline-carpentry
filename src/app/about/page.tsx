import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ImageFrame } from "@/components/primitives/ImageFrame";
import { SampleChip } from "@/components/primitives/SampleChip";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { ProcessStrip } from "@/components/services/ProcessStrip";
import { getAssetById, getBusinessProfile, getServiceAreas } from "@/lib/selectors";

export const metadata: Metadata = {
  title: "About",
  description:
    "Benchline Carpentry & Home Repair is a local carpentry and home repair business in Bellingham, Washington.",
};

/** Workmanship principles: stated as principles, not factual claims. Owner to review. */
const principles = [
  {
    title: "Straight lines",
    body: "Square, plumb and level are the baseline. The details are what make a repair look like it was always there.",
  },
  {
    title: "Plain talk",
    body: "We explain what we find and what we recommend in everyday language, so you can decide with confidence.",
  },
  {
    title: "Respect for your home",
    body: "We protect the areas we work in and tidy up as we go, because it is your home, not a job site.",
  },
  {
    title: "Fix the cause",
    body: "A repair that only hides the problem comes back. We look for why something failed before we fix it.",
  },
] as const;

/** P07 About. The owner story is a clearly labeled placeholder. */
export default function AboutPage() {
  const profile = getBusinessProfile();
  const asset = getAssetById("ast-about-workbench");
  const areas = getServiceAreas();

  return (
    <>
      <PageHero
        eyebrow="About Benchline"
        title={
          <>
            A local carpenter,
            <br />
            not a corporation.
          </>
        }
        intro={
          <p>
            Benchline Carpentry &amp; Home Repair is a local carpentry and home repair business in
            Bellingham, Washington, serving Whatcom County.
          </p>
        }
        ruleLabel="Bellingham, WA"
        titleId="about-title"
        aside={
          asset ? <ImageFrame asset={asset} sizes="(min-width: 1024px) 400px, 90vw" priority /> : undefined
        }
      />

      <Section aria-labelledby="story-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel>Our approach</SectionLabel>
            <h2 id="story-title" className="mt-5">
              The carpenter
              <br />
              you recommend.
            </h2>
          </div>
          <div className="space-y-5 text-lg lg:col-span-7">
            <p>
              We want to be the carpenter you recommend to a neighbor: the one who handles the
              frustrating repairs and has the skills for a custom build.
            </p>
            <div className="rounded-xl border border-dashed border-line-strong bg-card p-6">
              <div className="flex flex-wrap items-center gap-3">
                <p className="font-semibold">Meet the owner</p>
                <SampleChip label="Placeholder" />
              </div>
              <p className="mt-2 text-base text-ink-soft">
                The owner&rsquo;s name, photo and short story will go here once Benchline supplies
                them.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="oak" aria-labelledby="principles-title">
        <SectionLabel>How we work</SectionLabel>
        <h2 id="principles-title" className="mt-5">
          Four principles.
        </h2>
        <ul className="mt-12 grid gap-8 md:grid-cols-2">
          {principles.map((principle) => (
            <li key={principle.title} className="border-t-2 border-moss pt-5">
              <h3>{principle.title}</h3>
              <p className="mt-3">{principle.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section aria-labelledby="local-title">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel>Local focus</SectionLabel>
            <h2 id="local-title" className="mt-5">
              Close to home.
            </h2>
            <p className="mt-6 text-lg">{profile.serviceAreaSummary}</p>
          </div>
          <ul className="grid content-start gap-x-8 sm:grid-cols-2 lg:col-span-6">
            {areas.map((area) => (
              <li key={area.id} className="flex min-h-11 items-center gap-3 font-semibold">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-cedar" />
                {area.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-oak pt-6 text-sm text-ink-soft">
          <SampleChip label="Placeholder" isSample={profile.placeholderFlags.registration} />
          <p>{profile.registrationNote}</p>
        </div>
      </Section>

      <Section tone="oak" aria-labelledby="about-process-title">
        <SectionLabel>From photos to scheduled</SectionLabel>
        <h2 id="about-process-title" className="mt-5">
          What working with us looks like.
        </h2>
        <div className="mt-12">
          <ProcessStrip />
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
