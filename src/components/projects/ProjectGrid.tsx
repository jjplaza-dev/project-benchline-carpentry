import type { Project } from "@/domain";
import { getProjectCover } from "@/lib/project-cover";
import { ProjectCard } from "./ProjectCard";

/** Responsive grid of project cards. */
export function ProjectGrid({ projects }: { projects: readonly Project[] }) {
  return (
    <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <li key={project.id}>
          <ProjectCard project={project} asset={getProjectCover(project)} />
        </li>
      ))}
    </ul>
  );
}
