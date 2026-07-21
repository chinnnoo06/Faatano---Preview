"use client"

import { useEffect, useRef } from "react";
import { useFrames } from "@/context/FramesContext";

type Props = { progress: number };

export const FrameCanvas = ({ progress }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { images, total } = useFrames();

  // El progreso vive en un ref para que el pintado del canvas no dependa del
  // ciclo de render de React: un único bucle rAF lee este valor y sólo
  // redibuja cuando cambia el frame objetivo. Así el scroll no fuerza un
  // redibujado por cada commit y la animación va suave.
  const progressRef = useRef(progress);
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  const drawnFrame = useRef(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    // Dibuja el frame `idx`; si aún no ha cargado, retrocede al último
    // disponible para no dejar el canvas congelado ni en blanco.
    // Devuelve true solo si pintó algo, para poder reintentar si no.
    const draw = (idx: number): boolean => {
      let img = images[idx];
      if (!img?.complete || img.naturalWidth === 0) {
        for (let j = idx - 1; j >= 0; j--) {
          const cand = images[j];
          if (cand?.complete && cand.naturalWidth > 0) { img = cand; break; }
        }
      }
      if (!img?.complete || img.naturalWidth === 0) return false;

      const canvasRatio = canvas.width / canvas.height;
      const imgRatio = img.width / img.height;
      let dw = canvas.width, dh = canvas.height, dx = 0, dy = 0;

      if (imgRatio > canvasRatio) {
        dh = canvas.height; dw = dh * imgRatio; dx = (canvas.width - dw) / 2;
      } else {
        dw = canvas.width; dh = dw / imgRatio; dy = (canvas.height - dh) / 2;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, dx, dy, dw, dh);
      return true;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Medimos el propio canvas (atado a h-lvh: el alto de viewport "grande",
      // que NO cambia al mostrarse/ocultarse la barra del navegador móvil) en
      // vez de window.innerHeight. Así el buffer del canvas mantiene un tamaño
      // constante aunque la barra aparezca/desaparezca: no se resetea (nada de
      // flash del bg-ink por detrás) ni cambia la escala del "cover" (la imagen
      // no se ensancha ni se desplaza).
      const rect = canvas.getBoundingClientRect();
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      // Si el layout aún no tiene tamaño real (montaje en producción, antes de
      // asentarse el sticky/h-screen), no tocamos el canvas: el ResizeObserver
      // volverá a llamarnos en cuanto el elemento reciba dimensiones. Evita que
      // el bucle dibuje sobre un canvas 0×0 y lo dé por pintado.
      if (w === 0 || h === 0) return;
      // Si el tamaño real no cambió (p. ej. solo se ocultó la barra del móvil),
      // no tocamos el canvas: así el fondo se mantiene idéntico.
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      drawnFrame.current = -1; // fuerza el redibujado tras cambiar el tamaño
    };
    resize();

    let raf = 0;
    const tick = () => {
      // Hasta que el canvas no tenga un tamaño real, no dibujamos ni marcamos
      // frame como pintado; si no, en producción móvil se "dibujaría" sobre un
      // canvas 0×0, se latchearía drawnFrame y no repintaría hasta el 1er scroll.
      if (canvas.width > 0 && canvas.height > 0) {
        const frame = Math.min(
          total - 1,
          Math.max(0, Math.floor(progressRef.current * (total - 1)))
        );
        // Solo damos el frame por dibujado si de verdad se pintó; si la imagen
        // aún no estaba lista, se reintenta en el siguiente rAF (así el primer
        // frame aparece en cuanto carga, sin necesidad de hacer scroll).
        if (frame !== drawnFrame.current) {
          if (draw(frame)) drawnFrame.current = frame;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // ResizeObserver sobre el propio canvas: se dispara en cuanto el elemento
    // recibe su tamaño (arranque en producción) y en cada cambio posterior
    // (barra de URL del móvil), sin depender del scroll. Cubre el caso en que
    // el primer frame no aparecía hasta hacer scroll en móvil.
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [images, total]);

  // El canvas se ancla arriba con alto fijo `h-lvh` (viewport grande, estable)
  // en lugar de `inset-0 h-full`, que seguiría al contenedor `h-dvh` y se
  // encogería/estiraría con la barra del navegador. Al ser lvh ≥ dvh siempre,
  // cubre el área visible por completo (el sobrante inferior lo recorta el
  // `overflow-hidden` del contenedor) sin exponer nunca el bg-ink.
  return <canvas ref={canvasRef} className="absolute inset-x-0 top-0 h-lvh w-full" />;
};
