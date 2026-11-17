import { cx } from "@/lib/cx";

interface MeasureRuleProps {
  /** Dimension annotation such as "36 in". Purely decorative. */
  label?: string;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

/**
 * Understated measurement rule with ruler ticks, used as a divider or image-frame annotation.
 * Hidden from assistive technology: it is decoration, not content.
 */
export function MeasureRule({
  label,
  orientation = "horizontal",
  className,
}: MeasureRuleProps) {
  return (
    <div
      aria-hidden="true"
      className={cx("measure-rule", orientation === "vertical" && "measure-rule--vertical", className)}
    >
      <span className="measure-rule__line" />
      {label ? (
        <>
          <span className="measure-rule__label">{label}</span>
          <span className="measure-rule__line" />
        </>
      ) : null}
    </div>
  );
}
