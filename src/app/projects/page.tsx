import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ParallaxFrame } from "@/components/motion/ParallaxFrame";
import { AssetImage } from "@/components/primitives/AssetImage";
import { SampleChip } from "@/components/primitives/SampleChip";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { BeforeAfterFeature } from "@/components/projects/BeforeAfterFeature";
import { FilterChips } from "@/components/projects/FilterChips";
import { ProjectCardSkeleton } from "@/components/projects/ProjectCard";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { PROTOTYPE_NOTICES } from "@/data/site-flags";
import { getProjectCover } from "@/lib/project-cover";
import { getAssetById, getFeaturedProjects, getProjects } from "@/lib/selectors";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Sample carpentry and repair projects around Bellingham and Whatcom County, with before and after comparisons.",
};

/** P06 Project Gallery. Filtering is a static visual until Phase 3. */
export default function ProjectsPage() {
  const heroAsset = getAssetById("ast-gallery-hero");
  const featured = getFeaturedProjects().map((project) => ({
    project,
    asset: getProjectCover(project),
  }));

  return (
    <>
      <PageHero
        eyebrow="Project gallery"
        title={
          <>
            Projects built
            <br />
            to last.
          </>
        }
        intro={
          <>
            <p>A look at repairs and builds from around Whatcom County.</p>
            {PROTOTYPE_NOTICES ? (
              <p className="mt-3 text-base text-ink-soft">
                Prototype notice: these are fictional sample projects shown with placeholder artwork.
              </p>
            ) : null}
          </>
        }
        ruleLabel="8 projects"
        titleId="projects-title"
        aside={
          heroAsset ? (
            <ParallaxFrame className="aspect-[4/3] border border-oak bg-oak-soft">
              <AssetImage asset={heroAsset} sizes="(min-width: 1024px) 400px, 90vw" priority />
            </ParallaxFrame>
          ) : undefined
        }
      />

      <Section aria-labelledby="gallery-title">
        <h2 id="gallery-title" className="sr-only">
          All projects
        </h2>
        <FilterChips />
        <div className="mt-10">
          <ProjectGrid projects={getProjects()} />
        </div>
      </Section>

      <Section tone="oak" aria-labelledby="before-after-feature-title">
        <SectionLabel>Before &amp; after</SectionLabel>
        <h2 id="before-after-feature-title" className="mt-5">
          See the difference.
        </h2>
        <p className="mt-6 text-lg">
          Drag each handle, or focus it and use the arrow keys, to compare a repair before and after.
        </p>
        <div className="mt-12">
          <BeforeAfterFeature />
        </div>
      </Section>

      <Section aria-labelledby="gallery-showcase-title">
        <SectionLabel>Featured</SectionLabel>
        <h2 id="gallery-showcase-title" className="mt-5">
          Straight lines,
          <br />
          finished well.
        </h2>
        <div className="mt-12">
          <ProjectShowcase label="Featured projects" items={featured} parallaxCount={2} />
        </div>
      </Section>

      <Section tone="oak" aria-labelledby="loading-preview-title">
        <div className="flex flex-wrap items-center gap-3">
          <SectionLabel>Loading state</SectionLabel>
          <SampleChip label="Preview state" alwaysShow />
        </div>
        <h2 id="loading-preview-title" className="mt-5">
          While projects load.
        </h2>
        <p className="mt-6 text-lg">
          A static preview of the skeleton cards shown while real gallery content loads.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      </Section>

      <ClosingCta />
    </>
  );
}
