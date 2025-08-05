"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const bootMessages = [
  "INITIALIZING SYSTEM...",
  "LOADING PORTFOLIO MODULES...",
  "SCANNING FOR THREATS... [NONE DETECTED]",
  "ESTABLISHING SECURE CONNECTION...",
  "LOADING USER PROFILE: ABDULLAH_UZAIR",
  "AUTHENTICATION SUCCESSFUL ✅",
  "WELCOME TO THE MATRIX...",
]

export default function BootSequence() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    if (currentMessage < bootMessages.length) {
      const message = bootMessages[currentMessage]

      if (charIndex < message.length) {
        const timer = setTimeout(() => {
          setDisplayText((prev) => prev + message[charIndex])
          setCharIndex((prev) => prev + 1)
        }, 50)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setCurrentMessage((prev) => prev + 1)
          setDisplayText("")
          setCharIndex(0)
        }, 500)
        return () => clearTimeout(timer)
      }
    }
  }, [currentMessage, charIndex])

  return (
    <motion.div
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center">
        <motion.div
          className="text-6xl mb-8"
          animate={{
            textShadow: ["0 0 10px #00ff00", "0 0 20px #00ff00", "0 0 10px #00ff00"],
          }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        >
          ⚡
        </motion.div>

        <div className="text-green-400 text-xl font-mono mb-4">
          {displayText}
          <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}>
            |
          </motion.span>
        </div>

        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-400 to-cyan-400"
            initial={{ width: 0 }}
            animate={{ width: `${((currentMessage + 1) / bootMessages.length) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  )
}
