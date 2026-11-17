import { Section } from "@/components/layout/Section";
import { CtaLink } from "@/components/primitives/CtaLink";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { getProjectCover } from "@/lib/project-cover";
import { getFeaturedProjects } from "@/lib/selectors";

/** Horizontal showcase of featured sample projects. First two cards get gentle parallax. */
export function FeaturedProjects() {
  const items = getFeaturedProjects().map((project) => ({
    project,
    asset: getProjectCover(project),
  }));

  return (
    <Section tone="oak" aria-labelledby="featured-title">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel>Recent work</SectionLabel>
          <h2 id="featured-title" className="mt-5">
            Straight lines,
            <br />
            finished well.
          </h2>
          <p className="mt-6 text-lg">A few sample projects from around Whatcom County.</p>
        </div>
        <CtaLink href="/projects" variant="secondary" arrow>
          See the full gallery
        </CtaLink>
      </div>
      <div className="mt-12">
        <ProjectShowcase label="Featured projects" items={items} parallaxCount={2} />
      </div>
    </Section>
  );
}
