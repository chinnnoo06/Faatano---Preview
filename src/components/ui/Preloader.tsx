"use client"

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useFrames } from "@/context/FramesContext";

const MIN_DURATION = 2500;

export const Preloader = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { ready, loaded, readyTarget } = useFrames();
  // El % se mide contra los frames necesarios para entrar (readyTarget), así la
  // barra llega a 100% justo cuando se suelta el preloader.
  const pct = readyTarget > 0 ? Math.min(100, Math.round((loaded / readyTarget) * 100)) : 0;
  const [minElapsed, setMinElapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(!isHome);

  useEffect(() => {
    if (!isHome) return;
    const t = setTimeout(() => setMinElapsed(true), MIN_DURATION);
    return () => clearTimeout(t);
  }, [isHome]);

  useEffect(() => {
    if (ready && minElapsed) {
      setOpen(true);
      const t = setTimeout(() => setHidden(true), 1100);
      return () => clearTimeout(t);
    }
  }, [ready, minElapsed]);

  return (
    <>
      {!hidden && (
        <div className="pointer-events-none fixed inset-0 z-100">
          <div
            className={`absolute inset-x-0 top-0 h-1/2 bg-cream transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${open ? "-translate-y-full" : "translate-y-0"}`}
          />
          <div
            className={`absolute inset-x-0 bottom-0 h-1/2 bg-cream transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] ${open ? "translate-y-full" : "translate-y-0"}`}
          />
          <div
            className={`absolute left-1/2 top-1/2 z-5 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-6 transition-opacity duration-300 ${open ? "opacity-0" : "opacity-100"}`}
          >
            <span
              className="whitespace-nowrap bg-linear-to-r from-ink to-bronze bg-clip-text pr-1 text-4xl font-medium uppercase tracking-[0.15em] text-transparent"
              style={{
                clipPath: "inset(0 100% 0 0)",

                animation:
                  "logoReveal 1.1s cubic-bezier(0.76,0,0.24,1) 0.3s forwards, logoBreathe 2.6s ease-in-out 1.4s infinite",
              }}
            >
              Faatano
            </span>

            <div className="flex flex-col items-center gap-2.5">
              <div className="relative h-0.5 w-44 overflow-hidden rounded-full bg-ink/10">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-sand transition-[width] duration-300 ease-out"
                  style={{ width: `${pct}%` }}
                />
                <div className="absolute inset-y-0 left-0 w-1/3 animate-[loaderSheen_1.2s_ease-in-out_infinite] bg-linear-to-r from-transparent via-cream/80 to-transparent" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-ink/45 tabular-nums">
                {pct}%
              </span>
            </div>
          </div>
        </div>
      )}

      {children}
    </>
  );
};