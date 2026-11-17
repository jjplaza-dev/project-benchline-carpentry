/**
 * EstimateRequest and PhotoAttachment fixtures: FICTIONAL SAMPLES (assumption A4).
 * Contact details use reserved example/fictional values. Nothing here was transmitted
 * anywhere, and no real person is represented.
 *
 * Ten requests, one per sample status record in `project-status.ts`
 * (reference codes BL-DEMO-1001 to BL-DEMO-1010 map to req-demo-1001 to req-demo-1010).
 */

import type { ContactDetails, EstimateRequest, PhotoAttachment } from "@/domain";

const sampleContact: ContactDetails = {
  name: "Sample Homeowner",
  email: "sample.homeowner@example.com",
  phone: "(360) 555-0101",
  preferredContact: "email",
};

export const estimateRequests: readonly EstimateRequest[] = [
  {
    id: "req-demo-1001",
    serviceIds: ["svc-deck-porch-repairs"],
    description:
      "Two railing posts on the back deck wobble and a few boards near the stairs feel soft underfoot. Hoping to repair rather than replace the whole deck.",
    townId: "area-ferndale",
    zip: "98248",
    timeline: "within-month",
    intent: "estimate",
    photos: [
      { id: "ph-1001-a", fileName: "deck-overview-sample.jpg", sizeBytes: 2_411_520, mimeType: "image/jpeg", status: "ready" },
      { id: "ph-1001-b", fileName: "deck-rail-closeup-sample.jpg", sizeBytes: 1_872_640, mimeType: "image/jpeg", status: "ready" },
    ],
    contact: sampleContact,
    consent: true,
    isSample: true,
  },
  {
    id: "req-demo-1002",
    serviceIds: ["svc-half-day-fix-list"],
    description:
      "A short list: a sticking pantry door, a loose stair spindle, a missing piece of baseboard and a squeaky threshold. Hoping they fit in one visit.",
    townId: "area-lynden",
    zip: "98264",
    timeline: "asap",
    intent: "availability",
    photos: [],
    contact: { ...sampleContact, preferredContact: "phone" },
    consent: true,
    isSample: true,
  },
  {
    id: "req-demo-1003",
    serviceIds: ["svc-doors-trim"],
    description: "Replacing two interior doors and the casing around a hallway opening.",
    townId: "area-bellingham",
    zip: "98225",
    timeline: "flexible",
    intent: "estimate",
    photos: [
      { id: "ph-1003-a", fileName: "hallway-doors-sample.jpg", sizeBytes: 2_098_176, mimeType: "image/jpeg", status: "ready" },
    ],
    contact: sampleContact,
    consent: true,
    isSample: true,
  },
  {
    id: "req-demo-1004",
    serviceIds: ["svc-custom-storage"],
    description: "A built-in bench with storage under the seat for a small entry area.",
    townId: "area-bellingham",
    zip: "98226",
    timeline: "seasonal",
    intent: "estimate",
    photos: [],
    contact: { ...sampleContact, preferredContact: "text" },
    consent: true,
    isSample: true,
  },
  {
    id: "req-demo-1005",
    serviceIds: ["svc-deck-porch-repairs"],
    description: "Replace the front porch steps and two rotted porch posts.",
    townId: "area-birch-bay",
    zip: "98230",
    timeline: "within-month",
    intent: "estimate",
    photos: [
      { id: "ph-1005-a", fileName: "porch-steps-sample.jpg", sizeBytes: 1_998_848, mimeType: "image/jpeg", status: "ready" },
      { id: "ph-1005-b", fileName: "porch-post-sample.jpg", sizeBytes: 1_650_688, mimeType: "image/jpeg", status: "ready" },
    ],
    contact: sampleContact,
    consent: true,
    isSample: true,
  },
  {
    id: "req-demo-1006",
    serviceIds: ["svc-fences-gates"],
    description: "Rebuild a section of wood fence and hang a new side gate.",
    townId: "area-blaine",
    zip: "98230",
    timeline: "flexible",
    intent: "estimate",
    photos: [],
    contact: { ...sampleContact, preferredContact: "phone" },
    consent: true,
    isSample: true,
  },
  {
    id: "req-demo-1007",
    serviceIds: ["svc-custom-storage"],
    description: "Built-in shelving and cubbies for a basement storage wall.",
    townId: "area-sudden-valley",
    zip: "98229",
    timeline: "seasonal",
    intent: "estimate",
    photos: [],
    contact: sampleContact,
    consent: true,
    isSample: true,
  },
  {
    id: "req-demo-1008",
    serviceIds: ["svc-doors-trim"],
    description: "Hang a new interior door and replace worn casing in the upstairs hall.",
    townId: "area-bellingham",
    zip: "98225",
    timeline: "within-month",
    intent: "estimate",
    photos: [],
    contact: sampleContact,
    consent: true,
    isSample: true,
  },
  {
    id: "req-demo-1009",
    serviceIds: ["svc-general-home-repairs"],
    description: "Repair soft trim at a garage corner and replace a rotted window sill.",
    townId: "area-ferndale",
    zip: "98248",
    timeline: "flexible",
    intent: "estimate",
    photos: [],
    contact: sampleContact,
    consent: true,
    isSample: true,
  },
  {
    id: "req-demo-1010",
    serviceIds: ["svc-general-home-repairs"],
    description: "Fix a sagging shed door and replace a few rotted fence boards.",
    townId: "area-lynden",
    zip: "98264",
    timeline: "asap",
    intent: "estimate",
    photos: [],
    contact: { ...sampleContact, preferredContact: "phone" },
    consent: true,
    isSample: true,
  },
];

/**
 * One attachment per upload state, for the static photo-tile previews in Batch 2E
 * and the skeleton states in Phase 4. `reading` is the skeleton/loading state.
 * Not attached to any request.
 */
export const samplePhotoStates: readonly PhotoAttachment[] = [
  { id: "ph-state-queued", fileName: "queued-sample.jpg", sizeBytes: 2_201_600, mimeType: "image/jpeg", status: "queued" },
  { id: "ph-state-reading", fileName: "reading-sample.jpg", sizeBytes: 1_843_200, mimeType: "image/jpeg", status: "reading" },
  { id: "ph-state-ready", fileName: "ready-sample.jpg", sizeBytes: 1_572_864, mimeType: "image/jpeg", status: "ready" },
  {
    id: "ph-state-error",
    fileName: "unsupported-sample.pdf",
    sizeBytes: 512_000,
    mimeType: "application/pdf",
    status: "error",
    errorMessage: "This file type is not supported. Please use a JPG, PNG or HEIC photo.",
  },
];
