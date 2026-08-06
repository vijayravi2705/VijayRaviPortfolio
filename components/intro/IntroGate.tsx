// components/intro/IntroGate.tsx
"use client";

import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Preloader from "./Preloader";

type Phase = "preloader" | "site";

export default function IntroGate({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("preloader");

  useEffect(() => {
    if (phase !== "preloader") return;

    const scrollY = window.scrollY;
    const { body } = document;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [phase]);

  const handlePreloaderComplete = () => {
    setPhase("site");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  };

  return (
    <>
      {children}
      {phase === "preloader" && (
        <Preloader onComplete={handlePreloaderComplete} />
      )}
    </>
  );
}
