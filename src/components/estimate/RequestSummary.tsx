import type { EstimateRequest, Service, ServiceArea } from "@/domain";
import { intentLabels, preferredContactLabels, timelineLabels } from "@/lib/labels";

interface RequestSummaryProps {
  request: EstimateRequest;
  services: readonly Service[];
  area?: ServiceArea;
}

/** Read-only summary of an estimate request. Receives resolved services and area as props. */
export function RequestSummary({ request, services, area }: RequestSummaryProps) {
  const rows: { label: string; value: string }[] = [
    { label: "What you asked for", value: intentLabels[request.intent] },
    { label: "Services", value: services.map((service) => service.name).join(", ") },
    { label: "The job", value: request.description },
    { label: "Location", value: `${area?.name ?? "Whatcom County"}, ${request.zip}` },
    { label: "Timing", value: timelineLabels[request.timeline] },
    {
      label: "Photos",
      value:
        request.photos.length === 0
          ? "None added"
          : `${request.photos.length} photo${request.photos.length === 1 ? "" : "s"} added`,
    },
    {
      label: "Contact",
      value: `${request.contact.name}, ${request.contact.email} (prefers ${preferredContactLabels[
        request.contact.preferredContact
      ].toLowerCase()})`,
    },
  ];

  return (
    <dl className="divide-y divide-oak rounded-xl border border-oak bg-card">
      {rows.map((row) => (
        <div key={row.label} className="grid gap-1 p-5 sm:grid-cols-3 sm:gap-6">
          <dt className="text-sm font-semibold text-ink-soft">{row.label}</dt>
          <dd className="sm:col-span-2">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
