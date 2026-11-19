import type { Metadata } from "next";
import {
  StatusLookupPreview,
  type StatusPreview,
} from "@/components/estimate/StatusLookupPreview";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { PROTOTYPE_NOTICES } from "@/data/site-flags";
import { getEstimateByReference, lookupStatus } from "@/lib/selectors";

export const metadata: Metadata = {
  title: "Project Status",
  description: "Look up where your estimate request or project stands.",
};

/** Sample lookups used by the preview toggle. All codes are fictional demo references. */
const lookups = [
  { key: "estimate-sent", label: "Found: estimate sent", referenceCode: "BL-DEMO-1004", zip: "98226" },
  { key: "in-progress", label: "Found: in progress", referenceCode: "BL-DEMO-1007", zip: "98229" },
  { key: "not-found", label: "Not found", referenceCode: "BL-DEMO-0000", zip: "98225" },
] as const;

/** P10 Project status lookup: preview of found and not-found states. */
export default function ProjectStatusPage() {
  const previews: StatusPreview[] = lookups.map((lookup) => ({
    ...lookup,
    record: lookupStatus(lookup.referenceCode, lookup.zip),
    estimate: getEstimateByReference(lookup.referenceCode),
  }));

  return (
    <>
      <PageHero
        eyebrow="Project status"
        title={
          <>
            Where does
            <br />
            it stand?
          </>
        }
        intro={<p>Use your reference code and ZIP code to see how your request or project is going.</p>}
        titleId="status-title"
      />
      <Section aria-labelledby="status-lookup-title" padded={false} className="pb-24">
        <h2 id="status-lookup-title" className="sr-only">
          Status lookup
        </h2>
        <StatusLookupPreview previews={previews} showPrototypeNotice={PROTOTYPE_NOTICES} />
      </Section>
    </>
  );
}
