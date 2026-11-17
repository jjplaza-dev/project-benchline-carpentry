import type { Metadata } from "next";
import { Barlow_Condensed, Source_Sans_3 } from "next/font/google";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Benchline Carpentry & Home Repair | Bellingham, Washington",
    template: "%s | Benchline Carpentry & Home Repair",
  },
  description:
    "Practical carpentry and home repairs for Bellingham and the surrounding Whatcom County communities.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${barlowCondensed.variable} ${sourceSans.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a href="#main" className="skip-link">
          Skip to main content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileActionBar />
      </body>
    </html>
  );
}
