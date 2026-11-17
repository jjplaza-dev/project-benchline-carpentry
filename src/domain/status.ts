/**
 * ProjectStatusRecord and StatusEvent.
 * One record per EstimateRequest. An Estimate is linked by the shared `referenceCode`.
 * Fixtures live in `src/data/project-status.ts`.
 */

import type { ZipCode } from "./area";
import type { RequestId } from "./estimate-request";

/** Human-facing lookup code shared by ProjectStatusRecord and Estimate. Format is defined by fixtures. */
export type ReferenceCode = string;

export type StatusEventId = `evt-${string}`;

export type ProjectStatus =
  | "received"
  | "under-review"
  | "site-visit"
  | "estimate-sent"
  | "approved"
  | "scheduled"
  | "in-progress"
  | "complete";

export interface StatusEvent {
  readonly id: StatusEventId;
  readonly status: ProjectStatus;
  readonly label: string;
  /** Display label such as "Day 1" or "Sample date". Never a real date presented as fact. */
  readonly occurredLabel: string;
  readonly note?: string;
}

export interface ProjectStatusRecord {
  readonly referenceCode: ReferenceCode;
  /** References `EstimateRequest.id`. */
  readonly requestId: RequestId;
  readonly zip: ZipCode;
  readonly status: ProjectStatus;
  readonly events: readonly StatusEvent[];
  readonly isSample: boolean;
}
