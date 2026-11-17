import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

interface SectionLabelProps {
  children: ReactNode;
  as?: "p" | "span" | "div";
  className?: string;
}

/** Short uppercase section label with a leading rule. Color adapts to dark surfaces via CSS. */
export function SectionLabel({ children, as: Tag = "p", className }: SectionLabelProps) {
  return <Tag className={cx("section-label", className)}>{children}</Tag>;
}
