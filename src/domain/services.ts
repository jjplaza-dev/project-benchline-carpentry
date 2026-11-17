import { services } from "@/data/services";
import type { Service, ServiceCategory, ServiceId, ServiceSlug } from "@/domain";

export function getServices(): readonly Service[] {
  return services;
}

export function getServiceById(id: ServiceId): Service | undefined {
  return services.find((service) => service.id === id);
}

/** Accepts a plain string because route params are strings. Returns `undefined` for unknown slugs. */
export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesByCategory(category: ServiceCategory): readonly Service[] {
  return services.filter((service) => service.category === category);
}

/** For `generateStaticParams` on `/services/[slug]`. */
export function getServiceSlugs(): readonly ServiceSlug[] {
  return services.map((service) => service.slug);
}