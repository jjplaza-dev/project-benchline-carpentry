/**
 * Service fixtures: the six Benchline offerings.
 * Pricing guidance is deliberately non-numeric (assumption A2).
 * Copy describes how Benchline works; it makes no claims about credentials, years or customer counts.
 */

import type { Service } from "@/domain";

export const services: readonly Service[] = [
  {
    id: "svc-deck-porch-repairs",
    slug: "deck-porch-repairs",
    name: "Deck & Porch Repairs",
    summary: "Soft boards, wobbly rails and worn stairs, fixed so they stay fixed.",
    description:
      "Outdoor wood takes a beating in the Pacific Northwest. We find where the water is getting in, repair or replace what has failed, and rebuild rails, stairs and framing so they are solid underfoot and to the touch.",
    category: "exterior",
    ctaType: "estimate",
    pricingGuidance: "Quoted per scope after a review of your photos or a site visit.",
    typicalJobs: [
      "Replacing soft or rotted decking and framing",
      "Rebuilding loose or wobbly railings",
      "Repairing or rebuilding stairs and landings",
      "Replacing porch posts, steps and trim",
      "Sorting out where water is getting into the structure",
    ],
    needsFromYou: [
      "A wide photo showing the whole deck or porch",
      "Close-ups of the damaged areas",
      "Rough dimensions, or a tape measure visible in the photo",
      "Anything you know about when it was built or last repaired",
    ],
    assetId: "ast-service-deck-porch-repairs",
  },
  {
    id: "svc-fences-gates",
    slug: "fences-gates",
    name: "Fences & Gates",
    summary: "Straight pickets, solid posts and gates that actually latch.",
    description:
      "From a few leaning panels to a full new run of fence, we set posts properly, keep the lines straight and hang gates so they swing true and close without a fight.",
    category: "exterior",
    ctaType: "estimate",
    pricingGuidance: "Quoted per scope after a review of your photos or a site visit.",
    typicalJobs: [
      "Replacing leaning or rotted posts",
      "Repairing or rebuilding fence sections",
      "Building new picket or privacy fence runs",
      "Rehanging and rebuilding sagging gates",
      "Fitting new latches and hardware",
    ],
    needsFromYou: [
      "Photos of the whole fence line and the problem spots",
      "Approximate length of the run",
      "A note about gates, slopes or anything in the way",
      "Whether you want to match the existing style",
    ],
    assetId: "ast-service-fences-gates",
  },
  {
    id: "svc-doors-trim",
    slug: "doors-trim",
    name: "Doors & Trim",
    summary: "Doors that close right and trim that fits tight.",
    description:
      "Sticking doors, gappy casing and missing baseboard are small things that wear on you daily. We fit and hang doors, replace casing and baseboard, and keep the joints tight so the finished work looks like it was always there.",
    category: "interior",
    ctaType: "estimate",
    pricingGuidance: "Quoted per scope after a review of your photos or a site visit.",
    typicalJobs: [
      "Hanging new interior or exterior doors",
      "Fixing doors that stick, drag or will not latch",
      "Replacing door and window casing",
      "Installing or replacing baseboard and crown",
      "Repairing damaged jambs and thresholds",
    ],
    needsFromYou: [
      "Photos of each door or trim area, wide and close",
      "A short piece or close-up of any trim you want matched",
      "Door sizes if you know them",
      "Whether the finish will be painted or stained",
    ],
    assetId: "ast-service-doors-trim",
  },
  {
    id: "svc-custom-storage",
    slug: "custom-storage",
    name: "Custom Storage",
    summary: "Built-ins, benches and shelving sized to your space.",
    description:
      "When off-the-shelf furniture does not fit, we design and build storage around the space and how you use it: mudroom benches, pantry shelving, closet and garage storage, and built-ins that look intentional.",
    category: "interior",
    ctaType: "estimate",
    pricingGuidance: "Quoted per design and materials once the space and its use are clear.",
    typicalJobs: [
      "Mudroom benches and cubbies",
      "Pantry and closet shelving",
      "Built-in shelving and window seats",
      "Garage and basement storage walls",
      "Custom fits for awkward or sloped spaces",
    ],
    needsFromYou: [
      "Photos of the space, including the walls and floor",
      "Rough measurements of width, height and depth",
      "What you want to store and how it is used",
      "A few photos of styles you like, if you have them",
    ],
    assetId: "ast-service-custom-storage",
  },
  {
    id: "svc-general-home-repairs",
    slug: "general-home-repairs",
    name: "General Home Repairs",
    summary: "The carpentry fixes that keep getting put off.",
    description:
      "Rotted trim, damaged siding edges, sagging doors and other carpentry fixes that do not fit neatly anywhere else. We assess what is going on, repair it properly and leave the work area clean.",
    category: "general",
    ctaType: "estimate",
    pricingGuidance: "Quoted per scope after a review of your photos or a site visit.",
    typicalJobs: [
      "Replacing rotted trim and sills",
      "Repairing damaged exterior trim and siding edges",
      "Fixing sagging or sticking doors and hardware",
      "Patching and reframing small damaged areas",
      "Carpentry problems you are not sure how to describe",
    ],
    needsFromYou: [
      "Clear photos of the problem and the area around it",
      "A short description of what you have noticed",
      "When it started, if you know",
      "Anything you have already tried",
    ],
    assetId: "ast-service-general-home-repairs",
  },
  {
    id: "svc-half-day-fix-list",
    slug: "half-day-fix-list",
    name: "Half-Day Fix List",
    summary: "Hand us a short list of small repairs and we will work through it in one visit.",
    description:
      "Collect the small jobs that never seem worth a separate call, such as a loose spindle, a sticking door and a missing piece of baseboard. Send us the list and we will confirm what fits into a half-day visit before we book it.",
    category: "general",
    ctaType: "availability",
    pricingGuidance: "Scoped from your list. We confirm what fits in a half-day before booking.",
    typicalJobs: [
      "A handful of small carpentry repairs in one visit",
      "Tightening loose rails, spindles and hardware",
      "Adjusting and fixing sticking doors",
      "Replacing short runs of trim or baseboard",
      "Small fixes ahead of a sale or a guest stay",
    ],
    needsFromYou: [
      "Your list, with one photo per item where possible",
      "Which items matter most, in case not everything fits",
      "Your preferred timing",
      "Access details for each area",
    ],
    assetId: "ast-service-half-day-fix-list",
  },
];
