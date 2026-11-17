import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import type { Faq } from "@/domain";

/**
 * Single-open accordion for FAQ entries. Uses the standard shadcn Accordion exports
 * (UNVERIFIED against your generated accordion.tsx; Radix `type="single" collapsible` API).
 */
export function FaqAccordion({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id}>
          <AccordionTrigger className="min-h-11 text-left text-lg font-semibold">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-base text-ink-soft">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
