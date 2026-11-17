"use client";

import { useCallback, useEffect, useRef } from "react";
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

/**
 * Horizontal project showcase. A native scroll container with scroll-snap: it is keyboard
 * focusable (arrow keys scroll it), never hijacks page scroll, and works without JS.
 * The progress bar below only reflects scroll position; it is decorative.
 */
export function ProjectShowcase({ items, label, parallaxCount = 2 }: ProjectShowcaseProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

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
  }, []);

  useEffect(() => {
    updateProgress();
    window.addEventListener("resize", updateProgress);
    return () => window.removeEventListener("resize", updateProgress);
  }, [updateProgress]);

  return (
    <div>
      <div
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
      <p className="mt-3 text-sm text-ink-soft">
        Scroll sideways, or focus the strip and use the arrow keys.
      </p>
    </div>
  );
}
