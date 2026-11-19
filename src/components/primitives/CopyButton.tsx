"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Copy } from "lucide-react";
import { cx } from "@/lib/cx";

type CopyState = "idle" | "copied" | "failed";

interface CopyButtonProps {
  /** The text placed on the clipboard. */
  text: string;
  /** Accessible name, for example "Copy phone number". */
  label: string;
  /** Visible text. Defaults to "Copy". */
  children?: ReactNode;
  className?: string;
}

/**
 * Copies `text` with the browser Clipboard API (a local browser capability, not a network call).
 * The result is announced through a polite live region and shown as visible text, never by
 * color alone. If copying is blocked, it says so and the text stays selectable on the page.
 */
export function CopyButton({ text, label, children = "Copy", className }: CopyButtonProps) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  const handleClick = async () => {
    let next: CopyState = "failed";
    try {
      await navigator.clipboard.writeText(text);
      next = "copied";
    } catch {
      next = "failed";
    }
    setState(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2500);
  };

  const message =
    state === "copied" ? "Copied to clipboard." : state === "failed" ? "Could not copy. Select the text and copy it instead." : "";

  return (
    <span className="inline-flex flex-col items-start gap-1">
      <button
        type="button"
        aria-label={label}
        onClick={handleClick}
        className={cx("btn btn-secondary", className)}
      >
        {state === "copied" ? (
          <Check aria-hidden="true" size={18} strokeWidth={2} />
        ) : (
          <Copy aria-hidden="true" size={18} strokeWidth={1.75} />
        )}
        {state === "copied" ? "Copied" : children}
      </button>
      <span role="status" aria-live="polite" className={state === "failed" ? "text-sm font-semibold text-error" : "sr-only"}>
        {message}
      </span>
    </span>
  );
}
