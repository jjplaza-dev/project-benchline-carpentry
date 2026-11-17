/**
 * Asset: one image or artwork record.
 * Referenced by id from Service, Project and BeforeAfterPair.
 * Fixtures live in `src/data/assets.ts`.
 */

export type AssetId = `ast-${string}`;

/** `svg` = original linework composition; `photo` = real owner photography. */
export type AssetKind = "svg" | "photo";

export interface Asset {
  readonly id: AssetId;
  readonly kind: AssetKind;
  /** Local public path (for example under `/assets/`). Never a hotlinked URL. */
  readonly path: string;
  /** Meaningful alt text describing what the image shows. */
  readonly alt: string;
  /** True until real owner photography replaces the original placeholder artwork. */
  readonly isPlaceholder: boolean;
  /** What the real photograph should show once supplied. */
  readonly intendedSubject: string;
  /** Sourcing/licensing note that feeds `ASSET_MANIFEST.md`. */
  readonly manifestNote: string;
}
