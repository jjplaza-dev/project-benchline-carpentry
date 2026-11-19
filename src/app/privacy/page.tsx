import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Benchline Carpentry & Home Repair handles personal information (draft outline).",
};

/** Structured placeholder outline. Bracketed statements are for the owner and a lawyer to complete. */
const sections: readonly LegalSection[] = [
  {
    heading: "Who we are",
    paragraphs: [
      "This notice would describe how Benchline Carpentry & Home Repair handles personal information collected through this website.",
      "[Owner to add the legal business name, mailing address and a contact for privacy questions.]",
    ],
  },
  {
    heading: "What we collect",
    paragraphs: [
      "Information you choose to give us when you request an estimate or contact us typically includes your name, email address, phone number, ZIP code or address, a description of your project and any photos you send.",
      "[Owner and counsel to confirm the final list, including anything collected automatically by the site.]",
    ],
  },
  {
    heading: "How we use it",
    paragraphs: [
      "Information is used to respond to requests, prepare estimates, schedule work and send invoices.",
      "[Owner and counsel to confirm each purpose and whether any information is used for marketing.]",
    ],
  },
  {
    heading: "Photos you send",
    paragraphs: [
      "Photos help us scope a job. [Owner to state where photos are stored, who can see them and how long they are kept. No photo storage is connected in the current prototype.]",
    ],
  },
  {
    heading: "Payments",
    paragraphs: [
      "Card payments are planned to be handled by a payment provider on its own hosted page, so card numbers are not entered on this site.",
      "[Owner and counsel to describe the provider's role and link to its privacy notice once payments are live.]",
    ],
  },
  {
    heading: "Cookies and analytics",
    paragraphs: [
      "[Owner to state whether cookies or analytics are used. No analytics service is selected in the current prototype.]",
    ],
  },
  {
    heading: "Your choices",
    paragraphs: [
      "[Owner and counsel to describe how people can ask to see, correct or delete their information, including any rights that apply in Washington State.]",
    ],
  },
  {
    heading: "Contact",
    paragraphs: ["[Owner to add the email address or phone number for privacy questions.]"],
  },
];

/** P16 Privacy. */
export default function PrivacyPage() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy notice"
      intro="A draft outline of how personal information would be handled. It is placeholder text."
      sections={sections}
    />
  );
}
