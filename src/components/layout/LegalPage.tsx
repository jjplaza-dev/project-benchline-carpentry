import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PageHero } from "./PageHero";
import { Section } from "./Section";

export interface LegalSection {
  heading: string;
  paragraphs: readonly string[];
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  intro: string;
  sections: readonly LegalSection[];
}

/**
 * Layout for Privacy and Terms. The content is structured PLACEHOLDER text and the page says so
 * visibly: it is not legal advice and must be completed with the owner and reviewed by a lawyer.
 */
export function LegalPage({ eyebrow, title, intro, sections }: LegalPageProps) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={<p>{intro}</p>} titleId="legal-title" />
      <Section aria-labelledby="legal-body-title" padded={false} className="pb-24">
        <h2 id="legal-body-title" className="sr-only">
          {title} details
        </h2>
        <div className="max-w-3xl">
          <Alert>
            <AlertTitle>Placeholder text: needs owner and legal review</AlertTitle>
            <AlertDescription>
              This page outlines the sections a {title.toLowerCase()} usually covers. Statements in
              square brackets must be completed by Benchline, and the whole page must be reviewed by a
              qualified professional before the site is published. It is not legal advice.
            </AlertDescription>
          </Alert>
          <div className="mt-12 space-y-12">
            {sections.map((section, index) => (
              <section key={section.heading} aria-labelledby={`legal-section-${index}`}>
                <h3 id={`legal-section-${index}`} className="text-3xl">
                  {section.heading}
                </h3>
                <div className="mt-4 space-y-4">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
