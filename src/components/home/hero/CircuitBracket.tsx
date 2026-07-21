// Bracket de circuito que se dibuja con el scroll. Misma convención que
// CircuitBeams: ortogonal + esquina redondeada, con un punto de luz difuminado
// en la punta mientras se traza.
export const CircuitBracket = ({
  t,
  flip = false,
}: {
  t: number;      // 0..1 progreso de dibujo
  flip?: boolean; // espejo para la esquina inferior-derecha
}) => {
  const draw = 1000 * (1 - t);
  const tipOffset = draw + 16;
  return (
    <svg
      viewBox="0 0 210 130"
      fill="none"
      className={`h-auto w-24 sm:w-36 lg:w-44 ${flip ? "rotate-180" : ""}`}
      style={{ opacity: t > 0.01 ? 1 : 0 }}
    >
      <defs>
        <filter id={`hb-glow-${flip ? "b" : "a"}`} x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="3.5" />
        </filter>
      </defs>
      {/* Trazo que se va dibujando */}
      <path
        pathLength={1000}
        d="M 202 8 H 28 Q 8 8 8 28 V 122"
        stroke="rgba(200,168,130,0.45)"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeDasharray={1000}
        strokeDashoffset={draw}
      />
      {/* Punta luminosa (halo + núcleo) que viaja con el frente del trazo */}
      {t > 0.01 && t < 0.995 && (
        <>
          <path
            pathLength={1000}
            d="M 202 8 H 28 Q 8 8 8 28 V 122"
            stroke="rgba(250,247,242,0.5)"
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray="16 1000"
            strokeDashoffset={tipOffset}
            filter={`url(#hb-glow-${flip ? "b" : "a"})`}
          />
          <path
            pathLength={1000}
            d="M 202 8 H 28 Q 8 8 8 28 V 122"
            stroke="rgba(250,247,242,0.9)"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeDasharray="10 1000"
            strokeDashoffset={tipOffset}
          />
        </>
      )}
    </svg>
  );
};
