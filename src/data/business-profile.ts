/**
 * BusinessProfile fixture.
 * Phone and email are PLACEHOLDERS (assumption A3). Replace with owner-verified details
 * and clear the matching `placeholderFlags`.
 */

import type { BusinessProfile } from "@/domain";

export const businessProfile: BusinessProfile = {
  name: "Benchline Carpentry & Home Repair",
  tagline: "Practical carpentry and home repairs for Whatcom County.",
  phone: "(360) 555-0100",
  email: "hello@benchline.example",
  serviceAreaSummary:
    "Bellingham, Ferndale, Lynden, Blaine, Birch Bay, Sudden Valley, and nearby Whatcom County communities.",
  hoursNote: "Business hours to be confirmed by the owner.",
  registrationNote:
    "Washington contractor registration details to be confirmed by the owner before publishing.",
  placeholderFlags: {
    phone: true,
    email: true,
    address: true,
    hours: true,
    registration: true,
  },
};
