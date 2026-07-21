"use client"

import { useEffect, useRef, useState } from "react";
import { useLenis } from "@/context/LenisContext";

// Progreso 0..1 del Hero en función del scroll: 0 cuando la sección entra en
// viewport y 1 cuando el bloque sticky termina de recorrerse. Devuelve el ref
// que hay que colgar de la sección de altura `SCROLL_VH` y el progreso derivado.
export const useHeroProgress = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const lenis = useLenis();

  useEffect(() => {
    const update = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };

    update();
    window.addEventListener("resize", update);

    // En desktop nos enganchamos al scroll suave de Lenis; en móvil (Lenis null)
    // usamos el scroll nativo con rAF para no disparar un update por evento.
    if (lenis) {
      lenis.on("scroll", update);
      return () => {
        window.removeEventListener("resize", update);
        lenis.off("scroll", update);
      };
    }

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [lenis]);

  return { wrapperRef, progress };
};
