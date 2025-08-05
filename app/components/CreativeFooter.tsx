"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const easterEggCommands = [
  "$ last updated: 2025-08-06",
  "$ uptime: 24/7 availability",
  "$ run coffee.sh ☕",
  "$ git status: ready for opportunities",
  "$ ping abdullah: response time < 24hrs",
  "$ whoami: passionate developer",
]

export default function CreativeFooter() {
  const [currentCommand, setCurrentCommand] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [charIndex, setCharIndex] = useState(0)
  const [debugMode, setDebugMode] = useState(false)

  useEffect(() => {
    const command = easterEggCommands[currentCommand]

    if (charIndex < command.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + command[charIndex])
        setCharIndex((prev) => prev + 1)
      }, 50)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        setCurrentCommand((prev) => (prev + 1) % easterEggCommands.length)
        setDisplayText("")
        setCharIndex(0)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [currentCommand, charIndex])

  const handleReboot = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const downloadResume = () => {
    // Create a mock resume download
    const link = document.createElement("a")
    link.href = "#"
    link.download = "Abdullah_Uzair_Resume.pdf"
    link.click()
  }

  return (
    <footer className="relative bg-black/90 border-t border-green-400/30 py-12 overflow-hidden">
      {/* Circuit Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="circuit-pattern">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M10,10 L90,10 L90,90 L10,90 Z" fill="none" stroke="#00ff00" strokeWidth="1" />
              <circle cx="10" cy="10" r="2" fill="#00ff00" />
              <circle cx="90" cy="10" r="2" fill="#00ff00" />
              <circle cx="90" cy="90" r="2" fill="#00ff00" />
              <circle cx="10" cy="90" r="2" fill="#00ff00" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Terminal Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-black/80 border border-green-400/50 rounded-lg p-6 mb-8"
        >
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4 text-sm text-gray-400">system-terminal</div>
          </div>

          <div className="space-y-2 text-sm font-mono">
            <div className="text-green-400">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
              >
                |
              </motion.span>
            </div>

            {debugMode && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-cyan-400 text-xs">
                DEBUG MODE: All systems operational ✅<br />
                Memory usage: 42% | CPU: Optimized | Network: Connected
                <br />
                Last commit: "Enhanced portfolio with creative interactions"
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.button
            onClick={downloadResume}
            className="bg-green-400/20 border border-green-400 text-green-400 p-4 rounded-lg cursor-pointer group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)",
              backgroundColor: "rgba(0, 255, 0, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl mb-2">📄</div>
            <div className="font-bold">Download Resume</div>
            <div className="text-sm opacity-70 group-hover:opacity-100">$ wget abdullah_resume.pdf</div>
          </motion.button>

          <motion.button
            onClick={handleReboot}
            className="bg-cyan-400/20 border border-cyan-400 text-cyan-400 p-4 rounded-lg cursor-pointer group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)",
              backgroundColor: "rgba(0, 255, 255, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl mb-2">🔄</div>
            <div className="font-bold">Reboot Portfolio</div>
            <div className="text-sm opacity-70 group-hover:opacity-100">$ sudo reboot --to-top</div>
          </motion.button>

          <motion.button
            onClick={() => setDebugMode(!debugMode)}
            className="bg-purple-400/20 border border-purple-400 text-purple-400 p-4 rounded-lg cursor-pointer group"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px rgba(128, 0, 255, 0.3)",
              backgroundColor: "rgba(128, 0, 255, 0.1)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="text-2xl mb-2">🐛</div>
            <div className="font-bold">{debugMode ? "Exit Debug" : "Enter Debug Mode"}</div>
            <div className="text-sm opacity-70 group-hover:opacity-100">$ {debugMode ? "exit" : "debug --verbose"}</div>
          </motion.button>
        </div>

        {/* Contact Links */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { icon: "📧", label: "Email", command: "mailto:abdullahuzair860@gmail.com" },
            { icon: "📱", label: "Phone", command: "tel:+923034673255" },
            { icon: "💼", label: "LinkedIn", command: "https://www.linkedin.com/in/abdullah-uzair-2a18b9278/" },
            { icon: "🐙", label: "GitHub", command: "https://github.com/mabdullahuzair" },
          ].map((contact, index) => (
            <motion.a
              key={contact.label}
              href={contact.command}
              target={contact.command.startsWith("http") ? "_blank" : "_self"}
              className="bg-black/50 border border-gray-600 rounded-lg p-4 text-center cursor-pointer hover:border-green-400 transition-colors group"
              whileHover={{ scale: 1.05, y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-2xl mb-2">{contact.icon}</div>
              <div className="text-green-400 font-bold">{contact.label}</div>
              <div className="text-xs text-gray-400 group-hover:text-green-400 transition-colors">
                $ connect --{contact.label.toLowerCase()}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Animated Wires */}
        <div className="relative h-16 mb-8 overflow-hidden">
          <svg className="absolute inset-0 w-full h-full">
            <motion.path
              d="M0,8 Q200,8 400,8 T800,8 L1200,8"
              stroke="#00ff00"
              strokeWidth="2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
            <motion.circle
              cx="0"
              cy="8"
              r="3"
              fill="#00ff00"
              animate={{ cx: [0, 1200] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            />
          </svg>
        </div>

        {/* Copyright */}
        <motion.div
          className="text-center text-gray-400 text-sm border-t border-gray-700 pt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="mb-2">© 2025 Muhammad Abdullah Uzair. All rights reserved.</div>
          <div className="font-mono text-xs">Built with ❤️ using React, Next.js, Framer Motion & Tailwind CSS</div>
          <motion.div
            className="mt-2 text-green-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            System Status: Online ● Ready for new opportunities
          </motion.div>
        </motion.div>
      </div>
    </footer>
  )
}
