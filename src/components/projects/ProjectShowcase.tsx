"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Asset, Project } from "@/domain";
import { ProjectCard } from "./ProjectCard";

export interface ShowcaseItem {
  project: Project;
  asset?: Asset;
}

interface ProjectShowcaseProps {
  items: readonly ShowcaseItem[];
  /** Accessible name for the scroll region. */
  label: string;
  /** How many leading cards get gentle parallax (keep at 2 or fewer). */
  parallaxCount?: number;
}

const arrowClass =
  "inline-flex size-11 items-center justify-center rounded-full border border-ink text-ink transition-colors hover:bg-ink hover:text-ivory disabled:pointer-events-none disabled:opacity-40";

/**
 * Horizontal project showcase. A native scroll container with scroll-snap: it is keyboard
 * focusable (arrow keys scroll it), never hijacks page scroll, and works without JS.
 * Previous/next buttons scroll one card at a time and appear once the page has hydrated, since
 * they need JavaScript. The progress bar reflects scroll position and is decorative.
 * Nothing here depends on motion: smooth scrolling is skipped under reduced motion.
 */
export function ProjectShowcase({ items, label, parallaxCount = 2 }: ProjectShowcaseProps) {
  const trackId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const updateProgress = useCallback(() => {
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!track || !thumb) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    const visible = track.scrollWidth > 0 ? track.clientWidth / track.scrollWidth : 1;
    const thumbFraction = Math.max(visible, 0.15);
    const ratio = maxScroll > 0 ? track.scrollLeft / maxScroll : 0;
    thumb.style.width = `${thumbFraction * 100}%`;
    thumb.style.transform = `translateX(${ratio * (1 / thumbFraction - 1) * 100}%)`;

    // Disable an arrow at its end of the strip. Imperative, like the thumb, to avoid re-rendering on scroll.
    if (prevRef.current) prevRef.current.disabled = track.scrollLeft <= 1;
    if (nextRef.current) nextRef.current.disabled = track.scrollLeft >= maxScroll - 1;
  }, []);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector("li");
    const step = firstCard ? firstCard.getBoundingClientRect().width + 24 : track.clientWidth * 0.8;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * step, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    // The arrows need JavaScript, so they start hidden and are revealed here.
    if (prevRef.current) prevRef.current.hidden = false;
    if (nextRef.current) nextRef.current.hidden = false;
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, [updateProgress]);

  return (
    <div>
      <div
        id={trackId}
        ref={trackRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        onScroll={updateProgress}
        className="snap-x snap-mandatory overflow-x-auto scroll-pl-0 rounded-md pb-4"
      >
        <ul className="flex gap-6">
          {items.map(({ project, asset }, index) => (
            <li
              key={project.id}
              className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[32%]"
            >
              <ProjectCard
                project={project}
                asset={asset}
                parallax={index < parallaxCount}
                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 46vw, 82vw"
              />
            </li>
          ))}
        </ul>
      </div>

      <div aria-hidden="true" className="mt-4 h-1 overflow-hidden rounded-full bg-ink/15">
        <div ref={thumbRef} className="h-full w-1/3 rounded-full bg-cedar" />
      </div>
      <div className="mt-3 flex items-center justify-between gap-4">
        <p className="text-sm text-ink-soft">
          Scroll sideways, use the arrows, or focus the strip and use the arrow keys.
        </p>
        <div className="flex gap-2">
          <button
            ref={prevRef}
            type="button"
            hidden
            aria-label="Previous projects"
            aria-controls={trackId}
            onClick={() => scrollByCard(-1)}
            className={arrowClass}
          >
            <ChevronLeft aria-hidden="true" size={22} strokeWidth={1.75} />
          </button>
          <button
            ref={nextRef}
            type="button"
            hidden
            aria-label="Next projects"
            aria-controls={trackId}
            onClick={() => scrollByCard(1)}
            className={arrowClass}
          >
            <ChevronRight aria-hidden="true" size={22} strokeWidth={1.75} />
          </button>
        </div>
      </div>
    </div>
  );
}
