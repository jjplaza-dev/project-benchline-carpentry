"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Scroll distance (px) before the header switches from green to white. */
const THRESHOLD = 24;

/*
 * All header colors live here as Tailwind classes (utilities beat the old .site-header rules in
 * globals.css), so the green bar never depends on a CSS variable or a stylesheet edit:
 *   top of page → solid green, ivory text, no border
 *   scrolled    → solid white, ink text, oak border and a soft shadow
 * `group/header` + `data-scrolled` let children (logo, links, menu button) follow the same state.
 */
const HEADER_CLASS = [
    "site-header group/header",
    "bg-[var(--hero-green,var(--color-moss-deep))] text-ivory",
    "border-b border-b-transparent [backdrop-filter:none]",
    "transition-[background-color,border-color,box-shadow] duration-300",
    "data-[scrolled=true]:bg-white data-[scrolled=true]:text-ink data-[scrolled=true]:border-b-oak",
    "data-[scrolled=true]:shadow-[0_10px_24px_-18px_color-mix(in_srgb,var(--color-ink)_40%,transparent)]",
].join(" ");

/**
 * Client shell for the sticky header. It tracks scroll state and exposes it as `data-scrolled`;
 * `data-surface="dark"` while the bar is green flips the focus ring to ivory.
 * Children stay server-rendered.
 */
export function ScrollHeader({ children }: { children: ReactNode }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const update = () => setScrolled(window.scrollY > THRESHOLD);
        update();
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);

    return (
        <header
            className={HEADER_CLASS}
            data-scrolled={scrolled}
            data-surface={scrolled ? undefined : "dark"}
        >
            {children}
        </header>
    );
}