import { CircleAlert, CircleCheck, CircleHelp, CircleX } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PreviewButton } from "@/components/primitives/PreviewButton";
import { SampleChip } from "@/components/primitives/SampleChip";

const examples = [
  {
    key: "in-area",
    Icon: CircleCheck,
    title: "In our area",
    text: "Good news: we work in Bellingham (98225). Send your request and we will take it from there.",
  },
  {
    key: "needs-confirmation",
    Icon: CircleHelp,
    title: "Probably, but we need to confirm",
    text: "That ZIP code is near our area. Send your address with your request and we will confirm.",
  },
  {
    key: "out-of-area",
    Icon: CircleX,
    title: "Outside our area",
    text: "That ZIP code looks outside the area we serve. You are welcome to ask, and we will let you know.",
  },
  {
    key: "invalid-zip",
    Icon: CircleAlert,
    title: "Check the ZIP code",
    text: "Enter a 5-digit ZIP code, for example 98225.",
  },
] as const;

/**
 * Service-area checker, PREVIEW ONLY: a static field plus the four result states it will show.
 * The input is read-only and the button disabled. The working checker arrives in Phase 3.
 */
export function ServiceAreaCheckerPreview() {
  return (
    <div className="rounded-xl border border-oak bg-card p-6 shadow-card md:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-3xl">Do you work in my area?</h3>
        <SampleChip label="Preview state" alwaysShow />
      </div>

      <div className="mt-6 flex flex-wrap items-end gap-4">
        <div className="space-y-2">
          <Label htmlFor="area-zip">ZIP code</Label>
          <Input
            id="area-zip"
            readOnly
            placeholder="98225"
            inputMode="numeric"
            className="min-h-11 w-40"
            aria-describedby="area-note"
          />
        </div>
        <PreviewButton variant="secondary" describedBy="area-note">
          Check area
        </PreviewButton>
      </div>
      <p id="area-note" className="mt-3 text-sm text-ink-soft">
        Preview only: nothing is checked yet. The examples below show the results you will see.
      </p>

      <h4 className="mt-8 text-sm font-semibold tracking-[0.06em] uppercase text-ink-soft">
        Example results
      </h4>
      <ul className="mt-3 grid gap-3 sm:grid-cols-2">
        {examples.map(({ key, Icon, title, text }) => (
          <li key={key} className="flex gap-3 rounded-lg border border-oak bg-background p-4">
            <Icon aria-hidden="true" size={22} strokeWidth={1.75} className="mt-0.5 shrink-0" />
            <div>
              <p className="font-semibold">{title}</p>
              <p className="text-sm text-ink-soft">{text}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
