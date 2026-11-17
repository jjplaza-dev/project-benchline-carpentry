"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { cx } from "@/lib/cx";
import {
  INTERACTIVE_MOTION_QUERIES,
  useGsapMedia,
  type MotionConditions,
} from "@/lib/motion";

/** Maximum rotation in degrees, per PROJECT_PLAN.md §5.6. */
const MAX_TILT_DEG = 4;
/** Perspective in pixels (must stay at or above 900). */
const PERSPECTIVE_PX = 1000;

interface TiltCardProps {
  className?: string;
  children: ReactNode;
}

/**
 * Subtle 3D tilt (at most 4°) with a short spring lift, for service and project cards.
 * Active only where `hover: hover` and `pointer: fine` match and reduced motion is off.
 * Touch and reduced-motion users get CSS press feedback and the card's own hover shadow.
 * Style the card itself (radius, `shadow-card hover:shadow-card-lift`) through `className`.
 */
export function TiltCard({ className, children }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const setup = useCallback((conditions: MotionConditions) => {
    const el = ref.current;
    if (!el || !conditions.interactive) return;

    gsap.set(el, { transformPerspective: PERSPECTIVE_PX, transformOrigin: "50% 50%" });
    const rotateX = gsap.quickTo(el, "rotationX", { duration: 0.4, ease: "power2.out" });
    const rotateY = gsap.quickTo(el, "rotationY", { duration: 0.4, ease: "power2.out" });

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      gsap.to(el, { y: -4, duration: 0.35, ease: "back.out(1.6)" });
    };
    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") return;
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      rotateY(px * MAX_TILT_DEG * 2);
      rotateX(-py * MAX_TILT_DEG * 2);
    };
    const onLeave = () => {
      rotateX(0);
      rotateY(0);
      gsap.to(el, { y: 0, duration: 0.4, ease: "power2.out" });
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      gsap.set(el, { clearProps: "transform" });
    };
  }, []);

  useGsapMedia(INTERACTIVE_MOTION_QUERIES, setup);

  return (
    <div ref={ref} className={cx("tilt-card", className)}>
      {children}
    </div>
  );
}
