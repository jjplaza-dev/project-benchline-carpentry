/**
 * Domain barrel. Types only: no UI, data or logic lives in `src/domain/`.
 * Import path inside the project: "@/domain" (once the `@/*` alias is confirmed).
 */

export type * from "./area";
export type * from "./asset";
export type * from "./business";
export type * from "./estimate";
export type * from "./estimate-request";
export type * from "./faq";
export type * from "./invoice";
export type * from "./payments";
export type * from "./process";
export type * from "./project";
export type * from "./service";
export type * from "./status";
export type * from "./testimonial";