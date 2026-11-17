/**
 * Project fixtures: eight FICTIONAL SAMPLE projects (assumption A4).
 * Each carries `isSample: true`. Replace with real, owner-approved projects.
 * Coverage: exterior (4), interior (3), general (1); three have before/after pairs.
 */

import type { Project, ProjectId } from "@/domain";

export const projects: readonly Project[] = [
  {
    id: "prj-ferndale-deck-rail-rebuild",
    slug: "ferndale-deck-rail-rebuild",
    title: "Deck rail and stair rebuild",
    serviceIds: ["svc-deck-porch-repairs"],
    townId: "area-ferndale",
    locationLabel: "Ferndale, Washington",
    summary:
      "Loose rail posts and a cracked stair stringer replaced with new framing, so the deck feels solid from the top step to the last.",
    assetIds: ["ast-ba-ferndale-deck-rail-after", "ast-ba-ferndale-deck-rail-before"],
    beforeAfterId: "ba-ferndale-deck-rail",
    isSample: true,
  },
  {
    id: "prj-lynden-picket-fence",
    slug: "lynden-picket-fence",
    title: "Picket fence and walk gate",
    serviceIds: ["svc-fences-gates"],
    townId: "area-lynden",
    locationLabel: "Lynden, Washington",
    summary:
      "A new picket run with set posts and a walk gate that swings true and latches without a fight.",
    assetIds: ["ast-project-lynden-picket-fence"],
    isSample: true,
  },
  {
    id: "prj-bellingham-mudroom-bench",
    slug: "bellingham-mudroom-bench",
    title: "Mudroom bench with cubbies",
    serviceIds: ["svc-custom-storage"],
    townId: "area-bellingham",
    locationLabel: "Bellingham, Washington",
    summary:
      "A built-in bench with cubbies and hooks, sized to the entry so coats and boots finally have a place.",
    assetIds: ["ast-project-bellingham-mudroom-bench"],
    isSample: true,
  },
  {
    id: "prj-birch-bay-porch-steps",
    slug: "birch-bay-porch-steps",
    title: "Porch steps and post replacement",
    serviceIds: ["svc-deck-porch-repairs"],
    townId: "area-birch-bay",
    locationLabel: "Birch Bay, Washington",
    summary:
      "Worn steps and a rotted post replaced with new framing, set level and square at the front entry.",
    assetIds: ["ast-ba-birch-bay-porch-steps-after", "ast-ba-birch-bay-porch-steps-before"],
    beforeAfterId: "ba-birch-bay-porch-steps",
    isSample: true,
  },
  {
    id: "prj-bellingham-door-casing",
    slug: "bellingham-door-casing",
    title: "Interior door and casing refresh",
    serviceIds: ["svc-doors-trim"],
    townId: "area-bellingham",
    locationLabel: "Bellingham, Washington",
    summary:
      "A sticking door replaced and worn casing swapped for tight, mitered trim that reads as original.",
    assetIds: ["ast-ba-bellingham-door-casing-after", "ast-ba-bellingham-door-casing-before"],
    beforeAfterId: "ba-bellingham-door-casing",
    isSample: true,
  },
  {
    id: "prj-blaine-gate-rehang",
    slug: "blaine-gate-rehang",
    title: "Sagging gate rehang",
    serviceIds: ["svc-fences-gates", "svc-general-home-repairs"],
    townId: "area-blaine",
    locationLabel: "Blaine, Washington",
    summary:
      "A gate that dragged on the ground, rehung on a reset post with new hinges and a latch that catches.",
    assetIds: ["ast-project-blaine-gate-rehang"],
    isSample: true,
  },
  {
    id: "prj-sudden-valley-pantry-shelving",
    slug: "sudden-valley-pantry-shelving",
    title: "Pantry shelving",
    serviceIds: ["svc-custom-storage"],
    townId: "area-sudden-valley",
    locationLabel: "Sudden Valley, Washington",
    summary:
      "Floor-to-ceiling pantry shelving with adjustable shelves, built to fit a narrow closet.",
    assetIds: ["ast-project-sudden-valley-pantry-shelving"],
    isSample: true,
  },
  {
    id: "prj-bellingham-half-day-fix-list",
    slug: "bellingham-half-day-fix-list",
    title: "One visit, one fix list",
    serviceIds: ["svc-half-day-fix-list", "svc-general-home-repairs"],
    townId: "area-bellingham",
    locationLabel: "Bellingham, Washington",
    summary:
      "A sticking door, a loose stair spindle and a missing run of baseboard, all crossed off in a single half-day visit.",
    assetIds: ["ast-project-bellingham-fix-list"],
    isSample: true,
  },
];

/** Display order for the home showcase and category pages. */
export const featuredProjectIds: readonly ProjectId[] = [
  "prj-ferndale-deck-rail-rebuild",
  "prj-bellingham-mudroom-bench",
  "prj-lynden-picket-fence",
  "prj-bellingham-door-casing",
  "prj-birch-bay-porch-steps",
  "prj-sudden-valley-pantry-shelving",
];
