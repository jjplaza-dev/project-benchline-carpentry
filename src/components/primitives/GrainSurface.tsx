import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";

interface GrainSurfaceProps extends Omit<HTMLAttributes<HTMLElement>, "children" | "className"> {
  as?: ElementType;
  /** Adds architectural grid lines. */
  grid?: boolean;
  /** `dark` flips grain, grid, labels and focus rings for dark backgrounds. */
  tone?: "light" | "dark";
  className?: string;
  children?: ReactNode;
}

/**
 * Surface with subtle paper grain and optional grid lines. Pass the background
 * color through `className` (for example `bg-ink text-ivory`).
 */
export function GrainSurface({
  as: Tag = "div",
  grid = false,
  tone = "light",
  className,
  children,
  ...rest
}: GrainSurfaceProps) {
  return (
    <Tag
      data-surface={tone === "dark" ? "dark" : "light"}
      className={cx("grain", grid && "grid-lines", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
