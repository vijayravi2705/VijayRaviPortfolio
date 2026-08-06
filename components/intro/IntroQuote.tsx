// components/intro/IntroQuote.tsx
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useTranslations } from "next-intl";

export default function IntroQuote({ onComplete }: { onComplete: () => void }) {
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const t = useTranslations("intro");

  // Same ref-stabilization pattern as Preloader: the timeline is built once
  // and never restarted if the parent passes a new onComplete reference.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      // Skip the 3D/scroll animation — just hold briefly, then finish
      const timer = setTimeout(() => onCompleteRef.current(), 1200);
      return () => clearTimeout(timer);
    }

    const holdSeconds = 1.8; // how long the quote stays fully visible

    const tl = gsap.timeline({
      onComplete: () => onCompleteRef.current(),
    });

    tl
      // 3D entrance: tilts up out of the page into place
      .fromTo(
        quoteRef.current,
        { opacity: 0, y: 40, rotateX: -90, transformPerspective: 800 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          ease: "power3.out",
          transformOrigin: "top center",
        },
      )
      // Hold — reader has time to actually read the line
      .to({}, { duration: holdSeconds })
      // Scroll up and out, revealing the hero underneath
      .to(quoteRef.current, {
        y: -80,
        opacity: 0,
        duration: 0.7,
        ease: "power2.in",
      });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--paper)] px-8"
      style={{ perspective: "800px" }}
      role="status"
      aria-live="polite"
    >
      <p
        ref={quoteRef}
        className="max-w-2xl text-center font-serif text-2xl md:text-4xl tracking-tight text-[var(--ink)]"
      >
        {t("quote")}
      </p>
    </div>
  );
}
