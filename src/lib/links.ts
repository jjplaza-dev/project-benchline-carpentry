import type { EstimateIntent, GalleryFilterState, Service, ServiceSlug } from "@/domain";

/**
 * Builds `/projects?category=&service=&town=` from a filter state. Absent keys are left out,
 * and an empty state returns plain `/projects`. The same names are read by parseGalleryFilters.
 */
export function galleryHref(state: GalleryFilterState = {}): string {
  const params = new URLSearchParams();
  if (state.category) params.set("category", state.category);
  if (state.service) params.set("service", state.service);
  if (state.town) params.set("town", state.town);
  const query = params.toString();
  return query ? `/projects?${query}` : "/projects";
}

/**
 * Builds `/request-estimate?service=<slug>&intent=estimate|availability`.
 * The query-param contract is consumed by the form in Phase 4 (PROJECT_PLAN.md §2.3).
 */
export function estimateHref(service?: ServiceSlug, intent?: EstimateIntent): string {
  const params = new URLSearchParams();
  if (service) params.set("service", service);
  if (intent) params.set("intent", intent);
  const query = params.toString();
  return query ? `/request-estimate?${query}` : "/request-estimate";
}

/** Label and href for a service's single card action: Request estimate or Check availability. */
export function serviceAction(service: Service): { label: string; href: string } {
  if (service.ctaType === "availability") {
    return { label: "Check availability", href: estimateHref(service.slug, "availability") };
  }
  return { label: "Request estimate", href: estimateHref(service.slug, "estimate") };
}
