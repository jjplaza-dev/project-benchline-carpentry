"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
  /** Called after a click, for example to close the mobile sheet. */
  onNavigate?: () => void;
}

/** Link that marks itself with `aria-current="page"` on its own route or a child route. */
export function NavLink({ href, className, children, onNavigate }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <Link
      href={href}
      className={className}
      aria-current={isActive ? "page" : undefined}
      onClick={onNavigate}
    >
      {children}
    </Link>
  );
}
