/**
 * ProjectStatusRecord fixtures: FICTIONAL SAMPLES (assumption A4).
 * Reference codes BL-DEMO-1001 to BL-DEMO-1010 map to `req-demo-1001` to `req-demo-1010`
 * and carry the same ZIP as that request. Day labels are relative sample labels,
 * never real dates. Every one of the eight status values appears as a current status.
 *
 *   1001 received      1002 under-review   1003 site-visit     1004 estimate-sent
 *   1005 approved      1006 scheduled      1007 in-progress    1008 complete
 *   1009 estimate-sent (estimate later expired)
 *   1010 estimate-sent (estimate later declined)
 */

import type { ProjectStatusRecord } from "@/domain";

export const projectStatusRecords: readonly ProjectStatusRecord[] = [
  {
    referenceCode: "BL-DEMO-1001",
    requestId: "req-demo-1001",
    zip: "98248",
    status: "received",
    events: [
      { id: "evt-1001-received", status: "received", label: "Request received", occurredLabel: "Day 1" },
    ],
    isSample: true,
  },
  {
    referenceCode: "BL-DEMO-1002",
    requestId: "req-demo-1002",
    zip: "98264",
    status: "under-review",
    events: [
      { id: "evt-1002-received", status: "received", label: "Request received", occurredLabel: "Day 1" },
      { id: "evt-1002-review", status: "under-review", label: "Request under review", occurredLabel: "Day 2" },
    ],
    isSample: true,
  },
  {
    referenceCode: "BL-DEMO-1003",
    requestId: "req-demo-1003",
    zip: "98225",
    status: "site-visit",
    events: [
      { id: "evt-1003-received", status: "received", label: "Request received", occurredLabel: "Day 1" },
      { id: "evt-1003-review", status: "under-review", label: "Request under review", occurredLabel: "Day 2" },
      {
        id: "evt-1003-visit",
        status: "site-visit",
        label: "Site visit",
        occurredLabel: "Day 4",
        note: "Visit time to be arranged with the homeowner.",
      },
    ],
    isSample: true,
  },
  {
    referenceCode: "BL-DEMO-1004",
    requestId: "req-demo-1004",
    zip: "98226",
    status: "estimate-sent",
    events: [
      { id: "evt-1004-received", status: "received", label: "Request received", occurredLabel: "Day 1" },
      { id: "evt-1004-review", status: "under-review", label: "Request under review", occurredLabel: "Day 2" },
      { id: "evt-1004-visit", status: "site-visit", label: "Site visit", occurredLabel: "Day 4" },
      { id: "evt-1004-estimate", status: "estimate-sent", label: "Written estimate sent", occurredLabel: "Day 6" },
    ],
    isSample: true,
  },
  {
    referenceCode: "BL-DEMO-1005",
    requestId: "req-demo-1005",
    zip: "98230",
    status: "approved",
    events: [
      { id: "evt-1005-received", status: "received", label: "Request received", occurredLabel: "Day 1" },
      { id: "evt-1005-review", status: "under-review", label: "Request under review", occurredLabel: "Day 2" },
      { id: "evt-1005-visit", status: "site-visit", label: "Site visit", occurredLabel: "Day 4" },
      { id: "evt-1005-estimate", status: "estimate-sent", label: "Written estimate sent", occurredLabel: "Day 6" },
      {
        id: "evt-1005-approved",
        status: "approved",
        label: "Estimate approved",
        occurredLabel: "Day 8",
        note: "Deposit invoice issued.",
      },
    ],
    isSample: true,
  },
  {
    referenceCode: "BL-DEMO-1006",
    requestId: "req-demo-1006",
    zip: "98230",
    status: "scheduled",
    events: [
      { id: "evt-1006-received", status: "received", label: "Request received", occurredLabel: "Day 1" },
      { id: "evt-1006-review", status: "under-review", label: "Request under review", occurredLabel: "Day 2" },
      { id: "evt-1006-visit", status: "site-visit", label: "Site visit", occurredLabel: "Day 4" },
      { id: "evt-1006-estimate", status: "estimate-sent", label: "Written estimate sent", occurredLabel: "Day 6" },
      { id: "evt-1006-approved", status: "approved", label: "Estimate approved", occurredLabel: "Day 8" },
      { id: "evt-1006-scheduled", status: "scheduled", label: "Work scheduled", occurredLabel: "Day 10" },
    ],
    isSample: true,
  },
  {
    referenceCode: "BL-DEMO-1007",
    requestId: "req-demo-1007",
    zip: "98229",
    status: "in-progress",
    events: [
      { id: "evt-1007-received", status: "received", label: "Request received", occurredLabel: "Day 1" },
      { id: "evt-1007-review", status: "under-review", label: "Request under review", occurredLabel: "Day 2" },
      { id: "evt-1007-visit", status: "site-visit", label: "Site visit", occurredLabel: "Day 4" },
      { id: "evt-1007-estimate", status: "estimate-sent", label: "Written estimate sent", occurredLabel: "Day 6" },
      { id: "evt-1007-approved", status: "approved", label: "Estimate approved", occurredLabel: "Day 8" },
      { id: "evt-1007-scheduled", status: "scheduled", label: "Work scheduled", occurredLabel: "Day 10" },
      { id: "evt-1007-progress", status: "in-progress", label: "Work in progress", occurredLabel: "Day 18" },
    ],
    isSample: true,
  },
  {
    referenceCode: "BL-DEMO-1008",
    requestId: "req-demo-1008",
    zip: "98225",
    status: "complete",
    events: [
      { id: "evt-1008-received", status: "received", label: "Request received", occurredLabel: "Day 1" },
      { id: "evt-1008-review", status: "under-review", label: "Request under review", occurredLabel: "Day 2" },
      { id: "evt-1008-visit", status: "site-visit", label: "Site visit", occurredLabel: "Day 4" },
      { id: "evt-1008-estimate", status: "estimate-sent", label: "Written estimate sent", occurredLabel: "Day 6" },
      { id: "evt-1008-approved", status: "approved", label: "Estimate approved", occurredLabel: "Day 8" },
      { id: "evt-1008-scheduled", status: "scheduled", label: "Work scheduled", occurredLabel: "Day 10" },
      { id: "evt-1008-progress", status: "in-progress", label: "Work in progress", occurredLabel: "Day 18" },
      {
        id: "evt-1008-complete",
        status: "complete",
        label: "Work complete",
        occurredLabel: "Day 19",
        note: "Final invoice issued.",
      },
    ],
    isSample: true,
  },
  {
    referenceCode: "BL-DEMO-1009",
    requestId: "req-demo-1009",
    zip: "98248",
    status: "estimate-sent",
    events: [
      { id: "evt-1009-received", status: "received", label: "Request received", occurredLabel: "Day 1" },
      { id: "evt-1009-review", status: "under-review", label: "Request under review", occurredLabel: "Day 2" },
      {
        id: "evt-1009-estimate",
        status: "estimate-sent",
        label: "Written estimate sent",
        occurredLabel: "Day 5",
        note: "The estimate was not approved before it expired.",
      },
    ],
    isSample: true,
  },
  {
    referenceCode: "BL-DEMO-1010",
    requestId: "req-demo-1010",
    zip: "98264",
    status: "estimate-sent",
    events: [
      { id: "evt-1010-received", status: "received", label: "Request received", occurredLabel: "Day 1" },
      { id: "evt-1010-review", status: "under-review", label: "Request under review", occurredLabel: "Day 2" },
      {
        id: "evt-1010-estimate",
        status: "estimate-sent",
        label: "Written estimate sent",
        occurredLabel: "Day 5",
        note: "The homeowner declined the estimate.",
      },
    ],
    isSample: true,
  },
];
