// components/leadership/LeadershipModal.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import MacDots from "@/components/ui/MacDots";
import type { LeadershipItem } from "@/constants/leadership";

interface LeadershipModalProps {
  project: LeadershipItem | null;
  onClose: () => void;
}

export default function LeadershipModal({
  project,
  onClose,
}: LeadershipModalProps) {
  // Swiper's own documented pattern for external nav buttons: the button
  // DOM nodes go into state via callback refs, and get handed to the
  // `navigation` prop as plain values. On mount they start out null (so
  // navigation briefly inits disabled), then setting them triggers a
  // re-render with real elements — Swiper's React wrapper watches for that
  // prop actually changing and rewires itself internally. No manual
  // swiper.navigation.destroy()/init() needed, which is what made this
  // fragile before.
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);

  // Escape-to-close + lock body scroll while the modal is open.
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [project, onClose]);

  if (!project) return null;

  const gallery =
    project.images && project.images.length > 0
      ? project.images
      : [project.image];

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm md:p-8"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-[880px] flex-col overflow-hidden rounded-[24px] border border-[var(--hairline)] bg-[var(--paper)] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* macOS-style top bar — the red dot is the real close button now */}
        <div className="flex items-center gap-2.5 border-b border-[var(--hairline)] bg-[var(--paper-dim)] px-4 py-3">
          <MacDots onClose={onClose} />
          <span className="truncate font-mono text-[11px] tracking-[0.04em] text-[var(--graphite)]">
            {project.slug}
          </span>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto">
          {/* Header */}
          <div className="px-6 pb-6 pt-8 md:px-10">
            {project.badge && (
              <span className="mb-4 inline-flex items-center rounded-full bg-black px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.06em] text-white">
                {project.badge}
              </span>
            )}
            <h3 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] leading-tight text-[var(--ink)]">
              {project.title}
            </h3>
          </div>

          {/* Full, uncropped image — carousel if multiple photos */}
          <div className="w-full bg-[var(--paper)]">
            {gallery.length > 1 ? (
              <div className="group relative h-[42vh] w-full">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay, EffectFade]}
                  autoplay={{ delay: 3200, disableOnInteraction: false }}
                  loop
                  speed={800}
                  effect="fade"
                  fadeEffect={{ crossFade: true }}
                  pagination={{ clickable: true }}
                  navigation={{ prevEl, nextEl }}
                  className="h-full w-full
                    [&_.swiper-pagination-bullet]:!bg-black/30 [&_.swiper-pagination-bullet]:!opacity-100
                    [&_.swiper-pagination-bullet-active]:!bg-black"
                >
                  {gallery.map((src: string, i: number) => (
                    <SwiperSlide
                      key={src + i}
                      className="flex items-center justify-center bg-[var(--paper)]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element --
                          plain <img> is intentional here: these are
                          user-supplied gallery photos of arbitrary origin/
                          size, not a fixed local asset, so next/image's
                          domain allowlist + build-time optimization isn't a
                          great fit. This is a lint *warning*, not a build
                          error, and safe to leave as-is. */}
                      <img
                        src={src}
                        alt={`${project.title} — photo ${i + 1}`}
                        loading="lazy"
                        className="h-full w-full object-contain"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                <button
                  ref={setPrevEl}
                  type="button"
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 z-[5] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black opacity-0 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.4)] backdrop-blur-md outline-none transition-all duration-300 hover:scale-105 hover:bg-white focus:outline-none group-hover:opacity-100"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={2.25} />
                </button>
                <button
                  ref={setNextEl}
                  type="button"
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 z-[5] flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black opacity-0 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.4)] backdrop-blur-md outline-none transition-all duration-300 hover:scale-105 hover:bg-white focus:outline-none group-hover:opacity-100"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={2.25} />
                </button>
              </div>
            ) : (
              <div className="flex max-h-[62vh] w-full items-center justify-center bg-[var(--paper)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={gallery[0]}
                  alt={project.title}
                  loading="lazy"
                  className="max-h-[62vh] w-full object-contain"
                />
              </div>
            )}
          </div>

          {/* Description — problem / approach / result, using the labels
              defined per-item in constants/leadership.ts */}
          <div className="grid grid-cols-1 gap-6 px-6 py-8 md:grid-cols-3 md:px-10">
            {[
              {
                label: project.labels?.[0] ?? "The Role",
                copy: project.problem,
              },
              {
                label: project.labels?.[1] ?? "What I Did",
                copy: project.approach,
              },
              {
                label: project.labels?.[2] ?? "The Impact",
                copy: project.result,
              },
            ]
              .filter((block) => Boolean(block.copy))
              .map((block) => (
                <div key={block.label}>
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--bronze)]">
                    {block.label}
                  </p>
                  <p className="text-[15px] leading-relaxed text-[var(--graphite)]">
                    {block.copy}
                  </p>
                </div>
              ))}
          </div>

          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 px-6 pb-8 md:px-10">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--hairline)] bg-[var(--paper-dim)] px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--graphite)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
