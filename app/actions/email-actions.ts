"use server"

import { sendEmail } from "@/lib/email-service"

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const message = formData.get("message") as string

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required" }
  }

  return sendEmail({
    to: "contact@doporto.com", // Your contact email
    from: email,
    fromName: name,
    subject: `Contact form submission from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <h3>Message:</h3>
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
    category: "Contact Form",
  })
}

export async function sendWelcomeEmail(email: string, name: string) {
  return sendEmail({
    to: email,
    subject: "Welcome to Doporto Secure Email",
    text: `Hello ${name},\n\nWelcome to Doporto Secure Email! We're excited to have you on board.\n\nBest regards,\nThe Doporto Team`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0891b2;">Welcome to Doporto Secure Email!</h2>
        <p>Hello ${name},</p>
        <p>We're excited to have you on board. Your secure email account is now ready to use.</p>
        <div style="background-color: #0a0a20; color: #22d3ee; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p style="margin: 0;">Your account is protected with our advanced security features.</p>
        </div>
        <p>Best regards,<br>The Doporto Team</p>
      </div>
    `,
    category: "Welcome Email",
  })
}
