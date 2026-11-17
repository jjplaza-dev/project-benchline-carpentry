import type { ReactNode } from "react";
import { MeasureRule } from "@/components/primitives/MeasureRule";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { Section, type SectionTone } from "./Section";

interface PageHeroProps {
  /** Short uppercase label above the heading. */
  eyebrow: string;
  /** The page's h1. Use deliberate line breaks (for example with <br />). */
  title: ReactNode;
  intro?: ReactNode;
  /** Buttons or links under the intro. */
  actions?: ReactNode;
  /** Optional side content (image frame, summary card). */
  aside?: ReactNode;
  /** Dimension annotation on the closing rule, for example "36 in". */
  ruleLabel?: string;
  tone?: SectionTone;
  /** Unique id for the h1, used for aria-labelledby. */
  titleId?: string;
}

/** Interior-page hero: label, large h1, intro, actions, optional aside, grid and grain background. */
export function PageHero({
  eyebrow,
  title,
  intro,
  actions,
  aside,
  ruleLabel,
  tone = "ivory",
  titleId = "page-title",
}: PageHeroProps) {
  return (
    <Section tone={tone} grid aria-labelledby={titleId} className="pb-12 md:pb-16">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
        <div className={aside ? "lg:col-span-8" : "lg:col-span-10"}>
          <SectionLabel>{eyebrow}</SectionLabel>
          <h1 id={titleId} className="mt-6">
            {title}
          </h1>
          {intro ? <div className="mt-8 max-w-[60ch] text-lg">{intro}</div> : null}
          {actions ? <div className="mt-10 flex flex-wrap items-center gap-4">{actions}</div> : null}
        </div>
        {aside ? <div className="lg:col-span-4">{aside}</div> : null}
      </div>
      <MeasureRule className="mt-14" label={ruleLabel} />
    </Section>
  );
}
