// components/work/Work.tsx
"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects, type Project } from "@/constants/work";
import CaseStudyModal from "./CaseStudyModal";
import MacDots from "@/components/ui/MacDots";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const sizeClasses: Record<Project["size"], string> = {
  xl: "md:col-span-4 md:row-span-2 col-span-2",
  lg: "md:col-span-2 md:row-span-2 col-span-2",
  md: "md:col-span-2 md:row-span-1 col-span-2",
  wide: "md:col-span-3 md:row-span-1 col-span-2",
};

export default function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = projects.find((p) => p.id === activeId) ?? null;

  useGSAP(
    () => {
      const tiles = gsap.utils.toArray<HTMLElement>(".work-tile");
      tiles.forEach((tile, i) => {
        gsap.fromTo(
          tile,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            delay: (i % 3) * 0.06,
            scrollTrigger: {
              trigger: tile,
              start: "top 92%",
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
      id="work"
      ref={sectionRef}
      className="relative z-10 bg-[var(--paper)] px-6 py-28 md:px-12"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.95] tracking-[-0.01em] text-[var(--ink)]">
            Selected
            <br />
            Work
          </h2>
          <p className="max-w-[220px] font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--graphite)]">
            Nine systems, one thread.
          </p>
        </div>

        <div className="mb-5 flex items-center justify-between gap-6 border-b border-[var(--hairline)] pb-3.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--graphite)]">
            Proof sheet
          </span>
          <div className="flex flex-1 gap-[5px] overflow-hidden">
            {Array.from({ length: 30 }).map((_, i) => (
              <span
                key={i}
                className={`w-px flex-shrink-0 ${
                  i % 5 === 0
                    ? "h-[13px] bg-[var(--graphite)]"
                    : "h-2 bg-[var(--hairline-strong)]"
                }`}
              />
            ))}
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--graphite)]">
            Frame 01–09
          </span>
        </div>

        <div className="relative grid grid-cols-2 gap-[18px] rounded-[30px] border border-[var(--hairline)] bg-[var(--paper-dim)] p-4 md:grid-cols-6 md:[grid-auto-flow:dense] md:p-8">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => setActiveId(project.id)}
              className={`work-tile group relative min-h-[260px] overflow-hidden rounded-[20px] border border-[var(--hairline)] text-left shadow-[0_14px_34px_rgba(0,0,0,0.16)] transition-transform duration-500 hover:-translate-y-1.5 md:min-h-0 ${sizeClasses[project.size]}`}
            >
              <div className="absolute inset-x-0 top-0 z-[4] flex items-center gap-2.5 border-b border-white/10 bg-black/[0.38] px-3.5 py-2.5 backdrop-blur-md">
                <MacDots />
                <span className="truncate font-mono text-[10.5px] tracking-[0.04em] text-white/90">
                  {project.slug}
                </span>
              </div>

              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-contain bg-[#050814] grayscale-[0.55] contrast-[1.05] transition-transform duration-700 group-hover:scale-105 group-hover:grayscale-[0.1]"
              />
              <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/5 via-transparent to-black/85" />

              <div className="relative z-[2] flex h-full flex-col justify-end gap-2 p-5 pt-14 text-white">
                <span className="inline-block w-fit rounded-full bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] backdrop-blur-md">
                  {project.chip}
                </span>
                <div
                  className={`font-serif font-normal leading-tight ${
                    project.size === "xl"
                      ? "text-[clamp(1.6rem,2.8vw,2.4rem)]"
                      : "text-[clamp(1.2rem,2vw,1.7rem)]"
                  }`}
                >
                  {project.title}
                </div>
                <p className="max-h-0 overflow-hidden text-[0.86rem] leading-[1.5] text-white/80 opacity-0 transition-all duration-500 group-hover:mt-1 group-hover:max-h-[140px] group-hover:opacity-100">
                  {project.desc}
                </p>
                <span className="mt-1 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.1em] text-white/90">
                  View case study
                  <span className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <CaseStudyModal project={active} onClose={() => setActiveId(null)} />
    </section>
  );
}
