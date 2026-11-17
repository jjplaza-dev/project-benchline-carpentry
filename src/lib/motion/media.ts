/**
 * Media queries that gate every GSAP effect (PROJECT_PLAN.md §5.6).
 * Each object is module-level so its identity is stable across renders.
 */

export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const FINE_POINTER = "(hover: hover) and (pointer: fine)";

/** Scroll reveals: any pointer, but never under reduced motion. */
export const MOTION_QUERIES = { motion: MOTION_OK } as const;

/** Magnetic pull and tilt: fine pointers only, never under reduced motion. */
export const INTERACTIVE_MOTION_QUERIES = {
  interactive: `${MOTION_OK} and ${FINE_POINTER}`,
} as const;

/** Parallax: off under reduced motion and on coarse pointers. */
export const PARALLAX_QUERIES = {
  parallax: `${MOTION_OK} and (pointer: fine)`,
} as const;
