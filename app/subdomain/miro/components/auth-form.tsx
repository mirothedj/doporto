"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Lock } from "lucide-react"

interface AuthFormProps {
  onAuthenticate: (password: string) => void
  username: string
  isAuthenticated: boolean
}

export default function AuthForm({ onAuthenticate, username, isAuthenticated }: AuthFormProps) {
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate authentication delay
    setTimeout(() => {
      onAuthenticate(password)
    }, 800)
  }

  return (
    <motion.div
      className="w-80 rounded-lg bg-black/40 p-6 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Turquoise neon padlock icon */}
      <motion.div
        className="mb-4 flex justify-center"
        initial={{ scale: 0.8 }}
        animate={{
          scale: [0.8, 1.1, 1],
          filter: ["drop-shadow(0 0 8px #00e5ff80)", "drop-shadow(0 0 15px #00e5ff)", "drop-shadow(0 0 12px #00e5ff)"],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Lock size={64} className="text-[#00e5ff]" strokeWidth={1.5} />
      </motion.div>

      <div className="mb-6 text-center">
        <h2 className="mb-1 text-xl font-bold text-white">Authentication Required</h2>
        <p className="text-sm text-cyan-300">Enter your password to continue</p>
      </div>

      {/* Username display - automatically confirmed */}
      <div className="mb-4">
        <label className="mb-1 block text-xs font-medium text-cyan-400">USERNAME</label>
        <div className="flex items-center rounded border border-cyan-800 bg-black/30 px-3 py-2">
          <span className="text-sm text-cyan-300">{username}</span>
          <motion.span
            className="ml-2 text-xs text-green-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            ✓ Confirmed
          </motion.span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="password" className="mb-1 block text-xs font-medium text-cyan-400">
            PASSWORD
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded border border-cyan-800 bg-black/30 px-3 py-2 text-white placeholder-cyan-700 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            placeholder="Secure email credentials"
            autoComplete="current-password"
            aria-describedby="password-hint"
            required
            disabled={isAuthenticated}
          />
          <p id="password-hint" className="mt-1 text-xs text-cyan-600">
            Enter your secure credentials for miro.doporto.com email access
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isAuthenticated || !password}
          className={`w-full rounded py-2 px-4 font-medium transition-all ${
            isSubmitting || isAuthenticated ? "bg-cyan-700 text-cyan-100" : "bg-cyan-600 text-white hover:bg-cyan-500"
          } ${!password ? "cursor-not-allowed opacity-50" : ""}`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <motion.span
                className="mr-2 inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-white"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
              Authenticating...
            </span>
          ) : isAuthenticated ? (
            <span className="flex items-center justify-center">
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="mr-2">
                ✓
              </motion.span>
              Authenticated
            </span>
          ) : (
            "Unlock Access"
          )}
        </button>
      </form>
    </motion.div>
  )
}
