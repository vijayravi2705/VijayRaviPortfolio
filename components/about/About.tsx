// components/about/About.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
gsap.registerPlugin(ScrollTrigger, useGSAP);

const stats = [
  {
    num: "8.68",
    suffix: "/10",
    label: "CGPA at VIT Vellore, B.Tech IT",
  },
  {
    num: "5",
    label: "Languages known, three at professional level",
  },
  {
    num: "5",
    label: "Festivals organised as student lead or volunteer",
  },
  {
    num: "2025",
    label: "Latest certification — OCI Generative AI Professional",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".about-reveal");
      items.forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            delay: i * 0.05,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative z-10 bg-[var(--paper-dim)] px-6 py-28 md:px-12"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="about-reveal mb-16 md:mb-22">
          <h2 className="font-serif text-[clamp(2.2rem,6vw,4.6rem)] leading-none tracking-[-0.01em] text-[var(--ink)]">
            About
          </h2>
        </div>

        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[0.68fr_1.15fr_0.85fr] md:gap-14">
          {/* Photo */}
          <div className="about-reveal mx-auto w-full max-w-[280px] md:sticky md:top-[110px] md:mx-0 md:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] border border-[var(--hairline)] shadow-[0_14px_34px_rgba(0,0,0,0.14)]">
              <div className="absolute inset-x-0 top-0 z-[4] flex items-center gap-2.5 border-b border-white/10 bg-black/[0.38] px-3.5 py-2.5 backdrop-blur-md">
                <span className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </span>
                <span className="font-mono text-[10.5px] tracking-[0.04em] text-white/90">
                  vijay-r.app
                </span>
              </div>
              <Image
                src="/assets/images/profile/vijay.jpeg"
                alt="Vijay R"
                fill
                sizes="(max-width: 768px) 280px, 320px"
                className="absolute inset-0 object-cover grayscale-[0.55] contrast-[1.05] transition-all duration-700 hover:scale-[1.04] hover:grayscale-0"
              />
            </div>
            <div className="mt-3.5">
              <div className="font-serif text-base text-[var(--ink)]">
                Vijay R
              </div>
              <div className="mt-0.5 text-[0.8rem] text-[var(--graphite)]">
                B.Tech IT, VIT Vellore
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div className="about-reveal space-y-[22px]">
            <p className="text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.65] text-[var(--ink)]/[0.88]">
              I&apos;m an Information Technology student at{" "}
              <span className="font-serif italic text-[var(--bronze)]">
                VIT Vellore
              </span>
              , and what actually pulls me into a project is a problem that
              won&apos;t behave — the kind where the obvious fix doesn&apos;t
              work and you have to sit with it a while. That&apos;s the part
              I&apos;m genuinely into: taking a live signal — a camera, a GPS
              feed, a stream of attendance records — and working out how to turn
              it into something a system can act on.
            </p>
            <p className="text-[clamp(1.05rem,1.6vw,1.3rem)] leading-[1.65] text-[var(--ink)]/[0.88]">
              That habit of digging into a problem is what&apos;s carried me
              from a webcam reading emotion off a face to a full-stack platform
              running on real AWS infrastructure. Outside coursework, I&apos;ve
              organised and managed two of VIT&apos;s largest festivals —
              graVITas and Riviera — end to end, because I like solving that
              same kind of problem under pressure, just with people and
              logistics instead of code.
            </p>
          </div>

          {/* Stat rail */}
          <div className="about-reveal flex flex-col">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex items-baseline justify-between gap-6 border-t border-[var(--hairline)] py-[22px] ${
                  i === stats.length - 1 ? "border-b" : ""
                }`}
              >
                <div className="font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-none text-[var(--ink)] whitespace-nowrap">
                  {stat.num}
                  {stat.suffix && (
                    <span className="font-mono text-base text-[var(--graphite)]">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className="max-w-[180px] text-right text-[0.85rem] text-[var(--graphite)] md:text-right">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
