// components/credentials/CertModal.tsx
"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Certification } from "@/constants/credentials";
import MacDots from "@/components/ui/MacDots";

type CertModalProps = {
  cert: Certification | null;
  onClose: () => void;
};

export default function CertModal({ cert, onClose }: CertModalProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!cert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [cert, onClose]);

  if (!mounted) return null;

  // Same fix as CaseStudyModal — portal straight to <body> so this overlay
  // can't get trapped inside a transformed GSAP/Framer ancestor, which is
  // what made it drift with scroll instead of staying pinned in place.
  return createPortal(
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-[rgba(13,13,12,0.55)] p-6 pt-24 transition-opacity duration-300 ${
        cert ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full max-w-[560px] overflow-hidden rounded-[30px] border border-[var(--hairline)] bg-[var(--paper)] p-7 shadow-[0_30px_70px_-12px_rgba(13,13,12,0.35)] transition-transform duration-400 ${
          cert ? "translate-y-0 scale-100" : "translate-y-4 scale-[0.98]"
        }`}
      >
        {cert && (
          <>
            <div className="mb-4 flex items-start gap-4 border-b border-[var(--hairline)] pb-4">
              <div className="mt-1">
                <MacDots />
              </div>
              <div>
                <div className="font-serif text-[1.4rem] text-[var(--ink)]">
                  {cert.title}
                </div>
                <div className="mt-1 text-[0.85rem] text-[var(--graphite)]">
                  {cert.issuer}
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="ml-auto flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[var(--hairline-strong)] text-[var(--ink)] transition-colors hover:bg-[var(--ink)] hover:text-[var(--paper)]"
              >
                ✕
              </button>
            </div>

            <div className="relative overflow-hidden rounded-[16px] bg-[var(--paper-dim)]">
              <img
                src={cert.image}
                alt={cert.title}
                className="aspect-[16/11] w-full object-cover"
              />

            </div>



            <div className="mt-4 flex flex-wrap gap-3">
              {cert.links.map((link, i) => (
                <a
                  key={link}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] px-[18px] py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-[var(--ink)]"
                >
                  {cert.links.length > 1
                    ? `Open badge ${i + 1} ↗`
                    : "Open full certificate ↗"}
                </a>
              ))}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
