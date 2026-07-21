import { useEffect } from "react";

let lockCount = 0;

export const useLockBodyScroll = (locked: boolean = true) => {
    useEffect(() => {
        if (!locked) return;

        lockCount++;
        const html = document.documentElement;
        html.style.overflow = "hidden";   // <html> es el scroller real (body/html tienen overflow-x: clip)

        return () => {
            lockCount = Math.max(0, lockCount - 1);
            if (lockCount === 0) {
                html.style.overflow = "";   // limpia el inline style; vuelve a aplicar el overflow-x: clip del CSS
            }
        };
    }, [locked]);
};