import Image from "next/image";
import type { Asset } from "@/domain";
import { cx } from "@/lib/cx";

interface AssetImageProps {
  asset: Asset;
  /** The `sizes` attribute describing the rendered width. */
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * Fills its positioned parent. The parent must set position and a size
 * (for example an aspect-ratio class). Original SVG artwork is served as-is, so `unoptimized` is set.
 */
export function AssetImage({ asset, sizes, priority = false, className }: AssetImageProps) {
  return (
    <Image
      src={asset.path}
      alt={asset.alt}
      fill
      sizes={sizes}
      priority={priority}
      unoptimized
      className={cx("object-cover", className)}
    />
  );
}
