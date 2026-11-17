import { ParallaxFrame } from "@/components/motion/ParallaxFrame";
import { AssetImage } from "@/components/primitives/AssetImage";
import { SampleChip } from "@/components/primitives/SampleChip";
import { Skeleton } from "@/components/ui/skeleton";
import type { Asset, Project } from "@/domain";

interface ProjectCardProps {
  project: Project;
  asset?: Asset;
  /** Gentle parallax on the image. Use on 2–3 images per page at most. */
  parallax?: boolean;
  sizes?: string;
}

const defaultSizes = "(min-width: 1024px) 380px, (min-width: 640px) 46vw, 90vw";

/**
 * Project card: image, location, title, short summary. No link target exists for projects,
 * so the card is not interactive. Hover uses a short overshoot ease (a CSS spring), not GSAP.
 */
export function ProjectCard({ project, asset, parallax = false, sizes = defaultSizes }: ProjectCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-oak/70 bg-card shadow-card transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 hover:shadow-card-lift">
      {asset ? (
        parallax ? (
          <ParallaxFrame rounded={false} className="aspect-[4/3] border-b border-oak/70 bg-oak-soft">
            <AssetImage asset={asset} sizes={sizes} />
          </ParallaxFrame>
        ) : (
          <div className="relative aspect-[4/3] border-b border-oak/70 bg-oak-soft">
            <AssetImage asset={asset} sizes={sizes} />
          </div>
        )
      ) : null}
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-ink-soft">{project.locationLabel}</p>
          <SampleChip isSample={project.isSample} />
        </div>
        <h3>{project.title}</h3>
        <p className="line-clamp-3 text-ink-soft">{project.summary}</p>
      </div>
    </article>
  );
}

/** Static loading-state preview of a ProjectCard. Real loading arrives with Phase 3. */
export function ProjectCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex h-full flex-col overflow-hidden rounded-xl border border-oak/70 bg-card"
    >
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="flex flex-col gap-3 p-6">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}
