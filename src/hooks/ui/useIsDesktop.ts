import { useSyncExternalStore } from "react"

// Hook base: recibe cualquier media query
function useMediaQuery(query: string) {
  const subscribe = (callback: () => void) => {
    const media = window.matchMedia(query)
    media.addEventListener("change", callback)
    return () => media.removeEventListener("change", callback)
  }

  const getSnapshot = () => window.matchMedia(query).matches

  // El servidor no conoce el viewport. Devolvemos false (mobile-first)
  // para que SSR y el primer render del cliente coincidan.
  const getServerSnapshot = () => false

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

// Variantes específicas
export function useIsMobile() {
  return useMediaQuery("(max-width: 639px)")   // < sm (640px)
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 1024px)")  // ≥ lg (1024px)
}