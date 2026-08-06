// components/nav/Nav.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Sun,
  Moon,
  ChevronDown,
  Check,
  Briefcase,
  User,
  Users,
  GraduationCap,
  Mail,
  type LucideIcon,
} from "lucide-react";

const navLinks: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Work", href: "#work", icon: Briefcase },
  { label: "About", href: "#about", icon: User },
  { label: "Leadership", href: "#leadership", icon: Users },
  { label: "Credentials", href: "#credentials", icon: GraduationCap },
  { label: "Contact", href: "#contact", icon: Mail },
];

// language code -> display label + ISO country code (for the flag image)
const countries = [
  { code: "en", label: "English", flag: "us" },
  { code: "hi", label: "हिन्दी", flag: "in" },
  { code: "te", label: "తెలుగు", flag: "in" },
  { code: "ta", label: "தமிழ்", flag: "in" },
  { code: "fr", label: "Français", flag: "fr" },
  { code: "de", label: "Deutsch", flag: "de" },
  { code: "es", label: "Español", flag: "es" },
  { code: "it", label: "Italiano", flag: "it" },
  { code: "pt", label: "Português", flag: "pt" },
  { code: "ru", label: "Русский", flag: "ru" },
  { code: "ja", label: "日本語", flag: "jp" },
  { code: "ko", label: "한국어", flag: "kr" },
  { code: "zh", label: "中文", flag: "cn" },
  { code: "ar", label: "العربية", flag: "sa" },
  { code: "tr", label: "Türkçe", flag: "tr" },
] as const;

function Flag({ country, size = 18 }: { country: string; size?: number }) {
  return (
    <img
      src={`https://flagcdn.com/${size * 2}x${Math.round(size * 1.5)}/${country}.png`}
      srcSet={`https://flagcdn.com/${size * 4}x${Math.round(size * 3)}/${country}.png 2x`}
      alt=""
      width={size}
      height={Math.round(size * 0.75)}
      className="rounded-[3px] object-cover"
      style={{ width: size, height: Math.round(size * 0.75) }}
    />
  );
}

export default function Nav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [countryOpen, setCountryOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  const currentLocale = pathname.split("/")[1] || "en";
  const activeCountry =
    countries.find((c) => c.code === currentLocale) ?? countries[0];

  const switchLocale = (code: string) => {
    const segments = pathname.split("/");
    segments[1] = code;
    router.push(segments.join("/") || "/");
    setCountryOpen(false);
  };

  const scrollToSection = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <nav className="fixed inset-x-0 top-0 z-[100] grid grid-cols-[1fr_auto_1fr] items-center px-6 py-5 md:px-10">
      {/* empty left column — balances the grid so the center pill stays centered */}
      <div />

      {/* Main pill — logo, links, theme toggle — centered on the viewport */}
      <div className="flex items-center gap-1 justify-self-center rounded-full border border-[var(--hairline-strong)] bg-[var(--paper)]/85 py-1.5 pl-1.5 pr-2 shadow-sm backdrop-blur-md">
        <button
          onClick={() => scrollToSection("#home")}
          className="flex h-9 w-9 items-center justify-center rounded-full transition-opacity hover:opacity-70"
        >
          <Image
            src="/logo-vr.png"
            alt="Vijay Raavi"
            width={28}
            height={28}
            className={`h-6 w-auto object-contain ${
              mounted && theme !== "dark" ? "brightness-0" : ""
            }`}
            priority
          />
        </button>

        <span className="mx-0.5 h-4 w-px bg-[var(--hairline-strong)]" />

        {navLinks.map(({ label, href, icon: Icon }) => (
          <div key={href} className="group relative">
            <button
              onClick={() => scrollToSection(href)}
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--graphite)] transition-colors hover:bg-[var(--bronze-soft)] hover:text-[var(--ink)]"
            >
              <Icon size={16} />
            </button>

            {/* tooltip */}
            <span className="pointer-events-none absolute left-1/2 top-full mt-2.5 -translate-x-1/2 whitespace-nowrap rounded-md border border-[var(--hairline-strong)] bg-[var(--paper)] px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--ink)] opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
              {label}
            </span>
          </div>
        ))}

        <span className="mx-0.5 h-4 w-px bg-[var(--hairline-strong)]" />

        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--graphite)] transition-colors hover:bg-[var(--bronze-soft)] hover:text-[var(--ink)]"
        >
          {mounted ? (
            theme === "dark" ? (
              <Sun size={16} />
            ) : (
              <Moon size={16} />
            )
          ) : (
            <span className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Country / language switcher — pinned right */}
      {/* <div className="relative justify-self-end">
        <button
          onClick={() => setCountryOpen((v) => !v)}
          className="flex items-center gap-2 rounded-full border border-[var(--hairline-strong)] bg-[var(--paper)]/85 py-2 pl-2 pr-3 shadow-sm backdrop-blur-md transition-colors hover:border-[var(--bronze)]"
        >
          <Flag country={activeCountry.flag} size={18} />
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--graphite)]">
            {activeCountry.code}
          </span>
          <ChevronDown
            size={13}
            className={`text-[var(--graphite)] transition-transform ${countryOpen ? "rotate-180" : ""}`}
          />
        </button>

        {countryOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setCountryOpen(false)}
            />
            <div className="absolute right-0 top-full z-50 mt-2 max-h-[22rem] w-56 overflow-y-auto rounded-2xl border border-[var(--hairline-strong)] bg-[var(--paper)] p-1.5 shadow-xl">
              <div className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--graphite)]">
                Region
              </div>
              {countries.map((c) => {
                const active = c.code === activeCountry.code;
                return (
                  <button
                    key={c.code}
                    onClick={() => switchLocale(c.code)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors hover:bg-[var(--bronze-soft)] ${
                      active ? "bg-[var(--paper-dim)]" : ""
                    }`}
                  >
                    <Flag country={c.flag} size={18} />
                    <span
                      className={
                        active
                          ? "font-medium text-[var(--ink)]"
                          : "text-[var(--graphite)]"
                      }
                    >
                      {c.label}
                    </span>
                    {active && (
                      <Check
                        size={14}
                        className="ml-auto text-[var(--bronze)]"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>*/}
    </nav>
  );
}
