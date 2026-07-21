"use client"

import { createContext, useContext } from "react";
import type Lenis from "lenis";

// Instancia activa de Lenis (o null cuando no corre, p. ej. en móvil).
// Permite que otros componentes (Hero) se enganchen a su evento `scroll`
// en lugar de montar su propio listener + rAF.
export const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);
