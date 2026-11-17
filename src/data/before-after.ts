/**
 * BeforeAfterPair fixtures: three FICTIONAL SAMPLE pairs (assumption A4).
 * Each pair references the same project as its `Project.beforeAfterId`.
 */

import type { BeforeAfterPair } from "@/domain";

export const beforeAfterPairs: readonly BeforeAfterPair[] = [
  {
    id: "ba-ferndale-deck-rail",
    projectId: "prj-ferndale-deck-rail-rebuild",
    beforeAssetId: "ast-ba-ferndale-deck-rail-before",
    afterAssetId: "ast-ba-ferndale-deck-rail-after",
    caption: "Leaning rail posts and a cracked stair stringer, replaced with new framing.",
    isSample: true,
  },
  {
    id: "ba-birch-bay-porch-steps",
    projectId: "prj-birch-bay-porch-steps",
    beforeAssetId: "ast-ba-birch-bay-porch-steps-before",
    afterAssetId: "ast-ba-birch-bay-porch-steps-after",
    caption: "Worn steps and a rotted post, rebuilt level and square.",
    isSample: true,
  },
  {
    id: "ba-bellingham-door-casing",
    projectId: "prj-bellingham-door-casing",
    beforeAssetId: "ast-ba-bellingham-door-casing-before",
    afterAssetId: "ast-ba-bellingham-door-casing-after",
    caption: "A door with gappy casing, replaced with a tight, mitered finish.",
    isSample: true,
  },
];
