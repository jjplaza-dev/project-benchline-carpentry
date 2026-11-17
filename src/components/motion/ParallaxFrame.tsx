"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cx } from "@/lib/cx";
import { PARALLAX_QUERIES, useGsapMedia, type MotionConditions } from "@/lib/motion";

interface ParallaxFrameProps {
  /** Give the frame a height, for example `aspect-[4/3]`. */
  className?: string;
  /** 8px corner radius (default). Set false when a parent already rounds and clips the frame. */
  rounded?: boolean;
  /** Extra classes for the moving inner layer. */
  innerClassName?: string;
  children: ReactNode;
}

/**
 * Image frame with gentle parallax. Use on 2–3 images only (home showcase, gallery hero).
 *
 * The inner layer is 108% of the frame height, offset up by 4%, and travels ±3.7% of its own
 * height, which is ±4% of the frame: 8% total, the maximum allowed. The same crop applies
 * when parallax is off (reduced motion or coarse pointer), so layout never shifts.
 */
export function ParallaxFrame({
  className,
  innerClassName,
  rounded = true,
  children,
}: ParallaxFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const setup = useCallback((conditions: MotionConditions) => {
    const frame = frameRef.current;
    const inner = innerRef.current;
    if (!frame || !inner || !conditions.parallax) return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      inner,
      { yPercent: -3.7 },
      {
        yPercent: 3.7,
        ease: "none",
        scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  }, []);

  useGsapMedia(PARALLAX_QUERIES, setup);

  return (
    <div ref={frameRef} className={cx("relative overflow-hidden", rounded && "rounded-md", className)}>
      <div ref={innerRef} className={cx("absolute inset-x-0 -top-[4%] h-[108%]", innerClassName)}>
        {children}
      </div>
    </div>
  );
}
