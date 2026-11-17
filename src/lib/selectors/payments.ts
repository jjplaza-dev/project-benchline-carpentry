import { estimates } from "@/data/estimates";
import { invoices } from "@/data/invoices";
import type {
  Estimate,
  EstimateId,
  EstimateStatus,
  Invoice,
  InvoiceStatus,
  ReferenceCode,
  ZipCode,
} from "@/domain";
import { normalizeCode, normalizeZip } from "./normalize";

export function getEstimates(): readonly Estimate[] {
  return estimates;
}

export function getEstimateById(id: EstimateId): Estimate | undefined {
  return estimates.find((estimate) => estimate.id === id);
}

/** Case-insensitive match on the reference code shared with the status record. */
export function getEstimateByReference(referenceCode: ReferenceCode): Estimate | undefined {
  const code = normalizeCode(referenceCode);
  if (code === "") return undefined;
  return estimates.find((estimate) => normalizeCode(estimate.referenceCode) === code);
}

export function getEstimatesByStatus(status: EstimateStatus): readonly Estimate[] {
  return estimates.filter((estimate) => estimate.status === status);
}

export function getInvoices(): readonly Invoice[] {
  return invoices;
}

export function getInvoicesByEstimate(estimateId: EstimateId): readonly Invoice[] {
  return invoices.filter((invoice) => invoice.estimateId === estimateId);
}

export function getInvoicesByStatus(status: InvoiceStatus): readonly Invoice[] {
  return invoices.filter((invoice) => invoice.status === status);
}

/**
 * Looks up a sample invoice by number and ZIP.
 * The number is case-insensitive; the ZIP may be 5 digits or ZIP+4.
 * Returns `undefined` for unknown pairs or invalid ZIP input, which drives the not-found state.
 */
export function lookupInvoice(number: string, zip: ZipCode): Invoice | undefined {
  const code = normalizeCode(number);
  const normalizedZip = normalizeZip(zip);
  if (code === "" || normalizedZip === null) return undefined;
  return invoices.find(
    (invoice) => normalizeCode(invoice.number) === code && invoice.zip === normalizedZip,
  );
}
