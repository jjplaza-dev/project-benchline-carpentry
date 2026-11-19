import Link from "next/link";
import { SearchX } from "lucide-react";
import { CtaLink } from "@/components/primitives/CtaLink";
import { estimateHref, galleryHref } from "@/lib/links";

/** Shown when the active filters match no project. Offers a way back and a way forward. */
export function GalleryEmptyState() {
  return (
    <div className="rounded-xl border border-oak bg-card p-8 text-center shadow-card md:p-12">
      <SearchX aria-hidden="true" size={36} strokeWidth={1.5} className="mx-auto text-ink-soft" />
      <h3 className="mt-4 text-3xl">No projects match those filters</h3>
      <p className="mx-auto mt-3 text-ink-soft">
        Try removing a filter. Not seeing the kind of job you have? Send us a request anyway,
        because the gallery only shows a sample of our work.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href={galleryHref()}
          scroll={false}
          className="btn btn-secondary"
        >
          Clear all filters
        </Link>
        <CtaLink href={estimateHref()} arrow>
          Request an Estimate
        </CtaLink>
      </div>
    </div>
  );
}
