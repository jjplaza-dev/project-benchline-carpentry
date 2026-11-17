import { beforeAfterPairs } from "@/data/before-after";
import { featuredProjectIds, projects } from "@/data/projects";
import type {
  BeforeAfterId,
  BeforeAfterPair,
  Project,
  ProjectId,
  ServiceCategory,
  ServiceId,
} from "@/domain";
import { getServiceById } from "./services";

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