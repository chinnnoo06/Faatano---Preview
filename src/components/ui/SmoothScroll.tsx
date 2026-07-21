"use client"

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { useIsDesktop } from "@/hooks/ui/useIsDesktop";
import { LenisContext } from "@/context/LenisContext";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  const isDesktop = useIsDesktop();

  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (!isDesktop) return;

    const instance = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });
    setLenis(instance);

    let rafId: number;
    function raf(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, [isDesktop]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
};