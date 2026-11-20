"use client";

import { useEffect, useState, type ReactNode } from "react";

/** Scroll distance (px) before the header switches from green to white. */
const THRESHOLD = 24;

/**
 * Client shell for the sticky header. It only reports scroll state through `data-scrolled`
 * (the colors live in globals.css) and `data-surface="dark"` while the bar is green, which
 * flips the focus ring to ivory. Children stay server-rendered.
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
            className="site-header group/header"
            data-scrolled={scrolled}
            data-surface={scrolled ? undefined : "dark"}
        >
            {children}
        </header>
    );
}