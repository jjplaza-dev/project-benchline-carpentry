import type { Metadata } from "next";
import { CategoryPage, type CategoryNote } from "@/components/services/CategoryPage";

export const metadata: Metadata = {
  title: "Decks & Exterior",
  description:
    "Deck and porch repairs, fences and gates, and outdoor woodwork in Bellingham and Whatcom County.",
};

/** General care guidance, not product or performance claims. Owner to review. */
const notes: readonly CategoryNote[] = [
  {
    title: "Let water leave",
    body: "Gaps between boards, clear gutters above and a little slope all help water drain. Water that sits is what rots wood.",
  },
  {
    title: "Check the connections",
    body: "Loose rail posts, wobbly stair stringers and rusty fasteners are early signs worth a look before they become bigger repairs.",
  },
  {
    title: "Match the material to the exposure",
    body: "A covered porch and an open deck face very different weather. We recommend materials based on how your structure is used and exposed.",
  },
  {
    title: "Keep up with the finish",
    body: "Cleaning and refinishing as a coating wears keeps small problems from growing into large ones.",
  },
];

/** P04 Decks & Exterior. */
export default function DecksExteriorPage() {
  return (
    <CategoryPage
      category="exterior"
      eyebrow="Decks & exterior"
      title={
        <>
          Outdoor wood,
          <br />
          built to weather.
        </>
      }
      intro="Decks, porches, fences, gates and the woodwork around your home, repaired or rebuilt so it stays solid."
      servicesHeading="Exterior services."
      projectsHeading="Exterior projects."
      notesHeading="Looking after outdoor wood."
      notes={notes}
      ruleLabel="exterior"
    />
  );
}
