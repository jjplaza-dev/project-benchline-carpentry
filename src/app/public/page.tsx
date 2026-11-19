import { BeforeAfterSection } from "@/components/home/BeforeAfterSection";
import { ClosingCta } from "@/components/home/ClosingCta";
import { FeaturedProjects } from "@/components/home/FeaturedProjects";
import { Hero } from "@/components/home/Hero";
import { HowEstimateWorks } from "@/components/home/HowEstimateWorks";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { AreaAndTestimonials } from "@/components/home/AreaAndTestimonials";

/** P01 Home: editorial hero plus six sections, assembled from typed fixtures via selectors. */
export default function HomePage() {
    return (
        <>
            <Hero />
            <ServicesOverview />
            <FeaturedProjects />
            <BeforeAfterSection />
            <HowEstimateWorks />
            <AreaAndTestimonials />
            <ClosingCta />
        </>
    );
}
