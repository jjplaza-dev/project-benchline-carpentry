import { getProcessSteps } from "@/lib/selectors";

/**
 * Ordered list of the four estimate steps. Colors inherit from the surrounding Section,
 * so it works on ivory, oak and ink backgrounds.
 */
export function ProcessStrip() {
  const steps = getProcessSteps();

  return (
    <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step) => (
        <li key={step.id} className="border-t-2 border-moss pt-5">
          <span
            aria-hidden="true"
            className="font-display text-6xl leading-none font-bold text-moss"
          >
            {String(step.order).padStart(2, "0")}
          </span>
          <h3 className="mt-4">{step.title}</h3>
          <p className="mt-3 opacity-90">{step.description}</p>
        </li>
      ))}
    </ol>
  );
}
