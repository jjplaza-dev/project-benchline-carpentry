/**
 * NavItem fixtures for the header, mobile sheet and footer.
 * `primary` = main nav; `secondary` = utility/footer links; `cta` = always-reachable estimate button.
 */

import type { NavItem } from "@/domain";

export const navItems: readonly NavItem[] = [
  { label: "Our Services", href: "/services", kind: "primary" },
  { label: "Decks & Exterior", href: "/decks-exterior", kind: "primary" },
  { label: "Interior Carpentry", href: "/interior-carpentry", kind: "primary" },
  { label: "Project Gallery", href: "/projects", kind: "primary" },
  { label: "About", href: "/about", kind: "primary" },
  { label: "Contact", href: "/contact", kind: "primary" },
  { label: "Pay an Invoice", href: "/pay-invoice", kind: "secondary" },
  { label: "Project Status", href: "/project-status", kind: "secondary" },
  { label: "FAQ", href: "/faq", kind: "secondary" },
  { label: "Privacy", href: "/privacy", kind: "secondary" },
  { label: "Terms", href: "/terms", kind: "secondary" },
  { label: "Request an Estimate", href: "/request-estimate", kind: "cta" },
];
