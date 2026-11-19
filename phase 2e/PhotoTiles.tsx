import { CircleAlert, Clock, Image as ImageIcon, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { PhotoAttachment } from "@/domain";
import { cx } from "@/lib/cx";
import { formatFileSize } from "@/lib/format";
import { photoStatusLabels } from "@/lib/labels";

/**
 * Static photo tiles for queued, reading (skeleton), ready and error states.
 * Nothing is read, stored or sent. State is always shown as text, never by color alone.
 */
export function PhotoTiles({ photos }: { photos: readonly PhotoAttachment[] }) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {photos.map((photo) => {
        const isError = photo.status === "error";
        return (
          <li
            key={photo.id}
            className={cx(
              "flex gap-4 rounded-xl border bg-card p-4",
              isError ? "border-error" : "border-oak",
            )}
          >
            <div
              aria-hidden="true"
              className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-md bg-oak-soft text-ink-soft"
            >
              {photo.status === "reading" ? (
                <Skeleton className="size-full" />
              ) : photo.status === "queued" ? (
                <Clock size={24} strokeWidth={1.75} />
              ) : isError ? (
                <CircleAlert size={24} strokeWidth={1.75} className="text-error" />
              ) : (
                <ImageIcon size={24} strokeWidth={1.75} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-semibold">{photo.fileName}</p>
              <p className="text-sm text-ink-soft">
                {photoStatusLabels[photo.status]} · {formatFileSize(photo.sizeBytes)}
              </p>
              {photo.errorMessage ? (
                <p className="mt-1 text-sm font-semibold text-error">{photo.errorMessage}</p>
              ) : null}
            </div>
            <button
              type="button"
              disabled
              aria-label={`Remove ${photo.fileName}`}
              className="inline-flex size-11 shrink-0 items-center justify-center self-start rounded-md text-ink-soft opacity-60"
            >
              <X aria-hidden="true" size={18} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
