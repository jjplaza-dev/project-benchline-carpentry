"use client";

import { cx } from "@/lib/cx";
import { SampleChip } from "./SampleChip";

export interface PreviewOption<T extends string> {
  value: T;
  label: string;
}

interface PreviewStateToggleProps<T extends string> {
  options: readonly PreviewOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

/**
 * Switches between static preview states. Always shows the visible "Preview state" label
 * so a preview is never mistaken for real data or a real operation.
 */
export function PreviewStateToggle<T extends string>({
  options,
  value,
  onChange,
  className,
}: PreviewStateToggleProps<T>) {
  return (
    <div className={cx("flex flex-wrap items-center gap-3", className)}>
      <SampleChip label="Preview state" alwaysShow />
      <div role="group" aria-label="Choose a preview state" className="flex flex-wrap gap-2">
        {options.map((option) => {
          const pressed = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-pressed={pressed}
              onClick={() => onChange(option.value)}
              className={cx(
                "inline-flex min-h-11 items-center rounded-full border px-4 text-sm font-semibold transition-colors",
                pressed
                  ? "border-ink bg-ink text-ivory"
                  : "border-line-strong bg-transparent text-ink hover:bg-ink/5",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
