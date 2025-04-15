"use server"

import { z } from "zod"
import { sendMailtrapEmail } from "./mailtrap-service"

// Email validation schema
const EmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  text: z.string().min(1),
  html: z.string().optional(),
  from: z.string().email().optional().default("hello@doporto.com"),
  fromName: z.string().optional(),
  category: z.string().optional(),
})

type EmailData = z.infer<typeof EmailSchema>

export async function sendEmail(data: EmailData) {
  try {
    // Validate the email data
    const validatedData = EmailSchema.parse(data)

    // Use the Mailtrap service to send emails
    return sendMailtrapEmail(validatedData)
  } catch (error) {
    console.error("Failed to send email:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
