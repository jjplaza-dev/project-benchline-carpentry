/**
 * Testimonial fixtures: five FICTIONAL SAMPLE quotes (assumption A4).
 * These are not real customer statements and must be shown with the "Sample" chip
 * (controlled by SHOW_SAMPLE_LABELS) until the owner supplies real, permitted testimonials.
 */

import type { Testimonial } from "@/domain";

export const testimonials: readonly Testimonial[] = [
  {
    id: "tst-sample-ferndale-deck",
    quote: "They showed up with a plan, kept the site tidy, and the rail is rock solid now.",
    authorLabel: "Homeowner, Ferndale",
    townId: "area-ferndale",
    serviceId: "svc-deck-porch-repairs",
    isSample: true,
  },
  {
    id: "tst-sample-bellingham-estimate",
    quote: "I sent a few photos and got a clear written estimate. No guessing, no runaround.",
    authorLabel: "Homeowner, Bellingham",
    townId: "area-bellingham",
    serviceId: "svc-general-home-repairs",
    isSample: true,
  },
  {
    id: "tst-sample-lynden-gate",
    quote: "The gate finally swings and latches the way it should have all along.",
    authorLabel: "Homeowner, Lynden",
    townId: "area-lynden",
    serviceId: "svc-fences-gates",
    isSample: true,
  },
  {
    id: "tst-sample-bellingham-bench",
    quote: "Our mudroom bench fits the space like it was always part of the house.",
    authorLabel: "Homeowner, Bellingham",
    townId: "area-bellingham",
    serviceId: "svc-custom-storage",
    isSample: true,
  },
  {
    id: "tst-sample-sudden-valley-list",
    quote: "One visit and a whole list of small things crossed off. I wish I had called sooner.",
    authorLabel: "Homeowner, Sudden Valley",
    townId: "area-sudden-valley",
    serviceId: "svc-half-day-fix-list",
    isSample: true,
  },
];
