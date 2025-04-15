"use server"

import { z } from "zod"

// Email validation schema
const EmailSchema = z.object({
  to: z.string().email(),
  subject: z.string().min(1),
  text: z.string().min(1),
  html: z.string().optional(),
  from: z.string().email().optional().default("hello@doporto.com"),
  fromName: z.string().optional().default("Doporto"),
  category: z.string().optional(),
})

type EmailData = z.infer<typeof EmailSchema>

// Mailtrap API endpoint
const MAILTRAP_API_URL = "https://send.api.mailtrap.io/api/send"
const MAILTRAP_TOKEN = "13a26d311de950d06ad5d6c60e5d1dc8"

export async function sendMailtrapEmail(data: EmailData) {
  try {
    // Validate the email data
    const validatedData = EmailSchema.parse(data)

    // Format the request body for Mailtrap API
    const requestBody = {
      from: {
        email: validatedData.from,
        name: validatedData.fromName,
      },
      to: [
        {
          email: validatedData.to,
        },
      ],
      subject: validatedData.subject,
      text: validatedData.text,
      html: validatedData.html || validatedData.text,
      category: validatedData.category || "Doporto Email",
    }

    // Send the email via Mailtrap API
    const response = await fetch(MAILTRAP_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${MAILTRAP_TOKEN}`,
      },
      body: JSON.stringify(requestBody),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.message || "Failed to send email via Mailtrap")
    }

    console.log("Email sent via Mailtrap:", result)
    return { success: true, messageId: result.message_id }
  } catch (error) {
    console.error("Failed to send email via Mailtrap:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
