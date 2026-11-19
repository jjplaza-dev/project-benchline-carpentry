import type { AreaId, GalleryFilterState, ServiceCategory, ServiceSlug } from "@/domain";

type RawSearchParams = Record<string, string | string[] | undefined>;

const categories: readonly ServiceCategory[] = ["exterior", "interior", "general"];

interface ValidFilterValues {
  serviceSlugs: readonly ServiceSlug[];
  townIds: readonly AreaId[];
}

const first = (value: string | string[] | undefined): string | undefined =>
  Array.isArray(value) ? value[0] : value;

/**
 * Turns raw `searchParams` into a GalleryFilterState, keeping only values that are known.
 * Unknown or repeated values are ignored, so a bad URL falls back to "all" instead of breaking.
 * Pure: the caller supplies the valid slugs and town ids.
 */
export function parseGalleryFilters(
  params: RawSearchParams,
  valid: ValidFilterValues,
): GalleryFilterState {
  const category = first(params.category);
  const service = first(params.service);
  const town = first(params.town);

  const state: { category?: ServiceCategory; service?: ServiceSlug; town?: AreaId } = {};
  const matchedCategory = categories.find((item) => item === category);
  if (matchedCategory) state.category = matchedCategory;
  const matchedService = valid.serviceSlugs.find((item) => item === service);
  if (matchedService) state.service = matchedService;
  const matchedTown = valid.townIds.find((item) => item === town);
  if (matchedTown) state.town = matchedTown;
  return state;
}

/** True when at least one filter is active. */
export function hasActiveFilters(state: GalleryFilterState): boolean {
  return (
    state.category !== undefined || state.service !== undefined || state.town !== undefined
  );
}
