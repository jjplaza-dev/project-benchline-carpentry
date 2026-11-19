import type { ReactNode } from "react";
import { ClosingCta } from "@/components/home/ClosingCta";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { CtaLink } from "@/components/primitives/CtaLink";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import type { ServiceCategory } from "@/domain";
import { estimateHref, galleryHref } from "@/lib/links";
import { getProjectsByCategory, getServicesByCategory } from "@/lib/selectors";
import { ServiceGrid } from "./ServiceCard";

export interface CategoryNote {
  title: string;
  body: string;
}

interface CategoryPageProps {
  category: ServiceCategory;
  eyebrow: string;
  title: ReactNode;
  intro: string;
  servicesHeading: string;
  projectsHeading: string;
  notesHeading: string;
  notes: readonly CategoryNote[];
  ruleLabel?: string;
}

/** Shared layout for the two category pages: hero, services, projects, notes, closing CTA. */
export function CategoryPage({
  category,
  eyebrow,
  title,
  intro,
  servicesHeading,
  projectsHeading,
  notesHeading,
  notes,
  ruleLabel,
}: CategoryPageProps) {
  const services = getServicesByCategory(category);
  const projects = getProjectsByCategory(category);

  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        intro={<p>{intro}</p>}
        ruleLabel={ruleLabel}
        titleId="category-title"
        actions={
          <>
            <CtaLink href={estimateHref()} large arrow>
              Request an Estimate
            </CtaLink>
            <CtaLink href="/services" variant="secondary" large>
              All services
            </CtaLink>
          </>
        }
      />

      <Section aria-labelledby="category-services-title">
        <SectionLabel>Services</SectionLabel>
        <h2 id="category-services-title" className="mt-5">
          {servicesHeading}
        </h2>
        <div className="mt-12">
          <ServiceGrid services={services} columns={2} />
        </div>
      </Section>

      <Section tone="oak" aria-labelledby="category-projects-title">
        <SectionLabel>Featured projects</SectionLabel>
        <h2 id="category-projects-title" className="mt-5">
          {projectsHeading}
        </h2>
        <div className="mt-12">
          <ProjectGrid projects={projects} />
        </div>
        <div className="mt-10">
          <CtaLink href={galleryHref({ category })} variant="secondary" arrow>
            See these in the gallery
          </CtaLink>
        </div>
      </Section>

      <Section aria-labelledby="category-notes-title">
        <SectionLabel>Good to know</SectionLabel>
        <h2 id="category-notes-title" className="mt-5">
          {notesHeading}
        </h2>
        <ul className="mt-12 grid gap-8 md:grid-cols-2">
          {notes.map((note) => (
            <li key={note.title} className="border-t-2 border-moss pt-5">
              <h3>{note.title}</h3>
              <p className="mt-3 text-ink-soft">{note.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <ClosingCta />
    </>
  );
}
