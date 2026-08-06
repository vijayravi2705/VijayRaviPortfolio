// components/credentials/Credentials.tsx
"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  certifications,
  education,
  languages,
  type Certification,
} from "@/constants/credentials";
import CertModal from "@/components/credentials/CertModal";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Credentials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCertId, setActiveCertId] = useState<string | null>(null);
  const activeCert: Certification | null =
    certifications.find((c) => c.id === activeCertId) ?? null;

  useGSAP(
    () => {
      const blocks = gsap.utils.toArray<HTMLElement>(".cred-reveal");
      blocks.forEach((block, i) => {
        gsap.fromTo(
          block,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            delay: i * 0.08,
            scrollTrigger: {
              trigger: block,
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
      id="credentials"
      ref={sectionRef}
      className="relative z-10 bg-[var(--paper-dim)] px-6 py-28 md:px-12"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-14 cred-reveal">
          <h2 className="font-serif text-[clamp(2.2rem,6vw,4.6rem)] leading-none tracking-[-0.01em] text-[var(--ink)]">
            Credentials
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-[clamp(48px,6vw,90px)] md:grid-cols-2">
          {/* Certifications + Education */}
          <div className="cred-reveal">
            <div className="mb-[22px] font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--graphite)]">
              Certifications
            </div>

            {certifications.map((cert, i) => (
              <button
                key={cert.id}
                type="button"
                onClick={() => setActiveCertId(cert.id)}
                className={`group flex w-full items-center gap-4 border-t border-[var(--hairline)] px-1 py-4 text-left transition-[padding,background-color] duration-300 hover:rounded-[10px] hover:bg-[var(--paper)] hover:pl-3 ${
                  i === certifications.length - 1
                    ? "border-b border-[var(--hairline)]"
                    : ""
                }`}
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[linear-gradient(160deg,#f2e6d1,var(--bronze))] shadow-[0_3px_10px_rgba(168,131,79,0.35)]">
                  <svg viewBox="0 0 24 24" fill="none" className="h-[19px] w-[19px]">
                    <path
                      d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 14.4 7.2 16.9l.9-5.4L4.2 7.7l5.4-.8L12 2z"
                      stroke="#0d0d0c"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span className="flex flex-col">
                  <span className="font-serif text-[1.1rem] text-[var(--ink)]">
                    {cert.title}
                  </span>
                  <span className="mt-0.5 text-[0.85rem] text-[var(--graphite)]">
                    {cert.issuer}
                  </span>
                </span>
                <span className="ml-auto whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.08em] text-[var(--graphite)] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Preview ↗
                </span>
              </button>
            ))}

            <div className="mb-[22px] mt-12 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--graphite)]">
              Education
            </div>
            {education.map((item, i) => (
              <div
                key={item.id}
                className={`border-t border-[var(--hairline)] py-[18px] ${
                  i === education.length - 1
                    ? "border-b border-[var(--hairline)]"
                    : ""
                }`}
              >
                <div className="font-serif text-[1.15rem] text-[var(--ink)]">
                  {item.school}
                </div>
                <div className="mt-1 text-[0.88rem] text-[var(--graphite)]">
                  {item.detail}
                </div>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div className="cred-reveal">
            <div className="mb-[22px] font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--graphite)]">
              Languages
            </div>
            {languages.map((lang, i) => (
              <div
                key={lang.id}
                className={`flex items-center justify-between border-t border-[var(--hairline)] py-[14px] text-[0.95rem] text-[var(--ink)] ${
                  i === languages.length - 1
                    ? "border-b border-[var(--hairline)]"
                    : ""
                }`}
              >
                <span>{lang.name}</span>
                <span className="font-mono text-[11px] uppercase tracking-[0.05em] text-[var(--graphite)]">
                  {lang.level}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CertModal cert={activeCert} onClose={() => setActiveCertId(null)} />
    </section>
  );
}
