"use client";

import { useState, type ReactNode } from "react";
import { Upload } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { CtaLink } from "@/components/primitives/CtaLink";
import { PreviewStateToggle } from "@/components/primitives/PreviewStateToggle";
import { PreviewButton } from "@/components/primitives/PreviewButton";
import type { PhotoAttachment, ProcessStep, Service, ServiceArea } from "@/domain";
import { intentLabels, preferredContactLabels, timelineLabels } from "@/lib/labels";
import { PhotoTiles } from "../../../phase 2e/PhotoTiles";

interface EstimateFormPreviewProps {
  services: readonly Service[];
  areas: readonly ServiceArea[];
  nextSteps: readonly ProcessStep[];
  photoStates: readonly PhotoAttachment[];
  /** Show the visible prototype notice. */
  showPrototypeNotice: boolean;
}

type StepNumber = 1 | 2 | 3 | 4;
type ValidationState = "empty" | "errors";

const stepTitles: Record<StepNumber, string> = {
  1: "Service",
  2: "The job",
  3: "Location and timing",
  4: "Photos and contact",
};

const stepNumbers: readonly StepNumber[] = [1, 2, 3, 4];

const errorText = {
  services: "Choose at least one service.",
  description: "Describe the job so we can scope it.",
  town: "Choose the town closest to the job.",
  zip: "Enter a 5-digit ZIP code.",
  name: "Enter your name.",
  email: "Enter an email address we can reach you at.",
  consent: "Agree to be contacted so we can reply.",
} as const;

/** Builds `aria-describedby` for a control: its help text, plus its error when shown. */
const describe = (id: string, showError: boolean): string =>
  showError ? `${id}-help ${id}-error` : `${id}-help`;

function Field({
  id,
  label,
  help,
  error,
  showError,
  children,
}: {
  id: string;
  label: string;
  help: string;
  error: string;
  showError: boolean;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      <p id={`${id}-help`} className="text-sm text-ink-soft">
        {help}
      </p>
      {showError ? (
        <p id={`${id}-error`} className="text-sm font-semibold text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

const selectClass =
  "min-h-11 w-full rounded-lg border border-input bg-card px-3 text-base text-foreground";

/**
 * Four-step guided estimate form, PREVIEW ONLY. The stepper, Back/Next and the validation toggle
 * only change what is shown. There is no validation logic, no file reading, no storage and no
 * submission. Real behavior arrives in Phase 4.
 */
export function EstimateFormPreview({
  services,
  areas,
  nextSteps,
  photoStates,
  showPrototypeNotice,
}: EstimateFormPreviewProps) {
  const [step, setStep] = useState<StepNumber>(1);
  const [validation, setValidation] = useState<ValidationState>("empty");
  const showErrors = validation === "errors";

  const stepErrors: Record<StepNumber, readonly string[]> = {
    1: [errorText.services],
    2: [errorText.description],
    3: [errorText.town, errorText.zip],
    4: [errorText.name, errorText.email, errorText.consent],
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-8">
        <PreviewStateToggle
          options={[
            { value: "empty", label: "Empty form" },
            { value: "errors", label: "Validation messages" },
          ]}
          value={validation}
          onChange={setValidation}
        />

        <nav aria-label="Form steps (preview)" className="mt-8">
          <ol className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {stepNumbers.map((number) => {
              const current = number === step;
              return (
                <li key={number}>
                  <button
                    type="button"
                    onClick={() => setStep(number)}
                    aria-current={current ? "step" : undefined}
                    className={
                      current
                        ? "flex min-h-11 w-full items-center gap-2 rounded-lg border border-ink bg-ink px-3 text-left text-sm font-semibold text-ivory"
                        : "flex min-h-11 w-full items-center gap-2 rounded-lg border border-line-strong px-3 text-left text-sm font-semibold hover:bg-ink/5"
                    }
                  >
                    <span aria-hidden="true" className="font-display text-xl leading-none">
                      {number}
                    </span>
                    {stepTitles[number]}
                  </button>
                </li>
              );
            })}
          </ol>
          <div className="mt-4 flex items-center gap-4">
            <Progress
              value={(step / 4) * 100}
              aria-label={`Step ${step} of 4`}
              className="flex-1"
            />
            <p className="text-sm font-semibold whitespace-nowrap">Step {step} of 4</p>
          </div>
        </nav>

        <div className="mt-8 rounded-xl border border-oak bg-card p-6 shadow-card md:p-8">
          <h2 className="text-3xl md:text-4xl">{stepTitles[step]}</h2>

          {showErrors ? (
            <Alert variant="destructive" className="mt-6">
              <AlertTitle>
                {stepErrors[step].length === 1
                  ? "There is 1 thing to fix"
                  : `There are ${stepErrors[step].length} things to fix`}
              </AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5">
                  {stepErrors[step].map((message) => (
                    <li key={message}>{message}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          ) : null}

          <div className="mt-8 space-y-8">
            {step === 1 ? (
              <>
                <fieldset className="space-y-2" aria-describedby={describe("services", showErrors)}>
                  <legend className="font-semibold">Which services do you need?</legend>
                  <p id="services-help" className="text-sm text-ink-soft">
                    Pick all that apply. You can add details on the next step.
                  </p>
                  <ul>
                    {services.map((service, index) => (
                      <li key={service.id} className="flex min-h-11 items-center gap-3">
                        <Checkbox
                          id={`service-${service.slug}`}
                          defaultChecked={index === 0}
                          aria-invalid={showErrors || undefined}
                        />
                        <Label
                          htmlFor={`service-${service.slug}`}
                          className="flex min-h-11 flex-1 items-center"
                        >
                          {service.name}
                        </Label>
                      </li>
                    ))}
                  </ul>
                  {showErrors ? (
                    <p id="services-error" className="text-sm font-semibold text-error">
                      {errorText.services}
                    </p>
                  ) : null}
                </fieldset>

                <fieldset className="space-y-2">
                  <legend className="font-semibold">What are you after?</legend>
                  <RadioGroup defaultValue="estimate">
                    {(["estimate", "availability"] as const).map((intent) => (
                      <div key={intent} className="flex min-h-11 items-center gap-3">
                        <RadioGroupItem value={intent} id={`intent-${intent}`} />
                        <Label
                          htmlFor={`intent-${intent}`}
                          className="flex min-h-11 flex-1 items-center"
                        >
                          {intentLabels[intent]}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </fieldset>
              </>
            ) : null}

            {step === 2 ? (
              <Field
                id="description"
                label="Describe the job"
                help="What is going on, where it is, and anything you have noticed. A few sentences is plenty."
                error={errorText.description}
                showError={showErrors}
              >
                <Textarea
                  id="description"
                  rows={6}
                  aria-describedby={describe("description", showErrors)}
                  aria-invalid={showErrors || undefined}
                />
              </Field>
            ) : null}

            {step === 3 ? (
              <>
                <Field
                  id="town"
                  label="Closest town"
                  help="Choose the town nearest the job. Not listed? Pick the last option and we will confirm."
                  error={errorText.town}
                  showError={showErrors}
                >
                  <select
                    id="town"
                    defaultValue=""
                    className={selectClass}
                    aria-describedby={describe("town", showErrors)}
                    aria-invalid={showErrors || undefined}
                  >
                    <option value="" disabled>
                      Choose a town
                    </option>
                    {areas.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  id="zip"
                  label="ZIP code"
                  help="Five digits, for example 98225."
                  error={errorText.zip}
                  showError={showErrors}
                >
                  <Input
                    id="zip"
                    inputMode="numeric"
                    autoComplete="postal-code"
                    className="min-h-11"
                    aria-describedby={describe("zip", showErrors)}
                    aria-invalid={showErrors || undefined}
                  />
                </Field>

                <fieldset className="space-y-2">
                  <legend className="font-semibold">When would you like it done?</legend>
                  <RadioGroup defaultValue="flexible">
                    {(Object.keys(timelineLabels) as (keyof typeof timelineLabels)[]).map(
                      (timeline) => (
                        <div key={timeline} className="flex min-h-11 items-center gap-3">
                          <RadioGroupItem value={timeline} id={`timeline-${timeline}`} />
                          <Label
                            htmlFor={`timeline-${timeline}`}
                            className="flex min-h-11 flex-1 items-center"
                          >
                            {timelineLabels[timeline]}
                          </Label>
                        </div>
                      ),
                    )}
                  </RadioGroup>
                </fieldset>
              </>
            ) : null}

            {step === 4 ? (
              <>
                <section aria-labelledby="photos-title" className="space-y-4">
                  <h3 id="photos-title">Photos</h3>
                  <div className="rounded-xl border-2 border-dashed border-line-strong bg-background p-8 text-center">
                    <Upload aria-hidden="true" size={28} strokeWidth={1.5} className="mx-auto" />
                    <p className="mt-3 font-semibold">Drop photos here, or choose files</p>
                    <p className="mx-auto mt-1 text-sm text-ink-soft">
                      JPG, PNG or HEIC photos. The number and size limits will be listed here once
                      uploads are connected.
                    </p>
                    <div className="mt-4">
                      <PreviewButton variant="secondary" describedBy="photos-preview-note">
                        Choose files
                      </PreviewButton>
                    </div>
                  </div>
                  <p id="photos-preview-note" className="text-sm text-ink-soft">
                    Preview only: no files are read or sent. The tiles below show each upload state.
                  </p>
                  <PhotoTiles photos={photoStates} />
                </section>

                <section aria-labelledby="contact-title" className="space-y-6">
                  <h3 id="contact-title">Your details</h3>
                  <Field
                    id="name"
                    label="Name"
                    help="So we know who to ask for."
                    error={errorText.name}
                    showError={showErrors}
                  >
                    <Input
                      id="name"
                      autoComplete="name"
                      className="min-h-11"
                      aria-describedby={describe("name", showErrors)}
                      aria-invalid={showErrors || undefined}
                    />
                  </Field>
                  <Field
                    id="email"
                    label="Email"
                    help="We will reply here unless you prefer another way."
                    error={errorText.email}
                    showError={showErrors}
                  >
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      className="min-h-11"
                      aria-describedby={describe("email", showErrors)}
                      aria-invalid={showErrors || undefined}
                    />
                  </Field>
                  <Field
                    id="phone"
                    label="Phone (optional)"
                    help="Handy if a quick call would be easier."
                    error=""
                    showError={false}
                  >
                    <Input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      className="min-h-11"
                      aria-describedby="phone-help"
                    />
                  </Field>
                  <fieldset className="space-y-2">
                    <legend className="font-semibold">Preferred way to reach you</legend>
                    <RadioGroup defaultValue="email">
                      {(Object.keys(preferredContactLabels) as (keyof typeof preferredContactLabels)[]).map(
                        (contact) => (
                          <div key={contact} className="flex min-h-11 items-center gap-3">
                            <RadioGroupItem value={contact} id={`contact-${contact}`} />
                            <Label
                              htmlFor={`contact-${contact}`}
                              className="flex min-h-11 flex-1 items-center"
                            >
                              {preferredContactLabels[contact]}
                            </Label>
                          </div>
                        ),
                      )}
                    </RadioGroup>
                  </fieldset>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="consent"
                        className="mt-3"
                        aria-describedby={showErrors ? "consent-error" : undefined}
                        aria-invalid={showErrors || undefined}
                      />
                      <Label htmlFor="consent" className="min-h-11 flex-1 py-2.5">
                        I agree to be contacted about this request.
                      </Label>
                    </div>
                    {showErrors ? (
                      <p id="consent-error" className="text-sm font-semibold text-error">
                        {errorText.consent}
                      </p>
                    ) : null}
                  </div>
                </section>
              </>
            ) : null}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-oak pt-6">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep((current) => (current > 1 ? ((current - 1) as StepNumber) : current))}
              className="btn btn-secondary disabled:pointer-events-none disabled:opacity-50"
            >
              Back
            </button>
            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep((current) => (current < 4 ? ((current + 1) as StepNumber) : current))}
                className="btn btn-primary"
              >
                Next step
              </button>
            ) : (
              <div className="flex flex-col items-end gap-2">
                <CtaLink href="/request-estimate/confirmation" arrow>
                  Preview confirmation page
                </CtaLink>
                <p className="text-sm text-ink-soft">Nothing is sent from this preview.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <aside aria-label="What happens next" className="space-y-6 lg:col-span-4">
        {showPrototypeNotice ? (
          <Alert>
            <AlertTitle>Prototype notice</AlertTitle>
            <AlertDescription>
              This form is a visual preview. It does not validate, save or send anything yet.
            </AlertDescription>
          </Alert>
        ) : null}
        <div className="rounded-xl border border-oak bg-oak-soft p-6">
          <h2 className="text-3xl">What happens next</h2>
          <ol className="mt-5 space-y-4">
            {nextSteps.map((item) => (
              <li key={item.id} className="flex gap-4">
                <span aria-hidden="true" className="font-display text-3xl leading-none text-moss-deep">
                  {item.order}
                </span>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-ink-soft">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </aside>
    </div>
  );
}
