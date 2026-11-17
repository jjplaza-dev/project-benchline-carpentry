/**
 * ProcessStep: one step of "how an estimate works".
 * Fixtures live in `src/data/process.ts`.
 */

export type ProcessStepId = `step-${string}`;

export interface ProcessStep {
    readonly id: ProcessStepId;
    /** 1-based display order. */
    readonly order: number;
    readonly title: string;
    readonly description: string;
}