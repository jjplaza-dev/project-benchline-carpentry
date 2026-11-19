/**
 * Project and BeforeAfterPair.
 * A Project belongs to one ServiceArea, relates to many Services, and may have
 * one BeforeAfterPair. Fixtures live in `src/data/projects.ts` and `src/data/before-after.ts`.
 */

import type { AreaId } from "./area";
import type { AssetId } from "./asset";
import type { ServiceCategory, ServiceId, ServiceSlug } from "./service";

/**
 * Gallery filters, mirrored in the URL as `/projects?category=&service=&town=`.
 * Each key is optional; an absent key means "all". Dimensions combine with AND.
 */
export interface GalleryFilterState {
  readonly category?: ServiceCategory;
  readonly service?: ServiceSlug;
  /** An `AreaId`, for example `area-ferndale`. */
  readonly town?: AreaId;
}

export type ProjectId = `prj-${string}`;
export type BeforeAfterId = `ba-${string}`;

export interface Project {
  readonly id: ProjectId;
  readonly slug: string;
  readonly title: string;
  readonly serviceIds: readonly ServiceId[];
  /** References `ServiceArea.id`. */
  readonly townId: AreaId;
  readonly locationLabel: string;
  readonly summary: string;
  readonly assetIds: readonly AssetId[];
  readonly beforeAfterId?: BeforeAfterId;
  /** True for invented sample projects (assumption A4). */
  readonly isSample: boolean;
}

export interface BeforeAfterPair {
  readonly id: BeforeAfterId;
  readonly projectId: ProjectId;
  readonly beforeAssetId: AssetId;
  readonly afterAssetId: AssetId;
  readonly caption: string;
  readonly isSample: boolean;
}
