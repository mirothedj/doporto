"use client"

import { useState } from "react"
import { motion } from "framer-motion"

export default function MailtrapTestPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<any>(null)

  async function handleTestMailtrap() {
    setIsSubmitting(true)
    setResult(null)

    try {
      const response = await fetch("/api/test-mailtrap", {
        method: "POST",
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        success: false,
        error: error instanceof Error ? error.message : "An unexpected error occurred",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a20] p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-3xl font-bold text-cyan-400">Mailtrap Java SDK Test</h1>

        <motion.div
          className="w-full max-w-md mx-auto rounded-lg bg-[#0a0a20] p-6 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-4 text-xl font-bold text-cyan-400">Test Mailtrap Integration</h2>
          <p className="mb-4 text-cyan-300">
            This will send a test email using the Mailtrap API with the same parameters as the Java SDK example.
          </p>

          <button
            onClick={handleTestMailtrap}
            disabled={isSubmitting}
            className="w-full rounded bg-gradient-to-r from-cyan-600 to-blue-700 py-2 px-4 font-medium text-white shadow-lg shadow-cyan-900/30 hover:from-cyan-500 hover:to-blue-600 disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send Test Email"}
          </button>

          {result && (
            <motion.div
              className={`mt-4 rounded p-3 text-sm ${
                result.success ? "bg-green-900/20 text-green-400" : "bg-red-900/20 text-red-400"
              }`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              transition={{ duration: 0.3 }}
            >
              <pre className="whitespace-pre-wrap overflow-auto">
                {result.success ? `Email sent successfully! Message ID: ${result.messageId}` : `Error: ${result.error}`}
              </pre>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
