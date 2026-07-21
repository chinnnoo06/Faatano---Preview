import Link from "next/link"
import { CONTACT_SOCIAL, NAV_LINKS } from "@/utils/constants"
import { primaryButton, secondaryButton } from "@/utils/styles/button"
import { Logo } from "./Logo"

export const Footer = () => {
    const year = new Date().getFullYear()

    return (
        <footer className="relative isolate overflow-hidden bg-ink text-beige">

            <div className="relative mx-auto max-w-7xl px-6 md:px-12">

                <div className="flex flex-col gap-6 py-12 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left lg:py-16">
                    <div className="flex flex-col gap-3">
                        <span className="inline-flex items-center justify-center gap-3 text-xs lg:text-sm uppercase tracking-[0.3em] text-sand sm:justify-start">
                            <span className="h-px w-7 bg-sand" />
                            Made to order
                        </span>
                        <p className="max-w-md text-2xl lg:text-3xl font-light leading-tight tracking-tight text-cream">
                            Furniture that remembers{" "}
                            <em className="italic text-sand">its origin.</em>
                        </p>
                    </div>

                    <Link href="/#contact" className={primaryButton}>
                        Order now
                    </Link>
                </div>

                <div className="flex flex-col gap-10 border-t border-beige/20 py-12 lg:flex-row">

                    <div className="flex w-full flex-col items-center gap-5 text-center lg:items-start lg:text-left">
                        <Logo />

                        <p className="max-w-xs text-sm leading-relaxed text-beige/60">
                            3D-printed to order from 97% recycled plastic. No molds, no overstock — each piece made the moment you order it.
                        </p>

                        <div className="flex items-center gap-3">
                            {CONTACT_SOCIAL.map((social) => (
                                <Link
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className={secondaryButton}
                                >
                                    <social.icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-10 sm:flex-row">

                        <nav className="flex w-full flex-col items-center gap-5 lg:items-start">
                            <span className="inline-flex items-center gap-3 text-xs lg:text-sm uppercase tracking-[0.2em] text-beige/50">
                                <span className="h-px w-6 bg-beige/50" />
                                Explore
                            </span>
                            <ul className="flex flex-col items-center gap-3 lg:items-start">
                                {NAV_LINKS.map((link) => (
                                    <li key={link.href}>
                                        <Link
                                            href={link.href}
                                            className="group relative inline-flex text-sm text-beige/80 transition-colors duration-300 hover:text-cream"
                                        >
                                            {link.label}
                                            <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-sand transition-all duration-300 group-hover:w-full" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className="flex w-full flex-col items-center gap-5 lg:items-start">
                            <span className="inline-flex items-center gap-3 text-xs lg:text-sm uppercase tracking-[0.2em] text-beige/50">
                                <span className="h-px w-6 bg-beige/50" />
                                Studio
                            </span>
                            <ul className="flex flex-col items-center gap-3 text-sm text-beige/80 lg:items-start">
                                <li>
                                    <Link
                                        href="mailto:hello@faatano.com"
                                        className="transition-colors duration-300 hover:text-cream"
                                    >
                                        hello@faatano.com
                                    </Link>
                                </li>
                                <li className="text-beige/60">Ships in 1–2 weeks</li>
                                <li className="text-beige/60">Made to order, worldwide</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center gap-4 border-t border-beige/25 py-6 sm:flex-row sm:justify-between">
                    <p className="text-xs text-beige/75 text-center sm:text-left">
                        © {year} Faatano. All rights reserved.
                    </p>
                    <p className="text-xs text-beige/75">
                        Recycled Plastic · 3D Printed · Made to Order
                    </p>
                </div>
            </div>
        </footer>
    )
}