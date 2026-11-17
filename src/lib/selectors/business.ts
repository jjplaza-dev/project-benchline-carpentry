import { businessProfile } from "@/data/business-profile";
import { navItems } from "@/data/navigation";
import type { BusinessProfile, NavItem, NavItemKind } from "@/domain";

export function getBusinessProfile(): BusinessProfile {
  return businessProfile;
}

/** All nav items, or only those of one kind, in fixture order. */
export function getNavItems(kind?: NavItemKind): readonly NavItem[] {
  return kind === undefined ? navItems : navItems.filter((item) => item.kind === kind);
}
