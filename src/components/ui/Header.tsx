"use client"

import { useHeader } from "@/hooks/ui/useHeader";
import Link from "next/link"
import { NAV_LINKS } from "@/utils/constants";
import { HamburgerButton } from "./HamburgerButton";
import { MobileNav } from "./MobileNav";
import { useState } from "react";
import { FiCheck, FiCopy, FiPhone } from "react-icons/fi";
import { primaryButton, secondaryButton } from "@/utils/styles/button";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

export const Header = () => {
    const pathname = usePathname()
    const { mobileNav, refs } = useHeader()
    const [phoneOpen, setPhoneOpen] = useState(false)
    const [copied, setCopied] = useState(false)
    const handleCopy = async () => {
        await navigator.clipboard.writeText("+17372795032")
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <>
            <header className="fixed top-5 inset-x-0 z-50 max-w-6xl mx-auto px-4">
                <div
                    className="relative flex p-4 items-center justify-between rounded-2xl
                   border border-beige/25 bg-ink/50 pl-6 pr-2.5 backdrop-saturate-150
                   shadow-[inset_0_0.5px_0_rgba(255,255,255,0.14),inset_0_-8px_24px_rgba(0,0,0,0.25),0_20px_50px_-12px_rgba(0,0,0,0.5)]
                   transition-all duration-300"
                >
                    <Logo/>

                    <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
                        {NAV_LINKS.map((link) => {
                            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={isActive ? "page" : undefined}
                                    className={`relative rounded-xl px-4 py-2 text-sm font-medium tracking-[0.15em] transition-colors duration-300
                                hover:bg-beige/5 hover:text-cream ${isActive ? "text-cream" : "text-beige"}`}
                                >
                                    {link.label}
                                    {isActive && (
                                        <span className="absolute inset-x-4 bottom-1 h-px bg-sand" />
                                    )}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="flex items-center gap-1.5">
                        <div className="relative hidden lg:block">
                            <button
                                onClick={() => setPhoneOpen((v) => !v)}
                                aria-label="Show phone number"
                                aria-expanded={phoneOpen}
                                className={`${secondaryButton} ${phoneOpen && 'border-beige/40 bg-beige/10 text-cream'}`}
                            >
                                <FiPhone className="h-4 w-4" />
                            </button>

                            {phoneOpen && (
                                <div className="absolute right-0 top-[calc(100%+10px)] flex items-center gap-2
                                rounded-xl border border-beige/20 bg-ink/80 px-3 py-2
                                backdrop-blur-2xl backdrop-saturate-150 cursor-pointer
                                shadow-md"
                                >
                                    <a href="tel:+17372795032" className="whitespace-nowrap text-sm font-normal tracking-wide text-cream">+1 (737) 279-5032</a>
                                    <button
                                        onClick={handleCopy}
                                        aria-label="Copy phone number"
                                        className="flex h-7 w-7 items-center justify-center rounded-lg cursor-pointer
                                    text-beige/60 transition-colors
                                    hover:bg-beige/10 hover:text-cream"
                                    >
                                        {copied ? <FiCheck className="h-3.5 w-3.5" /> : <FiCopy className="h-3.5 w-3.5" />}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="hidden h-7 w-px bg-beige/25 lg:block" />
                        <Link
                            href="/contact"
                            className={`${primaryButton} hidden lg:flex`}>
                            Order Now
                        </Link>

                        <div className="lg:hidden">
                            <HamburgerButton
                                ref={refs.hamburgerRef}
                                isOpen={mobileNav.isOpen}
                                openModal={mobileNav.openModal}
                                closeModal={mobileNav.closeModal}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {mobileNav.isRendered && (
                <MobileNav
                    isOpen={mobileNav.isOpen}
                    mobileModalRef={refs.mobileModalRef}
                    closeModal={mobileNav.closeModal}
                />
            )}

        </>
    )
}