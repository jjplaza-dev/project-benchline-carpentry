import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { CtaLink } from "@/components/primitives/CtaLink";
import { toMailHref, toTelHref } from "@/lib/contact";
import { getBusinessProfile, getNavItems } from "@/lib/selectors";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";

/**
 * Sticky header. Desktop nav shows from `xl` (1280px); below that the sheet menu is used.
 * The estimate CTA shows from `md`; on phones it lives in the mobile action bar and the menu.
 */
export function SiteHeader() {
  const profile = getBusinessProfile();
  const primary = getNavItems("primary");
  const secondary = getNavItems("secondary");
  const cta = getNavItems("cta")[0];

  return (
    <header className="site-header">
      <div className="site-container flex min-h-[4.5rem] items-center justify-between gap-6">
        <Link
          href="/public"
          aria-label="Benchline Carpentry & Home Repair, home"
          className="inline-flex min-h-11 items-center rounded-md"
        >
          <Wordmark />
        </Link>

        <nav aria-label="Primary" className="hidden xl:block">
          <ul className="flex items-center gap-7">
            {primary.map((item) => (
              <li key={item.href}>
                <NavLink href={item.href} className="nav-link">
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {cta ? (
            <div className="hidden md:block">
              <CtaLink href={cta.href}>{cta.label}</CtaLink>
            </div>
          ) : null}
          <MobileNav
            primary={primary}
            secondary={secondary}
            cta={cta}
            phone={profile.phone}
            phoneHref={toTelHref(profile.phone)}
            email={profile.email}
            emailHref={toMailHref(profile.email)}
          />
        </div>
      </div>
    </header>
  );
}
