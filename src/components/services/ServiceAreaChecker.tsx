"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CircleAlert, CircleCheck, CircleHelp, CircleX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CtaLink } from "@/components/primitives/CtaLink";
import type { AreaCheckResult, AreaId, ServiceArea } from "@/domain";
import { estimateHref } from "@/lib/links";
import { checkServiceArea } from "@/lib/validation/service-area";

interface ServiceAreaCheckerProps {
  areas: readonly ServiceArea[];
  /** Used to keep heading ids unique when more than one checker is on a page. */
  idPrefix?: string;
}

interface Checked {
  result: AreaCheckResult;
  /** What was entered, for the message. */
  zip: string;
}

const iconFor = {
  "in-area": CircleCheck,
  "needs-confirmation": CircleHelp,
  "out-of-area": CircleX,
  "invalid-zip": CircleAlert,
} as const;

const selectClass =
  "min-h-11 w-full rounded-lg border border-input bg-card px-3 text-base text-foreground";

function areaNames(areas: readonly ServiceArea[]): string {
  const names = areas.map((area) => area.name);
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} or ${names[names.length - 1]}`;
}

/**
 * Service-area checker. Enter a ZIP code, or pick a town, and press Check area.
 * The result is announced in a polite live region. Pure local logic over the areas passed in:
 * no network calls and no storage. ZIP lists are unconfirmed (assumption A8), so every
 * positive result is worded as guidance, not a promise.
 */
export function ServiceAreaChecker({ areas, idPrefix = "area" }: ServiceAreaCheckerProps) {
  const [zip, setZip] = useState("");
  const [townId, setTownId] = useState<AreaId | "">("");
  const [checked, setChecked] = useState<Checked | null>(null);

  const zipId = `${idPrefix}-zip`;
  const townSelectId = `${idPrefix}-town`;
  const helpId = `${idPrefix}-help`;
  const resultId = `${idPrefix}-result`;
  const invalid = checked?.result.kind === "invalid-zip";

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setChecked({ result: checkServiceArea({ zip, townId }, areas), zip: zip.trim() });
  };

  const result = checked?.result;
  const Icon = result ? iconFor[result.kind] : null;

  return (
    <div className="rounded-xl border border-oak bg-card p-6 shadow-card md:p-8">
      <h3 className="text-3xl">Do you work in my area?</h3>

      <form onSubmit={onSubmit} noValidate className="mt-6 space-y-5">
        <div className="space-y-2">
          <Label htmlFor={zipId}>ZIP code</Label>
          <Input
            id={zipId}
            value={zip}
            onChange={(event) => setZip(event.target.value)}
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="98225"
            className="min-h-11 sm:max-w-xs"
            aria-describedby={invalid ? `${helpId} ${resultId}` : helpId}
            aria-invalid={invalid || undefined}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={townSelectId}>Or choose a town</Label>
          <select
            id={townSelectId}
            value={townId}
            onChange={(event) => setTownId(event.target.value as AreaId | "")}
            className={`${selectClass} sm:max-w-xs`}
            aria-describedby={helpId}
          >
            <option value="">No town selected</option>
            {areas.map((area) => (
              <option key={area.id} value={area.id}>
                {area.name}
              </option>
            ))}
          </select>
        </div>

        <p id={helpId} className="text-sm text-ink-soft">
          If you enter a ZIP code, it is used instead of the town. Our area list is still being
          confirmed, so we double-check every address.
        </p>

        <button type="submit" className="btn btn-primary">
          Check area
        </button>
      </form>

      <div id={resultId} role="status" aria-live="polite" className="mt-6">
        {result && Icon ? (
          <div className="flex gap-3 rounded-lg border border-oak bg-background p-4">
            <Icon aria-hidden="true" size={24} strokeWidth={1.75} className="mt-0.5 shrink-0" />
            <div className="space-y-3">
              {result.kind === "in-area" ? (
                <>
                  <p className="font-semibold">In our area</p>
                  <p>
                    {checked?.zip
                      ? `ZIP code ${checked.zip} is listed under ${areaNames(result.areas)}.`
                      : `We work in ${areaNames(result.areas)}.`}{" "}
                    Send a request and we will confirm your address.
                  </p>
                  <CtaLink href={estimateHref()} arrow>
                    Request an Estimate
                  </CtaLink>
                </>
              ) : null}

              {result.kind === "needs-confirmation" ? (
                <>
                  <p className="font-semibold">Probably, but we need to confirm</p>
                  <p>
                    {checked?.zip
                      ? `ZIP code ${checked.zip} is in one of the nearby Whatcom County communities we sometimes serve.`
                      : "Nearby Whatcom County communities are a case-by-case fit."}{" "}
                    Send your address with a request and we will tell you either way.
                  </p>
                  <CtaLink href={estimateHref()} arrow>
                    Send your address
                  </CtaLink>
                </>
              ) : null}

              {result.kind === "out-of-area" ? (
                <>
                  <p className="font-semibold">Outside our usual area</p>
                  <p>
                    ZIP code {result.zip} is not in the area we usually serve. You are welcome to
                    ask, and we will let you know if it is something we can do.
                  </p>
                  <Link
                    href="/contact"
                    className="inline-flex min-h-11 items-center font-semibold text-cedar-deep underline underline-offset-4 hover:text-ink"
                  >
                    Get in touch
                  </Link>
                </>
              ) : null}

              {result.kind === "invalid-zip" ? (
                <>
                  <p className="font-semibold">Check the ZIP code</p>
                  <p>Enter a 5-digit ZIP code, for example 98225, or choose a town.</p>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
