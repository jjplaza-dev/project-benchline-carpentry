import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { CtaLink } from "@/components/primitives/CtaLink";
import { toMailHref, toTelHref } from "@/lib/contact";
import { getBusinessProfile, getNavItems } from "@/lib/selectors";
import { MobileNav } from "./MobileNav";
import { NavLink } from "./NavLink";
import { ScrollHeader } from "./ScrollHeader";

/*
 * Desktop nav is trimmed to four links with room to breathe. This is a stopgap that works on
 * the labels as they are today; the cleaner fix is to edit the "primary" nav items in your
 * fixtures (rename, drop the two service sub-pages) and delete these two constants.
 * The mobile sheet still gets the full list.
 */
const DESKTOP_LABELS: Record<string, string> = {
  "Our Services": "Services",
  "Project Gallery": "Projects",
  About: "About",
  Contact: "Contact",
};

/* Nav link colors follow the header state: ivory on the green bar, ink on white. */
const NAV_LINK =
    "nav-link text-ivory transition-colors duration-300 after:bg-ivory group-data-[scrolled=true]/header:text-ink group-data-[scrolled=true]/header:after:bg-cedar-deep";

/**
 * Sticky header. Green at the top of the page, white once scrolled (see ScrollHeader and
 * the .site-header rules in globals.css). Desktop nav shows from `xl` (1280px); below that the
 * sheet menu is used. The estimate CTA shows from `md`; on phones it lives in the mobile
 * action bar and the menu.
 */
export function SiteHeader() {
  const profile = getBusinessProfile();
  const primary = getNavItems("primary");
  const secondary = getNavItems("secondary");
  const cta = getNavItems("cta")[0];
  const desktopLinks = primary
      .filter((item) => item.label in DESKTOP_LABELS)
      .map((item) => ({ ...item, label: DESKTOP_LABELS[item.label] }));

  return (
      <ScrollHeader>
        <div className="site-container flex min-h-[4.5rem] items-center justify-between gap-6">
          <Link
              href="/"
              aria-label="Benchline Carpentry & Home Repair, home"
              className="inline-flex min-h-11 items-center rounded-md"
          >
            {/* Two wordmarks stacked in one grid cell; they crossfade as the bar changes color.
              Both are aria-hidden because the link's aria-label already names the business. */}
            <span className="grid">
            <span
                aria-hidden="true"
                className="col-start-1 row-start-1 transition-opacity duration-300 group-data-[scrolled=true]/header:opacity-0"
            >
              <Wordmark variant="ivory" />
            </span>
            <span
                aria-hidden="true"
                className="col-start-1 row-start-1 opacity-0 transition-opacity duration-300 group-data-[scrolled=true]/header:opacity-100"
            >
              <Wordmark variant="ink" />
            </span>
          </span>
          </Link>

          <nav aria-label="Primary" className="hidden xl:block">
            <ul className="flex items-center gap-10 2xl:gap-12">
              {desktopLinks.map((item) => (
                  <li key={item.href}>
                    <NavLink href={item.href} className={NAV_LINK}>
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
      </ScrollHeader>
  );
}