"use client";

import { useState } from "react";
import { Mail, Menu, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CtaLink } from "@/components/primitives/CtaLink";
import type { NavItem } from "@/domain";
import { NavLink } from "./NavLink";

interface MobileNavProps {
  primary: readonly NavItem[];
  secondary: readonly NavItem[];
  cta?: NavItem;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
}

/**
 * Menu button plus a shadcn Sheet. Shown below the `xl` breakpoint.
 * Relies on the standard shadcn Sheet exports (UNVERIFIED against your generated sheet.tsx).
 */
export function MobileNav({
  primary,
  secondary,
  cta,
  phone,
  phoneHref,
  email,
  emailHref,
}: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button type="button" className="icon-btn xl:hidden" aria-label="Open menu">
          <Menu aria-hidden="true" size={22} strokeWidth={1.75} />
        </button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Site navigation and contact options.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-8 overflow-y-auto px-4 pb-8">
          <nav aria-label="Mobile primary">
            <ul className="flex flex-col">
              {primary.map((item) => (
                <li key={item.href}>
                  <NavLink href={item.href} className="nav-link-mobile" onNavigate={close}>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {cta ? (
            <CtaLink href={cta.href} large arrow onClick={close}>
              {cta.label}
            </CtaLink>
          ) : null}

          <nav aria-label="Mobile secondary">
            <ul className="flex flex-col">
              {secondary.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-base font-semibold text-ink-soft"
                    onNavigate={close}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-1 border-t border-oak pt-6">
            <a
              href={phoneHref}
              className="inline-flex min-h-11 items-center gap-3 font-semibold text-ink"
            >
              <Phone aria-hidden="true" size={18} strokeWidth={1.75} />
              {phone}
            </a>
            <a
              href={emailHref}
              className="inline-flex min-h-11 items-center gap-3 font-semibold text-ink"
            >
              <Mail aria-hidden="true" size={18} strokeWidth={1.75} />
              {email}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
