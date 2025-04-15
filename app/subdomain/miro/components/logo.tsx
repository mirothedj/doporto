"use client"

import { motion } from "framer-motion"

interface LogoProps {
  isInitial: boolean
}

export default function Logo({ isInitial }: LogoProps) {
  const letters = "MIRO".split("")

  return (
    <div className={`relative ${isInitial ? "scale-150" : "scale-100"}`}>
      {/* Reflection effect for initial state */}
      {isInitial && (
        <div className="absolute top-full left-0 right-0 transform scale-y-[-0.4] opacity-30 blur-[1px]">
          <div className="flex justify-center space-x-1 md:space-x-2">
            {letters.map((letter, index) => (
              <div key={`reflection-${index}`} className="text-4xl md:text-6xl font-bold text-transparent">
                {letter}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main logo */}
      <div className="flex justify-center space-x-1 md:space-x-2">
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            className={`
              text-4xl md:text-6xl font-bold
              bg-clip-text text-transparent
              relative
              ${isInitial ? "py-2" : "py-1"}
            `}
            style={{
              backgroundImage: "linear-gradient(135deg, #e0e0e0 0%, #a0a0a0 50%, #606060 100%)",
              WebkitBackgroundClip: "text",
              textShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
            }}
            initial={isInitial ? { y: 0 } : { y: "40vh" }}
            animate={
              isInitial
                ? {
                    y: [0, -5, 0],
                    transition: { repeat: Number.POSITIVE_INFINITY, duration: 3, repeatType: "reverse" },
                  }
                : { y: 0 }
            }
            transition={{
              duration: 0.8,
              delay: index * 0.1,
              ease: "easeOut",
            }}
          >
            {/* Stencil effect with pseudo-elements */}
            <span className="relative">
              <span
                className="absolute inset-0 overflow-hidden"
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.8)",
                  WebkitTextFillColor: "transparent",
                  filter: "drop-shadow(0 0 5px rgba(0, 255, 255, 0.7))",
                }}
              >
                {letter}
              </span>
              {letter}
            </span>
          </motion.div>
        ))}
      </div>

      {isInitial && (
        <motion.div
          className="absolute -bottom-8 left-0 right-0 text-center text-sm text-cyan-400 opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          SECURE EMAIL PLATFORM - MIRO
        </motion.div>
      )}
    </div>
  )
}
