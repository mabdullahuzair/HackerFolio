"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { X, Terminal } from "lucide-react"

interface HeroTerminalProps {
  onClose: () => void
}

const commands = ["help", "about", "skills", "projects", "contact", "experience", "education", "clear", "exit"]

export default function HeroTerminal({ onClose }: HeroTerminalProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([
    "Welcome to Abdullah's Interactive Portfolio Terminal v2.0",
    "Type 'help' to see available commands",
    "Use 'about', 'skills', 'projects', 'contact' to navigate",
    "$ ",
  ])
  const [suggestions, setSuggestions] = useState<string[]>([])

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (input) {
      const filtered = commands.filter((cmd) => cmd.toLowerCase().includes(input.toLowerCase())).slice(0, 4)
      setSuggestions(filtered)
    } else {
      setSuggestions(["help", "about", "skills", "projects"])
    }
  }, [input])

  useEffect(() => {
    // Multiple attempts to ensure cursor appears
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus()
        inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length)

        // Force cursor to appear by temporarily changing the input
        const originalValue = inputRef.current.value
        inputRef.current.value = originalValue + " "
        inputRef.current.value = originalValue
        inputRef.current.focus()
      }
    }

    // Try multiple times with different delays
    const timers = [50, 100, 200, 300].map((delay) => setTimeout(focusInput, delay))

    // Also try on next animation frame
    const rafId = requestAnimationFrame(focusInput)

    return () => {
      timers.forEach(clearTimeout)
      cancelAnimationFrame(rafId)
    }
  }, [])

  // Force focus when clicking anywhere in the terminal
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus()
      inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length)
    }
  }

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    setHistory((prev) => [...prev, `$ ${cmd}`])

    switch (trimmedCmd) {
      case "help":
        setHistory((prev) => [
          ...prev,
          "Available commands:",
          "  about      - Learn about Abdullah",
          "  skills     - View technical skills",
          "  projects   - Browse portfolio projects",
          "  experience - View work experience",
          "  education  - View educational background",
          "  contact    - Get contact information",
          "  clear      - Clear terminal",
          "  exit       - Close terminal",
          "",
        ])
        break

      case "about":
        setHistory((prev) => [...prev, "Loading about section...", "Navigating to /about", ""])
        setTimeout(() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          onClose()
        }, 1000)
        break

      case "skills":
        setHistory((prev) => [...prev, "Loading skills terminal...", "Navigating to /skills", ""])
        setTimeout(() => {
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
          onClose()
        }, 1000)
        break

      case "projects":
        setHistory((prev) => [...prev, "Loading project showcase...", "Navigating to /projects", ""])
        setTimeout(() => {
          document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
          onClose()
        }, 1000)
        break

      case "experience":
        setHistory((prev) => [...prev, "Loading work experience...", "Navigating to /experience", ""])
        setTimeout(() => {
          document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
          onClose()
        }, 1000)
        break

      case "education":
        setHistory((prev) => [...prev, "Loading education details...", "Navigating to /about", ""])
        setTimeout(() => {
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          onClose()
        }, 1000)
        break

      case "contact":
        setHistory((prev) => [...prev, "Opening contact terminal...", "Navigating to /contact", ""])
        setTimeout(() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
          onClose()
        }, 1000)
        break

      case "clear":
        setHistory(["$ "])
        break

      case "exit":
        setHistory((prev) => [...prev, "Closing terminal...", "Goodbye! 👋"])
        setTimeout(() => {
          onClose()
        }, 800)
        break

      default:
        setHistory((prev) => [...prev, `Command not found: ${cmd}`, "Type 'help' for available commands", ""])
    }

    setInput("")

    // Refocus input after command execution
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
      }
    }, 100)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      executeCommand(input)
    } else if (e.key === "Escape") {
      onClose()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-black/95 border border-green-400/50 rounded-lg w-full max-w-4xl h-[600px] flex flex-col backdrop-blur-md"
        onClick={(e) => {
          e.stopPropagation()
          handleTerminalClick()
        }}
        style={{ boxShadow: "0 0 40px rgba(0, 255, 0, 0.3)" }}
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between bg-gray-900 px-4 py-3 border-b border-gray-700 rounded-t-lg">
          <div className="flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4 flex items-center text-gray-400 text-sm">
              <Terminal className="w-4 h-4 mr-2" />
              abdullah@portfolio-terminal
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Terminal Content */}
        <div className="flex-1 p-6 overflow-hidden flex flex-col" onClick={handleTerminalClick}>
          {/* Command History */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-1 text-sm font-mono">
            {history.map((line, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.02 }}
                className={
                  line.startsWith("$")
                    ? "text-green-400 font-bold"
                    : line.includes("Loading") || line.includes("Navigating") || line.includes("Closing")
                      ? "text-cyan-400"
                      : line.includes("Error") || line.includes("not found")
                        ? "text-red-400"
                        : "text-gray-300"
                }
              >
                {line}
              </motion.div>
            ))}
          </div>

          {/* Command Input */}
          <div className="border-t border-gray-700 pt-4">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-green-400 font-mono font-bold">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                onFocus={() => {
                  // Ensure cursor is visible when focused
                  if (inputRef.current) {
                    inputRef.current.setSelectionRange(inputRef.current.value.length, inputRef.current.value.length)
                  }
                }}
                className="flex-1 bg-transparent text-white outline-none font-mono font-semibold caret-green-400"
                placeholder="Type a command..."
                autoFocus
                autoComplete="off"
                spellCheck="false"
                style={{ caretColor: "#00ff00" }}
              />
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                className="text-green-400 font-mono font-bold"
              >
                |
              </motion.span>
            </div>

            {/* Command Suggestions */}
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion}
                  onClick={(e) => {
                    e.stopPropagation()
                    executeCommand(suggestion)
                  }}
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-green-400 px-3 py-1 rounded text-sm text-gray-300 hover:text-green-400 transition-colors cursor-pointer font-mono"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {suggestion}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
