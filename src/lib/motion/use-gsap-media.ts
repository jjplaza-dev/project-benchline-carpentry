import { useEffect } from "react";
import { gsap } from "gsap";

export type MotionQueries = Readonly<Record<string, string>>;
export type MotionConditions = Readonly<Record<string, boolean>>;
export type MotionSetup = (conditions: MotionConditions) => void | (() => void);

/**
 * Runs `setup` inside `gsap.matchMedia()` so every tween and ScrollTrigger created
 * there is reverted automatically when a query stops matching or the component unmounts.
 *
 * Pass a module-level `queries` object and a `useCallback`-wrapped `setup`,
 * so the effect does not re-run on every render.
 *
 * UNVERIFIED — USER MUST CONFIRM: the `context.conditions` typing against the installed
 * GSAP version (CMD-V2 will report a mismatch).
 */
export function useGsapMedia(queries: MotionQueries, setup: MotionSetup): void {
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add({ ...queries }, (context) => {
      const conditions = (context.conditions ?? {}) as MotionConditions;
      return setup(conditions);
    });
    return () => mm.revert();
  }, [queries, setup]);
}
