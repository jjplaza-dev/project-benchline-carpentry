/**
 * ServiceArea fixtures: the six named towns plus an "other Whatcom County" bucket.
 *
 * UNVERIFIED — OWNER MUST CONFIRM: every ZIP list below was written from general
 * knowledge and has not been checked against the owner's real service area
 * (assumption A8). Some ZIPs are shared by more than one area (98229, 98230).
 */

import type { ServiceArea } from "@/domain";

export const serviceAreas: readonly ServiceArea[] = [
  {
    id: "area-bellingham",
    name: "Bellingham",
    zipCodes: ["98225", "98226", "98229"],
    zipNeedsConfirmation: true,
    note: "Home base for Benchline.",
  },
  {
    id: "area-ferndale",
    name: "Ferndale",
    zipCodes: ["98248"],
    zipNeedsConfirmation: true,
    note: "North of Bellingham.",
  },
  {
    id: "area-lynden",
    name: "Lynden",
    zipCodes: ["98264"],
    zipNeedsConfirmation: true,
    note: "Northern Whatcom County.",
  },
  {
    id: "area-blaine",
    name: "Blaine",
    zipCodes: ["98230"],
    zipNeedsConfirmation: true,
    note: "Northwest corner of Whatcom County.",
  },
  {
    id: "area-birch-bay",
    name: "Birch Bay",
    zipCodes: ["98230"],
    zipNeedsConfirmation: true,
    note: "Coastal community between Ferndale and Blaine.",
  },
  {
    id: "area-sudden-valley",
    name: "Sudden Valley",
    zipCodes: ["98229"],
    zipNeedsConfirmation: true,
    note: "Lake Whatcom community southeast of downtown Bellingham.",
  },
  {
    id: "area-other-whatcom",
    name: "Other Whatcom County communities",
    zipCodes: ["98247", "98276", "98240", "98295", "98220"],
    zipNeedsConfirmation: true,
    note: "Nearby communities beyond the towns above. Send your address and we will confirm whether it is a fit.",
  },
];
