"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { sendWelcomeEmail } from "@/app/actions/email-actions"

export default function WelcomeEmailTest() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<{ success: boolean; error?: string } | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    try {
      const result = await sendWelcomeEmail(email, name)
      setResult(result)
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
    <motion.div
      className="w-full max-w-md rounded-lg bg-[#0a0a20] p-6 shadow-[0_0_20px_rgba(0,255,255,0.2)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="mb-4 text-xl font-bold text-cyan-400">Test Welcome Email</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="mb-1 block text-sm font-medium text-cyan-300">
            Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            required
            className="w-full rounded border border-cyan-900/50 bg-[#080818] px-3 py-2 text-cyan-100 placeholder-cyan-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            placeholder="Recipient name"
          />
        </div>

        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium text-cyan-300">
            Email
          </label>
          <input
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="w-full rounded border border-cyan-900/50 bg-[#080818] px-3 py-2 text-cyan-100 placeholder-cyan-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            placeholder="recipient@example.com"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded bg-gradient-to-r from-cyan-600 to-blue-700 py-2 px-4 font-medium text-white shadow-lg shadow-cyan-900/30 hover:from-cyan-500 hover:to-blue-600 disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Send Welcome Email"}
        </button>
      </form>

      {result && (
        <motion.div
          className={`mt-4 rounded p-3 text-sm ${
            result.success ? "bg-green-900/20 text-green-400" : "bg-red-900/20 text-red-400"
          }`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          {result.success ? "Welcome email sent successfully!" : `Error: ${result.error}`}
        </motion.div>
      )}
    </motion.div>
  )
}
