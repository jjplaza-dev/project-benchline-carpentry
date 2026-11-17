"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { cx } from "@/lib/cx";
import {
  INTERACTIVE_MOTION_QUERIES,
  useGsapMedia,
  type MotionConditions,
} from "@/lib/motion";

/** Maximum pull in pixels, per PROJECT_PLAN.md §5.6. */
const MAX_PULL_PX = 10;

interface MagneticButtonProps {
  /** Fraction of the pointer offset to follow, before clamping to 10px. */
  strength?: number;
  className?: string;
  children: ReactNode;
}

const clamp = (value: number): number => Math.max(-MAX_PULL_PX, Math.min(MAX_PULL_PX, value));

/**
 * Wrap the primary "Request an Estimate" button only. Pulls toward the pointer by at most
 * 10px using gsap.quickTo. Fine pointers and no-reduced-motion only; otherwise it renders
 * its child untouched.
 */
export function MagneticButton({ strength = 0.25, className, children }: MagneticButtonProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const setup = useCallback(
    (conditions: MotionConditions) => {
      const el = ref.current;
      if (!el || !conditions.interactive) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

      const onMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
        const rect = el.getBoundingClientRect();
        xTo(clamp((event.clientX - (rect.left + rect.width / 2)) * strength));
        yTo(clamp((event.clientY - (rect.top + rect.height / 2)) * strength));
      };
      const onLeave = () => {
        xTo(0);
        yTo(0);
      };

      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      return () => {
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        gsap.set(el, { clearProps: "transform" });
      };
    },
    [strength],
  );

  useGsapMedia(INTERACTIVE_MOTION_QUERIES, setup);

  return (
    <span ref={ref} className={cx("magnetic", className)}>
      {children}
    </span>
  );
}
