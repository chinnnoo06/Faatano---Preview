"use client"

import { FAQS } from "@/utils/constants"
import { slideInBottomInView, slideTittleInBottomInView, staggerContainer, staggerItemScale } from "@/utils/motion"
import { RevealText } from "@/components/ui/RevealText"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { FiArrowRight } from "react-icons/fi"
import { FaqItem } from "./FaqItem"

export const Faq = () => {
    const [openItems, setOpenItems] = useState<number[]>([])

    const toggle = (i: number) =>
        setOpenItems((prev) =>
            prev.includes(i) ? prev.filter((n) => n !== i) : [...prev, i]
        )

    return (
        <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-col lg:flex-row items-start justify-center gap-12">

                <div className="lg:sticky lg:top-32 lg:w-2/5">
                    <motion.div {...slideTittleInBottomInView} className="max-w-3xl">
                        <p className="text-xs lg:text-sm uppercase tracking-[0.3em] text-bronze">
                            Questions
                        </p>
                        <h2 className="mt-6 text-4xl lg:text-6xl tracking-tight leading-tight font-light text-ink">
                            <RevealText
                                segments={[
                                    { text: "Everything you" },
                                    { text: "might ask.", className: "italic text-bronze" },
                                ]}
                            />
                        </h2>
                        <p className="mt-6 max-w-xl text-lg lg:text-xl text-bronze">
                            The essentials on how our pieces are made, sized, and shipped.
                        </p>
                    </motion.div>

                    <motion.div {...slideInBottomInView} className="mt-12">
                        <p className="text-bronze">Still have a question?</p>
                        <Link
                            href="/contact"
                            className="mt-2 group inline-flex items-center gap-2 text-xs lg:text-sm uppercase tracking-[0.15em] text-bronze hover:text-ink transition-colors duration-300"
                        >
                            Get in touch
                            <FiArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                        </Link>
                    </motion.div>

                </div>

                <motion.div {...staggerContainer} className="w-full lg:w-3/5">
                    {FAQS.map((item, i) => (
                        <motion.div
                            key={item.question}
                            variants={staggerItemScale}
                            className="border-b border-bronze/25 last:border-b-0"
                        >
                            <FaqItem
                                id={`faq-${i}`}
                                item={item}
                                isOpen={openItems.includes(i)}
                                onToggle={() => toggle(i)}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    )
}
