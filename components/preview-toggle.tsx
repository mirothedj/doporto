"use client"
import { motion } from "framer-motion"

interface PreviewToggleProps {
  onToggle: (view: "main" | "subdomain") => void
  currentView: "main" | "subdomain"
}

export default function PreviewToggle({ onToggle, currentView }: PreviewToggleProps) {
  return (
    <motion.div
      className="fixed top-4 right-4 z-50 flex items-center gap-2 rounded-full bg-black/50 p-2 backdrop-blur-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <span className="px-2 text-xs text-cyan-400">Preview Mode:</span>
      <div className="flex rounded-full bg-black/30 p-1">
        <button
          onClick={() => onToggle("main")}
          className={`relative rounded-full px-3 py-1 text-xs font-medium transition-all ${
            currentView === "main" ? "text-white" : "text-cyan-600 hover:text-cyan-400"
          }`}
        >
          {currentView === "main" && (
            <motion.div
              className="absolute inset-0 rounded-full bg-cyan-700"
              layoutId="activeTab"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <span className="relative z-10">Doporto</span>
        </button>
        <button
          onClick={() => onToggle("subdomain")}
          className={`relative rounded-full px-3 py-1 text-xs font-medium transition-all ${
            currentView === "subdomain" ? "text-white" : "text-cyan-600 hover:text-cyan-400"
          }`}
        >
          {currentView === "subdomain" && (
            <motion.div
              className="absolute inset-0 rounded-full bg-cyan-700"
              layoutId="activeTab"
              transition={{ type: "spring", duration: 0.5 }}
            />
          )}
          <span className="relative z-10">Miro</span>
        </button>
      </div>
    </motion.div>
  )
}
