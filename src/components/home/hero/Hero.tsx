"use client"

import { FrameCanvas } from "./FrameCanvas";
import { CircuitBracket } from "./CircuitBracket";
import { HeroHeadline } from "./HeroHeadline";
import { useHeroProgress } from "@/hooks/useHeroProgress";
import { clamp01, easeInOutCubic, easeOutCubic, lerp } from "@/utils/heroMath";

const SCROLL_VH = 300;

const FRAME_START = 0.50;
const FRAME_END = 0.80;
const CAPTION_START = 0.74;

export const Hero = () => {
  const { wrapperRef, progress } = useHeroProgress();

  const frameRaw = clamp01((progress - FRAME_START) / (FRAME_END - FRAME_START));
  const frameT = easeInOutCubic(frameRaw);
  const bracketTL = clamp01(frameT / 0.7);
  const bracketBR = clamp01((frameT - 0.3) / 0.7);

  const captionT = easeOutCubic(clamp01((progress - CAPTION_START) / (1 - CAPTION_START)));

  const drift = easeInOutCubic(clamp01((progress - FRAME_START) / (1 - FRAME_START)));

  const eyebrowVisible = progress > 0.10;
  const hintVisible = progress < 0.06;

  return (
    <section ref={wrapperRef} style={{ height: `${SCROLL_VH}vh` }} className="relative" aria-label="Hero">
  
      <div className="sticky top-0 h-dvh w-full overflow-hidden bg-ink">

        <FrameCanvas progress={progress} />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/12"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,21,18,0) 0%, rgba(26,21,18,0.72) 75%, var(--color-ink) 100%)",
          }}
        />

        <div className={`absolute inset-x-0 top-36 flex flex-col items-center gap-3 px-6 text-center transition-all duration-700 ease-out
                      ${eyebrowVisible ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"}`}
        >
          <span className="text-xs lg:text-sm uppercase tracking-[0.15em] text-beige/75">
            Circular Design Studio
          </span>
          <span className="h-8 w-px bg-linear-to-b from-beige/75 to-transparent" />
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-6 sm:px-4">
          <div className="relative" style={{ transform: `translateY(${lerp(0, -2.5, drift)}vh)` }}>
            <div className="pointer-events-none absolute -top-9 -left-1 sm:-top-12 sm:-left-12 lg:-top-14 lg:-left-16">
              <CircuitBracket t={bracketTL} />
            </div>
            <div className="pointer-events-none absolute -bottom-9 -right-1 sm:-bottom-12 sm:-right-12 lg:-bottom-14 lg:-right-16">
              <CircuitBracket t={bracketBR} flip />
            </div>

            <HeroHeadline progress={progress} />

            <div className="pointer-events-none mt-8 flex items-center justify-center gap-4" style={{ opacity: captionT }}>
              <span className="h-px w-10 bg-linear-to-r from-transparent to-sand/60" style={{ transform: `scaleX(${captionT})`, transformOrigin: "right" }}/>
              <span className="text-[0.65rem] sm:text-xs uppercase text-beige/70 whitespace-nowrap"
                style={{
                  letterSpacing: `${lerp(0.5, 0.18, captionT)}em`,
                  transform: `translateY(${lerp(0.6, 0, captionT)}rem)`,
                }}
              >
                Printed to order · Zero waste
              </span>
              <span  className="h-px w-10 bg-linear-to-l from-transparent to-sand/60" style={{ transform: `scaleX(${captionT})`, transformOrigin: "left" }}/>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-px bg-linear-to-r from-sand to-beige"
          style={{ width: `${progress * 100}%` }}
        />

        <div
          className={`absolute left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-700 ${hintVisible ? "opacity-100" : "opacity-0"}`}
          style={{ bottom: "calc(2.5rem + env(safe-area-inset-bottom, 0px))" }}
        >
          <div className="h-12 w-px overflow-hidden bg-cream/25">
            <div className="h-full w-full animate-[scrollLine_1.8s_ease-in-out_infinite] bg-cream" />
          </div>
          <span className="text-xs lg:text-sm uppercase tracking-[0.15em] text-cream/75">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
};