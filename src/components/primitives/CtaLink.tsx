import type { AnchorHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cx } from "@/lib/cx";

export type CtaVariant = "primary" | "secondary" | "light";

interface CtaLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children"> {
  href: string;
  /** `primary` = cedar fill; `secondary` = ink outline; `light` = ivory fill for dark surfaces. */
  variant?: CtaVariant;
  large?: boolean;
  /** Trailing arrow icon. */
  arrow?: boolean;
  className?: string;
  children: ReactNode;
}

const variantClass: Record<CtaVariant, string> = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  light: "btn-light",
};

/**
 * Brand call-to-action link. Internal paths use next/link; `tel:`, `mailto:`
 * and other schemes render a plain anchor. Does not use the shadcn Button, whose
 * 32px default height is below the 44px touch-target minimum.
 */
export function CtaLink({
  href,
  variant = "primary",
  large = false,
  arrow = false,
  className,
  children,
  ...rest
}: CtaLinkProps) {
  const classes = cx("btn", variantClass[variant], large && "btn-lg", className);
  const content = (
    <>
      {children}
      {arrow ? <ArrowRight aria-hidden="true" size={18} strokeWidth={2} className="btn__arrow" /> : null}
    </>
  );

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}
