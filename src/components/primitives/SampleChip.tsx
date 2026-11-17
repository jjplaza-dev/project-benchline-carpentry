import { SHOW_SAMPLE_LABELS } from "@/data/site-flags";
import { cx } from "@/lib/cx";

interface SampleChipProps {
  /** Pass the record's `isSample` flag. The chip renders only for sample records. */
  isSample?: boolean;
  /** For example "Sample", "Placeholder" or "Preview state". */
  label?: string;
  /** Ignore `SHOW_SAMPLE_LABELS` (for labels that must always show, such as "Preview state"). */
  alwaysShow?: boolean;
  className?: string;
}

export function SampleChip({
  isSample = true,
  label = "Sample",
  alwaysShow = false,
  className,
}: SampleChipProps) {
  if (!isSample) return null;
  if (!alwaysShow && !SHOW_SAMPLE_LABELS) return null;
  return <span className={cx("sample-chip", className)}>{label}</span>;
}
