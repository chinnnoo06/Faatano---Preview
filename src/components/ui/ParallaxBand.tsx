"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { SectionCurve } from "./SectionCurve"
import { RevealText } from "./RevealText"

export const ParallaxBand = () => {
    const wrapperRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: wrapperRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "10%"])

    return (
        <div
            ref={wrapperRef}
            className="relative h-[50vh] sm:h-[65vh] lg:h-[80vh] 2xl:h-[95vh] w-full overflow-hidden"
        >
            <motion.div style={{ y }} className="absolute inset-x-0 top-[-20%] h-[140%] will-change-transform"     >
                <Image
                    src="/background/parallax.webp"
                    alt="3D-printed furniture in a lived-in space"
                    fill
                    sizes="100vw"
                    className="object-cover"
                />
            </motion.div>

            <SectionCurve fill="fill-cream" />

            <div className="pointer-events-none absolute inset-0 bg-ink/30" />

            <div className="absolute inset-0 flex items-center justify-center px-6">

                <h2 className="max-w-6xl text-center tracking-tight text-5xl sm:text-6xl md:text-7xl 2xl:text-7xl leading-tight font-light text-cream">
                    <RevealText
                        segments={[
                            { text: "Yesterday's plastic," },
                            { text: "printed into tomorrow's furniture.", className: "italic text-sand" },
                        ]}
                    />
                </h2>
            </div>
        </div>
    )
}
