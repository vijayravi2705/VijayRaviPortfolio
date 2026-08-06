// components/leadership/LeadershipMedia.tsx
"use client";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface LeadershipMediaProps {
  /** Gallery for this tile. If 2+ entries, renders an autoplaying carousel. */
  images?: string[];
  /** Used when `images` is missing/empty, or as slide 1 if you only have one shot. */
  fallbackImage: string;
  alt: string;
}

/**
 * Grid-tile media for a leadership card.
 *
 * Every tile renders through the same Swiper instance so behavior is
 * consistent across the whole section:
 *  - 2+ images  -> autoplaying, looping crossfade carousel
 *  - 0-1 images -> plain <img>, no Swiper overhead, no loop warning
 *
 * This is intentionally dumb — no nav arrows, no pagination dots. It's a
 * background layer sitting under the gradient + title in Leadership.tsx.
 * The click on the tile still opens LeadershipModal, which runs its own
 * (larger, controllable) carousel over the same `images` array.
 */
export default function LeadershipMedia({
  images,
  fallbackImage,
  alt,
}: LeadershipMediaProps) {
  const gallery = images && images.length > 0 ? images : [fallbackImage];

  // Fixed-size backdrop behind every photo — the tile's own height/width
  // (set via sizeClasses in Leadership.tsx) never changes based on what's
  // inside it. object-contain then shrinks each photo, whatever its native
  // aspect ratio, to fit inside that fixed box instead of cropping it.
  if (gallery.length < 2) {
    return (
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-black/[0.55]">
        <img
          src={gallery[0]}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  // `isolate` forces a fresh stacking context here. Swiper's own stylesheet
  // sets `.swiper { z-index: 1 }`, and depending on CSS import order that can
  // beat Tailwind's `z-0` on this wrapper — which is exactly what was making
  // the chip/title overlay in Leadership.tsx disappear behind the carousel
  // on tiles with 2+ images (only graVITas'25 has a gallery today). Wrapping
  // it in an isolated, explicitly-positioned div means whatever z-index
  // Swiper sets internally is capped inside this box and can never leak out
  // above the z-20 overlay that sits after it in the tile markup.
  return (
    <div className="absolute inset-0 z-0 isolate" style={{ zIndex: 0 }}>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2600, disableOnInteraction: false }}
        loop
        speed={900}
        allowTouchMove={false}
        className="h-full w-full bg-black/[0.55]"
      >
        {gallery.map((src, i) => (
          <SwiperSlide
            key={src + i}
            className="flex items-center justify-center"
          >
            <img
              src={src}
              alt={`${alt} — photo ${i + 1}`}
              loading={i === 0 ? "eager" : "lazy"}
              className="h-full w-full object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
