/**
 * Asset fixtures. Every asset is an ORIGINAL SVG PLACEHOLDER (assumption A5).
 * The SVG files themselves are created in Batch 2D alongside the routes that use them;
 * until then these paths do not resolve, and no route renders them yet.
 * Real photography must be supplied by the owner (see ASSET_MANIFEST.md, created in 2E).
 */

import type { Asset } from "@/domain";

const replaceWithPhoto =
  "Replace with the owner's own project photograph. Confirm the homeowner's permission before publishing. No stock or downloaded image has been used.";

export const assets: readonly Asset[] = [
  // ── Service artwork ────────────────────────────────────────────
  {
    id: "ast-service-deck-porch-repairs",
    kind: "svg",
    path: "/service-deck-porch-repairs.jpg",
    alt: "Placeholder line drawing of a deck corner with a railing, stair and dimension lines.",
    isPlaceholder: true,
    intendedSubject: "A repaired deck with railing and stairs, wide shot in daylight.",
    manifestNote: replaceWithPhoto,
  },
  {
    id: "ast-service-fences-gates",
    kind: "svg",
    path: "/assets/services/fences-gates.svg",
    alt: "Placeholder line drawing of fence pickets and a walk gate with dimension lines.",
    isPlaceholder: true,
    intendedSubject: "A finished picket fence with a gate, shot straight on.",
    manifestNote: replaceWithPhoto,
  },
  {
    id: "ast-service-doors-trim",
    kind: "svg",
    path: "/assets/services/doors-trim.svg",
    alt: "Placeholder line drawing of a door frame and trim profile with dimension lines.",
    isPlaceholder: true,
    intendedSubject: "An installed interior door with casing, shot straight on.",
    manifestNote: replaceWithPhoto,
  },
  {
    id: "ast-service-custom-storage",
    kind: "svg",
    path: "/assets/services/custom-storage.svg",
    alt: "Placeholder line drawing of a built-in bench with cubbies and dimension lines.",
    isPlaceholder: true,
    intendedSubject: "A built-in bench or shelving unit, finished and in place.",
    manifestNote: replaceWithPhoto,
  },
  {
    id: "ast-service-general-home-repairs",
    kind: "svg",
    path: "/assets/services/general-home-repairs.svg",
    alt: "Placeholder line drawing of repaired framing and a framing square with dimension lines.",
    isPlaceholder: true,
    intendedSubject: "A close-up of a clean carpentry repair in progress or just finished.",
    manifestNote: replaceWithPhoto,
  },
  {
    id: "ast-service-half-day-fix-list",
    kind: "svg",
    path: "/assets/services/half-day-fix-list.svg",
    alt: "Placeholder line drawing of a checklist of small repairs beside a framing square.",
    isPlaceholder: true,
    intendedSubject: "A tidy tool setup beside a few small completed repairs.",
    manifestNote: replaceWithPhoto,
  },

  // ── Project artwork (projects without a before/after pair) ─────
  {
    id: "ast-project-lynden-picket-fence",
    kind: "svg",
    path: "/assets/projects/lynden-picket-fence.svg",
    alt: "Placeholder line drawing of a picket fence and walk gate with dimension lines.",
    isPlaceholder: true,
    intendedSubject: "Finished picket fence and gate, shot along the fence line.",
    manifestNote: replaceWithPhoto,
  },
  {
    id: "ast-project-bellingham-mudroom-bench",
    kind: "svg",
    path: "/assets/projects/bellingham-mudroom-bench.svg",
    alt: "Placeholder line drawing of a mudroom bench with cubbies and hooks with dimension lines.",
    isPlaceholder: true,
    intendedSubject: "Finished mudroom bench with cubbies, shot straight on.",
    manifestNote: replaceWithPhoto,
  },
  {
    id: "ast-project-blaine-gate-rehang",
    kind: "svg",
    path: "/assets/projects/blaine-gate-rehang.svg",
    alt: "Placeholder line drawing of a gate on new hinges and a reset post with dimension lines.",
    isPlaceholder: true,
    intendedSubject: "A rehung gate closed and latched, with the post visible.",
    manifestNote: replaceWithPhoto,
  },
  {
    id: "ast-project-sudden-valley-pantry-shelving",
    kind: "svg",
    path: "/assets/projects/sudden-valley-pantry-shelving.svg",
    alt: "Placeholder line drawing of pantry shelving with adjustable shelves and dimension lines.",
    isPlaceholder: true,
    intendedSubject: "Finished pantry shelving, shot straight on with doors open.",
    manifestNote: replaceWithPhoto,
  },
  {
    id: "ast-project-bellingham-fix-list",
    kind: "svg",
    path: "/assets/projects/bellingham-fix-list.svg",
    alt: "Placeholder line drawing of a door, a baseboard and a stair spindle repaired in one visit.",
    isPlaceholder: true,
    intendedSubject: "Three or four small completed repairs from one visit, in a single composed shot.",
    manifestNote: replaceWithPhoto,
  },

  // ── Before / after artwork ─────────────────────────────────────
  {
    id: "ast-ba-ferndale-deck-rail-before",
    kind: "svg",
    path: "/assets/before-after/ferndale-deck-rail-before.svg",
    alt: "Placeholder line drawing of a deck rail with leaning posts and a cracked stair stringer.",
    isPlaceholder: true,
    intendedSubject: "BEFORE: loose rail posts and damaged stair framing, same camera position as the after shot.",
    manifestNote: replaceWithPhoto,
  },
  {
    id: "ast-ba-ferndale-deck-rail-after",
    kind: "svg",
    path: "/assets/before-after/ferndale-deck-rail-after.svg",
    alt: "Placeholder line drawing of a straight, solid deck rail and repaired stair with dimension lines.",
    isPlaceholder: true,
    intendedSubject: "AFTER: repaired rail and stair, same camera position as the before shot.",
    manifestNote: replaceWithPhoto,
  },
  {
    id: "ast-ba-birch-bay-porch-steps-before",
    kind: "svg",
    path: "/assets/before-after/birch-bay-porch-steps-before.svg",
    alt: "Placeholder line drawing of worn porch steps and a rotted post.",
    isPlaceholder: true,
    intendedSubject: "BEFORE: worn steps and a rotted post, same camera position as the after shot.",
    manifestNote: replaceWithPhoto,
  },
  {
    id: "ast-ba-birch-bay-porch-steps-after",
    kind: "svg",
    path: "/assets/before-after/birch-bay-porch-steps-after.svg",
    alt: "Placeholder line drawing of new porch steps and a straight post with dimension lines.",
    isPlaceholder: true,
    intendedSubject: "AFTER: new steps and post, same camera position as the before shot.",
    manifestNote: replaceWithPhoto,
  },
  {
    id: "ast-ba-bellingham-door-casing-before",
    kind: "svg",
    path: "/assets/before-after/bellingham-door-casing-before.svg",
    alt: "Placeholder line drawing of a door with gaps in worn casing.",
    isPlaceholder: true,
    intendedSubject: "BEFORE: worn door and casing with visible gaps, same camera position as the after shot.",
    manifestNote: replaceWithPhoto,
  },
  {
    id: "ast-ba-bellingham-door-casing-after",
    kind: "svg",
    path: "/assets/before-after/bellingham-door-casing-after.svg",
    alt: "Placeholder line drawing of a door with tight, mitered casing and dimension lines.",
    isPlaceholder: true,
    intendedSubject: "AFTER: new door and tight casing, same camera position as the before shot.",
    manifestNote: replaceWithPhoto,
  },

  // ── Supporting artwork ─────────────────────────────────────────
  {
    id: "ast-hero-composition",
    kind: "svg",
    path: "/assets/hero/hero-composition.svg",
    alt: "Placeholder line drawing of a deck corner, fence section and framing square with measurement annotations.",
    isPlaceholder: true,
    intendedSubject: "Hero image: a strong, straight-on photo of a finished deck or exterior project.",
    manifestNote: replaceWithPhoto,
  },
  {
    id: "ast-gallery-hero",
    kind: "svg",
    path: "/assets/hero/gallery-hero.svg",
    alt: "Placeholder line drawing of stacked boards, pickets and a door frame with dimension lines.",
    isPlaceholder: true,
    intendedSubject: "Gallery header image: a wide, well-lit shot of a finished project.",
    manifestNote: replaceWithPhoto,
  },
  {
    id: "ast-about-workbench",
    kind: "svg",
    path: "/assets/about/workbench.svg",
    alt: "Placeholder line drawing of a workbench with a clamped board and a framing square.",
    isPlaceholder: true,
    intendedSubject: "The owner at the bench or on a job site (owner's own photo, with their permission).",
    manifestNote:
      "Replace with an owner-supplied photograph. Confirm everyone shown has agreed to appear. No stock or downloaded image has been used.",
  },
  {
    id: "ast-area-graphic",
    kind: "svg",
    path: "/assets/area/whatcom-area.svg",
    alt: "Abstract diagram of the Whatcom County service area with six labeled town markers.",
    isPlaceholder: true,
    intendedSubject: "Abstract graphic, not a real map. Can stay as original artwork.",
    manifestNote: "Original abstract artwork; no map provider or map data is used.",
  },
];
