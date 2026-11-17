import { faqs } from "@/data/faqs";
import { processSteps } from "@/data/process";
import { testimonials } from "@/data/testimonials";
import type { Faq, FaqCategory, ProcessStep, ServiceId, Testimonial } from "@/domain";

/** Sample testimonials in fixture order, optionally limited. */
export function getTestimonials(limit?: number): readonly Testimonial[] {
  return limit === undefined ? testimonials : testimonials.slice(0, limit);
}

export function getFaqs(): readonly Faq[] {
  return faqs;
}

export function getFaqsByCategory(category: FaqCategory): readonly Faq[] {
  return faqs.filter((faq) => faq.category === category);
}

export function getFaqsByService(serviceId: ServiceId): readonly Faq[] {
  return faqs.filter((faq) => faq.serviceId === serviceId);
}

/** Steps sorted by `order`, without mutating the fixture. */
export function getProcessSteps(): readonly ProcessStep[] {
  return [...processSteps].sort((a, b) => a.order - b.order);
}