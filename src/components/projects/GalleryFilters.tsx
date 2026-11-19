import Link from "next/link";
import type { GalleryFilterState, Service, ServiceArea, ServiceCategory } from "@/domain";
import { cx } from "@/lib/cx";
import { galleryHref } from "@/lib/links";
import { hasActiveFilters } from "@/lib/validation/gallery-filters";

interface GalleryFiltersProps {
  state: GalleryFilterState;
  services: readonly Service[];
  towns: readonly ServiceArea[];
  total: number;
  shown: number;
}

const categoryOptions: readonly { value: ServiceCategory; label: string }[] = [
  { value: "exterior", label: "Exterior" },
  { value: "interior", label: "Interior" },
  { value: "general", label: "General" },
];

const chipBase =
  "inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold transition-colors";
const chipActive = "border-ink bg-ink text-ivory";
const chipIdle = "border-line-strong bg-transparent text-ink hover:bg-ink/5";

function Chip({ href, active, children }: { href: string; active: boolean; children: string }) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={cx(chipBase, active ? chipActive : chipIdle)}
    >
      {children}
    </Link>
  );
}

/**
 * Gallery filters as plain links: the URL is the state, so filtering works without JavaScript,
 * survives reloads and can be shared. Each group has an "All" chip that clears that dimension.
 * Filters combine with AND.
 */
export function GalleryFilters({ state, services, towns, total, shown }: GalleryFiltersProps) {
  const active = hasActiveFilters(state);

  return (
    <div className="space-y-6">
      <div>
        <p id="filter-category" className="mb-3 text-sm font-semibold text-ink-soft">
          Category
        </p>
        <div role="group" aria-labelledby="filter-category" className="flex flex-wrap gap-3">
          <Chip href={galleryHref({ ...state, category: undefined })} active={!state.category}>
            All
          </Chip>
          {categoryOptions.map((option) => (
            <Chip
              key={option.value}
              href={galleryHref({ ...state, category: option.value })}
              active={state.category === option.value}
            >
              {option.label}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <p id="filter-service" className="mb-3 text-sm font-semibold text-ink-soft">
          Service
        </p>
        <div role="group" aria-labelledby="filter-service" className="flex flex-wrap gap-3">
          <Chip href={galleryHref({ ...state, service: undefined })} active={!state.service}>
            All
          </Chip>
          {services.map((service) => (
            <Chip
              key={service.id}
              href={galleryHref({ ...state, service: service.slug })}
              active={state.service === service.slug}
            >
              {service.name}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <p id="filter-town" className="mb-3 text-sm font-semibold text-ink-soft">
          Town
        </p>
        <div role="group" aria-labelledby="filter-town" className="flex flex-wrap gap-3">
          <Chip href={galleryHref({ ...state, town: undefined })} active={!state.town}>
            All
          </Chip>
          {towns.map((town) => (
            <Chip
              key={town.id}
              href={galleryHref({ ...state, town: town.id })}
              active={state.town === town.id}
            >
              {town.name}
            </Chip>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <p role="status" aria-live="polite" className="font-semibold">
          Showing {shown} of {total} {total === 1 ? "project" : "projects"}
        </p>
        {active ? (
          <Link
            href={galleryHref()}
            scroll={false}
            className="inline-flex min-h-11 items-center font-semibold text-cedar-deep underline underline-offset-4 hover:text-ink"
          >
            Clear all filters
          </Link>
        ) : null}
      </div>
    </div>
  );
}
