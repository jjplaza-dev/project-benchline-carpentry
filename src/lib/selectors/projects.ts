import { beforeAfterPairs } from "@/data/before-after";
import { featuredProjectIds, projects } from "@/data/projects";
import type {
  BeforeAfterId,
  BeforeAfterPair,
  GalleryFilterState,
  Project,
  ProjectId,
  ServiceArea,
  ServiceCategory,
  ServiceId,
} from "@/domain";
import { getAreaById } from "./areas";
import { getServiceById, getServiceBySlug } from "./services";

export function getProjects(): readonly Project[] {
  return projects;
}

export function getProjectById(id: ProjectId): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getProjectsByService(serviceId: ServiceId): readonly Project[] {
  return projects.filter((project) => project.serviceIds.includes(serviceId));
}

/** Projects with at least one service in the given category. */
export function getProjectsByCategory(category: ServiceCategory): readonly Project[] {
  return projects.filter((project) =>
    project.serviceIds.some((serviceId) => getServiceById(serviceId)?.category === category),
  );
}

/**
 * Projects matching every active filter (AND across category, service and town).
 * An unknown service slug matches nothing, so a stale URL shows the empty state rather than everything.
 */
export function filterProjects(state: GalleryFilterState): readonly Project[] {
  const service = state.service === undefined ? undefined : getServiceBySlug(state.service);
  if (state.service !== undefined && service === undefined) return [];

  return projects.filter((project) => {
    if (state.category !== undefined && !getProjectsByCategory(state.category).includes(project)) {
      return false;
    }
    if (service !== undefined && !project.serviceIds.includes(service.id)) return false;
    if (state.town !== undefined && project.townId !== state.town) return false;
    return true;
  });
}

/** The towns that have at least one project, in first-seen order (the gallery's town filter options). */
export function getProjectTowns(): readonly ServiceArea[] {
  const seen = new Set<string>();
  const towns: ServiceArea[] = [];
  for (const project of projects) {
    if (seen.has(project.townId)) continue;
    seen.add(project.townId);
    const area = getAreaById(project.townId);
    if (area) towns.push(area);
  }
  return towns;
}

/** Featured projects in the fixture's display order, optionally limited. */
export function getFeaturedProjects(limit?: number): readonly Project[] {
  const featured = featuredProjectIds
    .map((id) => getProjectById(id))
    .filter((project): project is Project => project !== undefined);
  return limit === undefined ? featured : featured.slice(0, limit);
}

export function getBeforeAfterPairs(): readonly BeforeAfterPair[] {
  return beforeAfterPairs;
}

export function getBeforeAfterPairById(id: BeforeAfterId): BeforeAfterPair | undefined {
  return beforeAfterPairs.find((pair) => pair.id === id);
}

export function getBeforeAfterPairForProject(projectId: ProjectId): BeforeAfterPair | undefined {
  return beforeAfterPairs.find((pair) => pair.projectId === projectId);
}
