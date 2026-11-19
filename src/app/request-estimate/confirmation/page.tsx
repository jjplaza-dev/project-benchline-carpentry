import type { Metadata } from "next";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RequestSummary } from "@/components/estimate/RequestSummary";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaLink } from "@/components/primitives/CtaLink";
import { PreviewButton } from "@/components/primitives/PreviewButton";
import { SampleChip } from "@/components/primitives/SampleChip";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { ProcessStrip } from "@/components/services/ProcessStrip";
import {
  getAreaById,
  getEstimateRequestById,
  getServiceById,
  getStatusRecords,
} from "@/lib/selectors";
import type { Service } from "@/domain";

export const metadata: Metadata = {
  title: "Request Summary",
  description: "A preview of the summary page shown after an estimate request.",
};

/** P09 Confirmation: preview built from a sample request. Nothing was sent. */
export default function RequestConfirmationPage() {
  const request = getEstimateRequestById("req-demo-1001");
  const record = request
    ? getStatusRecords().find((item) => item.requestId === request.id)
    : undefined;
  const services = request
    ? request.serviceIds
        .map((id) => getServiceById(id))
        .filter((service): service is Service => service !== undefined)
    : [];
  const area = request ? getAreaById(request.townId) : undefined;

  return (
    <>
      <PageHero
        eyebrow="Request summary"
        title={
          <>
            Here&rsquo;s what your
            <br />
            summary looks like.
          </>
        }
        intro={<p>After a request is sent, this page recaps it and explains what comes next.</p>}
        titleId="confirmation-title"
      />

      <Section aria-labelledby="confirmation-summary-title" padded={false} className="pb-16">
        <Alert className="mb-10">
          <AlertTitle>Preview: nothing was sent</AlertTitle>
          <AlertDescription>
            This summary is built from a fictional sample request. No request has been sent or saved,
            and the reference code below is a demo that was not transmitted.
          </AlertDescription>
        </Alert>

        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3">
              <h2 id="confirmation-summary-title" className="text-4xl">
                Your request
              </h2>
              <SampleChip isSample />
            </div>
            {request ? (
              <div className="mt-6">
                <RequestSummary request={request} services={services} area={area} />
              </div>
            ) : null}
          </div>

          <aside aria-label="Reference and next actions" className="space-y-6 lg:col-span-4">
            <div className="rounded-xl border border-oak bg-oak-soft p-6">
              <p className="text-sm font-semibold text-ink-soft">Reference code</p>
              <p className="mt-1 font-display text-4xl leading-none font-bold">
                {record?.referenceCode ?? "BL-DEMO"}
              </p>
              <p className="mt-2 text-sm text-ink-soft">Demo reference: not transmitted.</p>
              <div className="mt-5 space-y-3">
                <CtaLink href="/project-status" arrow>
                  Check request status
                </CtaLink>
                <div>
                  <PreviewButton variant="secondary" describedBy="copy-note">
                    Copy summary
                  </PreviewButton>
                  <p id="copy-note" className="mt-2 text-sm text-ink-soft">
                    Preview only: copying is not connected yet.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="oak" aria-labelledby="next-title">
        <SectionLabel>What happens next</SectionLabel>
        <h2 id="next-title" className="mt-5">
          From photos to scheduled.
        </h2>
        <div className="mt-12">
          <ProcessStrip />
        </div>
      </Section>
    </>
  );
}
