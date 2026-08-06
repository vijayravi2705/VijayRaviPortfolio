// components/work/CaseStudyModal.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/constants/work";
import MacDots from "@/components/ui/MacDots";

export default function CaseStudyModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  // Portals need a browser document, so we only render once mounted on the
  // client. This also sidesteps SSR hydration mismatches.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!mounted || !project) return null;

  const labels = project.labels ?? ["The problem", "The approach", "Result"];
  const sections = [
    [labels[0], project.problem],
    [labels[1], project.approach],
    [labels[2], project.result],
  ] as const;

  // Rendered via a portal straight into <body> — this guarantees the
  // fixed-position overlay is never nested inside a GSAP-animated or
  // Framer Motion-transformed ancestor. Any ancestor with an active CSS
  // transform becomes the containing block for `position: fixed`
  // descendants, which is what was making the modal drift with scroll
  // instead of staying pinned to the viewport.
  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/60 px-4 pb-10 pt-28 backdrop-blur-sm md:pt-32"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="max-h-[calc(100vh-9rem)] w-full max-w-[640px] overflow-y-auto rounded-[22px] border border-[var(--hairline-strong)] bg-[var(--paper)]/95 shadow-2xl backdrop-blur-xl">
        <div className="border-b border-[var(--hairline)] px-6 py-5">
          <MacDots onClose={onClose} />
          <span className="mt-4 inline-block rounded-full bg-[var(--ink)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--paper)]">
            {project.chip}
          </span>
          <div className="mt-2.5 font-serif text-2xl text-[var(--ink)]">
            {project.title}
          </div>
        </div>

        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="space-y-5 px-6 py-6">
          {sections.map(([label, text]) => (
            <div key={label}>
              <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--bronze)]">
                {label}
              </div>
              <p className="text-[0.95rem] leading-[1.6] text-[var(--graphite)]">
                {text}
              </p>
            </div>
          ))}

          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-[var(--hairline-strong)] px-3 py-1 font-mono text-[10.5px] uppercase tracking-[0.08em] text-[var(--graphite)]"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--bronze)] underline-offset-4 hover:underline"
            >
              View repository ↗
            </a>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
