"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import EmailDashboard from "@/components/email-dashboard"
import Logo from "@/components/logo"
import MiroSubdomain from "@/app/subdomain/miro/page"
import PreviewToggle from "@/components/preview-toggle"

export default function Home() {
  const [animationStage, setAnimationStage] = useState(0)
  const [currentView, setCurrentView] = useState<"main" | "subdomain">("main")

  useEffect(() => {
    // Reset animation when view changes
    setAnimationStage(0)

    // Start animation sequence after 3 seconds
    const timer1 = setTimeout(() => {
      setAnimationStage(1) // Letters float up
    }, 3000)

    const timer2 = setTimeout(() => {
      setAnimationStage(2) // Doors open
    }, 4500)

    const timer3 = setTimeout(() => {
      setAnimationStage(3) // Dashboard reveal
    }, 6000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [currentView])

  const handleToggleView = (view: "main" | "subdomain") => {
    setCurrentView(view)
  }

  return (
    <>
      <PreviewToggle onToggle={handleToggleView} currentView={currentView} />

      <AnimatePresence mode="wait">
        {currentView === "main" ? (
          <motion.div
            key="main-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
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

                {/* Sliding doors */}
                <AnimatePresence>
                  {animationStage < 2 && (
                    <>
                      <motion.div
                        className="absolute inset-y-0 left-0 right-1/2 bg-gradient-to-r from-[#0a0a20] to-[#1a1a3a] shadow-[inset_0_0_20px_rgba(138,43,226,0.3)]"
                        style={{
                          backgroundImage: "url('/brushed-metal.svg')",
                          backgroundBlendMode: "overlay",
                        }}
                        exit={{ x: "-100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
                      <motion.div
                        className="absolute inset-y-0 left-1/2 right-0 bg-gradient-to-l from-[#0a0a20] to-[#1a1a3a] shadow-[inset_0_0_20px_rgba(138,43,226,0.3)]"
                        style={{
                          backgroundImage: "url('/brushed-metal.svg')",
                          backgroundBlendMode: "overlay",
                        }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                      />
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
          </motion.div>
        ) : (
          <motion.div
            key="subdomain-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="h-screen w-full"
          >
            <MiroSubdomain />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
