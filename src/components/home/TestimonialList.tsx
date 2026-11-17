import { SampleChip } from "@/components/primitives/SampleChip";
import type { Testimonial } from "@/domain";

/** Testimonials are fictional samples (assumption A4) and carry a "Sample" chip. */
export function TestimonialList({ testimonials }: { testimonials: readonly Testimonial[] }) {
  return (
    <ul className="space-y-6">
      {testimonials.map((testimonial) => (
        <li key={testimonial.id}>
          <figure className="rounded-xl border border-oak/70 bg-card p-6 shadow-card">
            <blockquote>
              <p className="text-xl leading-snug">&ldquo;{testimonial.quote}&rdquo;</p>
            </blockquote>
            <figcaption className="mt-4 flex flex-wrap items-center gap-3 text-sm font-semibold text-ink-soft">
              <span>{testimonial.authorLabel}</span>
              <SampleChip isSample={testimonial.isSample} />
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
