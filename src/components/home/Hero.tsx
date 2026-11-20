"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { GoogleReviewBadge } from "@/components/home/GoogleReviewBadge";
import { CtaLink } from "@/components/primitives/CtaLink";
import { SectionLabel } from "@/components/primitives/SectionLabel";

/* ─────────────────────────────────────────────────────────────
   1. IMAGES: drop your files in /public/images/ (or change the paths here).
        background → full-bleed scene, JPG/WebP, ~2400px wide
        carpenters → transparent PNG/WebP, 1:1, both carpenters cut out together
   ───────────────────────────────────────────────────────────── */
const HERO_IMAGES = {
  background: { src: "/images/bg-carpentry.jpg", alt: "" },
  carpenters: { src: "/images/hero-carpenters.png", alt: "Two Benchline carpenters at work" },
} as const;

/* ─────────────────────────────────────────────────────────────
   TEMPORARY: placeholder Google review numbers. Replace with the real rating and review
   count from the Google Business Profile before launch, and set `href` to its reviews link.
   ───────────────────────────────────────────────────────────── */
const GOOGLE_REVIEWS = { rating: 5.0, count: 27, href: undefined as string | undefined };

/* ─────────────────────────────────────────────────────────────
   2. PARALLAX: how fast each layer moves UP on screen, as a fraction of scroll speed.
      0 = pinned, 1 = moves with the page. Both layers stay close to 1 so the carpenters
      feel planted on the site; the gap between them (0.13) is the depth you see.
      SMOOTHING is how many seconds the layers take to catch up with the scrollbar.
   ───────────────────────────────────────────────────────────── */
const SPEED = { title: 0.82, carpenters: 0.95 } as const;
const SMOOTHING = 0.6;

/* ─────────────────────────────────────────────────────────────
   3. GROUNDING: the contact shadow under the carpenters' boots.
      `feet` = distance from the bottom of the 1:1 image up to the boot line. Nudge it
      once your PNG is in until the shadow sits right under the boots.
   ───────────────────────────────────────────────────────────── */
const GROUND = { feet: "5%", width: "64%", height: "7%" } as const;

/* Height of the sticky header, so the hero fills the rest of the first screen. */
const HEADER_H = "4.5rem";

/* Brand green. Reads --hero-green from globals.css if it exists, otherwise falls back to the
   moss-deep token, so the hero never loses its green if the variable is missing. */
const GREEN = "var(--hero-green, var(--color-moss-deep))";
/* A deeper green (green + a little ink) for the vignette edges. */
const GREEN_DEEP = `color-mix(in srgb, ${GREEN} 72%, var(--color-ink))`;

/* Image fades into the brand green going upward. Solid green through the header zone, then a long
   eased fade, so the photo emerges from the same green as the navbar. */
const FADE_UP = [
  `${GREEN} 0%`,
  `${GREEN} 14%`,
  `color-mix(in srgb, ${GREEN} 90%, transparent) 26%`,
  `color-mix(in srgb, ${GREEN} 68%, transparent) 38%`,
  `color-mix(in srgb, ${GREEN} 40%, transparent) 50%`,
  `color-mix(in srgb, ${GREEN} 18%, transparent) 62%`,
  "transparent 76%",
].join(", ");

/* Green vignette: clear around the lower middle, closing in with deep green toward the edges. */
const VIGNETTE = `radial-gradient(ellipse 78% 66% at 50% 90%, transparent 40%, color-mix(in srgb, ${GREEN_DEEP} 55%, transparent) 72%, color-mix(in srgb, ${GREEN_DEEP} 92%, transparent) 100%)`;

/* Scrims: soft dark pools behind the text so it stays crisp over the scaffolding. */
const SUBHEAD_SCRIM =
    "radial-gradient(ellipse at center, color-mix(in srgb, var(--color-ink) 66%, transparent) 0%, color-mix(in srgb, var(--color-ink) 40%, transparent) 55%, transparent 100%)";
const COPY_SCRIM = `radial-gradient(ellipse 90% 90% at 22% 78%, color-mix(in srgb, var(--color-ink) 84%, ${GREEN} 16%) 0%, color-mix(in srgb, var(--color-ink) 58%, transparent) 55%, transparent 100%)`;

/* Contact shadow under the boots; multiplies into the scene like a real shadow. */
const GROUND_SHADOW =
    "radial-gradient(ellipse at center, color-mix(in srgb, var(--color-ink) 78%, transparent) 0%, color-mix(in srgb, var(--color-ink) 40%, transparent) 45%, transparent 72%)";

/* Soft edge on the cutout: a tight, low shadow separates it from the scene without a halo,
   and a slight desaturate/dim pulls it toward the scene's lighting. */
const CUTOUT_FILTER =
    "drop-shadow(0 6px 10px color-mix(in srgb, var(--color-ink) 38%, transparent)) saturate(0.95) brightness(0.97)";

/**
 * Layered parallax hero. Back to front:
 *   z-0   background, fixed to the viewport and clipped by the hero, so it stays still
 *   z-10  business name, drifts up slowly
 *   z-20  carpenters cutout plus ground shadow, drift up a touch faster
 *   z-30  copy, Google review badge and estimate CTA, static
 *
 * GSAP ScrollTrigger drives the two moving layers with `scrub: SMOOTHING`, so they ease toward
 * the scroll position instead of jumping with every wheel tick. With reduced motion nothing
 * is registered and every layer stays at rest.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carpentersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const carpenters = carpentersRef.current;
    if (!section || !title || !carpenters) return;

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
      drift(carpenters, SPEED.carpenters);
    });

    return () => mm.revert();
  }, []);

  return (
      <section
          ref={sectionRef}
          data-surface="dark"
          aria-labelledby="home-title"
          className="relative isolate overflow-hidden bg-[var(--hero-green,var(--color-moss-deep))] text-ivory"
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
            <span className="absolute right-[10%] mt-3 block font-sans text-[clamp(0.875rem,1.8vw,1.75rem)] font-semibold tracking-[0.28em] text-ivory normal-case [text-shadow:0_1px_12px_rgb(0_0_0/0.5)] xxl:right-[20%] md:mt-5">
            {/* Scrim: keeps the subheading crisp over the scaffolding. Sits behind the text. */}
              <span
                  aria-hidden="true"
                  className="absolute -inset-x-8 -inset-y-4 -z-10 blur-md"
                  style={{ backgroundImage: SUBHEAD_SCRIM }}
              />
            Carpentry &amp; Home Repair
          </span>
          </h1>
        </div>

        {/* z-20 · Carpenters cutout (1:1). Square, bottom-centered, never wider than 140vw so it
          can't blow out small screens; the cutout sits mid-square, so edge overflow is clipped.
          The ground shadow lives in the same layer and transform, so it never drifts off the boots. */}
        <div
            ref={carpentersRef}
            className="pointer-events-none absolute inset-0 z-20 will-change-transform"
        >
          <div className="absolute bottom-0 left-1/2 aspect-square h-[min(calc(100%_-_10.5rem),140vw)] -translate-x-1/2">
            <div className="absolute inset-0 translate-y-10 scale-110 md:translate-y-20">
              <div
                  aria-hidden="true"
                  className="absolute left-1/2 -translate-x-1/2 mix-blend-multiply blur-[6px]"
                  style={{
                    bottom: GROUND.feet,
                    width: GROUND.width,
                    height: GROUND.height,
                    backgroundImage: GROUND_SHADOW,
                  }}
              />
              <Image
                  src={HERO_IMAGES.carpenters.src}
                  alt={HERO_IMAGES.carpenters.alt}
                  fill
                  priority
                  sizes="(min-width: 768px) 900px, 140vw"
                  className="object-cover"
                  style={{ filter: CUTOUT_FILTER }}
              />
            </div>
          </div>
        </div>

        {/* z-30 · Copy, review badge and CTA. Static so they stay readable above the carpenters.
          pb-24 on phones keeps them clear of the fixed Call / Email / Estimate bar. */}
        <div className="site-container pointer-events-none relative z-30 flex h-full flex-col justify-end pb-24 md:pb-14">
          <div className="pointer-events-auto relative max-w-md">
            {/* Feathered scrim behind the whole block */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-x-12 -inset-y-12 -z-10 blur-md"
                style={{ backgroundImage: COPY_SCRIM }}
            />
            <div className="[text-shadow:0_1px_16px_rgb(0_0_0/0.45)]">
              <SectionLabel>Bellingham, Washington</SectionLabel>
              <p className="mt-4 hidden text-lg md:block md:text-xl">
                Practical carpentry and home repairs for Bellingham and the surrounding Whatcom County
                communities.
              </p>
              <GoogleReviewBadge
                  className="mt-5 md:mt-6"
                  rating={GOOGLE_REVIEWS.rating}
                  count={GOOGLE_REVIEWS.count}
                  href={GOOGLE_REVIEWS.href}
              />
            </div>
            {/* Phones already have the Estimate button in the fixed action bar, so this is md+. */}
            <div className="mt-6 hidden md:block">
              <CtaLink href="/request-estimate" large arrow>
                Request an Estimate
              </CtaLink>
            </div>
          </div>
        </div>
      </section>
  );
}