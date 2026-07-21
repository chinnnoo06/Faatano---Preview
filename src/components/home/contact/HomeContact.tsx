"use client"

import { ContactForm } from "@/components/contact/ContactForm"
import { ContactInfo } from "@/components/contact/ContactInfo"
import { RevealText } from "@/components/ui/RevealText"
import { ContactFormSchema, TContactForm } from "@/schemas"
import { CONTACT_LINKS, CONTACT_SOCIAL } from "@/utils/constants"
import {
    slideInLeftInView,
    slideInRightInView,
    slideTittleInBottomInView,
    staggerContainer,
    staggerItem,
} from "@/utils/motion"
import { secondaryButton } from "@/utils/styles/button"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { FiArrowRight } from "react-icons/fi"

// Campos de formulario sobre fondo oscuro (bg-ink): tonos cálidos de la paleta.
const fieldLabel =
    "block mb-2 text-xs uppercase tracking-[0.2em] text-sand"
const fieldBase =
    "w-full rounded-xl border border-beige/15 bg-cream/5 px-4 py-3 text-sm text-cream placeholder-beige/40 transition-colors duration-300 focus:border-sand/60 focus:bg-cream/10 focus:outline-none hover:border-beige/30"

export const HomeContact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<TContactForm>({
        resolver: zodResolver(ContactFormSchema),
    })

    // Reutiliza el flujo del sitio: abre WhatsApp con el mensaje ya redactado.
    const onSubmit = (data: TContactForm) => {
        const phoneNumber = "521234567890"
        const message = [
            `*${data.subject}*`,
            `Hola, soy ${data.name}. Escribo desde el sitio de Circular Design Studio.`,
            data.details,
        ].join("\n\n")

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")
        reset()
    }

    return (
        <div className="mx-auto max-w-7xl px-4">
            <motion.div {...slideTittleInBottomInView} className="mx-auto max-w-3xl text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-sand lg:text-sm">
                    Get in Touch
                </p>
                <h2 className="mt-6 text-4xl font-light leading-tight tracking-tight text-cream lg:text-6xl">
                    <RevealText
                        segments={[
                            { text: "Let's shape something" },
                            { text: "made for you.", className: "italic text-sand" },
                        ]}
                    />
                </h2>
                <p className="mt-6 max-w-xl mx-auto text-lg lg:text-xl text-sand">
                    Tell us about your space or the piece you have in mind. We usually
                    reply within one business day.
                </p>
            </motion.div>

            <div className="mt-12 flex flex-col lg:flex-row justify-center items-center gap-12">

                <ContactInfo />

                <ContactForm />
            </div>
        </div>
    )
}
