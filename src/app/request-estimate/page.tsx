import type { Metadata } from "next";
import { EstimateFormPreview } from "@/components/estimate/EstimateFormPreview";
import { PageHero } from "@/components/layout/PageHero";
import { Section } from "@/components/layout/Section";
import { PROTOTYPE_NOTICES } from "@/data/site-flags";
import {
    getPhotoStatePreviews,
    getProcessSteps,
    getServiceAreas,
    getServices,
} from "@/lib/selectors";

export const metadata: Metadata = {
    title: "Request an Estimate",
    description:
        "Tell us about your carpentry or home repair project in four short steps and add photos so we can scope it.",
};

/** P08 Request an Estimate: guided four-step form, preview only until Phase 4. */
export default function RequestEstimatePage() {
    return (
        <>
            <PageHero
                eyebrow="Request an estimate"
                title={
                    <>
                        Tell us what&rsquo;s
                        <br />
                        going on.
                    </>
                }
                intro={
                    <p>
                        Four short steps and a few photos is all we need to start. The more we can see, the
                        better we can scope the work.
                    </p>
                }
                ruleLabel="4 steps"
                titleId="request-title"
            />
            <Section aria-labelledby="request-form-title" padded={false} className="pb-24">
                <h2 id="request-form-title" className="sr-only">
                    Estimate request form
                </h2>
                <EstimateFormPreview
                    services={getServices()}
                    areas={getServiceAreas()}
                    nextSteps={getProcessSteps()}
                    photoStates={getPhotoStatePreviews()}
                    showPrototypeNotice={PROTOTYPE_NOTICES}
                />
            </Section>
        </>
    );
}