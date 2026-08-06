// components/intro/Preloader.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { welcomeWords } from "@/constants/welcomeWords";

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Keep the latest onComplete in a ref so the effect below never has to
  // depend on it directly. If the parent re-renders and passes a new
  // function reference (e.g. an inline arrow function), this effect will
  // NOT re-run and the GSAP timeline will NOT restart mid-cycle.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      // Skip the cycle entirely — just hold briefly, then finish
      const timer = setTimeout(() => {
        setVisible(false);
        onCompleteRef.current();
      }, 600);
      return () => clearTimeout(timer);
    }

    const totalDurationMs = 2600; // total preloader time
    const perWordMs = totalDurationMs / welcomeWords.length;

    const tl = gsap.timeline({
      onComplete: () => {
        setVisible(false);
        onCompleteRef.current();
      },
    });

    welcomeWords.forEach((_, i) => {
      tl.call(() => setIndex(i))
        .fromTo(
          textRef.current,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: perWordMs / 1000 / 2,
            ease: "power2.out",
          },
        )
        .to(textRef.current, {
          opacity: 0,
          y: -14,
          duration: perWordMs / 1000 / 2,
          ease: "power2.in",
        });
    });

    return () => {
      tl.kill();
    };
    // Intentionally empty: this timeline should be created exactly once per
    // mount and never restarted due to parent re-renders.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex h-dvh w-screen items-center justify-center bg-[var(--paper)] px-8"
      role="status"
      aria-live="polite"
    >
      <span
        ref={textRef}
        lang={welcomeWords[index].lang}
        className="text-center font-serif text-4xl md:text-6xl tracking-tight text-[var(--ink)]"
      >
        {welcomeWords[index].text}
      </span>
    </div>
  );
}
