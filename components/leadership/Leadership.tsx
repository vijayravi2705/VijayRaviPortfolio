// components/leadership/Leadership.tsx
"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { leadership, type LeadershipItem } from "@/constants/leadership";
import LeadershipModal from "@/components/leadership/LeadershipModal";
import MacDots from "@/components/ui/MacDots";
import LeadershipMedia from "@/components/leadership/LeadershipMedia";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Every tile is the same shape and size, with a plain uniform border — no
// more gold/bronze highlight or badge overlay on the "feature" item. The
// badge pill used to sit at top-4, right behind the z-index'd header bar,
// so only a couple pixels of it peeked out at the bottom — that's the
// stray gold bar you were seeing. Removed rather than repositioned.
const TILE_ASPECT = "aspect-[4/3]"; // medium, close to square — barely letterboxes portrait or landscape shots

export default function Leadership() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = leadership.find((p) => p.id === activeId) ?? null;

  useGSAP(
    () => {
      const tiles = gsap.utils.toArray<HTMLElement>(".leadership-tile");
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
      id="leadership"
      ref={sectionRef}
      className="relative z-10 bg-[var(--paper)] px-6 py-28 md:px-20"
    >
      <div className="mx-auto max-w-[1080px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-[clamp(2.2rem,6vw,4.6rem)] leading-none tracking-[-0.01em] text-[var(--ink)]">
            Leadership &amp;
            <br />
            Festivals
          </h2>
          <p className="max-w-[220px] font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--graphite)]">
            On stage and behind it.
          </p>
        </div>

        <div className="relative flex flex-wrap justify-center gap-3 rounded-[30px] border border-[var(--hairline)] bg-[var(--paper-dim)] p-3 md:gap-4 md:p-6">
          {leadership.map((item) => (
            <div
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveId(item.id);
                }
              }}
              className={`leadership-tile group relative ${TILE_ASPECT} w-[calc(50%-0.375rem)] shrink-0 cursor-pointer overflow-hidden rounded-[20px] border border-[var(--hairline)] text-left shadow-[0_14px_34px_rgba(0,0,0,0.16)] transition-transform duration-500 hover:-translate-y-1.5 md:w-[calc(33.333%-0.75rem)]`}
            >
              <div className="absolute inset-x-0 top-0 z-30 flex items-center gap-2.5 border-b border-white/10 bg-black/[0.38] px-3.5 py-2.5 backdrop-blur-md">
                <MacDots />
                <span className="truncate font-mono text-[10.5px] tracking-[0.04em] text-white/90">
                  {item.slug}
                </span>
              </div>

              <LeadershipMedia
                images={item.images}
                fallbackImage={item.image}
                alt={item.title}
              />
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-b from-black/5 via-transparent to-black/85" />

              <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-end gap-2 p-5 pt-14 text-white">
                <span className="inline-block w-fit rounded-full bg-black/40 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] backdrop-blur-md">
                  {item.chip}
                </span>
                <div
                  className={`font-serif font-normal leading-tight ${
                    item.size === "feature"
                      ? "text-[1.2rem] md:text-[1.35rem]"
                      : "text-[1.05rem]"
                  }`}
                >
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <LeadershipModal project={active} onClose={() => setActiveId(null)} />
    </section>
  );
}
