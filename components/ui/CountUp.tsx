// components/ui/CountUp.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function CountUp({
  to,
  decimals = 0,
  duration = 1.2,
  suffix = "",
}: {
  to: number;
  decimals?: number;
  duration?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        el.textContent = to.toFixed(decimals) + suffix;
        return;
      }

      const counter = { value: 0 };

      const animate = () => {
        gsap.killTweensOf(counter);
        counter.value = 0;
        gsap.to(counter, {
          value: to,
          duration,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = counter.value.toFixed(decimals) + suffix;
          },
        });
      };

      const reset = () => {
        gsap.killTweensOf(counter);
        el.textContent = (0).toFixed(decimals) + suffix;
      };

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        onEnter: animate,
        onEnterBack: animate,
        onLeave: reset,
        onLeaveBack: reset,
      });

      // Hero's stats are visible in the very first viewport, so the trigger
      // line is already "crossed" before any scroll happens — onEnter only
      // fires on a scroll transition, not on initial state. Fire manually
      // if the element is already inside the active zone at creation time.
      if (trigger.isActive) animate();
    },
    { scope: ref },
  );

  return (
    <span ref={ref}>
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}
