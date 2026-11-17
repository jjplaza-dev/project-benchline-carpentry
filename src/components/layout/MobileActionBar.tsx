import { Mail, Phone, Ruler } from "lucide-react";
import { toMailHref, toTelHref } from "@/lib/contact";
import { getBusinessProfile, getNavItems } from "@/lib/selectors";

/** Sticky bottom bar for phones: Call, Email, Estimate. Hidden from `md` upward. */
export function MobileActionBar() {
  const profile = getBusinessProfile();
  const cta = getNavItems("cta")[0];

  return (
    <nav
      aria-label="Quick contact"
      data-surface="dark"
      className="mobile-action-bar grid grid-cols-3 md:hidden"
    >
      <a href={toTelHref(profile.phone)}>
        <Phone aria-hidden="true" size={20} strokeWidth={1.75} />
        Call
      </a>
      <a href={toMailHref(profile.email)}>
        <Mail aria-hidden="true" size={20} strokeWidth={1.75} />
        Email
      </a>
      <a href={cta?.href ?? "/request-estimate"} className="is-primary" aria-label="Request an estimate">
        <Ruler aria-hidden="true" size={20} strokeWidth={1.75} />
        Estimate
      </a>
    </nav>
  );
}
