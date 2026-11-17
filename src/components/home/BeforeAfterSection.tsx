import { Section } from "@/components/layout/Section";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { BeforeAfterSlider } from "@/components/projects/BeforeAfterSlider";
import { getAssetById, getBeforeAfterPairs, getProjectById } from "@/lib/selectors";

/** Workmanship notes are written as principles, not factual claims. */
const principles = [
  {
    title: "Clear communication",
    body: "We aim to explain what we find and what we recommend in plain language, before any work begins.",
  },
  {
    title: "A clean worksite",
    body: "The area we work in should be as tidy at the end of the day as the work itself.",
  },
  {
    title: "Joints that stay tight",
    body: "Square corners, even gaps and finishes meant to hold up, because the details are the job.",
  },
] as const;

export function BeforeAfterSection() {
  const pair = getBeforeAfterPairs()[0];
  const before = pair ? getAssetById(pair.beforeAssetId) : undefined;
  const after = pair ? getAssetById(pair.afterAssetId) : undefined;
  const project = pair ? getProjectById(pair.projectId) : undefined;

  return (
    <Section aria-labelledby="before-after-title">
      <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
        {pair && before && after ? (
          <div className="lg:col-span-7">
            <BeforeAfterSlider
              before={before}
              after={after}
              caption={project ? `${project.title}, ${project.locationLabel}. ${pair.caption}` : pair.caption}
              isSample={pair.isSample}
            />
          </div>
        ) : null}
        <div className="lg:col-span-5">
          <SectionLabel>Before &amp; after</SectionLabel>
          <h2 id="before-after-title" className="mt-5">
            From worn out
            <br />
            to well built.
          </h2>
          <p className="mt-6 text-lg">
            Drag the handle, or focus it and use the arrow keys, to compare a repair before and
            after.
          </p>
          <ul className="mt-8 space-y-6">
            {principles.map((principle) => (
              <li key={principle.title} className="border-t-2 border-moss pt-4">
                <h3 className="text-2xl">{principle.title}</h3>
                <p className="mt-2 text-ink-soft">{principle.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
