export const CircuitBeams = () => {
    return (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {/*
              Cada lado vive en su propio SVG:
              - Capa izquierda: preserveAspectRatio="xMinYMid slice" → sus trazos quedan
                anclados al borde IZQUIERDO y viajan con él al achicar la pantalla.
              - Capa derecha:  preserveAspectRatio="xMaxYMid slice" → anclados al borde
                DERECHO. Lo que sobra se recorta por el centro, nunca por los bordes.
            */}

            {/* ============ Desktop ============ */}
            {/* Capa izquierda: cb-d1 (conector superior) + cb-d4 (panel inferior-izq) */}
            <svg
                className="absolute inset-0 hidden h-full w-full md:block"
                viewBox="0 0 1440 820"
                preserveAspectRatio="xMinYMid slice"
                fill="none"
            >
                <defs>
                    <filter id="cb-glow-dl" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="4" />
                    </filter>
                </defs>

                <g className="trace stroke-cream/5">
                    <path pathLength={1000} id="cb-d1" d="M 574 -40 V 112 Q 574 124 562 124 H 168 Q 156 124 156 136 V 432" />
                    <path pathLength={1000} id="cb-d4" d="M -40 533 H 317 Q 337 533 337 553 V 860" />
                </g>

                <g filter="url(#cb-glow-dl)">
                    <use href="#cb-d1" className="beam beam-glow beam-t1 stroke-cream/40" />
                    <use href="#cb-d4" className="beam beam-glow beam-t4 stroke-cream/40" />
                </g>
                <use href="#cb-d1" className="beam beam-core beam-t1 stroke-cream/70" />
                <use href="#cb-d4" className="beam beam-core beam-t4 stroke-cream/70" />
            </svg>

            {/* Capa derecha: cb-d3 (escape derecho) + cb-d5 (panel inferior-der) */}
            <svg
                className="absolute inset-0 hidden h-full w-full md:block"
                viewBox="0 0 1440 820"
                preserveAspectRatio="xMaxYMid slice"
                fill="none"
            >
                <defs>
                    <filter id="cb-glow-dr" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="4" />
                    </filter>
                </defs>

                <g className="trace stroke-cream/5">
                    <path pathLength={1000} id="cb-d3" d="M 1046 190 H 1284 Q 1296 190 1296 202 V 352 Q 1296 364 1308 364 H 1480" />
                    <path pathLength={1000} id="cb-d5" d="M 1103 860 V 613 Q 1103 593 1123 593 H 1480" />
                </g>

                <g filter="url(#cb-glow-dr)">
                    <use href="#cb-d3" className="beam beam-glow beam-t2 stroke-cream/40" />
                    <use href="#cb-d5" className="beam beam-glow beam-t3 stroke-cream/40" />
                </g>
                <use href="#cb-d3" className="beam beam-core beam-t2 stroke-cream/70" />
                <use href="#cb-d5" className="beam beam-core beam-t3 stroke-cream/70" />
            </svg>

            {/* ============ Móvil ============ */}
            {/* Capa izquierda: cb-m1 (conector superior) + cb-m4 (panel inferior-izq) */}
            <svg
                className="absolute inset-0 block h-full w-full md:hidden"
                viewBox="0 0 420 820"
                preserveAspectRatio="xMinYMid slice"
                fill="none"
            >
                <defs>
                    <filter id="cb-glow-ml" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="3.5" />
                    </filter>
                </defs>

                <g className="trace stroke-cream/5">
                    <path pathLength={1000} id="cb-m1" d="M 150 -40 V 96 Q 150 106 140 106 H 62 Q 52 106 52 116 V 330" />
                    <path pathLength={1000} id="cb-m4" d="M -40 560 H 190 Q 208 560 208 578 V 860" />
                </g>

                <g filter="url(#cb-glow-ml)">
                    <use href="#cb-m1" className="beam beam-glow beam-t1 stroke-cream/40" />
                    <use href="#cb-m4" className="beam beam-glow beam-t4 stroke-cream/40" />
                </g>
                <use href="#cb-m1" className="beam beam-core beam-t1 stroke-cream/70" />
                <use href="#cb-m4" className="beam beam-core beam-t4 stroke-cream/70" />
            </svg>

            {/* Capa derecha: cb-m3 (escape derecho) + cb-m5 (panel inferior-der) */}
            <svg
                className="absolute inset-0 block h-full w-full md:hidden"
                viewBox="0 0 420 820"
                preserveAspectRatio="xMaxYMid slice"
                fill="none"
            >
                <defs>
                    <filter id="cb-glow-mr" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="3.5" />
                    </filter>
                </defs>

                <g className="trace stroke-cream/5">
                    <path pathLength={1000} id="cb-m3" d="M 250 246 H 356 Q 366 246 366 256 V 360 Q 366 370 376 370 H 460" />
                    <path pathLength={1000} id="cb-m5" d="M 320 860 V 660 Q 320 642 338 642 H 460" />
                </g>

                <g filter="url(#cb-glow-mr)">
                    <use href="#cb-m3" className="beam beam-glow beam-t2 stroke-cream/40" />
                    <use href="#cb-m5" className="beam beam-glow beam-t3 stroke-cream/40" />
                </g>
                <use href="#cb-m3" className="beam beam-core beam-t2 stroke-cream/70" />
                <use href="#cb-m5" className="beam beam-core beam-t3 stroke-cream/70" />
            </svg>

            <style>{`
        .trace {
          fill: none;
          stroke-width: 1;
          stroke-linecap: round;
        }
        .beam {
          fill: none;
          stroke-linecap: round;
          will-change: stroke-dashoffset;
          animation: cb-travel linear infinite;
        }
        /* Halo ancho y difuso: da el aspecto de "blob" luminoso de la referencia */
        .beam-glow {
          stroke-width: 5;
          stroke-dasharray: 22 1000;
        }
        /* Núcleo corto y brillante: el punto caliente dentro del halo */
        .beam-core {
          stroke-width: 1.5;
          stroke-dasharray: 12 1000;
        }
        .beam-t1 { animation-duration: 11s; animation-delay: 0s; }
        .beam-t2 { animation-duration: 13s; animation-delay: 3.5s; }
        .beam-t3 { animation-duration: 15s; animation-delay: 7s; }
        .beam-t4 { animation-duration: 14s; animation-delay: 5.5s; }
        @keyframes cb-travel {
          from { stroke-dashoffset: 1000; }
          to   { stroke-dashoffset: -30; } /* el punto sale por completo del trazo */
        }
        @media (prefers-reduced-motion: reduce) {
          .beam { animation: none; stroke-opacity: 0; }
        }
      `}</style>
        </div>
    );
};