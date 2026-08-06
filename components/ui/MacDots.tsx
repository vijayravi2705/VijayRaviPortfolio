// components/ui/MacDots.tsx
"use client";

export default function MacDots({ onClose }: { onClose?: () => void }) {
  const base =
    "flex h-3 w-3 items-center justify-center rounded-full text-[7.5px] leading-none text-black/0 transition-colors duration-150 group-hover/dots:text-black/55";

  return (
    <span className="group/dots flex flex-shrink-0 items-center gap-[7px]">
      <span
        onClick={onClose}
        role={onClose ? "button" : undefined}
        aria-label={onClose ? "Close" : undefined}
        className={`${base} bg-[#ff5f57] ${onClose ? "cursor-pointer" : "cursor-default"}`}
      >
        ✕
      </span>
      <span className={`${base} bg-[#febc2e] cursor-default`}>–</span>
      <span className={`${base} bg-[#28c840] cursor-default`}>⤢</span>
    </span>
  );
}
