"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [command, setCommand] = useState("")
  const [output, setOutput] = useState<string[]>([])
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    // Block any modal opening when contact terminal is active
    const blockModals = () => {
      const projectModals = document.querySelectorAll("[data-project-modal]")
      projectModals.forEach((modal) => {
        modal.style.pointerEvents = "none"
      })

      // Dispatch event to block project modals
      window.dispatchEvent(new CustomEvent("terminalOpened"))
    }

    blockModals()

    return () => {
      const projectModals = document.querySelectorAll("[data-project-modal]")
      projectModals.forEach((modal) => {
        modal.style.pointerEvents = "auto"
      })

      // Dispatch event when terminal closes
      window.dispatchEvent(new CustomEvent("terminalClosed"))
    }
  }, [])

  const handleCommand = async (cmd: string) => {
    setIsProcessing(true)
    setOutput((prev) => [...prev, `$ ${cmd}`])

    // Prevent any modal opening during command execution
    document.body.style.pointerEvents = "none"

    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Re-enable pointer events after command execution
    setTimeout(() => {
      document.body.style.pointerEvents = "auto"
    }, 500)

    switch (cmd.toLowerCase()) {
      case "contact":
        setOutput((prev) => [...prev, "Opening contact interface...", "Contact methods available:"])
        break
      case "email":
        setOutput((prev) => [...prev, "Email: abdullahuzair860@gmail.com", "Status: Available ✅"])
        break
      case "phone":
        setOutput((prev) => [...prev, "Phone: +92 303 467 3255", "Status: Available ✅"])
        break
      case "linkedin":
        setOutput((prev) => [...prev, "LinkedIn: /in/abdullah-uzair-2a18b9278", "Opening LinkedIn profile..."])
        window.open("https://www.linkedin.com/in/abdullah-uzair-2a18b9278/", "_blank")
        break
      case "github":
        setOutput((prev) => [...prev, "GitHub: @mabdullahuzair", "Opening GitHub profile..."])
        window.open("https://github.com/mabdullahuzair", "_blank")
        break
      case "location":
        setOutput((prev) => [...prev, "Location: Lahore, Pakistan 🇵🇰", "Timezone: PKT (UTC+5)"])
        break
      case "clear":
        setOutput([])
        break
      case "help":
        setOutput((prev) => [
          ...prev,
          "Available commands:",
          "• contact - Show contact options",
          "• email - Get email address",
          "• phone - Get phone number",
          "• linkedin - Open LinkedIn profile",
          "• github - Open GitHub profile",
          "• location - Show location",
          "• clear - Clear terminal",
        ])
        break
      default:
        setOutput((prev) => [...prev, `Command not found: ${cmd}`, 'Type "help" for available commands'])
    }

    setIsProcessing(false)
    setCommand("")
  }

  return (
    <section id="contact" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-4"
            animate={{
              textShadow: ["0 0 10px #ff6600", "0 0 20px #ff6600", "0 0 10px #ff6600"],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            $ ./connect
          </motion.h2>
          <div className="text-xl text-orange-400">Establishing connection...</div>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Terminal Interface */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="bg-black/80 border border-green-400/50 rounded-lg p-6 backdrop-blur-sm"
          >
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4 text-sm text-gray-400">contact-terminal</div>
            </div>

            <div className="h-64 overflow-y-auto mb-4 space-y-1 text-sm">
              <div className="text-green-400">Welcome to Abdullah's Contact Terminal</div>
              <div className="text-gray-300">Type 'help' to see available commands</div>
              <div className="text-gray-300">Type 'contact' to get started</div>
              <div className="border-b border-gray-700 my-2"></div>

              {output.map((line, index) => (
                <div key={index} className={line.startsWith("$") ? "text-green-400" : "text-white"}>
                  {line}
                </div>
              ))}

              {isProcessing && (
                <div className="text-yellow-400">
                  Processing...
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    |
                  </motion.span>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-green-400">$</span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && command.trim() && !isProcessing) {
                    handleCommand(command.trim())
                  }
                }}
                className="flex-1 bg-transparent text-white outline-none font-mono"
                placeholder="Type a command..."
                disabled={isProcessing}
              />
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                className="text-green-400"
              >
                |
              </motion.span>
            </div>
          </motion.div>

          {/* Quick Contact Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { cmd: "email", icon: "📧", label: "Email" },
              { cmd: "phone", icon: "📱", label: "Phone" },
              { cmd: "linkedin", icon: "💼", label: "LinkedIn" },
              { cmd: "github", icon: "🐙", label: "GitHub" },
            ].map((item) => (
              <motion.button
                key={item.cmd}
                onClick={() => !isProcessing && handleCommand(item.cmd)}
                className="bg-black/50 border border-green-400/30 rounded-lg p-4 text-center cursor-pointer hover:border-green-400 transition-colors"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                disabled={isProcessing}
              >
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-green-400 text-sm">{item.label}</div>
              </motion.button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
