"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cx } from "@/lib/cx";
import { MOTION_QUERIES, useGsapMedia, type MotionConditions } from "@/lib/motion";

interface RevealProps {
  /** `rise`: fade and lift. `clip`: wipe open from the top (for image frames). */
  variant?: "rise" | "clip";
  /** Seconds to wait after the trigger fires. */
  delay?: number;
  className?: string;
  children: ReactNode;
}

/**
 * Scroll-triggered reveal (0.8s rise, 0.9s clip). Content is fully visible without JS
 * and under reduced motion: GSAP sets the hidden start state only when motion is allowed.
 * Uses opacity, never visibility, so revealed content stays in the accessibility tree.
 */
export function Reveal({ variant = "rise", delay = 0, className, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  const setup = useCallback(
    (conditions: MotionConditions) => {
      const el = ref.current;
      if (!el || !conditions.motion) return;
      gsap.registerPlugin(ScrollTrigger);

      const scrollTrigger = { trigger: el, start: "top 88%", once: true };
      if (variant === "clip") {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.9, ease: "power3.out", delay, scrollTrigger },
        );
      } else {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay, scrollTrigger },
        );
      }
    },
    [variant, delay],
  );

  useGsapMedia(MOTION_QUERIES, setup);

  return (
    <div ref={ref} className={cx(className)}>
      {children}
    </div>
  );
}
