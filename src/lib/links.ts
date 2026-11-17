import type { EstimateIntent, Service, ServiceSlug } from "@/domain";

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
