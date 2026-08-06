// components/hero/Hero.tsx
"use client";

import CountUp from "@/components/ui/CountUp";

const skills = [
  "Python",
  "React.js",
  "Node.js",
  "TensorFlow",
  "OpenCV",
  "AWS Cloud",
  "MySQL",
  "MongoDB",
  "Spring Boot",
  "Arduino",
];

export default function Hero() {
  return (
    <>
      <header
        id="home"
        className="relative z-0 flex min-h-[100svh] flex-col justify-center pt-28 pb-20"
      >
        <div className="mx-auto w-full max-w-[1240px] px-6 md:px-12">
          <div className="mb-7 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--graphite)]">
            Software Engineer — Full-Stack / Applied ML / IoT
          </div>

          <h1 className="font-serif text-[clamp(3.4rem,13.5vw,10.8rem)] leading-[0.92] tracking-[-0.015em] text-[var(--ink)]">
            VIJAY&nbsp;R
            <br />
            <em className="font-light italic text-[var(--graphite)]">
              builds things that sense.
            </em>
          </h1>

          <p className="mt-9 max-w-[560px] text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.55] text-[var(--graphite)]">
            B.Tech IT student at VIT Vellore, designing systems that watch,
            listen, and respond — from computer-vision safety tools to
            cloud-deployed full-stack apps.
          </p>

          <div className="mt-14 flex flex-wrap gap-3 md:gap-4">
            <div className="rounded-2xl border border-[var(--hairline-strong)] bg-[var(--paper-dim)]/60 px-5 py-4 backdrop-blur">
              <div className="font-serif text-[2.2rem] leading-none text-[var(--ink)]">
                <CountUp to={8.68} decimals={2} />
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--graphite)]">
                CGPA / 10
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--hairline-strong)] bg-[var(--paper-dim)]/60 px-5 py-4 backdrop-blur">
              <div className="font-serif text-[2.2rem] leading-none text-[var(--ink)]">
                <CountUp to={9} />
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--graphite)]">
                Shipped Projects
              </div>
            </div>

            <div className="rounded-2xl border border-[var(--hairline-strong)] bg-[var(--paper-dim)]/60 px-5 py-4 backdrop-blur">
              <div className="font-serif text-[2.2rem] leading-none text-[var(--ink)]">
                <CountUp to={2} />
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--graphite)]">
                Cloud / ML Certifications
              </div>
            </div>

            <a
              href="/assets/resume/vijay_resume.pdf"
              download="Vijay_R_Resume.pdf"
              className="group cursor-pointer rounded-2xl border border-[var(--hairline-strong)] bg-[var(--paper-dim)]/60 px-5 py-4 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--bronze-soft)]"
            >
              <div className="font-serif text-[2.2rem] leading-none text-[var(--bronze)]">
                ↓
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--graphite)]">
                Download&nbsp;Resume
              </div>
            </a>
          </div>
        </div>

        <div className="absolute bottom-9 left-6 flex items-center gap-2.5 md:left-12">
          <div className="hero-scroll-line relative h-[46px] w-px overflow-hidden bg-[var(--hairline-strong)]">
            <span className="hero-scroll-fill absolute left-0 top-[-100%] h-full w-full bg-[var(--ink)]" />
          </div>
          <span
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--graphite)]"
            style={{ writingMode: "vertical-rl" }}
          >
            Scroll
          </span>
        </div>
      </header>

      <div className="overflow-hidden whitespace-nowrap border-y border-[var(--hairline)] py-5">
        <div className="hero-marquee-track inline-flex">
          {[...skills, ...skills].map((skill, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-5 px-5 font-mono text-[13px] uppercase tracking-[0.14em] text-[var(--graphite)] after:content-['—'] after:text-[var(--hairline-strong)]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes hero-scroll-cue {
          0% { top: -100%; }
          60% { top: 100%; }
          100% { top: 100%; }
        }
        .hero-scroll-fill {
          animation: hero-scroll-cue 2.2s cubic-bezier(0.16, 0.8, 0.28, 1) infinite;
        }
        @keyframes hero-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .hero-marquee-track {
          animation: hero-marquee-scroll 34s linear infinite;
        }
      `}</style>
    </>
  );
}
