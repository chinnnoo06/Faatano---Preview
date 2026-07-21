"use client"

import { slideInBottomInView, slideInBottomScaleInView, slideTittleInBottomInView, staggerContainer, staggerItemScale } from "@/utils/motion"
import { RevealText } from "@/components/ui/RevealText"
import { motion } from "framer-motion"
import Link from "next/link"
import { FiArrowRight } from "react-icons/fi"

type Step = { num: string; title: string; copy: string }

const STEPS: Step[] = [
    {
        num: "01",
        title: "Choose your piece",
        copy: "Pick a form from any of our five collections.",
    },
    {
        num: "02",
        title: "Set your dimensions",
        copy: "Tell us the size that fits your space — we scale it to order.",
    },
    {
        num: "03",
        title: "We print & ship",
        copy: "Made on demand and delivered within one to two weeks.",
    },
]

export const Customize = () => {
    return (
        <div className="max-w-7xl mx-auto px-4">

            <motion.div {...slideTittleInBottomInView} className="mx-auto max-w-3xl text-center">
                <p className="text-xs lg:text-sm uppercase tracking-[0.3em] text-bronze">
                    Made to Order
                </p>
                <h2 className="mt-6 text-4xl lg:text-6xl tracking-tight leading-tight font-light text-ink">
                    <RevealText
                        segments={[
                            { text: "Yours, down to the" },
                            { text: "last dimension.", className: "italic text-bronze" },
                        ]}
                    />
                </h2>
                <p className="mt-6 text-lg lg:text-xl text-bronze">
                    Every piece is printed on demand and sized to your space — ready to ship in one to two weeks.
                </p>
            </motion.div>

            <motion.div {...staggerContainer} className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
                {STEPS.map((step) => (
                    <motion.div key={step.num} variants={staggerItemScale} className="relative">
                        <div className="text-center">
                            <span className="block text-4xl lg:text-5xl font-light leading-none text-sand">
                                {step.num}
                            </span>
                            <h3 className="mt-5 text-xl text-ink">{step.title}</h3>
                            <p className="mt-2 text-xs lg:text-sm text-bronze">{step.copy}</p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            <motion.div {...slideInBottomScaleInView}
                className="mt-12 flex flex-col gap-8 rounded-2xl bg-ink p-8 lg:flex-row lg:items-center lg:justify-between"
            >
                <div className="flex items-center gap-4">
                    <span className="text-5xl lg:text-6xl font-light leading-none text-cream">
                        1-2
                    </span>
                    <div className="flex flex-col leading-tight">
                        <span className="text-xs lg:text-sm uppercase tracking-[0.15em] text-sand">
                            weeks
                        </span>
                        <span className="text-xs lg:text-sm uppercase tracking-[0.15em] text-sand/75">
                            average lead time
                        </span>
                    </div>
                </div>
                <p className="max-w-md text-lg text-beige/75 lg:text-right">
                    No warehouses. No overstock. Each piece is made the moment you order it.
                </p>
            </motion.div>

            <motion.div {...slideInBottomInView} className="mt-12 text-center">
                <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2 text-xs lg:text-sm uppercase tracking-[0.15em] text-bronze hover:text-ink transition-colors duration-300"
                >
                    Laearn More
                    <FiArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Link>
            </motion.div>

        </div>
    )
}