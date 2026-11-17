import type { Metadata } from "next";
import { CategoryPage, type CategoryNote } from "@/components/services/CategoryPage";

export const metadata: Metadata = {
  title: "Interior Carpentry",
  description:
    "Doors, trim, shelving and custom storage built and fitted with care in Bellingham and Whatcom County.",
};

/** General finish-quality principles, not factual claims. Owner to review. */
const notes: readonly CategoryNote[] = [
  {
    title: "Tight joints",
    body: "Well-fit casing and clean mitered corners look quiet. Gaps are what draw the eye.",
  },
  {
    title: "Even reveals",
    body: "A door with an even gap around its edge closes cleanly and looks right in its frame.",
  },
  {
    title: "Prep before finish",
    body: "Filled nail holes, caulked seams and sanded edges are what a good paint finish rests on.",
  },
  {
    title: "Built for how you live",
    body: "Storage works when it matches what you keep and how you use it, so we start with that.",
  },
];

/** P05 Interior Carpentry. */
export default function InteriorCarpentryPage() {
  return (
    <CategoryPage
      category="interior"
      eyebrow="Interior carpentry"
      title={
        <>
          Finished work
          <br />
          you live with.
        </>
      }
      intro="Doors, trim, shelving and custom storage, built and fitted so the details hold up to daily use."
      servicesHeading="Interior services."
      projectsHeading="Interior projects."
      notesHeading="What good finish work looks like."
      notes={notes}
      ruleLabel="interior"
    />
  );
}
