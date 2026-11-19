import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaLink } from "@/components/primitives/CtaLink";
import { DashList } from "@/components/primitives/DashList";
import { ImageFrame } from "@/components/primitives/ImageFrame";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { FaqAccordion } from "@/components/services/FaqAccordion";
import type { ServiceCategory } from "@/domain";
import { galleryHref, serviceAction } from "@/lib/links";
import {
  getAssetById,
  getFaqsByService,
  getProjectsByService,
  getServiceBySlug,
  getServiceSlugs,
} from "@/lib/selectors";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

const categoryLabel: Record<ServiceCategory, string> = {
  exterior: "Decks & exterior",
  interior: "Interior carpentry",
  general: "General repairs",
};

/** Pre-renders all six service slugs. */
export function generateStaticParams() {
  return getServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service not found" };
  return { title: service.name, description: service.summary };
}

/** P03 Service detail. */
export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const asset = getAssetById(service.assetId);
  const projects = getProjectsByService(service.id);
  const faqs = getFaqsByService(service.id);
  const action = serviceAction(service);

  return (
      <>
        <PageHero
            eyebrow={categoryLabel[service.category]}
            title={service.name}
            intro={<p>{service.description}</p>}
            titleId="service-title"
            actions={
              <>
                <CtaLink href={action.href} large arrow>
                  {action.label}
                </CtaLink>
                <CtaLink href="/services" variant="secondary" large>
                  All services
                </CtaLink>
              </>
            }
            aside={
              asset ? (
                  <ImageFrame asset={asset} sizes="(min-width: 1024px) 400px, 90vw" priority />
              ) : undefined
            }
        />

        <Section aria-labelledby="service-details-title">
          <h2 id="service-details-title" className="sr-only">
            Job details
          </h2>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel>Typical jobs</SectionLabel>
              <h3 className="mt-5">What we usually do</h3>
              <DashList items={service.typicalJobs} className="mt-6 text-lg" />
            </div>
            <div>
              <SectionLabel>What we need from you</SectionLabel>
              <h3 className="mt-5">Help us scope it</h3>
              <DashList items={service.needsFromYou} className="mt-6 text-lg" />
              <p className="mt-8 border-t-2 border-moss pt-4 text-ink-soft">
                <span className="font-semibold text-ink">Pricing: </span>
                {service.pricingGuidance}
              </p>
            </div>
          </div>
        </Section>

        {projects.length > 0 ? (
            <Section tone="oak" aria-labelledby="related-projects-title">
              <SectionLabel>Related projects</SectionLabel>
              <h2 id="related-projects-title" className="mt-5">
                Work like this.
              </h2>
              <div className="mt-12">
                <ProjectGrid projects={projects} />
              </div>
              <div className="mt-10">
                <CtaLink href={galleryHref({ service: service.slug })} variant="secondary" arrow>
                  See these in the gallery
                </CtaLink>
              </div>
            </Section>
        ) : null}

        {faqs.length > 0 ? (
            <Section aria-labelledby="service-faq-title">
              <div className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <SectionLabel>Questions</SectionLabel>
                  <h2 id="service-faq-title" className="mt-5">
                    Good to know.
                  </h2>
                </div>
                <div className="lg:col-span-7">
                  <FaqAccordion faqs={faqs} />
                </div>
              </div>
            </Section>
        ) : null}

        <ClosingCta serviceSlug={service.slug} intent={service.ctaType} label={action.label} />
      </>
  );
}
