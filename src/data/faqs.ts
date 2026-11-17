/**
 * Faq fixtures: 18 entries across five categories; every service has at least one.
 * DRAFT COPY: describes how Benchline works as drafted; the owner must confirm each
 * answer before publishing. No credentials, prices or timelines are promised.
 */

import type { Faq } from "@/domain";

export const faqs: readonly Faq[] = [
  // ── Estimates ──────────────────────────────────────────────────
  {
    id: "faq-how-estimates-work",
    category: "estimates",
    question: "How do I get an estimate?",
    answer:
      "Send a request with a short description and a few photos. We review it, follow up with any questions, and send a written estimate for you to read and approve.",
  },
  {
    id: "faq-photos-that-help",
    category: "estimates",
    question: "What kind of photos help?",
    answer:
      "A wide shot of the whole area, close-ups of the damage, and something for scale, such as a tape measure. Daylight photos are easiest to read.",
  },
  {
    id: "faq-price-over-phone",
    category: "estimates",
    question: "Can you give me a price over the phone?",
    answer:
      "Most work is quoted per scope after we see photos, and sometimes a site visit, so we do not quote blind. A written estimate means you know exactly what is included.",
  },
  {
    id: "faq-after-you-send",
    category: "estimates",
    question: "What happens after I send a request?",
    answer:
      "We read your description and photos, then reach out by your preferred contact method. If the job needs a closer look, we will suggest a site visit before writing the estimate.",
  },

  // ── Scheduling ─────────────────────────────────────────────────
  {
    id: "faq-half-day-what-fits",
    category: "scheduling",
    question: "What is a Half-Day Fix List, and what fits on it?",
    answer:
      "It is a short list of small repairs handled in one visit, such as loose spindles, sticking doors or short runs of trim. Send your list and we confirm what fits in a half-day before booking.",
    serviceId: "svc-half-day-fix-list",
  },
  {
    id: "faq-check-availability",
    category: "scheduling",
    question: "Can I check availability before sending all the details?",
    answer:
      "Yes. Use Check availability to tell us roughly what you need and when. This site does not show a live calendar, so we reply with what is realistic.",
  },
  {
    id: "faq-weather-timing",
    category: "scheduling",
    question: "How does weather affect outdoor work?",
    answer:
      "Rain and standing water can change how and when exterior repairs are done. If weather is going to affect your job, we will talk through the timing with you.",
  },

  // ── Payments ───────────────────────────────────────────────────
  {
    id: "faq-deposit",
    category: "payments",
    question: "How does the deposit work?",
    answer:
      "After you approve a written estimate, you can pay the deposit online. The deposit amount is shown on your estimate before you approve anything.",
  },
  {
    id: "faq-pay-final-invoice",
    category: "payments",
    question: "How do I pay a final invoice?",
    answer:
      "Use the Pay an Invoice page. Enter your invoice number and ZIP code to find the invoice and pay online.",
  },
  {
    id: "faq-online-payment-security",
    category: "payments",
    question: "Is paying online secure?",
    answer:
      "Card payments are completed on Stripe's hosted checkout page, so your card details are entered there and not on this site.",
  },

  // ── Work and materials ─────────────────────────────────────────
  {
    id: "faq-custom-vs-repair",
    category: "work-and-materials",
    question: "Do you only do repairs, or custom builds too?",
    answer:
      "Both. Repairs are a big part of the work, and we also build custom storage, benches and shelving sized to your space.",
  },
  {
    id: "faq-deck-repair-or-replace",
    category: "work-and-materials",
    question: "Should I repair or replace my deck?",
    answer:
      "It depends on whether the framing is sound. Send photos of the worst areas and the underside if you can, and we will tell you what we see and what we would recommend.",
    serviceId: "svc-deck-porch-repairs",
  },
  {
    id: "faq-gate-sagging",
    category: "work-and-materials",
    question: "Why does my gate keep sagging?",
    answer:
      "Usually it is a post that has shifted or a frame that is not braced well. Fixing the cause, and not only the hinges, is what keeps it from dragging again.",
    serviceId: "svc-fences-gates",
  },
  {
    id: "faq-match-existing-trim",
    category: "work-and-materials",
    question: "Can you match my existing trim?",
    answer:
      "Often we can match the profile or suggest a close alternative. A close-up photo, or a short piece of the existing trim, helps a lot.",
    serviceId: "svc-doors-trim",
  },
  {
    id: "faq-odd-spaces",
    category: "work-and-materials",
    question: "Can you build storage for awkward or sloped spaces?",
    answer:
      "Yes, fitting odd spaces is a big reason to build custom. Send photos and rough measurements and we will talk through what will work.",
    serviceId: "svc-custom-storage",
  },
  {
    id: "faq-general-repairs-scope",
    category: "work-and-materials",
    question: "What counts as a general repair?",
    answer:
      "Carpentry fixes that do not fit another category, such as rotted trim, damaged siding edges or a sagging door. If you are not sure how to describe it, send a photo.",
    serviceId: "svc-general-home-repairs",
  },

  // ── Service area ───────────────────────────────────────────────
  {
    id: "faq-where-we-work",
    category: "service-area",
    question: "Where do you work?",
    answer:
      "Bellingham, Ferndale, Lynden, Blaine, Birch Bay, Sudden Valley and nearby Whatcom County communities.",
  },
  {
    id: "faq-outside-listed-towns",
    category: "service-area",
    question: "What if I live outside the listed towns?",
    answer:
      "Send your address anyway. Some nearby Whatcom County communities are a fit, and we will confirm either way.",
  },
];
