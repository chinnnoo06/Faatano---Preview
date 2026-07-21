import { CONTACT_LINKS, CONTACT_SOCIAL } from "@/utils/constants"
import { slideInLeftInView } from "@/utils/motion"
import { secondaryButton } from "@/utils/styles/button"
import { motion } from "framer-motion"
import Link from "next/link"

export const ContactInfo = () => {
    return (
        <motion.div {...slideInLeftInView} className="flex flex-col gap-5 w-full lg:w-1/2">

            <p className="max-w-md text-sm lg:text-base leading-relaxed text-cream">
                Prefer to reach out directly? Use any of the channels below —
                we're happy to talk through dimensions, materials, and lead times.
            </p>

            <div className="grid divide-y divide-sand/25 border-y border-sand/25">
                {CONTACT_LINKS.map((item) =>
                    item.href ? (
                        <Link
                            key={item.label}
                            href={item.href}
                            target={item.external ? "_blank" : undefined}
                            rel={item.external ? "noopener noreferrer" : undefined}
                            className="flex items-center gap-4 py-5 text-cream/75 transition-all duration-200 hover:pl-2 hover:text-cream"
                        >
                            <span className="flex-none text-cream">
                                <item.icon className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
                            </span>

                            <span>
                                <span className="block text-[10px] lg:text-xs tracking-[0.15em] uppercase text-sand">
                                    {item.label}
                                </span>

                                <span className="text-[15px]">
                                    {item.value}
                                </span>
                            </span>
                        </Link>
                    ) : (
                        <div key={item.label} className="flex items-center gap-4 py-5 text-cream/75">
                            <span className="flex-none text-cream">
                                <item.icon className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
                            </span>

                            <span>
                                <span className="block text-[10px] lg:text-xs tracking-[0.15em] uppercase text-sand">
                                    {item.label}
                                </span>

                                <span className="text-[15px]">
                                    {item.value}
                                </span>
                            </span>
                        </div>
                    )
                )}
            </div>

            <div className="flex gap-5">
                {CONTACT_SOCIAL.map((social) => (
                    <Link
                        key={social.label}
                        href={social.href}
                        aria-label={social.label}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${secondaryButton} p-2.5!`}
                    >
                        <social.icon className="w-3.5 h-3.5 lg:w-4.5 lg:h-4.5" />
                    </Link>
                ))}
            </div>
        </motion.div>

    )
}
