import type { SVGProps } from "react";
import { cx } from "@/lib/cx";

export type MarkVariant = "ink" | "ivory" | "cedar";

const variantClass: Record<MarkVariant, string> = {
  ink: "text-ink",
  ivory: "text-ivory",
  cedar: "text-cedar",
};

interface BenchlineMarkProps extends Omit<SVGProps<SVGSVGElement>, "title" | "children"> {
  /** `ink` = one-color; `ivory` = for dark surfaces; `cedar` = accent. */
  variant?: MarkVariant;
  /** Pixel size (square). */
  size?: number;
  /** Set when adjacent text already names the business (for example inside Wordmark). */
  decorative?: boolean;
  title?: string;
}

/**
 * The Benchline Mark: a square-cornered B built from a framing square.
 * The framing square is the L-shaped block (stem and base). A thin L-shaped gap,
 * the negative space of the square, separates it from the bowls. A single 45° cut
 * chamfers the upper bowl's top-right corner.
 */
export function BenchlineMark({
  variant = "ink",
  size = 40,
  decorative = false,
  title = "Benchline Carpentry & Home Repair",
  className,
  ...rest
}: BenchlineMarkProps) {
  const accessibility = decorative
    ? { "aria-hidden": true, focusable: false }
    : { role: "img", "aria-label": title };

  return (
    <svg
      viewBox="0 0 64 64"
      width={size}
      height={size}
      fill="currentColor"
      className={cx(variantClass[variant], className)}
      {...accessibility}
      {...rest}
    >
      {decorative ? null : <title>{title}</title>}
      <path
        fillRule="evenodd"
        d="M6 4H19V47H58V60H6Z M22 4H44L50 10V24H22Z M28 10H44V18H28Z M22 27H55V44H22Z M28 33H49V38H28Z"
      />
    </svg>
  );
}
