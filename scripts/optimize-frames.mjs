// Re-codifica los frames del hero a WebP lossy sin alpha.
//
// Uso:
//   node scripts/optimize-frames.mjs                 (re-codifica desktop + mobile)
//   node scripts/optimize-frames.mjs desktop         (solo una carpeta)
//   node scripts/optimize-frames.mjs --quality 74 --width 1600
//
// Escribe en carpetas nuevas (`*-opt`) para no destruir los originales.
// Cuando el resultado te convenza, renombra:
//   frames-desktop -> frames-desktop-orig   (backup)
//   frames-desktop-opt -> frames-desktop
//
// No requiere instalar nada: reutiliza el `sharp` que Next ya trae vía pnpm.

import { readdir, mkdir, stat } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";

const require = createRequire(import.meta.url);

// Resuelve sharp desde la copia de pnpm (no es dependencia directa del proyecto).
function loadSharp() {
  const candidates = [
    "sharp",
    "./node_modules/.pnpm/sharp@0.34.5/node_modules/sharp",
  ];
  for (const c of candidates) {
    try {
      return require(c.startsWith(".") ? path.resolve(c) : c);
    } catch {
      /* siguiente candidato */
    }
  }
  // Fallback: buscar cualquier versión de sharp dentro de .pnpm
  const glob = require("node:fs").readdirSync("node_modules/.pnpm").find((d) => d.startsWith("sharp@"));
  if (glob) return require(path.resolve(`node_modules/.pnpm/${glob}/node_modules/sharp`));
  throw new Error("No se encontró sharp. Instala con: pnpm add -D sharp");
}

const sharp = loadSharp();

// ── Opciones CLI ──
const args = process.argv.slice(2);
const getFlag = (name, def) => {
  const i = args.indexOf(`--${name}`);
  return i !== -1 && args[i + 1] ? args[i + 1] : def;
};
const QUALITY = Number(getFlag("quality", 78));
const WIDTH = Number(getFlag("width", 0)); // 0 = no redimensionar
const positional = args.filter((a) => !a.startsWith("--") && !/^\d+$/.test(a));

const TARGETS = positional.length
  ? positional.map((p) => `frames-${p}`.replace(/^frames-frames-/, "frames-"))
  : ["frames-desktop", "frames-mobile"];

const kb = (b) => (b / 1024).toFixed(0);

async function processDir(dirName) {
  const srcDir = path.join("public", dirName);
  const outDir = path.join("public", `${dirName}-opt`);

  let files;
  try {
    files = (await readdir(srcDir)).filter((f) => f.endsWith(".webp")).sort();
  } catch {
    console.log(`⏭  ${dirName}: no existe, se omite.`);
    return;
  }
  if (!files.length) return console.log(`⏭  ${dirName}: sin .webp.`);

  await mkdir(outDir, { recursive: true });

  let srcTotal = 0;
  let outTotal = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const inPath = path.join(srcDir, file);
    const outPath = path.join(outDir, file);

    let pipe = sharp(inPath).flatten({ background: "#1a1512" }); // quita alpha sobre el ink
    if (WIDTH > 0) pipe = pipe.resize({ width: WIDTH, withoutEnlargement: true });
    pipe = pipe.webp({ quality: QUALITY, alphaQuality: 0, effort: 5, smartSubsample: true });

    await pipe.toFile(outPath);

    srcTotal += (await stat(inPath)).size;
    outTotal += (await stat(outPath)).size;

    if ((i + 1) % 25 === 0 || i === files.length - 1) {
      process.stdout.write(`\r   ${dirName}: ${i + 1}/${files.length}`);
    }
  }

  const pct = (100 * (1 - outTotal / srcTotal)).toFixed(1);
  console.log(
    `\n✅ ${dirName}: ${kb(srcTotal)} KB → ${kb(outTotal)} KB  (-${pct}%)  ` +
      `[q${QUALITY}${WIDTH ? `, ${WIDTH}px` : ""}]  → public/${dirName}-opt`
  );
}

console.log(`\nOptimizando frames (q=${QUALITY}${WIDTH ? `, width=${WIDTH}` : ""})…\n`);
for (const t of TARGETS) await processDir(t);
console.log(
  `\nRevisa las carpetas *-opt. Si te convencen, renombra la original a *-orig ` +
    `y la *-opt al nombre real.\n`
);
