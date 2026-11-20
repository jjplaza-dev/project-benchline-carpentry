"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { CtaLink } from "@/components/primitives/CtaLink";
import { SectionLabel } from "@/components/primitives/SectionLabel";
import { estimateHref } from "@/lib/links";

/* ─────────────────────────────────────────────────────────────
   1. IMAGES: drop your files in /public/images/hero/ (or change
      the paths here).
        background → full-bleed scene, JPG/WebP, ~2400px wide
        worker     → transparent PNG/WebP, 1:1, full-body cutout
   ───────────────────────────────────────────────────────────── */
const HERO_IMAGES = {
  background: { src: "/images/hero-carpenter.png", alt: "" },
  worker: { src: "/images/hero-carpenter.png", alt: "A Benchline carpenter at work" },
} as const;

/* ─────────────────────────────────────────────────────────────
   2. PARALLAX: how fast each layer moves UP on screen, as a fraction
      of scroll speed. 0 = pinned, 1 = moves with the page, >1 = faster.
      SMOOTHING is how many seconds the layers take to catch up with
      the scrollbar. 0 = locked to it, ~1 = soft and floaty.
   ───────────────────────────────────────────────────────────── */
const SPEED = { title: 0.35, worker: 1.1 } as const;
const SMOOTHING = 0.9;

/* Height of the sticky header, so the hero fills the rest of the first screen. */
const HEADER_H = "4.5rem";

/* Image fades into the brand green going upward. Solid green at the top matches the header. */
const FADE_UP = [
  "var(--hero-green) 0%",
  "var(--hero-green) 10%",
  "color-mix(in srgb, var(--hero-green) 82%, transparent) 22%",
  "color-mix(in srgb, var(--hero-green) 50%, transparent) 36%",
  "color-mix(in srgb, var(--hero-green) 20%, transparent) 50%",
  "transparent 66%",
].join(", ");

/* Vignette: clear around the lower middle, darkening toward the edges. */
const VIGNETTE =
    "radial-gradient(ellipse 72% 62% at 50% 86%, transparent 42%, color-mix(in srgb, var(--color-ink) 70%, transparent) 100%)";

/**
 * Layered parallax hero. Back to front:
 *   z-0   background, fixed to the viewport and clipped by the hero, so it stays still
 *   z-10  business name, drifts up slowly
 *   z-20  worker cutout, drifts up faster
 *   z-30  copy and CTAs, static
 *
 * GSAP ScrollTrigger drives the two moving layers with `scrub: SMOOTHING`, so they ease toward
 * the scroll position instead of jumping with every wheel tick. With reduced motion nothing
 * is registered and every layer stays at rest.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const workerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const worker = workerRef.current;
    if (!section || !title || !worker) return;

    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // A layer that should rise at `speed` × scroll is pushed back down by the remainder,
      // because the page is already carrying it up at 1×.
      const drift = (el: HTMLElement, speed: number) =>
          gsap.to(el, {
            y: () => section.offsetHeight * (1 - speed),
            ease: "none",
            force3D: true,
            scrollTrigger: {
              start: 0, // from the very top of the page...
              end: () => section.offsetHeight, // ...until the hero has scrolled away
              scrub: SMOOTHING,
              invalidateOnRefresh: true,
            },
          });

      drift(title, SPEED.title);
      drift(worker, SPEED.worker);
    });

    return () => mm.revert();
  }, []);

  return (
      <section
          ref={sectionRef}
          data-surface="dark"
          aria-labelledby="home-title"
          className="relative isolate overflow-hidden bg-[var(--hero-green)] text-ivory"
          style={{ height: `max(36rem, calc(100svh - ${HEADER_H}))`, maxHeight: "60rem" }}
      >
        {/* z-0 · Background. position:fixed inside a clip-path parent stays put while the hero scrolls. */}
        <div aria-hidden="true" className="absolute inset-0 z-0 [clip-path:inset(0)]">
          <div className="fixed inset-x-0 top-0 h-lvh">
            <Image
                src={HERO_IMAGES.background.src}
                alt={HERO_IMAGES.background.alt}
                fill
                priority
                sizes="100vw"
                className="object-cover"
            />
            <div className="absolute inset-0" style={{ backgroundImage: VIGNETTE }} />
            <div
                className="absolute inset-0"
                style={{ backgroundImage: `linear-gradient(to bottom, ${FADE_UP})` }}
            />
          </div>
        </div>

        {/* z-10 · Business name */}
        <div
            ref={titleRef}
            className="pointer-events-none absolute inset-x-0 top-[5%] z-10 will-change-transform md:top-[3%]"
        >
          <h1 id="home-title" className="site-container text-center uppercase">
          <span className="block text-[clamp(4.25rem,19.5vw,21rem)] leading-[0.82] tracking-[0.01em]">
            Benchline
          </span>
            <span className="mt-3 block font-sans text-[clamp(0.875rem,1.8vw,1.75rem)] font-semibold tracking-[0.28em] text-ivory normal-case md:mt-5">
            Carpentry &amp; Home Repair
          </span>
          </h1>
        </div>

        {/* z-20 · Worker cutout (1:1). Square, bottom-centered, never wider than 140vw so it
          can't blow out small screens; the cutout sits mid-square, so edge overflow is clipped. */}
        <div
            ref={workerRef}
            className="pointer-events-none absolute inset-0 z-20 will-change-transform"
        >
          <div className="absolute bottom-[12.5rem] left-1/2 aspect-square h-[min(calc(100%_-_12.5rem),140vw)] -translate-x-1/2 md:bottom-0 md:h-[min(92%,140vw)]">
            <Image
                src={HERO_IMAGES.worker.src}
                alt={HERO_IMAGES.worker.alt}
                fill
                priority
                sizes="(min-width: 768px) 900px, 140vw"
                className="object-contain object-bottom"
            />
          </div>
        </div>

        {/* z-30 · Copy and CTAs. Static so they stay readable and clickable above the worker.
          pb-24 on phones keeps them clear of the fixed Call / Email / Estimate bar. */}
        <div className="site-container pointer-events-none relative z-30 flex h-full flex-col justify-end pb-24 md:pb-14">
          <div className="pointer-events-auto max-w-md [text-shadow:0_1px_16px_rgb(0_0_0/0.45)]">
            <SectionLabel>Bellingham, Washington</SectionLabel>
            <p className="mt-4 hidden text-lg md:block md:text-xl">
              Practical carpentry and home repairs for Bellingham and the surrounding Whatcom County
              communities.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-3 md:mt-6">
              <CtaLink href={estimateHref()} large arrow>
                Request an Estimate
              </CtaLink>
              <Link
                  href="/projects"
                  className="inline-flex min-h-11 items-center font-semibold text-ivory underline underline-offset-4 hover:text-oak"
              >
                See recent projects
              </Link>
            </div>
          </div>
        </div>
      </section>
  );
}