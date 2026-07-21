import { z } from "zod"

export const ContactFormSchema = z.object({
    name: z.string().min(1, { message: 'Required field' }),
    subject: z.string().min(1, { message: 'Required field' }),
    details: z.string().min(1, { message: 'Required field' })
})

export type TContactForm = z.infer<typeof ContactFormSchema>