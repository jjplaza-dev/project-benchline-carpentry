import type { ProjectStatusRecord } from "@/domain";
import { cx } from "@/lib/cx";
import { projectStatusLabels, projectStatusOrder } from "@/lib/labels";

/**
 * Vertical timeline of all eight stages. Done, current and upcoming are each stated in text,
 * not only by color, and the current stage carries `aria-current="step"`.
 */
export function StatusTimeline({ record }: { record: ProjectStatusRecord }) {
  const currentIndex = projectStatusOrder.indexOf(record.status);

  return (
    <ol className="space-y-0">
      {projectStatusOrder.map((status, index) => {
        const event = record.events.find((item) => item.status === status);
        const state = index < currentIndex ? "done" : index === currentIndex ? "current" : "upcoming";
        const isLast = index === projectStatusOrder.length - 1;

        return (
          <li
            key={status}
            aria-current={state === "current" ? "step" : undefined}
            className="relative flex gap-4 pb-6 last:pb-0"
          >
            {!isLast ? (
              <span
                aria-hidden="true"
                className={cx(
                  "absolute top-6 bottom-0 left-[0.6875rem] w-0.5",
                  state === "done" ? "bg-moss-deep" : "bg-oak",
                )}
              />
            ) : null}
            <span
              aria-hidden="true"
              className={cx(
                "relative mt-1 size-6 shrink-0 rounded-full border-2",
                state === "done" && "border-moss-deep bg-moss-deep",
                state === "current" && "border-cedar-deep bg-cedar",
                state === "upcoming" && "border-line-strong bg-background",
              )}
            />
            <div className="min-w-0">
              <p className={cx("font-semibold", state === "upcoming" && "text-ink-soft")}>
                {projectStatusLabels[status]}
                <span className="ml-2 text-sm font-normal text-ink-soft">
                  {state === "done" ? "Done" : state === "current" ? "Current stage" : "Upcoming"}
                  {event ? ` · ${event.occurredLabel}` : ""}
                </span>
              </p>
              {event?.note ? <p className="text-sm text-ink-soft">{event.note}</p> : null}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
