/**
 * Project and BeforeAfterPair.
 * A Project belongs to one ServiceArea, relates to many Services, and may have
 * one BeforeAfterPair. Fixtures live in `src/data/projects.ts` and `src/data/before-after.ts`.
 */

import type { AreaId } from "./area";
import type { AssetId } from "./asset";
import type { ServiceId } from "./service";

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