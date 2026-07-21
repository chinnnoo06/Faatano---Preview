"use client"

import { cn } from "@/utils/cn"
import { motion, type Variants } from "framer-motion"
import { useEffect, useRef, useState } from "react"

const EASE_OUT = [0.16, 1, 0.3, 1] as const

const DELAY_CHILDREN = 0.05
const STAGGER = 0.055
const WORD_DURATION = 0.7

export type RevealSegment = { text: string; className?: string }

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: STAGGER, delayChildren: DELAY_CHILDREN },
  },
}

const word: Variants = {
  hidden: { opacity: 0, y: "0.5em", filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: "0em",
    filter: "blur(0px)",
    transition: { duration: WORD_DURATION, ease: EASE_OUT },
  },
}

type Props = {
  segments: RevealSegment[]
  className?: string
  amount?: number
}

const toWords = (segments: RevealSegment[]) =>
  segments.flatMap((seg, si) =>
    seg.text
      .trim()
      .split(/\s+/)
      .map((text, wi) => ({
        key: `${si}-${wi}`,
        text,
        className: seg.className,
        italic: seg.className?.includes("italic") ?? false,
      }))
  )

export const RevealText = ({ segments, className, amount = 0.4 }: Props) => {
  const [shine, setShine] = useState(false)
  const shineTimeout = useRef<number | null>(null)
  const words = toWords(segments)

  const revealEndMs =
    (DELAY_CHILDREN + STAGGER * Math.max(words.length - 1, 0) + WORD_DURATION) * 1000

  // instante exacto en que esa capa termina.
  const startShine = () => {
    if (shineTimeout.current !== null) return
    shineTimeout.current = window.setTimeout(() => setShine(true), revealEndMs)
  }

  useEffect(
    () => () => {
      if (shineTimeout.current !== null) window.clearTimeout(shineTimeout.current)
    },
    []
  )

  // La cursiva se inclina a la derecha y su punta sobresale de la caja
  // `inline-block`; con un `overflow-hidden` en un contenedor padre eso se
  // recorta (se nota en móvil, donde la palabra queda pegada al borde).
  // Un pelín de padding a la derecha mete la inclinación dentro de la caja.
  const italicPad = "0.14em"

  return (
    <span className={cn("grid", className)}>
      <motion.span
        className="[grid-area:1/1]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount }}
        variants={container}
        onViewportEnter={startShine}
      >
        {words.map((w) => (
          <span key={w.key}>
            <motion.span
              variants={word}
              className={cn("inline-block will-change-[transform,filter]", w.className)}
              style={w.italic ? { paddingRight: italicPad } : undefined}
            >
              {w.text}
            </motion.span>{" "}
          </span>
        ))}
      </motion.span>

      <span
        aria-hidden
        className={cn(
          "pointer-events-none select-none text-transparent relative z-1 [grid-area:1/1]",
          shine && "reveal-shine"
        )}
      >
        {words.map((w) => (
          <span key={w.key}>
            <span
              className={cn("inline-block", w.className)}
              style={{
                color: "transparent",
                ...(w.italic ? { paddingRight: italicPad } : {}),
              }}
            >
              {w.text}
            </span>{" "}
          </span>
        ))}
      </span>
    </span>
  )
}