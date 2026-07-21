"use client"

import { MATERIAL_POINTS } from "@/utils/constants"
import { slideInBottomInView, slideInBottomScaleInView, slideTittleInBottomInView, staggerContainer, staggerItem } from "@/utils/motion"
import { RevealText } from "@/components/ui/RevealText"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"
import { MaterialPoint } from "./MaterialPoint"

export const HomeMaterials = () => {
    return (
        <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col lg:flex-row lg:items-center gap-12 w-full">

                <div className="flex flex-col w-full lg:w-1/2 lg:shrink-0">
                    <motion.div {...slideTittleInBottomInView} className="max-w-3xl">
                        <p className="text-xs lg:text-sm uppercase tracking-[0.3em] text-sand">
                            The Material
                        </p>
                        <h2 className="mt-6 text-4xl lg:text-6xl tracking-tight leading-tight font-light text-cream">
                            <RevealText
                                segments={[
                                    { text: "Waste, reengineered into something" },
                                    { text: "you'll keep.", className: "italic text-sand" },
                                ]}
                            />
                        </h2>
                        <p className="mt-6 max-w-xl text-lg lg:text-xl text-sand">
                            Every piece is 3D-printed from 97% recycled plastic — no molds, no excess, no compromise.
                        </p>
                    </motion.div>

                    <motion.div {...staggerContainer} className="mt-12">
                        {MATERIAL_POINTS.map((materialPoint) => (
                            <MaterialPoint key={materialPoint.stat} materialPoint={materialPoint} />
                        ))}
                    </motion.div>

                    <motion.div {...slideInBottomInView} className="mt-12">
                        <Link
                            href="/collections"
                            className="group flex items-center gap-2 text-xs lg:text-sm uppercase tracking-[0.15em] text-sand hover:text-bronze transition-colors duration-300"
                        >
                            Learn more about our materials
                            <FiArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                        </Link>

                    </motion.div>
                </div>

                <motion.div {...slideInBottomScaleInView}
                    className="group relative w-full max-w-lg mx-auto lg:max-w-none h-160 lg:w-1/2 overflow-hidden rounded-xl "
                >
                    <Image
                        src="/materials/texture-main.webp"
                        alt="Close-up of recycled PETG and reclaimed wood-fiber texture"
                        fill
                        sizes="(max-width: 1024px) 100vw, 58vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/80 via-ink/10 to-transparent" />
                    <span className="absolute bottom-6 left-6 z-10 text-xs lg:text-sm uppercase tracking-[0.15em] text-cream">
                        Recycled PETG + reclaimed wood fiber
                    </span>
                </motion.div>

            </div>
        </div>
    )
}