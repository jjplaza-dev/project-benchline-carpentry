"use client";

import { useState } from "react";
import { PROTOTYPE_NOTICES } from "@/data/site-flags";
import { cx } from "@/lib/cx";

const chips = ["All projects", "Exterior", "Interior", "General"] as const;

/**
 * Static filter visuals. The pressed state is cosmetic and the project grid is NOT filtered;
 * real filtering, URL sync and an empty state arrive in Phase 3. A visible notice says so
 * while PROTOTYPE_NOTICES is on.
 */
export function FilterChips() {
  const [active, setActive] = useState<(typeof chips)[number]>("All projects");

  return (
    <div>
      <div role="group" aria-label="Project filters (preview)" className="flex flex-wrap gap-3">
        {chips.map((chip) => {
          const pressed = chip === active;
          return (
            <button
              key={chip}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(chip)}
              className={cx(
                "inline-flex min-h-11 items-center rounded-full border px-5 text-sm font-semibold transition-colors",
                pressed
                  ? "border-ink bg-ink text-ivory"
                  : "border-line-strong bg-transparent text-ink hover:bg-ink/5",
              )}
            >
              {chip}
            </button>
          );
        })}
      </div>
      {PROTOTYPE_NOTICES ? (
        <p className="mt-3 text-sm text-ink-soft">
          Preview only: filtering is not connected yet, so all projects are always shown.
        </p>
      ) : null}
    </div>
  );
}
