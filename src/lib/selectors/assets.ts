import { assets } from "@/data/assets";
import type { Asset, AssetId } from "@/domain";

export function getAssetById(id: AssetId): Asset | undefined {
  return assets.find((asset) => asset.id === id);
}

/**
 * Resolves ids in the order given. Ids with no matching asset are skipped,
 * so a missing asset shows up as a missing image rather than a thrown error.
 */
export function getAssetsByIds(ids: readonly AssetId[]): readonly Asset[] {
  return ids
      .map((id) => getAssetById(id))
      .filter((asset): asset is Asset => asset !== undefined);
}