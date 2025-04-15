"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Inbox,
  Send,
  Star,
  File,
  Trash,
  Settings,
  Search,
  RefreshCw,
  ChevronDown,
  User,
  Bell,
  Menu,
  X,
} from "lucide-react"

// Mock email data
const mockEmails = [
  {
    id: 1,
    sender: "Team Miro",
    subject: "Welcome to Miro Secure Email",
    preview: "Thank you for joining our secure email platform. Here's how to get started...",
    time: "10:45 AM",
    read: false,
    starred: true,
  },
  {
    id: 2,
    sender: "Security Alert",
    subject: "New login detected",
    preview: "A new login to your account was detected from Chrome on Windows...",
    time: "Yesterday",
    read: true,
    starred: false,
  },
  {
    id: 3,
    sender: "Newsletter",
    subject: "Weekly Tech Digest",
    preview: "This week in tech: New quantum computing breakthrough, AI developments...",
    time: "Mar 15",
    read: true,
    starred: false,
  },
  {
    id: 4,
    sender: "Alex Johnson",
    subject: "Project Update",
    preview: "I've completed the initial phase of the project. Here are the results...",
    time: "Mar 14",
    read: true,
    starred: true,
  },
  {
    id: 5,
    sender: "Cloud Storage",
    subject: "Your storage is almost full",
    preview: "You've used 90% of your storage. Upgrade now to get more space...",
    time: "Mar 12",
    read: true,
    starred: false,
  },
]

export default function EmailDashboard() {
  const [selectedEmail, setSelectedEmail] = useState<number | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <motion.div
      className="h-[90vh] w-[95vw] max-w-7xl rounded-xl bg-[#0a0a20] shadow-[0_0_30px_rgba(0,255,255,0.2)] overflow-hidden"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Top navigation bar */}
      <div className="flex h-14 items-center justify-between border-b border-cyan-900/30 bg-[#0c0c25] px-4">
        <div className="flex items-center">
          <button
            className="mr-4 rounded-full p-2 text-cyan-400 hover:bg-cyan-900/20"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
          <div className="text-xl font-bold text-cyan-400">MIRO</div>
        </div>

        <div className="relative mx-4 flex-1 max-w-xl">
          <div className="flex items-center rounded-full border border-cyan-900/50 bg-[#080818] px-3 py-1.5">
            <Search size={16} className="mr-2 text-cyan-600" />
            <input
              type="text"
              placeholder="Search emails..."
              className="w-full bg-transparent text-sm text-cyan-100 placeholder-cyan-700 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="rounded-full p-2 text-cyan-400 hover:bg-cyan-900/20">
            <RefreshCw size={18} />
          </button>
          <button className="rounded-full p-2 text-cyan-400 hover:bg-cyan-900/20">
            <Bell size={18} />
          </button>
          <div className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-cyan-700 text-white">
            <User size={16} />
          </div>
        </div>
      </div>

      <div className="flex h-[calc(90vh-3.5rem)]">
        {/* Sidebar */}
        <motion.div
          className="flex w-56 flex-col border-r border-cyan-900/30 bg-[#0c0c25]"
          initial={{ x: 0 }}
          animate={{ x: sidebarOpen ? 0 : -224 }}
          transition={{ duration: 0.3 }}
        >
          {/* Action button */}
          <div className="p-4">
            <button className="w-full rounded-lg bg-gradient-to-r from-cyan-600 to-blue-700 py-2.5 px-4 text-sm font-medium text-white shadow-lg shadow-cyan-900/30 hover:from-cyan-500 hover:to-blue-600">
              Compose
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-2">
            {[
              { icon: Inbox, label: "Inbox", count: 3 },
              { icon: Star, label: "Starred", count: 2 },
              { icon: Send, label: "Sent", count: null },
              { icon: File, label: "Drafts", count: null },
              { icon: Trash, label: "Trash", count: null },
            ].map((item, index) => (
              <button
                key={index}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm ${
                  index === 0 ? "bg-cyan-900/20 text-cyan-400" : "text-cyan-300 hover:bg-cyan-900/10"
                }`}
              >
                <div className="flex items-center">
                  <item.icon size={16} className="mr-3" />
                  {item.label}
                </div>
                {item.count && (
                  <span className="rounded-full bg-cyan-700 px-2 py-0.5 text-xs text-white">{item.count}</span>
                )}
              </button>
            ))}
          </nav>

          {/* Settings */}
          <div className="border-t border-cyan-900/30 p-4">
            <button className="flex w-full items-center rounded-lg px-3 py-2 text-sm text-cyan-300 hover:bg-cyan-900/10">
              <Settings size={16} className="mr-3" />
              Settings
            </button>
          </div>
        </motion.div>

        {/* Email list */}
        <motion.div
          className="w-[calc(100%-14rem)] border-r border-cyan-900/30 bg-[#080818]"
          initial={{ width: "calc(100% - 14rem)" }}
          animate={{ width: sidebarOpen ? "calc(100% - 14rem)" : "calc(100% - 0rem)" }}
          transition={{ duration: 0.3 }}
        >
          {/* Email list header */}
          <div className="flex h-12 items-center justify-between border-b border-cyan-900/30 px-4">
            <div className="flex items-center">
              <input type="checkbox" className="mr-3 h-4 w-4 rounded border-cyan-700 bg-cyan-900/20" />
              <button className="flex items-center text-sm text-cyan-400">
                All <ChevronDown size={14} className="ml-1" />
              </button>
            </div>
            <div className="text-sm text-cyan-500">1-5 of 5</div>
          </div>

          {/* Email list */}
          <div className="h-[calc(90vh-7.5rem)] overflow-auto">
            {mockEmails.map((email) => (
              <motion.div
                key={email.id}
                className={`flex cursor-pointer border-b border-cyan-900/20 px-4 py-3 hover:bg-cyan-900/10 ${
                  email.read ? "bg-transparent" : "bg-cyan-900/5"
                } ${selectedEmail === email.id ? "bg-cyan-900/20" : ""}`}
                onClick={() => setSelectedEmail(email.id)}
                whileHover={{ backgroundColor: "rgba(8, 145, 178, 0.1)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: email.id * 0.1 }}
              >
                <div className="mr-3 flex w-6 flex-col items-center">
                  <input type="checkbox" className="h-4 w-4 rounded border-cyan-700 bg-cyan-900/20" />
                  <button className="mt-2 text-cyan-400">
                    <Star size={16} fill={email.starred ? "currentColor" : "none"} />
                  </button>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className={`font-medium ${email.read ? "text-cyan-300" : "text-cyan-400"}`}>
                      {email.sender}
                    </div>
                    <div className="text-xs text-cyan-500">{email.time}</div>
                  </div>
                  <div className={`truncate ${email.read ? "text-cyan-400" : "font-medium text-cyan-300"}`}>
                    {email.subject}
                  </div>
                  <div className="truncate text-sm text-cyan-600">{email.preview}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Neon edge lighting effect */}
      <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_2px_#0ff,0_0_15px_rgba(0,255,255,0.3)]" />
    </motion.div>
  )
}
