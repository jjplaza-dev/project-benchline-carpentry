import Link from "next/link";
import { Wordmark } from "@/components/brand/Wordmark";
import { CtaLink } from "@/components/primitives/CtaLink";
import { GrainSurface } from "@/components/primitives/GrainSurface";
import { MeasureRule } from "@/components/primitives/MeasureRule";
import { SampleChip } from "@/components/primitives/SampleChip";
import { PROTOTYPE_NOTICES } from "@/data/site-flags";
import { toMailHref, toTelHref } from "@/lib/contact";
import { getBusinessProfile, getNavItems, getServices } from "@/lib/selectors";

const legalHrefs: readonly string[] = ["/privacy", "/terms"];
const footerLink =
  "inline-flex min-h-11 items-center text-ivory/80 underline-offset-4 hover:text-ivory hover:underline";
const footerHeading =
  "font-sans text-sm font-semibold tracking-[0.08em] text-oak uppercase";

export function SiteFooter() {
  const profile = getBusinessProfile();
  const services = getServices();
  const cta = getNavItems("cta")[0];
  const secondary = getNavItems("secondary");
  const legal = secondary.filter((item) => legalHrefs.includes(item.href));
  const help = secondary.filter((item) => !legalHrefs.includes(item.href));
  const explore = [...getNavItems("primary"), ...help];

  return (
    <GrainSurface as="footer" tone="dark" className="bg-ink text-ivory">
      <div className="site-container pt-16 md:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div className="flex flex-col items-start gap-6">
            <Link href="/public" aria-label="Benchline Carpentry & Home Repair, home" className="rounded-md">
              <Wordmark variant="ivory" />
            </Link>
            <p className="text-ivory/80">{profile.serviceAreaSummary}</p>
            {cta ? (
              <CtaLink href={cta.href} variant="light" arrow>
                {cta.label}
              </CtaLink>
            ) : null}
          </div>

          <nav aria-labelledby="footer-services">
            <h2 id="footer-services" className={footerHeading}>
              Services
            </h2>
            <ul className="mt-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link href={`/services/${service.slug}`} className={footerLink}>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className={footerHeading}>
              Explore
            </h2>
            <ul className="mt-3">
              {explore.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLink}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={footerHeading}>Contact</h2>
            <ul className="mt-3">
              <li className="flex flex-wrap items-center gap-2">
                <a href={toTelHref(profile.phone)} className={footerLink}>
                  {profile.phone}
                </a>
                <SampleChip label="Placeholder" isSample={profile.placeholderFlags.phone} />
              </li>
              <li className="flex flex-wrap items-center gap-2">
                <a href={toMailHref(profile.email)} className={footerLink}>
                  {profile.email}
                </a>
                <SampleChip label="Placeholder" isSample={profile.placeholderFlags.email} />
              </li>
              <li className="flex flex-wrap items-center gap-2 pt-2 text-ivory/80">
                <span>{profile.hoursNote}</span>
              </li>
            </ul>
          </div>
        </div>

        <MeasureRule className="mt-14" label="Bellingham, WA" />

        <div className="footer-clear flex flex-col gap-4 py-8 text-sm text-ivory/80 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            <p>© Benchline Carpentry &amp; Home Repair</p>
            {PROTOTYPE_NOTICES ? (
              <p>
                Prototype notice: sample projects, testimonials and placeholder contact details are shown
                for design review only.
              </p>
            ) : null}
          </div>
          <ul className="flex flex-wrap gap-x-6">
            {legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </GrainSurface>
  );
}
