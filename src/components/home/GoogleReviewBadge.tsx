import { cx } from "@/lib/cx";

interface GoogleReviewBadgeProps {
  /** 0 to 5. Fractions fill the last star partially. */
  rating: number;
  count: number;
  /** Link to the Google Business Profile reviews. Renders a plain badge if omitted. */
  href?: string;
  className?: string;
}

const STAR_PATH = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z";

/** Google "G". The four fills are Google's own brand colors, so they are not Benchline tokens. */
function GoogleG() {
  return (
    <svg viewBox="0 0 48 48" width={20} height={20} aria-hidden="true" focusable="false" className="shrink-0">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function StarRow({ className }: { className: string }) {
  return (
    <span className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" width={16} height={16} className={cx("shrink-0", className)}>
          <path d={STAR_PATH} fill="currentColor" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Google rating badge: logo, rating, stars, review count. Visual parts are aria-hidden and a
 * single sentence is exposed to screen readers instead.
 */
export function GoogleReviewBadge({ rating, count, href, className }: GoogleReviewBadgeProps) {
  const pct = Math.min(Math.max(rating / 5, 0), 1) * 100;
  const sentence = `Rated ${rating.toFixed(1)} out of 5 from ${count} Google reviews`;

  const body = (
    <>
      <span className="sr-only">{sentence}</span>
      <GoogleG />
      <span aria-hidden="true" className="font-semibold tabular-nums">
        {rating.toFixed(1)}
      </span>
      <span aria-hidden="true" className="relative inline-flex">
        <StarRow className="text-ivory/30" />
        <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pct}%` }}>
          {/* Star yellow matches the yellow in the Google logo. */}
          <StarRow className="text-[#FBBC05]" />
        </span>
      </span>
      <span aria-hidden="true" className="text-[0.9375rem]">
        {count} Google reviews
      </span>
    </>
  );

  const pill =
    "inline-flex min-h-11 items-center gap-3 rounded-full bg-ink/55 px-4 py-2 text-ivory ring-1 ring-ivory/15 backdrop-blur-sm";

  return href ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cx(pill, "transition-colors hover:bg-ink/70", className)}
    >
      {body}
    </a>
  ) : (
    <div className={cx(pill, className)}>{body}</div>
  );
}
