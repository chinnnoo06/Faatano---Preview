"use client"

import { motion } from "framer-motion"
import Link from "next/link";
import { COLLECTIONS_CARDS } from "@/utils/constants";
import { CollectionCard } from "./CollectionCard";
import { slideInBottomInView, slideTittleInBottomInView, staggerContainer, staggerItemScale } from "@/utils/motion";
import { RevealText } from "@/components/ui/RevealText";
import { FiArrowRight } from "react-icons/fi";

export const HomeCollections = () => {
    return (
        <div className="mx-auto max-w-7xl px-4">

            <motion.div {...slideTittleInBottomInView}  className="max-w-3xl">
                <p className="text-xs lg:text-sm uppercase tracking-[0.3em] text-bronze">
                    The Collections
                </p>
                <h2 className="mt-6 text-4xl lg:text-6xl tracking-tight leading-tight font-light text-ink">
                    <RevealText
                        segments={[
                            { text: "Five families." },
                            { text: "One material philosophy.", className: "italic text-bronze" },
                        ]}
                    />
                </h2>
                <p className="mt-6 max-w-xl text-lg lg:text-xl text-bronze">
                    Each series explores what recycled plastic can become when form has no limits.
                </p>
            </motion.div>

            <motion.div {...staggerContainer} className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 scrollbar-thin [scrollbar-color:var(--color-sand)_transparent] [-webkit-overflow-scrolling:touch]">
                {COLLECTIONS_CARDS.map((collection, i) => (
                    <motion.div className={`shrink-0 snap-start ${collection.width}`} key={collection.index} variants={staggerItemScale}>
                        <CollectionCard collection={collection} priority={i < 2} />
                    </motion.div>
                ))}
            </motion.div>

            <motion.div {...slideInBottomInView} className="text-center mt-12">
                <Link
                    href="/collections"
                    className="group flex items-center justify-center gap-2 text-xs lg:text-sm uppercase tracking-[0.15em] text-bronze hover:text-ink transition-colors duration-300"
                >
                    Explore all five collections
                    <FiArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                </Link>
            </motion.div>
        </div>
    );
};