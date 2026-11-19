import type {
  EstimateIntent,
  EstimateStatus,
  EstimateTimeline,
  FaqCategory,
  InvoiceKind,
  InvoiceStatus,
  PhotoStatus,
  PreferredContact,
  ProjectStatus,
} from "@/domain";

export const timelineLabels: Record<EstimateTimeline, string> = {
  asap: "As soon as possible",
  "within-month": "Within the next month",
  flexible: "Flexible",
  seasonal: "Planning ahead for a season",
};

export const intentLabels: Record<EstimateIntent, string> = {
  estimate: "Request an estimate",
  availability: "Check availability",
};

export const preferredContactLabels: Record<PreferredContact, string> = {
  email: "Email",
  phone: "Phone call",
  text: "Text message",
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  received: "Request received",
  "under-review": "Under review",
  "site-visit": "Site visit",
  "estimate-sent": "Estimate sent",
  approved: "Approved",
  scheduled: "Scheduled",
  "in-progress": "In progress",
  complete: "Complete",
};

/** Stage order for the status timeline. */
export const projectStatusOrder: readonly ProjectStatus[] = [
  "received",
  "under-review",
  "site-visit",
  "estimate-sent",
  "approved",
  "scheduled",
  "in-progress",
  "complete",
];

export const estimateStatusLabels: Record<EstimateStatus, string> = {
  sent: "Open",
  accepted: "Accepted",
  declined: "Declined",
  expired: "Expired",
};

export const invoiceStatusLabels: Record<InvoiceStatus, string> = {
  due: "Due",
  paid: "Paid",
  overdue: "Overdue",
  void: "Void",
};

export const invoiceKindLabels: Record<InvoiceKind, string> = {
  deposit: "Deposit invoice",
  final: "Final invoice",
};

export const photoStatusLabels: Record<PhotoStatus, string> = {
  queued: "Waiting",
  reading: "Reading file",
  ready: "Ready",
  error: "Problem",
};

export const faqCategoryLabels: Record<FaqCategory, string> = {
  estimates: "Estimates",
  scheduling: "Scheduling",
  payments: "Payments",
  "work-and-materials": "Work and materials",
  "service-area": "Service area",
};

export const faqCategoryOrder: readonly FaqCategory[] = [
  "estimates",
  "scheduling",
  "payments",
  "work-and-materials",
  "service-area",
];
