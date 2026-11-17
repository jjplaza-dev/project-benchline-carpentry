/**
 * EstimateRequest and PhotoAttachment.
 * Photos are embedded in the request; they are never persisted or transmitted
 * (no file storage is selected). Fixtures live in `src/data/estimate-requests.ts`.
 */

import type { AreaId, ZipCode } from "./area";
import type { ServiceId } from "./service";

export type RequestId = `req-${string}`;
export type PhotoId = `ph-${string}`;

export type EstimateTimeline = "asap" | "within-month" | "flexible" | "seasonal";

/** `availability` is used by the Half-Day Fix List "Check availability" path. */
export type EstimateIntent = "estimate" | "availability";

export type PreferredContact = "email" | "phone" | "text";

export type PhotoStatus = "queued" | "reading" | "ready" | "error";

export interface PhotoAttachment {
  readonly id: PhotoId;
  readonly fileName: string;
  readonly sizeBytes: number;
  readonly mimeType: string;
  readonly status: PhotoStatus;
  readonly errorMessage?: string;
}

export interface ContactDetails {
  readonly name: string;
  readonly email: string;
  readonly phone: string;
  readonly preferredContact: PreferredContact;
}

export interface EstimateRequest {
  readonly id: RequestId;
  readonly serviceIds: readonly ServiceId[];
  readonly description: string;
  /** References `ServiceArea.id` (including the "other Whatcom County" bucket). */
  readonly townId: AreaId;
  readonly zip: ZipCode;
  readonly timeline: EstimateTimeline;
  readonly intent: EstimateIntent;
  readonly photos: readonly PhotoAttachment[];
  readonly contact: ContactDetails;
  /** Consent to be contacted about the request. */
  readonly consent: boolean;
  /** True for invented sample requests. */
  readonly isSample: boolean;
}
