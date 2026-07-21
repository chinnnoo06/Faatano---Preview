"use client"

import { createContext, useContext, useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/ui/useIsDesktop";

const MOBILE_FRAMES = 258;
const DESKTOP_FRAMES = 254;

const READY_FRAMES = 125;

const CONCURRENCY = 6;

const framePath = (dir: string, i: number) =>
  `/${dir}/frame_${String(i + 1).padStart(4, "0")}.webp`;

type FramesState = {
  images: HTMLImageElement[];
  loaded: number;
  total: number;
  readyTarget: number;
  ready: boolean;
};

const FramesContext = createContext<FramesState>({
  images: [], loaded: 0, total: DESKTOP_FRAMES,
  readyTarget: Math.min(READY_FRAMES, DESKTOP_FRAMES), ready: false,
});

export const useFrames = () => useContext(FramesContext);

export const FramesProvider = ({ children }: { children: React.ReactNode }) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(0);
  const [ready, setReady] = useState(false);
  const [total, setTotal] = useState(DESKTOP_FRAMES);
  const [readyTarget, setReadyTarget] = useState(Math.min(READY_FRAMES, DESKTOP_FRAMES));
  const isMobile = useIsMobile();

  useEffect(() => {
    const dir = isMobile ? "frames-mobile" : "frames-desktop";
    const frameCount = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES;
    const readyAt = Math.min(READY_FRAMES, frameCount);

    let cancelled = false;
    let count = 0;
    const imgs: HTMLImageElement[] = new Array(frameCount);

    setLoaded(0);
    setReady(false);
    setTotal(frameCount);
    setReadyTarget(readyAt);

    const loadOne = (i: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        if (i === 0) img.fetchPriority = "high";
        imgs[i] = img;

        const done = () => {
          if (cancelled) return;
          count++;
          setLoaded(count);
          if (count >= readyAt) setReady(true);
          resolve();
        };

        img.onload = () => {
          img.decode().then(done, done);
        };
        img.onerror = done;
        img.src = framePath(dir, i);
      });

    let next = 0;
    const worker = async (): Promise<void> => {
      while (!cancelled) {
        const i = next++;
        if (i >= frameCount) return;
        await loadOne(i);
      }
    };

    setImages(imgs);
    for (let w = 0; w < Math.min(CONCURRENCY, frameCount); w++) worker();

    return () => {
      cancelled = true;
    };
  }, [isMobile]);

  return (
    <FramesContext.Provider
      value={{ images, loaded, total, readyTarget, ready }}
    >
      {children}
    </FramesContext.Provider>
  );
};
