import { TMaterialPoint } from "@/types"
import { staggerItem } from "@/utils/motion"
import { motion } from "framer-motion"

export const MaterialPoint = ({ materialPoint }: { materialPoint: TMaterialPoint }) => {
    return (
        <motion.div variants={staggerItem} className="flex gap-2 border-t border-sand/25 py-6">
            <span className="w-28 shrink-0 text-sand text-xl lg:text-2xl tracking-tight font-light ">
                {materialPoint.stat}
            </span>
            <div>
                <h3 className="text-base lg:text-lg text-cream">{materialPoint.title}</h3>
                <p className="mt-1 text-xs lg:text-sm text-cream/75">{materialPoint.copy}</p>
            </div>
        </motion.div>
    )
}