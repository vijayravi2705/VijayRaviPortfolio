// components/HydrationFix.tsx
"use client";

import { useEffect } from "react";

// Attributes known to be injected by browser extensions (form-fill tools,
// password managers, ColorZilla, Grammarly, etc.) *before* React finishes
// hydrating. React sees them in the live DOM but not in the server HTML
// and logs a false-positive "hydrated but attributes didn't match" error.
// This has nothing to do with your app code — it strips those attributes
// the instant they appear, site-wide, so the mismatch never gets a chance
// to fire. Safe to leave in permanently; it's a no-op for users without
// such extensions.
const EXTENSION_ATTRS = [
  "fdprocessedid",
  "cz-shortcut-listen",
  "data-gr-ext-installed",
  "data-new-gr-c-s-check-loaded",
];

export default function HydrationFix() {
  useEffect(() => {
    const strip = (root: ParentNode) => {
      for (const attr of EXTENSION_ATTRS) {
        root.querySelectorAll(`[${attr}]`).forEach((el) => el.removeAttribute(attr));
      }
    };

    // Catch anything already injected before this effect ran.
    strip(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.type === "attributes" && EXTENSION_ATTRS.includes(m.attributeName ?? "")) {
          (m.target as HTMLElement).removeAttribute(m.attributeName!);
        }
      }
    });

    observer.observe(document.body, {
      attributes: true,
      subtree: true,
      attributeFilter: EXTENSION_ATTRS,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
