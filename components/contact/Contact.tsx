// components/contact/Contact.tsx
"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Send, X, Check, Loader2, Phone, type LucideIcon } from "lucide-react";
import { CONTACT_EMAIL, contactLinks } from "@/constants/contact";

// Lucide 1.0 dropped brand/logo icons (Github, Linkedin, etc.) for
// trademark reasons, so these two are small inline SVGs instead.
function GithubIcon({ size = 17, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.79 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.17.69-3.84-1.35-3.84-1.35-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.72-1.53-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.06-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.13 1.17.91-.25 1.88-.38 2.85-.38.97 0 1.94.13 2.85.38 2.17-1.48 3.13-1.17 3.13-1.17.62 1.57.23 2.73.11 3.02.73.8 1.17 1.82 1.17 3.06 0 4.37-2.66 5.34-5.2 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55 4.52-1.51 7.78-5.76 7.78-10.78C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon({ size = 17, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.03-1.85-3.03-1.85 0-2.14 1.44-2.14 2.94v5.66H9.35V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Set these in .env.local — see setup notes below the component.
const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

if (
  process.env.NODE_ENV === "development" &&
  (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY)
) {
  // Loud but harmless — only fires in dev, tells you exactly what's missing.
  console.warn(
    "[Contact] Missing EmailJS env vars — check NEXT_PUBLIC_EMAILJS_SERVICE_ID, " +
      "NEXT_PUBLIC_EMAILJS_TEMPLATE_ID and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY in .env.local",
  );
}

type SendStatus = "idle" | "sending" | "sent" | "error";

// Small icon lookup so constants/contact.ts stays plain data.
const LINK_ICONS: Record<
  string,
LucideIcon | ((props: {
  size?: number;
  className?: string;
}) => React.ReactNode)> = {
  phone: Phone,
  linkedin: LinkedinIcon,
  github: GithubIcon,
};

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const emailWrapRef = useRef<HTMLDivElement>(null);

  const [typedEmail, setTypedEmail] = useState("");
  const [typingDone, setTypingDone] = useState(false);
  const [copied, setCopied] = useState(false);

  const [name, setName] = useState("");
  const [fromEmail, setFromEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SendStatus>("idle");
  const [sendHovered, setSendHovered] = useState(false);
  const [cancelHovered, setCancelHovered] = useState(false);

  const hasContent = Boolean(name || fromEmail || message);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((el, i) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            delay: i * 0.06,
            scrollTrigger: {
              trigger: el,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    },
    { scope: sectionRef },
  );

  // Typewriter effect: replays every time the email block scrolls into view
  // (not just once), and cleanly resets if scrolled away mid-type.
  useEffect(() => {
    const el = emailWrapRef.current;
    if (!el) return;
    let interval: ReturnType<typeof setInterval> | undefined;
    let isTyping = false;

    const startTyping = () => {
      if (isTyping) return;
      isTyping = true;
      let i = 0;
      setTypedEmail("");
      setTypingDone(false);
      interval = setInterval(() => {
        i += 1;
        setTypedEmail(CONTACT_EMAIL.slice(0, i));
        if (i >= CONTACT_EMAIL.length) {
          clearInterval(interval);
          setTypingDone(true);
          isTyping = false;
        }
      }, 85);
    };

    const resetTyping = () => {
      clearInterval(interval);
      isTyping = false;
      setTypedEmail("");
      setTypingDone(false);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            startTyping();
          } else {
            resetTyping();
          }
        });
      },
      { threshold: 0.3 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — silently ignore
    }
  };

  const handleClear = () => {
    setName("");
    setFromEmail("");
    setMessage("");
    setStatus("idle");
  };

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !fromEmail || !message || status === "sending") return;

    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error(
        "[Contact] EmailJS is not configured — missing env vars.",
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name,
          email: fromEmail,
          message,
          time: new Date().toLocaleString("en-IN", {
            dateStyle: "medium",
            timeStyle: "short",
          }),
        },
        { publicKey: EMAILJS_PUBLIC_KEY },
      );
      setStatus("sent");
      setName("");
      setFromEmail("");
      setMessage("");
      setTimeout(() => setStatus("idle"), 4500);
    } catch (err) {
      console.error("EmailJS send failed:", err);
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative z-10 bg-[#fdfdfb] px-6 py-28 text-[#0d0d0c] dark:bg-[#0d0d0c] dark:text-[#fdfdfb] md:px-12"
    >
      <div className="mx-auto max-w-[1240px]">
        <div className="contact-reveal font-mono text-[11px] uppercase tracking-[0.16em] text-black/45 dark:text-white/45">
          Get in touch
        </div>
        <h2 className="contact-reveal mt-5 max-w-[900px] font-serif text-[clamp(2.4rem,7.5vw,6.2rem)] italic leading-[1.02]">
          Building something
          <br />
          worth building? Let&apos;s talk.
        </h2>

        {/* Typing email row */}
        <div
          ref={emailWrapRef}
          className="contact-reveal mt-14 flex flex-wrap items-center gap-5 rounded-[20px] border border-black/10 bg-black/[0.025] p-[26px] backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]"
        >
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="break-all font-serif text-[clamp(1.4rem,4vw,2.6rem)]"
          >
            {typedEmail}
            <span
              className={`ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] bg-[var(--bronze)] ${
                typingDone ? "animate-[blink_1s_step-end_infinite]" : ""
              }`}
            />
          </a>
          <button
            type="button"
            onClick={handleCopy}
            suppressHydrationWarning
            className="ml-auto whitespace-nowrap rounded-full border border-black/30 px-[18px] py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:bg-[#0d0d0c] hover:text-[#fdfdfb] dark:border-white/40 dark:hover:bg-[#fdfdfb] dark:hover:text-[#0d0d0c]"
          >
            {copied ? "Copied ✓" : "Copy email"}
          </button>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-[clamp(40px,6vw,90px)] md:grid-cols-2">
          <form onSubmit={handleSend} className="contact-reveal">
            <div className="mb-[22px]">
              <label
                htmlFor="name"
                className="mb-2.5 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-black/45 dark:text-white/45"
              >
                Name
              </label>
              <input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                suppressHydrationWarning
                className="w-full rounded-[10px] border border-black/15 bg-black/[0.02] px-4 py-3 text-base outline-none transition-colors focus:border-[var(--bronze)] focus:bg-black/[0.04] dark:border-white/20 dark:bg-white/[0.04] dark:focus:bg-white/[0.06]"
              />
            </div>
            <div className="mb-[22px]">
              <label
                htmlFor="femail"
                className="mb-2.5 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-black/45 dark:text-white/45"
              >
                Your email
              </label>
              <input
                id="femail"
                type="email"
                value={fromEmail}
                onChange={(e) => setFromEmail(e.target.value)}
                required
                suppressHydrationWarning
                className="w-full rounded-[10px] border border-black/15 bg-black/[0.02] px-4 py-3 text-base outline-none transition-colors focus:border-[var(--bronze)] focus:bg-black/[0.04] dark:border-white/20 dark:bg-white/[0.04] dark:focus:bg-white/[0.06]"
              />
            </div>
            <div className="mb-[22px]">
              <label
                htmlFor="message"
                className="mb-2.5 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-black/45 dark:text-white/45"
              >
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={3}
                suppressHydrationWarning
                className="min-h-[90px] w-full resize-y rounded-[10px] border border-black/15 bg-black/[0.02] px-4 py-3 text-base outline-none transition-colors focus:border-[var(--bronze)] focus:bg-black/[0.04] dark:border-white/20 dark:bg-white/[0.04] dark:focus:bg-white/[0.06]"
              />
            </div>

            {/* Send control — a plain circle at rest (Apple "play button"
               style). Width is controlled by ONE system only — Framer
               Motion's `animate`, driven by plain hover booleans — instead
               of the previous approach of a CSS `!important` hover rule
               fighting Framer's `layout`/inline-style width on the same
               property. That fight is what caused the button to get stuck
               expanded (whichever system last "won" the cascade stuck
               around). The icon and label are permanently mounted — never
               conditionally rendered — so there's also no unmount race that
               can leave it blank. The cancel circle uses the same pattern. */}
            <div className="mt-2 flex h-14 items-center gap-3">
              <AnimatePresence initial={false}>
                {hasContent && status === "idle" && (
                  <motion.button
                    key="cancel"
                    type="button"
                    onClick={handleClear}
                    onMouseEnter={() => setCancelHovered(true)}
                    onMouseLeave={() => setCancelHovered(false)}
                    onFocus={() => setCancelHovered(true)}
                    onBlur={() => setCancelHovered(false)}
                    aria-label="Clear message"
                    suppressHydrationWarning
                    initial={{ opacity: 0, width: 0 }}
                    animate={{
                      opacity: 1,
                      width: cancelHovered ? 108 : 56,
                      paddingLeft: cancelHovered ? 22 : 0,
                      paddingRight: cancelHovered ? 22 : 0,
                      scale: cancelHovered ? 1.03 : 1,
                    }}
                    exit={{ opacity: 0, width: 0, scale: 0.9 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.7 }}
                    className="flex h-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-black/15 text-[#0d0d0c] transition-[background-color,border-color] duration-300 ease-out hover:border-black/30 hover:bg-black/[0.045] dark:border-white/20 dark:text-[#fdfdfb] dark:hover:border-white/35 dark:hover:bg-white/[0.08]"
                  >
                    <X size={17} className="flex-shrink-0" />
                    <motion.span
                      animate={{
                        opacity: cancelHovered ? 1 : 0,
                        width: cancelHovered ? "auto" : 0,
                        marginLeft: cancelHovered ? 8 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.12em]"
                    >
                      Clear
                    </motion.span>
                  </motion.button>
                )}
              </AnimatePresence>

              <motion.button
                type="submit"
                disabled={status === "sending"}
                onMouseEnter={() => setSendHovered(true)}
                onMouseLeave={() => setSendHovered(false)}
                onFocus={() => setSendHovered(true)}
                onBlur={() => setSendHovered(false)}
                suppressHydrationWarning
                initial={false}
                animate={
                  status !== "idle"
                    ? { width: "auto", paddingLeft: 26, paddingRight: 26, scale: 1 }
                    : sendHovered
                      ? { width: 138, paddingLeft: 26, paddingRight: 26, scale: 1.03 }
                      : { width: 56, paddingLeft: 0, paddingRight: 0, scale: 1 }
                }
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.7 }}
                className="relative flex h-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0d0d0c] text-[#fdfdfb] shadow-[0_1px_2px_rgba(0,0,0,0.08)] transition-[background-color,box-shadow] duration-300 ease-out hover:bg-[#242422] hover:shadow-[0_6px_18px_rgba(0,0,0,0.18)] disabled:cursor-not-allowed dark:bg-[#fdfdfb] dark:text-[#0d0d0c] dark:hover:bg-[#e7e7e3] dark:hover:shadow-[0_6px_18px_rgba(0,0,0,0.35)]"
              >
                {status === "idle" && (
                  <span className="flex items-center justify-center">
                    {/* offset +1px optically centers the paper-plane glyph */}
                    <Send size={19} className="flex-shrink-0 translate-x-[1px]" />
                    <motion.span
                      animate={{
                        opacity: sendHovered ? 1 : 0,
                        width: sendHovered ? "auto" : 0,
                        marginLeft: sendHovered ? 10 : 0,
                      }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden whitespace-nowrap font-mono text-[12px] uppercase tracking-[0.12em]"
                    >
                      Send
                    </motion.span>
                  </span>
                )}
                <AnimatePresence mode="wait" initial={false}>
                  {status === "sending" && (
                    <motion.span
                      key="sending"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.16 }}
                      className="flex items-center gap-2.5 whitespace-nowrap"
                    >
                      <Loader2 size={17} className="animate-spin" />
                      <span className="font-mono text-[12px] uppercase tracking-[0.12em]">
                        Sending…
                      </span>
                    </motion.span>
                  )}
                  {status === "sent" && (
                    <motion.span
                      key="sent"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{ type: "spring", stiffness: 400, damping: 22 }}
                      className="flex items-center gap-2.5 whitespace-nowrap"
                    >
                      <Check size={18} />
                      <span className="font-mono text-[12px] uppercase tracking-[0.12em]">
                        Sent
                      </span>
                    </motion.span>
                  )}
                  {status === "error" && (
                    <motion.span
                      key="error"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ duration: 0.16 }}
                      className="flex items-center gap-2.5 whitespace-nowrap"
                    >
                      <Send size={17} className="translate-x-[1px]" />
                      <span className="font-mono text-[12px] uppercase tracking-[0.12em]">
                        Try again
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            <div
              className={`mt-3.5 text-[12px] ${
                status === "sent"
                  ? "text-[var(--bronze)]"
                  : status === "error"
                    ? "text-red-500 dark:text-red-400"
                    : "text-black/45 dark:text-white/45"
              }`}
            >
              {status === "sent" &&
                "Message sent — thanks, I'll get back to you soon."}
              {status === "error" &&
                "Something went wrong — try again, or email me directly."}
              {status === "idle" &&
                "Sends straight to my inbox — no email app required."}
              {status === "sending" && "Sending your message…"}
            </div>
          </form>

          <div className="contact-reveal flex flex-col gap-3">
            {contactLinks.map((link) => {
              const Icon = LINK_ICONS[link.id];
              return (
                <a
                  key={link.id}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center justify-between rounded-2xl border border-black/10 bg-black/[0.015] px-5 py-4 transition-colors hover:border-black/20 hover:bg-black/[0.03] dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20 dark:hover:bg-white/[0.05]"
                >
                  <span className="flex items-center gap-3 text-base">
                    {Icon && (
                      <Icon
                        size={17}
                        className="text-black/45 dark:text-white/45"
                      />
                    )}
                    {link.label}
                  </span>
                  <span className="font-mono text-sm transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                    {link.value} ↗
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      <footer className="mx-auto mt-20 flex max-w-[1240px] items-center justify-between border-t border-black/10 pt-7 font-mono text-[11px] uppercase tracking-[0.08em] text-black/45 dark:border-white/10 dark:text-white/45">
        <span>© 2026 Vijay R</span>
        <a href="#hero" className="text-[#0d0d0c] dark:text-[#fdfdfb]">
          Back to top ↑
        </a>
      </footer>
    </section>
  );
}
