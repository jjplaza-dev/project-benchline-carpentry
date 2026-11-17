import type { ReactNode } from "react";
import type { Asset } from "@/domain";
import { cx } from "@/lib/cx";
import { AssetImage } from "@/components/primitives/AssetImage";
import { SampleChip } from "./SampleChip";

interface ImageFrameProps {
  asset: Asset;
  sizes: string;
  /** Tailwind aspect-ratio class. */
  aspect?: string;
  priority?: boolean;
  caption?: ReactNode;
  /** Show a "Placeholder art" chip when the asset is placeholder artwork. */
  chip?: boolean;
  className?: string;
}

/** 8px-radius image frame with a hairline border, optional caption and placeholder chip. */
export function ImageFrame({
  asset,
  sizes,
  aspect = "aspect-[4/3]",
  priority = false,
  caption,
  chip = true,
  className,
}: ImageFrameProps) {
  return (
    <figure className={className}>
      <div
        className={cx(
          "relative overflow-hidden rounded-md border border-oak bg-oak-soft",
          aspect,
        )}
      >
        <AssetImage asset={asset} sizes={sizes} priority={priority} />
        {chip && asset.isPlaceholder ? (
          <SampleChip label="Placeholder art" className="absolute top-3 left-3" />
        ) : null}
      </div>
      {caption ? <figcaption className="mt-3 text-sm text-ink-soft">{caption}</figcaption> : null}
    </figure>
  );
}
