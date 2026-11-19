import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

interface PreviewButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary";
  /** Id of a nearby element explaining why the button does nothing. */
  describedBy?: string;
  className?: string;
}

/**
 * A button that looks complete but is disabled: actions that would submit, accept, pay
 * or copy do nothing in the static prototype. Pair it with a visible note and `describedBy`.
 */
export function PreviewButton({
  children,
  variant = "primary",
  describedBy,
  className,
}: PreviewButtonProps) {
  return (
    <button
      type="button"
      disabled
      aria-describedby={describedBy}
      className={cx(
        "btn",
        variant === "primary" ? "btn-primary" : "btn-secondary",
        "pointer-events-none opacity-60",
        className,
      )}
    >
      {children}
    </button>
  );
}
