import { clamp01, easeOutCubic, lerp } from "@/utils/heroMath";

// ── Ventana de scroll en la que las palabras se encienden ──
const REVEAL_START = 0.16;
const REVEAL_END = 0.52;

type Word = { text: string; break?: boolean; italic?: boolean };

const WORDS: Word[] = [
  { text: "Furniture" },
  { text: "that" },
  { text: "remembers", italic: true, break: true },
  { text: "its" },
  { text: "origin.", italic: true },
];

// Paleta del encendido: apagado → dorado → crema.
const DIM: [number, number, number] = [232, 213, 188];
const GOLD: [number, number, number] = [200, 168, 130];
const CREAM: [number, number, number] = [250, 247, 242];

const mix = (
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] => [
    Math.round(lerp(a[0], b[0], t)),
    Math.round(lerp(a[1], b[1], t)),
    Math.round(lerp(a[2], b[2], t)),
  ];

// Estilo de una palabra según su progreso local `wp` (0..1). Solo usa
// transform/filter/opacity: ninguno provoca reflujo, así el salto de línea
// queda fijo y la frase no cambia de altura al ir revelándose.
const wordStyle = (wp: number): React.CSSProperties => {
  const t = clamp01(wp);
  const alpha = clamp01(wp * 1.35);
  const toGold = clamp01(wp / 0.5);
  const toCream = clamp01((wp - 0.5) / 0.5);
  const rgb = mix(mix(DIM, GOLD, toGold), CREAM, toCream);
  // Destello breve al inicio del encendido, no durante toda la vida de la palabra.
  const glow = Math.sin(clamp01(t / 0.7) * Math.PI);
  // `settle` con easing: la palabra "cristaliza" suave, sin frenazo lineal.
  const settle = easeOutCubic(clamp01(wp * 1.4));
  const blur = lerp(8, 0, settle);
  return {
    color: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`,
    textShadow: glow > 0.02 ? `0 0 ${18 * glow}px rgba(200,168,130,${0.4 * glow})` : "none",
    // Entra desde abajo y ligeramente comprimida.
    transform: `translateY(${lerp(0.45, 0, settle)}em) scale(${lerp(0.94, 1, settle)})`,
    filter: blur > 0.05 ? `blur(${blur}px)` : "none",
  };
};

// Frase del Hero: cada palabra se enciende escalonada con el scroll.
export const HeroHeadline = ({ progress }: { progress: number }) => {
  const span = REVEAL_END - REVEAL_START;
  const stagger = span / WORDS.length;
  const overlap = 1.9;

  return (
    <h1 className="max-w-6xl text-center tracking-tight text-5xl sm:text-6xl lg:text-7xl 2xl:text-8xl leading-tight font-light">
      {WORDS.map((word, i) => {
        const wStart = REVEAL_START + i * stagger;
        const wp = clamp01((progress - wStart) / (stagger * overlap));
        return (
          <span key={i}>
            <span
              className={`inline-block will-change-[transform,filter] ${word.italic ? "italic" : ""}`}
              style={wordStyle(wp)}
            >
              {word.text}
            </span>
            {word.break ? <br /> : <span> </span>}
          </span>
        );
      })}
    </h1>
  );
};
