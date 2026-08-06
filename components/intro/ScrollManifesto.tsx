// components/intro/ScrollManifesto.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const QUOTE = "Innovation distinguishes between a leader and a follower.";
const AUTHOR = "— Steve Jobs";

const SCROLL_DISTANCE = 1400;

export default function ScrollManifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          // Function form: re-evaluated fresh on every refresh instead of
          // being cached as a stale relative offset. Cheap insurance against
          // the exact "end collapses to start" symptom we just hit.
          end: () => `+=${SCROLL_DISTANCE}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // Flip to true temporarily if this regresses again — draws
          // start/end markers on screen so you can see the pin range live.
          markers: false,
        },
      });

      tl.fromTo(
        quoteRef.current,
        { opacity: 0, z: -700, rotateX: 65, y: 120 },
        { opacity: 1, z: 0, rotateX: 0, y: 0, duration: 1, ease: "power2.out" },
        0,
      );

      tl.fromTo(
        authorRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.6,
      );

      tl.to(
        quoteRef.current,
        {
          opacity: 0,
          z: 500,
          rotateX: -50,
          y: -140,
          duration: 1,
          ease: "power2.in",
        },
        1.8,
      ).to(
        authorRef.current,
        { opacity: 0, y: -20, duration: 1, ease: "power2.in" },
        1.8,
      );

      if (document.fonts?.ready) {
        document.fonts.ready.then(() => ScrollTrigger.refresh());
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-20 h-screen w-full overflow-hidden bg-[var(--paper)]"
    ><div className="pointer-events-none absolute top-28 left-1/2 z-10 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--graphite)]">
        Scroll down to see
      </div>

      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-6"
        style={{ perspective: "1200px" }}
      >
        <p
          ref={quoteRef}
          className="max-w-6xl px-8 text-center font-serif text-4xl md:text-6xl tracking-tight text-[var(--ink)]"
        >
          {QUOTE}
        </p>
        <p
          ref={authorRef}
          className="max-w-4xl px-8 text-center font-serif text-xl md:text-2xl italic tracking-tight text-muted-foreground opacity-0"
        >
          {AUTHOR}
        </p>
      </div>
    </section>
  );
}
