import type { Metadata } from "next";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { ParallaxFrame } from "@/components/motion/ParallaxFrame";
import { AssetImage } from "@/components/primitives/AssetImage";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { BeforeAfterFeature } from "@/components/projects/BeforeAfterFeature";
import { GalleryEmptyState } from "@/components/projects/GalleryEmptyState";
import { GalleryFilters } from "@/components/projects/GalleryFilters";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectShowcase } from "@/components/projects/ProjectShowcase";
import { PROTOTYPE_NOTICES } from "@/data/site-flags";
import { getProjectCover } from "@/lib/project-cover";
import {
  filterProjects,
  getAssetById,
  getFeaturedProjects,
  getProjects,
  getProjectTowns,
  getServices,
  getServiceSlugs,
} from "@/lib/selectors";
import { hasActiveFilters, parseGalleryFilters } from "@/lib/validation/gallery-filters";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Sample carpentry and repair projects around Bellingham and Whatcom County, with before and after comparisons.",
};

interface ProjectsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

/**
 * P06 Project Gallery. Filters live in the URL (`?category=&service=&town=`) and are applied
 * on the server, so they work without JavaScript, survive reloads and can be shared.
 */
export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
  const towns = getProjectTowns();
  const filters = parseGalleryFilters(await searchParams, {
    serviceSlugs: getServiceSlugs(),
    townIds: towns.map((town) => town.id),
  });

  const allProjects = getProjects();
  const results = filterProjects(filters);
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
        ruleLabel={`${allProjects.length} projects`}
        titleId="projects-title"
        aside={
          heroAsset ? (
            <ParallaxFrame className="aspect-[4/3] border border-oak bg-oak-soft">
              <AssetImage asset={heroAsset} sizes="(min-width: 1024px) 400px, 90vw" priority />
            </ParallaxFrame>
          ) : undefined
        }
      />

      <Section aria-labelledby="gallery-title" padded={false} className="pb-24">
        <h2 id="gallery-title" className="sr-only">
          All projects
        </h2>
        <GalleryFilters
          state={filters}
          services={getServices()}
          towns={towns}
          total={allProjects.length}
          shown={results.length}
        />
        <div className="mt-10">
          {results.length > 0 ? <ProjectGrid projects={results} /> : <GalleryEmptyState />}
        </div>
        {hasActiveFilters(filters) && results.length > 0 ? (
          <p className="mt-6 text-sm text-ink-soft">
            Filters are in the page address, so you can bookmark or share this view.
          </p>
        ) : null}
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

      <ClosingCta />
    </>
  );
}
