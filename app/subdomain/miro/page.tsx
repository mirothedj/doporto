"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import EmailDashboard from "@/app/subdomain/miro/components/email-dashboard"
import Logo from "@/app/subdomain/miro/components/logo"
import AuthForm from "@/app/subdomain/miro/components/auth-form"

export default function MiroSubdomain() {
  const [animationStage, setAnimationStage] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("user@miro.com")

  useEffect(() => {
    // Reset animation state when component mounts
    setAnimationStage(0)
    setIsAuthenticated(false)

    // Start animation sequence after 3 seconds, but only the logo part
    const timer1 = setTimeout(() => {
      setAnimationStage(1) // Letters float up
    }, 3000)

    return () => {
      clearTimeout(timer1)
    }
  }, [])

  // Function to handle successful authentication
  const handleAuthentication = (password: string) => {
    // In a real app, you would validate the password here
    // For demo purposes, any password will work
    setIsAuthenticated(true)

    // Continue animation sequence after authentication
    setTimeout(() => {
      setAnimationStage(2) // Doors open
    }, 1000)

    setTimeout(() => {
      setAnimationStage(3) // Dashboard reveal
    }, 2500)
  }

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black">
      {/* Glossy floor with reflection */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent opacity-70" />

      {/* Background with space-like gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-[#0a0a20] via-[#121236] to-[#1a1a40]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Purple highlights */}
        <div className="absolute left-1/4 top-1/3 h-64 w-64 rounded-full bg-purple-700/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 h-64 w-64 rounded-full bg-purple-700/20 blur-3xl" />
      </motion.div>

      {/* Logo and animation container */}
      <div className="relative flex h-full w-full items-center justify-center">
        {/* Initial logo position */}
        {animationStage < 1 && <Logo isInitial={true} />}

        {/* Floating logo animation */}
        {animationStage >= 1 && (
          <motion.div
            className="absolute top-8 w-full text-center"
            initial={{ y: "40vh" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <Logo isInitial={false} />
          </motion.div>
        )}

        {/* Authentication form - only show when logo has moved up and doors haven't opened yet */}
        {animationStage >= 1 && animationStage < 2 && (
          <motion.div
            className="absolute z-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <AuthForm onAuthenticate={handleAuthentication} username={username
            } isAuthenticated={isAuthenticated} />
          </motion.div>
        )}

        {/* Sliding doors with light effects */}
        <AnimatePresence>
          {animationStage < 2 && (
            <>
              {/* Left door */}
              <motion.div
                className="absolute inset-y-0 left-0 right-1/2 overflow-hidden"
                exit={{ x: "-100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                {/* Door surface with brushed metal texture */}
                <div
                  className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a] to-[#2a2a2a]"
                  style={{
                    backgroundImage: "url('/subdomain/miro/brushed-metal.svg')",
                    backgroundBlendMode: "overlay",
                  }}
                />

                {/* Light blue edge lighting - top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#00e5ff] opacity-70 shadow-[0_0_15px_5px_rgba(0,229,255,0.5)]" />

                {/* Light blue edge lighting - left */}
                <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#00e5ff] opacity-70 shadow-[0_0_15px_5px_rgba(0,229,255,0.5)]" />

                {/* Light blue edge lighting - bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00e5ff] opacity-70 shadow-[0_0_15px_5px_rgba(0,229,255,0.5)]" />
              </motion.div>

              {/* Right door */}
              <motion.div
                className="absolute inset-y-0 left-1/2 right-0 overflow-hidden"
                exit={{ x: "100%" }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              >
                {/* Door surface with brushed metal texture */}
                <div
                  className="absolute inset-0 bg-gradient-to-l from-[#1a1a1a] to-[#2a2a2a]"
                  style={{
                    backgroundImage: "url('/subdomain/miro/brushed-metal.svg')",
                    backgroundBlendMode: "overlay",
                  }}
                />

                {/* Light blue edge lighting - top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#00e5ff] opacity-70 shadow-[0_0_15px_5px_rgba(0,229,255,0.5)]" />

                {/* Light blue edge lighting - right */}
                <div className="absolute top-0 bottom-0 right-0 w-1 bg-[#00e5ff] opacity-70 shadow-[0_0_15px_5px_rgba(0,229,255,0.5)]" />

                {/* Light blue edge lighting - bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#00e5ff] opacity-70 shadow-[0_0_15px_5px_rgba(0,229,255,0.5)]" />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Email dashboard */}
        {animationStage >= 2 && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <EmailDashboard />
          </motion.div>
        )}
      </div>
    </main>
  )
}
