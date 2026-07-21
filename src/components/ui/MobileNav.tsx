"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { FaWhatsapp } from "react-icons/fa6"
import { FiCheck, FiCopy, FiPhone, FiX } from "react-icons/fi"
import { HiOutlineArrowLongRight } from "react-icons/hi2"
import { motion } from "framer-motion"
import { primaryButton, secondaryButton } from "@/utils/styles/button"
import { NAV_LINKS, CONTACT_SOCIAL } from "@/utils/constants"
import { useLockBodyScroll } from "@/hooks/ui/useLockBodyScroll"
import { useDraggableModal } from "@/hooks/ui/useDraggableModal"
import { staggerContainer, staggerContainerOnLoad, staggerItem } from "@/utils/motion"
import { Logo } from "./Logo"

type MobileNavProps = {
    isOpen: boolean;
    mobileModalRef: React.RefObject<HTMLDivElement | null>
    closeModal: () => void
}

const PHONE_DISPLAY = "+1 (737) 279-5032"
const PHONE_RAW = "+17372795032"

export const MobileNav = ({ isOpen, mobileModalRef, closeModal }: MobileNavProps) => {
    useLockBodyScroll(isOpen)
    const { y, controls, handleDrag, handleDragEnd } = useDraggableModal(closeModal)
    const pathname = usePathname()
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        await navigator.clipboard.writeText(PHONE_RAW)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <>
            <div aria-hidden onClick={closeModal}
                className={`fixed inset-0 z-40 bg-ink/10 backdrop-blur-xs transition-opacity duration-300
                    ${isOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
            />

            <div className={`lg:hidden fixed inset-0 z-50  transition-transform duration-300 ease-out  ${isOpen ? "translate-y-0" : "translate-y-[110%]"}`} >
                <motion.div
                    ref={mobileModalRef}
                    drag="y"
                    dragControls={controls}
                    dragListener={false}
                    dragConstraints={{ top: 0, bottom: 0 }}
                    style={{ y }}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    onClick={(e) => e.stopPropagation()}
                    className="relative flex h-full w-full flex-col overflow-y-auto
                        bg-ink/70 px-4 pb-6 pt-2 backdrop-blur-2xl backdrop-saturate-150
                        shadow-[inset_0_0.5px_0_rgba(255,255,255,0.14),inset_0_-8px_24px_rgba(0,0,0,0.3),0_-20px_50px_-12px_rgba(0,0,0,0.6)]"
                >
                    <div className="flex cursor-grab justify-center py-2 active:cursor-grabbing" onPointerDown={(e) => controls.start(e)}>
                        <div className="h-1 w-10 rounded-full bg-beige/25" />
                    </div>

                    <div className="flex items-center justify-between border-b border-beige/25 pb-4">
                        <Logo/>
                        <button
                            onClick={closeModal}
                            aria-label="Close menu"
                            className={secondaryButton}
                        >
                            <FiX className="h-5 w-5" />
                        </button>
                    </div>

                    <div className="flex flex-col h-full justify-between pt-2">
                        <motion.nav
                            {...staggerContainer}
                            initial="hidden"
                            className="flex flex-col w-full"
                        >
                            {NAV_LINKS.map((link, i) => {
                                const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)

                                return (
                                    <motion.div key={link.href} variants={staggerItem}>
                                        <Link
                                            href={link.href}
                                            onClick={closeModal}
                                            aria-current={isActive ? "page" : undefined}
                                            className={`group flex items-center gap-4 rounded-xl px-3 py-3.5 no-underline transition-colors duration-300
                                            ${isActive ? "bg-beige/10" : "hover:bg-beige/5"}`}
                                        >
                                            <span
                                                className={`flex-1 text-sm font-medium tracking-[0.15em] transition-colors duration-300
                                                ${isActive ? "text-cream" : "text-beige group-hover:text-cream"}`}
                                            >
                                                {link.label}
                                            </span>

                                            <HiOutlineArrowLongRight
                                                className={`h-5 w-5 transition-all duration-300
                                                ${isActive
                                                        ? "translate-x-0 text-sand opacity-100"
                                                        : "-translate-x-2 text-beige/40 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`}
                                            />
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </motion.nav>

                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 rounded-2xl border border-beige/25 p-2">
                                <a
                                    href={`tel:${PHONE_RAW}`}
                                    className="flex flex-1 items-center gap-3 rounded-xl px-2 py-1.5 no-underline transition-colors hover:bg-beige/10"
                                >
                                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-beige/25 text-sand">
                                        <FiPhone className="h-4 w-4" />
                                    </span>
                                    <span className="flex flex-col">
                                        <span className="text-xs uppercase tracking-[0.2em] text-beige/75">
                                            Call us
                                        </span>
                                        <span className="text-sm tracking-wide text-cream">
                                            {PHONE_DISPLAY}
                                        </span>
                                    </span>
                                </a>
                                <button
                                    onClick={handleCopy}
                                    aria-label="Copy phone number"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-beige/60
                                transition-colors hover:bg-beige/10 hover:text-cream"
                                >
                                    {copied ? <FiCheck className="h-4 w-4 text-sand" /> : <FiCopy className="h-4 w-4" />}
                                </button>
                            </div>

                            <Link
                                href="/#contact"
                                onClick={closeModal}
                                className={`${primaryButton} flex justify-center py-3 text-sm mt-3`}
                            >
                                Order Now
                            </Link>
                            <div className="mt-5 flex items-center justify-center gap-2 border-t border-beige/25 pt-4">
                                {CONTACT_SOCIAL.map(({ href, label, icon: Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        className={secondaryButton}
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>



                </motion.div>
            </div>
        </>
    )
}
