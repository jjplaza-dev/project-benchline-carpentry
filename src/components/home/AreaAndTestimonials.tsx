import { Section } from "@/components/layout/Section";
import { ImageFrame } from "@/components/primitives/ImageFrame";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { getAssetById, getBusinessProfile, getServiceAreas, getTestimonials } from "@/lib/selectors";
import { TestimonialList } from "./TestimonialList";

export function AreaAndTestimonials() {
  const profile = getBusinessProfile();
  const areas = getServiceAreas();
  const graphic = getAssetById("ast-area-graphic");
  const testimonials = getTestimonials(3);

  return (
    <Section aria-labelledby="area-title">
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <SectionLabel>Where we work</SectionLabel>
          <h2 id="area-title" className="mt-5">
            Bellingham and
            <br />
            Whatcom County.
          </h2>
          <p className="mt-6 text-lg">{profile.serviceAreaSummary}</p>
          <ul className="mt-8 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {areas.map((area) => (
              <li key={area.id} className="flex min-h-11 items-center gap-3 font-semibold">
                <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-cedar" />
                {area.name}
              </li>
            ))}
          </ul>
          {graphic ? (
            <ImageFrame
              asset={graphic}
              className="mt-10"
              sizes="(min-width: 1024px) 560px, 100vw"
              chip={false}
            />
          ) : null}
        </div>

        <div className="lg:col-span-6">
          <SectionLabel>Kind words</SectionLabel>
          <h2 className="mt-5">What neighbors say.</h2>
          <div className="mt-8">
            <TestimonialList testimonials={testimonials} />
          </div>
        </div>
      </div>
    </Section>
  );
}
