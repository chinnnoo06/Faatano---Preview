"use client"

import { ContactFormSchema, TContactForm } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { slideInRightInView } from "@/utils/motion"
import { input, label } from "@/utils/styles/form"
import { useFormStatus } from "@/hooks/useFormStatus"
import { FiArrowRight } from "react-icons/fi"
import { primaryButton } from "@/utils/styles/button"

export const ContactForm = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(ContactFormSchema)
  })

  const { loading, startLoading, stopLoading } = useFormStatus()

  const handleSendMessage = (data: TContactForm) => {
    startLoading()
    const phoneNumber = "1234567890"
    const subject = `*${data.subject}*`
    const greeting = `Hola buen día, soy ${data.name}, visité el sitio web de CNC MANUFACTORING Industrial Design.`
    const details = data.details

    const encodedMessage = encodeURIComponent(`${subject}\n\n${greeting}\n\n${details}`);

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")

    reset()
    stopLoading()
  }

  return (
    <motion.form {...slideInRightInView} onSubmit={handleSubmit(handleSendMessage)} noValidate
      className="flex flex-col gap-5 w-full lg:w-1/2 rounded-xl border border-sand/25 p-8"
    >
      <div className="form-group">
        <label htmlFor="name" className={label}>Name  </label>
        <input type="text" id="name" autoComplete="off" {...register("name")} placeholder="Your name" className={input} />
        {errors.name && <p className="text-cream/75 text-[10px] lg:text-xs mt-2">*{errors.name.message}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="subject" className={label}>Subject </label>
        <input id="subject" type="text" placeholder="What can we help you with?" {...register("subject")} className={input} />
        {errors.subject && (<p className="text-cream/75 text-[10px] lg:text-xs mt-2">*{errors.subject.message} </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="details" className={label}>Details </label>
        <textarea id="details" rows={5} placeholder="Tell us about the piece, dimensions, or space you have in mind." className={`${input} resize-none`}  {...register("details")} />
        {errors.details && <p className="text-cream/75 text-[10px] lg:text-xs mt-2">*{errors.details.message} </p>}
      </div>

      <button type="submit" disabled={loading} className={`${primaryButton} flex items-center justify-center py-3! gap-2`}>
        Send message
        <FiArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
      </button>

      <p className="text-[10px] lg:text-xs text-cream/75 text-center">
        By sending this message you'll be redirected to WhatsApp to confirm.
      </p>
    </motion.form>

  )
}
