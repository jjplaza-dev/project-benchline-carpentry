import { estimateRequests, samplePhotoStates } from "@/data/estimate-requests";
import { projectStatusRecords } from "@/data/project-status";
import type {
  EstimateRequest,
  PhotoAttachment,
  ProjectStatusRecord,
  RequestId,
  ZipCode,
} from "@/domain";
import { normalizeCode, normalizeZip } from "./normalize";

export function getEstimateRequests(): readonly EstimateRequest[] {
  return estimateRequests;
}

export function getEstimateRequestById(id: RequestId): EstimateRequest | undefined {
  return estimateRequests.find((request) => request.id === id);
}

/** One attachment per upload state, for static previews and skeleton states. */
export function getPhotoStatePreviews(): readonly PhotoAttachment[] {
  return samplePhotoStates;
}

export function getStatusRecords(): readonly ProjectStatusRecord[] {
  return projectStatusRecords;
}

/**
 * Looks up a sample status record by reference code and ZIP.
 * The code is case-insensitive; the ZIP may be 5 digits or ZIP+4.
 * Returns `undefined` for unknown pairs or invalid ZIP input, which drives the not-found state.
 */
export function lookupStatus(
  referenceCode: string,
  zip: ZipCode,
): ProjectStatusRecord | undefined {
  const code = normalizeCode(referenceCode);
  const normalizedZip = normalizeZip(zip);
  if (code === "" || normalizedZip === null) return undefined;
  return projectStatusRecords.find(
    (record) => normalizeCode(record.referenceCode) === code && record.zip === normalizedZip,
  );
}
