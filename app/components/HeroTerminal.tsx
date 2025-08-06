"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { JSX } from "react/jsx-runtime" // Import JSX from react/jsx-runtime

interface Command {
  command: string
  output: string | JSX.Element
  type?: "success" | "error" | "info"
}

interface HeroTerminalProps {
  onClose: () => void
}

export default function HeroTerminal({ onClose }: HeroTerminalProps) {
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<Command[]>([])
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isClosingTerminal, setIsClosingTerminal] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const focusAttempts = useRef(0)

  // Memoized commands for better performance
  const commands = useMemo(
    () => ({
      help: {
        output: (
          <div className="space-y-2">
            <div className="text-cyan-400 font-bold">Available Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-green-400">about</span> - Learn about me
              </div>
              <div>
                <span className="text-green-400">skills</span> - View my skills
              </div>
              <div>
                <span className="text-green-400">projects</span> - See my work
              </div>
              <div>
                <span className="text-green-400">contact</span> - Get in touch
              </div>
              <div>
                <span className="text-green-400">experience</span> - Work history
              </div>
              <div>
                <span className="text-green-400">education</span> - Academic background
              </div>
              <div>
                <span className="text-green-400">whoami</span> - Basic info
              </div>
              <div>
                <span className="text-green-400">clear</span> - Clear terminal
              </div>
              <div>
                <span className="text-green-400">exit</span> - Close terminal
              </div>
            </div>
          </div>
        ),
        type: "info" as const,
      },
      about: {
        output: (
          <div className="space-y-2">
            <div className="text-cyan-400 font-bold">About Muhammad Abdullah Uzair</div>
            <div className="text-white">🚀 Passionate Full-Stack Developer with 1+ years of experience</div>
            <div className="text-white">💻 Specialized in React, Node.js, Python, and modern web technologies</div>
            <div className="text-white">
              🎯 Currently focused on building scalable web applications and learning new technologies
            </div>
            <div className="text-white">📍 Based in Lahore, Pakistan 🇵🇰</div>
          </div>
        ),
        type: "success" as const,
      },
      skills: {
        output: (
          <div className="space-y-2">
            <div className="text-cyan-400 font-bold">Technical Skills</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="text-white">
                <span className="text-green-400">Frontend:</span> React, Next.js, TypeScript, Tailwind CSS
              </div>
              <div className="text-white">
                <span className="text-green-400">Backend:</span> Node.js, Express, Python, FastAPI
              </div>
              <div className="text-white">
                <span className="text-green-400">Database:</span> MongoDB, PostgreSQL, Redis
              </div>
              <div className="text-white">
                <span className="text-green-400">Tools:</span> Git, AWS, Vercel, Figma
              </div>
            </div>
          </div>
        ),
        type: "success" as const,
      },
      projects: {
        output: (
          <div className="space-y-2">
            <div className="text-cyan-400 font-bold">Featured Projects</div>
            <div className="space-y-3 text-sm">
              <div className="border-l-2 border-green-400 pl-3">
                <div className="text-green-400 font-semibold">MacroMate - Nutrition Tracker</div>
                <div className="text-white">Full-stack web app for tracking nutrition and fitness goals</div>
                <div className="text-gray-400">React • Node.js • MongoDB • Chart.js</div>
              </div>
              <div className="border-l-2 border-cyan-400 pl-3">
                <div className="text-cyan-400 font-semibold">TaskFlow - Project Management</div>
                <div className="text-white">Collaborative project management platform</div>
                <div className="text-gray-400">Next.js • TypeScript • PostgreSQL • Prisma</div>
              </div>
              <div className="border-l-2 border-yellow-400 pl-3">
                <div className="text-yellow-400 font-semibold">WeatherWise - Weather App</div>
                <div className="text-white">Real-time weather application with forecasting</div>
                <div className="text-gray-400">React • OpenWeather API • Tailwind CSS</div>
              </div>
            </div>
          </div>
        ),
        type: "success" as const,
      },
      contact: {
        output: (
          <div className="space-y-2">
            <div className="text-cyan-400 font-bold">Get In Touch</div>
            <div className="space-y-1 text-sm">
              <div className="text-white">
                📧 <span className="text-green-400">Email:</span> abdullah.uzair@example.com
              </div>
              <div className="text-white">
                💼 <span className="text-green-400">LinkedIn:</span> /in/abdullah-uzair
              </div>
              <div className="text-white">
                🐙 <span className="text-green-400">GitHub:</span> /mabdullahuzair
              </div>
              <div className="text-white">
                🌐 <span className="text-green-400">Portfolio:</span> abdullah-portfolio.dev
              </div>
              <div className="text-white">
                📱 <span className="text-green-400">Phone:</span> +92 XXX XXXXXXX
              </div>
            </div>
          </div>
        ),
        type: "success" as const,
      },
      experience: {
        output: (
          <div className="space-y-2">
            <div className="text-cyan-400 font-bold">Work Experience</div>
            <div className="space-y-3 text-sm">
              <div className="border-l-2 border-green-400 pl-3">
                <div className="text-green-400 font-semibold">Full-Stack Developer</div>
                <div className="text-gray-400">Tech Solutions Inc. • 2023 - Present</div>
                <div className="text-white">Developing scalable web applications using React and Node.js</div>
              </div>
              <div className="border-l-2 border-cyan-400 pl-3">
                <div className="text-cyan-400 font-semibold">Frontend Developer Intern</div>
                <div className="text-gray-400">Digital Agency • 2022 - 2023</div>
                <div className="text-white">Built responsive websites and improved user experience</div>
              </div>
            </div>
          </div>
        ),
        type: "success" as const,
      },
      education: {
        output: (
          <div className="space-y-2">
            <div className="text-cyan-400 font-bold">Education</div>
            <div className="space-y-2 text-sm">
              <div className="border-l-2 border-green-400 pl-3">
                <div className="text-green-400 font-semibold">Bachelor of Computer Science</div>
                <div className="text-gray-400">University of Punjab • 2020 - 2024</div>
                <div className="text-white">Focus on Software Engineering and Web Development</div>
              </div>
            </div>
          </div>
        ),
        type: "success" as const,
      },
      whoami: {
        output: (
          <div className="space-y-1">
            <div className="text-white">Muhammad Abdullah Uzair</div>
            <div className="text-green-400">Full-Stack Developer</div>
            <div className="text-cyan-400">Lahore, Pakistan 🇵🇰</div>
            <div className="text-yellow-400">Available for opportunities</div>
          </div>
        ),
        type: "success" as const,
      },
      clear: {
        output: "",
        type: "success" as const,
      },
      exit: {
        output: "Goodbye! 👋",
        type: "success" as const,
      },
    }),
    [],
  )

  const availableCommands = Object.keys(commands)

  // Optimized focus function with multiple attempts
  const focusInput = useCallback(() => {
    const attemptFocus = () => {
      if (inputRef.current && focusAttempts.current < 5) {
        focusAttempts.current++
        inputRef.current.focus()
        inputRef.current.click()

        // Check if focus was successful
        if (document.activeElement !== inputRef.current) {
          requestAnimationFrame(attemptFocus)
        } else {
          focusAttempts.current = 0
        }
      }
    }

    // Multiple focus attempts with different timing
    setTimeout(attemptFocus, 100)
    setTimeout(attemptFocus, 200)
    setTimeout(attemptFocus, 300)
  }, [])

  useEffect(() => {
    focusInput()
  }, [focusInput])

  // Optimized suggestion filtering
  const updateSuggestions = useCallback(
    (value: string) => {
      if (value.trim()) {
        const filtered = availableCommands.filter((cmd) => cmd.toLowerCase().startsWith(value.toLowerCase()))
        setSuggestions(filtered)
        setShowSuggestions(filtered.length > 0 && filtered[0] !== value)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    },
    [availableCommands],
  )

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      setInput(value)
      updateSuggestions(value)
      setHistoryIndex(-1)
    },
    [updateSuggestions],
  )

  const executeCommand = useCallback(
    (cmd: string) => {
      const trimmedCmd = cmd.trim().toLowerCase()

      if (trimmedCmd === "clear") {
        setHistory([])
        setInput("")
        return
      }

      if (trimmedCmd === "exit") {
        setIsClosingTerminal(true)
        setHistory((prev) => [...prev, { command: cmd, output: commands.exit.output, type: commands.exit.type }])

        setTimeout(() => {
          onClose()
          // Enhanced cross-component communication
          window.dispatchEvent(
            new CustomEvent("terminalClosed", {
              detail: { timestamp: Date.now() },
            }),
          )
        }, 1000)
        return
      }

      const command = commands[trimmedCmd as keyof typeof commands]

      if (command) {
        setHistory((prev) => [...prev, { command: cmd, output: command.output, type: command.type }])
      } else {
        setHistory((prev) => [
          ...prev,
          {
            command: cmd,
            output: `Command not found: ${cmd}. Type 'help' for available commands.`,
            type: "error",
          },
        ])
      }

      setCommandHistory((prev) => [cmd, ...prev.slice(0, 49)]) // Keep last 50 commands
      setInput("")
      setSuggestions([])
      setShowSuggestions(false)
    },
    [commands, onClose],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault()
        if (input.trim()) {
          executeCommand(input)
        }
      } else if (e.key === "Tab") {
        e.preventDefault()
        if (suggestions.length > 0) {
          setInput(suggestions[0])
          setSuggestions([])
          setShowSuggestions(false)
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        if (historyIndex < commandHistory.length - 1) {
          const newIndex = historyIndex + 1
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault()
        if (historyIndex > 0) {
          const newIndex = historyIndex - 1
          setHistoryIndex(newIndex)
          setInput(commandHistory[newIndex])
        } else if (historyIndex === 0) {
          setHistoryIndex(-1)
          setInput("")
        }
      } else if (e.key === "Escape") {
        onClose()
      }
    },
    [input, suggestions, historyIndex, commandHistory, executeCommand, onClose],
  )

  // Auto-scroll to bottom with performance optimization
  useEffect(() => {
    if (terminalRef.current) {
      const scrollToBottom = () => {
        terminalRef.current?.scrollTo({
          top: terminalRef.current.scrollHeight,
          behavior: "smooth",
        })
      }

      requestAnimationFrame(scrollToBottom)
    }
  }, [history])

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      setInput(suggestion)
      setSuggestions([])
      setShowSuggestions(false)
      focusInput()
    },
    [focusInput],
  )

  const handleContainerClick = useCallback(() => {
    focusInput()
  }, [focusInput])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="bg-black/95 border border-green-400/50 rounded-lg w-full max-w-4xl h-[80vh] flex flex-col font-mono backdrop-blur-md"
          style={{
            boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)",
            willChange: "transform, opacity",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Terminal Header */}
          <div className="flex items-center justify-between p-4 border-b border-green-400/30">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                <div
                  className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:bg-red-400 transition-colors"
                  onClick={onClose}
                ></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4 text-sm text-gray-400">abdullah@portfolio:~</div>
            </div>
            <div className="text-sm text-gray-400">Interactive Terminal</div>
          </div>

          {/* Terminal Content */}
          <div
            ref={terminalRef}
            className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-green-400 scrollbar-track-transparent"
            onClick={handleContainerClick}
            style={{ scrollbarWidth: "thin" }}
          >
            {/* Welcome Message */}
            <div className="mb-4 text-green-400">
              <div className="text-lg font-bold mb-2">Welcome to Abdullah's Interactive Terminal! 🚀</div>
              <div className="text-sm text-gray-300 mb-2">
                Type 'help' to see available commands or start exploring!
              </div>
            </div>

            {/* Command History */}
            <div className="space-y-3">
              {history.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="text-green-400">
                    <span className="text-cyan-400">abdullah@portfolio:~$</span> {item.command}
                  </div>
                  {item.output && (
                    <div
                      className={`ml-4 ${
                        item.type === "error"
                          ? "text-red-400"
                          : item.type === "success"
                            ? "text-white"
                            : "text-gray-300"
                      }`}
                    >
                      {item.output}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Current Input Line */}
            {!isClosingTerminal && (
              <div className="flex items-center mt-4">
                <span className="text-cyan-400 mr-2">abdullah@portfolio:~$</span>
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onClick={focusInput}
                    className="bg-transparent text-white outline-none w-full caret-green-400"
                    style={{ caretColor: "#00ff00" }}
                    autoComplete="off"
                    spellCheck={false}
                  />

                  {/* Command Suggestions */}
                  {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 mt-1 bg-black/90 border border-green-400/30 rounded-md py-1 z-10 min-w-[200px]">
                      {suggestions.map((suggestion, index) => (
                        <div
                          key={index}
                          className="px-3 py-1 text-green-400 hover:bg-green-400/20 cursor-pointer text-sm transition-colors"
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Terminal Footer */}
          <div className="p-2 border-t border-green-400/30 text-xs text-gray-400 text-center">
            Press Tab for autocomplete • ↑↓ for history • ESC to close
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
