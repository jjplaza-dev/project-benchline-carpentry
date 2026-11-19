"use client";

import { useState } from "react";
import { SearchX } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CtaLink } from "@/components/primitives/CtaLink";
import { PreviewButton } from "@/components/primitives/PreviewButton";
import { PreviewStateToggle } from "@/components/primitives/PreviewStateToggle";
import { SampleChip } from "@/components/primitives/SampleChip";
import type { Estimate, ProjectStatusRecord } from "@/domain";
import { StatusTimeline } from "../../../phase 2e/StatusTimeline";

export interface StatusPreview {
  key: string;
  label: string;
  referenceCode: string;
  zip: string;
  /** Undefined means "not found". */
  record?: ProjectStatusRecord;
  estimate?: Estimate;
}

interface StatusLookupPreviewProps {
  previews: readonly StatusPreview[];
  showPrototypeNotice: boolean;
}

/**
 * Project status lookup, PREVIEW ONLY. The fields are read-only and the button is disabled;
 * the toggle switches between sample results. Live lookup arrives in Phase 4.
 */
export function StatusLookupPreview({ previews, showPrototypeNotice }: StatusLookupPreviewProps) {
  const [activeKey, setActiveKey] = useState(previews[0]?.key ?? "");
  const active = previews.find((preview) => preview.key === activeKey) ?? previews[0];
  if (!active) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-5">
        <PreviewStateToggle
          options={previews.map((preview) => ({ value: preview.key, label: preview.label }))}
          value={activeKey}
          onChange={setActiveKey}
        />
        <div className="space-y-6 rounded-xl border border-oak bg-card p-6 shadow-card">
          <h2 className="text-3xl">Look up your request</h2>
          <div className="space-y-2">
            <Label htmlFor="status-reference">Reference code</Label>
            <Input
              id="status-reference"
              readOnly
              value={active.referenceCode}
              className="min-h-11"
              aria-describedby="status-note"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status-zip">ZIP code</Label>
            <Input
              id="status-zip"
              readOnly
              value={active.zip}
              inputMode="numeric"
              className="min-h-11"
              aria-describedby="status-note"
            />
          </div>
          <PreviewButton describedBy="status-note">Look up status</PreviewButton>
          <p id="status-note" className="text-sm text-ink-soft">
            Preview only: these fields are filled in for the selected sample and nothing is searched.
          </p>
        </div>
        {showPrototypeNotice ? (
          <Alert>
            <AlertTitle>Prototype notice</AlertTitle>
            <AlertDescription>
              Records shown here are fictional samples. Real lookups are not connected yet.
            </AlertDescription>
          </Alert>
        ) : null}
      </div>

      <div className="lg:col-span-7" aria-live="polite">
        {active.record ? (
          <div className="rounded-xl border border-oak bg-card p-6 shadow-card md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl">Request {active.record.referenceCode}</h2>
              <SampleChip isSample={active.record.isSample} />
            </div>
            <div className="mt-8">
              <StatusTimeline record={active.record} />
            </div>
            {active.estimate ? (
              <div className="mt-8 border-t border-oak pt-6">
                <p className="mb-4 text-ink-soft">
                  A written estimate is linked to this request (sample).
                </p>
                <CtaLink href="/estimate-approval" variant="secondary" arrow>
                  View the estimate preview
                </CtaLink>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="rounded-xl border border-oak bg-card p-8 text-center shadow-card">
            <SearchX aria-hidden="true" size={36} strokeWidth={1.5} className="mx-auto text-ink-soft" />
            <h2 className="mt-4 text-3xl">We could not find that request</h2>
            <p className="mx-auto mt-3 text-ink-soft">
              Check the reference code and ZIP code, then try again. If you still cannot find it,
              contact us and we will look into it.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <CtaLink href="/contact" variant="secondary">
                Contact us
              </CtaLink>
              <CtaLink href="/request-estimate">Start a new request</CtaLink>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
