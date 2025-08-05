"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import Terminal3D from "./Terminal3D"
import HeroTerminal from "./HeroTerminal"

const typewriterMessages = [
  "Welcome to Abdullah's Terminal...",
  "Loading Portfolio Modules...",
  "Access Granted ✅",
  "Type 'help' to explore",
]

export default function Hero() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [charIndex, setCharIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)

  useEffect(() => {
    const message = typewriterMessages[currentMessage]

    if (charIndex < message.length) {
      const timer = setTimeout(() => {
        setDisplayText((prev) => prev + message[charIndex])
        setCharIndex((prev) => prev + 1)
      }, 100)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(() => {
        if (currentMessage < typewriterMessages.length - 1) {
          setCurrentMessage((prev) => prev + 1)
          setDisplayText("")
          setCharIndex(0)
        }
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [currentMessage, charIndex])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorTimer)
  }, [])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  const handleTerminalClose = () => {
    setIsTerminalOpen(false)
    // Dispatch event to notify other components with a delay
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent("terminalClosed"))
    }, 100)
  }

  const handleTerminalOpen = () => {
    setIsTerminalOpen(true)
    // Dispatch event to notify other components
    window.dispatchEvent(new CustomEvent("terminalOpened"))
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-5"></div>

      <Terminal3D />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <motion.div
              className="text-4xl sm:text-6xl md:text-8xl font-black cursor-pointer break-words"
              style={{
                textShadow: "0 0 20px rgba(0, 255, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.8)",
                fontWeight: 900,
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
              animate={{
                textShadow: [
                  "0 0 20px rgba(0, 255, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.8)",
                  "0 0 30px rgba(0, 255, 0, 1), 0 4px 12px rgba(0, 0, 0, 0.9)",
                  "0 0 20px rgba(0, 255, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.8)",
                ],
              }}
              whileHover={{
                scale: 1.05,
                textShadow: "0 0 40px rgba(0, 255, 255, 1), 0 6px 16px rgba(0, 0, 0, 1)",
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              ABDULLAH
            </motion.div>

            <div
              className="text-lg sm:text-xl md:text-2xl text-cyan-400 font-bold break-words"
              style={{
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)",
                wordBreak: "break-word",
              }}
            >
              Software Engineer | Full-Stack Developer
            </div>

            <motion.div
              className="bg-black/80 border border-green-400/50 rounded-lg p-4 font-mono backdrop-blur-md"
              style={{ boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)" }}
            >
              <div className="text-green-400 mb-2 font-bold">
                abdullah@portfolio:~$ {displayText}
                {showCursor && <span className="animate-pulse">|</span>}
              </div>
            </motion.div>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
            >
              <motion.button
                onClick={() => scrollToSection("about")}
                className="bg-green-400 text-black px-6 py-3 rounded-lg font-bold cursor-pointer"
                style={{ textShadow: "none" }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 25px rgba(0, 255, 0, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                ./explore_portfolio
              </motion.button>

              <motion.button
                className="border-2 border-green-400 text-green-400 px-6 py-3 rounded-lg cursor-pointer font-bold bg-black/50 backdrop-blur-sm"
                whileHover={{
                  backgroundColor: "rgba(0, 255, 0, 0.1)",
                  boxShadow: "0 0 25px rgba(0, 255, 0, 0.4)",
                }}
              >
                cat resume.pdf
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              {/* Floating code snippets */}
              <motion.div className="absolute top-10 left-10 text-green-400 text-sm font-mono bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                const developer = "Abdullah";
              </motion.div>
              <motion.div className="absolute bottom-10 right-10 text-cyan-400 text-sm font-mono bg-black/60 px-2 py-1 rounded backdrop-blur-sm">
                console.log("Hello World!");
              </motion.div>
            </motion.div>

            <motion.div
              className="bg-black/80 border border-green-400/50 rounded-lg p-3 sm:p-4 md:p-6 font-mono backdrop-blur-md cursor-pointer hover:border-green-400 transition-colors overflow-hidden"
              onClick={handleTerminalOpen}
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)",
              }}
              style={{ boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)" }}
            >
              <div className="flex items-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-4 text-sm text-gray-400">interactive-terminal</div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm overflow-hidden">
                <div className="text-green-400 font-bold truncate">$ whoami</div>
                <div className="text-white font-semibold truncate">Muhammad Abdullah Uzair</div>
                <div className="text-green-400 font-bold truncate">$ cat /etc/skills</div>
                <div className="text-cyan-400 font-semibold truncate">React • Node.js • Python • MongoDB</div>
                <div className="text-green-400 font-bold truncate">$ location</div>
                <div className="text-white font-semibold truncate">Lahore, Pakistan 🇵🇰</div>
                <div className="text-green-400 font-bold truncate">$ status</div>
                <div className="text-yellow-400 font-semibold truncate">Available for opportunities</div>
                <div className="text-gray-400 text-xs mt-4 animate-pulse truncate">
                  Click to open interactive terminal...
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Hero Terminal Modal */}
      {isTerminalOpen && <HeroTerminal onClose={handleTerminalClose} />}
    </section>
  )
}
