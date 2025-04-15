import { NextResponse } from "next/server"
import { sendMailtrapEmail } from "@/lib/mailtrap-service"

export async function POST() {
  try {
    // Recreate the exact same email from the Java example
    const result = await sendMailtrapEmail({
      from: "hello@doporto.com",
      fromName: "Mailtrap Test",
      to: "mirothedj@gmail.com",
      subject: "You are awesome!",
      text: "Congrats for sending test email with Mailtrap!",
      category: "Integration Test",
    })

    if (result.success) {
      return NextResponse.json(result)
    } else {
      return NextResponse.json(result, { status: 500 })
    }
  } catch (error) {
    console.error("Error in test-mailtrap API route:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}
