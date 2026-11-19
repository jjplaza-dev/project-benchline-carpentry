import { Section } from "@/components/layout/Section";
import { ProjectCardSkeleton } from "@/components/projects/ProjectCard";

/** Shown by Next.js while the gallery renders (for example after changing a filter). */
export default function ProjectsLoading() {
  return (
    <Section padded={false} className="py-24" aria-labelledby="projects-loading-title">
      <div role="status">
        <h1 id="projects-loading-title" className="sr-only">
          Loading projects
        </h1>
        <p className="sr-only">Loading projects…</p>
      </div>
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }, (_, index) => (
          <li key={index}>
            <ProjectCardSkeleton />
          </li>
        ))}
      </ul>
    </Section>
  );
}
