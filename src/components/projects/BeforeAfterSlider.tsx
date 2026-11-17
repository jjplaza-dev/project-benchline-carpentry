"use client";

import {
  useCallback,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { ChevronsLeftRight } from "lucide-react";
import { AssetImage } from "@/components/primitives/AssetImage";
import { SampleChip } from "@/components/primitives/SampleChip";
import type { Asset } from "@/domain";
import { cx } from "@/lib/cx";

interface BeforeAfterSliderProps {
  before: Asset;
  after: Asset;
  caption?: string;
  isSample?: boolean;
  sizes?: string;
  className?: string;
}

const clamp = (value: number): number => Math.min(100, Math.max(0, value));

const chipClass =
  "pointer-events-none absolute top-3 rounded-full bg-ink px-3 py-1 text-xs font-semibold tracking-[0.08em] text-ivory uppercase";

/**
 * Before/after comparison using CSS `clip-path`. Drag with a pointer, or focus the handle and use
 * Arrow keys (5%), Shift+Arrow (10%), PageUp/PageDown (10%), Home (all after) and End (all before).
 * Presentation-only: no data is read or written.
 */
export function BeforeAfterSlider({
  before,
  after,
  caption,
  isSample = true,
  sizes = "(min-width: 1024px) 640px, 100vw",
  className,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(50);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect || rect.width === 0) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    setFromClientX(event.clientX);
  };
  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging.current) setFromClientX(event.clientX);
  };
  const endDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 5;
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowDown":
        setPosition((value) => clamp(value - step));
        break;
      case "ArrowRight":
      case "ArrowUp":
        setPosition((value) => clamp(value + step));
        break;
      case "PageDown":
        setPosition((value) => clamp(value - 10));
        break;
      case "PageUp":
        setPosition((value) => clamp(value + 10));
        break;
      case "Home":
        setPosition(0);
        break;
      case "End":
        setPosition(100);
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  const rounded = Math.round(position);

  return (
    <figure className={className}>
      <div
        ref={frameRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative aspect-[4/3] touch-pan-y overflow-hidden rounded-md border border-oak bg-oak-soft select-none"
      >
        <AssetImage asset={after} sizes={sizes} />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <AssetImage asset={before} sizes={sizes} />
        </div>

        <span className={cx(chipClass, "left-3")}>Before</span>
        <span className={cx(chipClass, "right-3")}>After</span>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-ink shadow-[0_0_0_1px_var(--color-ivory)]"
          style={{ left: `${position}%` }}
        />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Before and after comparison"
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={rounded}
          aria-valuetext={`${rounded}% before, ${100 - rounded}% after`}
          onKeyDown={onKeyDown}
          className="absolute top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full border-2 border-ink bg-ivory text-ink shadow-card"
          style={{ left: `${position}%` }}
        >
          <ChevronsLeftRight aria-hidden="true" size={20} strokeWidth={2} />
        </div>
      </div>

      {caption || isSample ? (
        <figcaption className="mt-3 flex flex-wrap items-center gap-3 text-sm text-ink-soft">
          {caption ? <span>{caption}</span> : null}
          <SampleChip isSample={isSample} />
        </figcaption>
      ) : null}
    </figure>
  );
}
