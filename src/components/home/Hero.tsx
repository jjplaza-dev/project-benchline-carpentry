import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { CtaLink } from "@/components/primitives/CtaLink";
import { ImageFrame } from "@/components/primitives/ImageFrame";
import { MeasureRule } from "@/components/primitives/MeasureRule";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { estimateHref } from "@/lib/links";
import { getAssetById } from "@/lib/selectors";

/**
 * Editorial hero. Two attention effects only: the magnetic primary CTA and the clip reveal
 * on the image. The H1 and copy render at full visibility with no motion dependency.
 */
export function Hero() {
  const asset = getAssetById("ast-hero-composition");

  return (
    <Section
      tone="ivory"
      grid
      padded={false}
      aria-labelledby="home-title"
      className="pt-10 pb-16 md:pt-16 md:pb-24"
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <SectionLabel>Bellingham, Washington</SectionLabel>
          <h1 id="home-title" className="mt-6">
            <span className="block">Good work.</span>
            <span className="block">Straight lines.</span>
            <span className="block">Homes built</span>
            <span className="block">to last.</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl">
            Practical carpentry and home repairs for Bellingham and the surrounding Whatcom County
            communities.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <MagneticButton>
              <CtaLink href={estimateHref()} large arrow>
                Request an Estimate
              </CtaLink>
            </MagneticButton>
            <Link
              href="/projects"
              className="inline-flex min-h-11 items-center font-semibold text-cedar-deep underline underline-offset-4 hover:text-ink"
            >
              See recent projects
            </Link>
          </div>
        </div>

        {asset ? (
          <div className="relative pb-12 pl-10 lg:col-span-5">
            <MeasureRule
              orientation="vertical"
              label="36 in"
              className="absolute top-0 bottom-12 left-0"
            />
            <Reveal variant="clip">
              <ImageFrame
                asset={asset}
                aspect="aspect-[4/5]"
                sizes="(min-width: 1024px) 480px, 90vw"
                priority
              />
            </Reveal>
            <MeasureRule className="mt-4" label="14 ft" />
          </div>
        ) : null}
      </div>
    </Section>
  );
}
