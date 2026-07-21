"use client"

import type { TQA } from "@/types"
import { accordionPanel } from "@/utils/motion"
import { AnimatePresence, motion } from "framer-motion"
import { FiChevronDown } from "react-icons/fi"

type FaqItemProps = {
    item: TQA
    isOpen: boolean
    onToggle: () => void
    id: string
}

export const FaqItem = ({ item, isOpen, onToggle, id }: FaqItemProps) => {
    return (
        <>
            <button
                type="button"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls={`${id}-panel`}
                id={`${id}-trigger`}
                className="flex w-full items-center justify-between gap-6 py-6 text-left text-lg lg:text-xl tracking-tight font-light text-ink cursor-pointer"
            >
                <span>{item.question}</span>
                <FiChevronDown
                    className={`h-5 w-5 shrink-0 text-sand transition-transform duration-800 ${isOpen ? "rotate-180" : ""}`}
                />
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        {...accordionPanel}
                        id={`${id}-panel`}
                        role="region"
                        aria-labelledby={`${id}-trigger`}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 pt-0 text-sm lg:text-base leading-relaxed text-bronze">
                            {item.answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
