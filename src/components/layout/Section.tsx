import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

export type SectionTone = "ivory" | "oak" | "ink";

interface SectionProps {
  as?: "section" | "div";
  tone?: SectionTone;
  /** Architectural grid lines. */
  grid?: boolean;
  /** Paper grain. */
  grain?: boolean;
  /** Apply standard vertical section padding. */
  padded?: boolean;
  id?: string;
  "aria-labelledby"?: string;
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

const toneClass: Record<SectionTone, string> = {
  ivory: "bg-ivory text-ink",
  oak: "bg-oak text-ink",
  ink: "bg-ink text-ivory",
};

/** Page section: tone, optional texture, standard padding and a 1240px container. */
export function Section({
  as: Tag = "section",
  tone = "ivory",
  grid = false,
  grain = true,
  padded = true,
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag
      data-surface={tone === "ink" ? "dark" : "light"}
      className={cx(
        toneClass[tone],
        grain && "grain",
        grid && "grid-lines",
        padded && "section-pad",
        className,
      )}
      {...rest}
    >
      <div className={cx("site-container", containerClassName)}>{children}</div>
    </Tag>
  );
}
