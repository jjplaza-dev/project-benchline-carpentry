import { cx } from "@/lib/cx";
import { BenchlineMark, type MarkVariant } from "./BenchlineMark";

interface WordmarkProps {
  /** `ink`: all ink. `ivory`: all ivory (dark surfaces). `cedar`: cedar mark, ink text. */
  variant?: MarkVariant;
  /** Hide the CARPENTRY & HOME REPAIR line for tight spaces. */
  showSupportingLine?: boolean;
  className?: string;
}

const textClass: Record<MarkVariant, string> = {
  ink: "text-ink",
  ivory: "text-ivory",
  cedar: "text-ink",
};

const supportingClass: Record<MarkVariant, string> = {
  ink: "text-ink-soft",
  ivory: "text-ivory/80",
  cedar: "text-ink-soft",
};

/**
 * Mark plus wordmark. The mark is decorative here because the text names the business,
 * so screen readers do not hear the name twice.
 */
export function Wordmark({
  variant = "ink",
  showSupportingLine = true,
  className,
}: WordmarkProps) {
  return (
    <span className={cx("inline-flex items-center gap-3", className)}>
      <BenchlineMark decorative variant={variant} size={40} />
      <span className="flex flex-col gap-1">
        <span
          className={cx(
            "font-display text-[1.75rem] leading-none font-bold tracking-[0.06em]",
            textClass[variant],
          )}
        >
          BENCHLINE
        </span>
        {showSupportingLine ? (
          <span
            className={cx(
              "text-xs leading-none font-semibold tracking-[0.12em]",
              supportingClass[variant],
            )}
          >
            {"CARPENTRY & HOME REPAIR"}
          </span>
        ) : null}
      </span>
    </span>
  );
}
