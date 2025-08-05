"use client"

import type React from "react"

import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState, useEffect, useCallback } from "react"
import { ChevronRight, Terminal, Code, Database, Settings, Layers } from "lucide-react"

const skillsData = {
  "mern-stack": {
    title: "MERN Stack",
    icon: <Layers className="w-5 h-5" />,
    color: "text-green-400",
    subcategories: {
      frontend: {
        title: "Frontend",
        skills: [
          { name: "React.js", level: 85, description: "Component-based UI development" },
          { name: "Tailwind CSS", level: 90, description: "Utility-first CSS framework" },
          { name: "HTML5/CSS3", level: 95, description: "Modern web standards" },
          { name: "JavaScript", level: 88, description: "ES6+ and modern JS features" },
          { name: "Framer Motion", level: 75, description: "React animation library" },
        ],
      },
      backend: {
        title: "Backend",
        skills: [
          { name: "Node.js", level: 80, description: "Server-side JavaScript runtime" },
          { name: "Express.js", level: 78, description: "Web application framework" },
          { name: "REST APIs", level: 85, description: "RESTful web services" },
          { name: "JWT / OAuth", level: 70, description: "Authentication & authorization" },
          { name: "WebSocket", level: 65, description: "Real-time communication" },
        ],
      },
    },
  },
  languages: {
    title: "Programming Languages",
    icon: <Code className="w-5 h-5" />,
    color: "text-cyan-400",
    skills: [
      { name: "JavaScript", level: 88, description: "Primary language for web development" },
      { name: "TypeScript", level: 75, description: "Typed superset of JavaScript" },
      { name: "Python", level: 70, description: "Data science and backend development" },
      { name: "C/C++", level: 65, description: "System programming and algorithms" },
      { name: "Bash", level: 60, description: "Shell scripting and automation" },
    ],
  },
  databases: {
    title: "Databases",
    icon: <Database className="w-5 h-5" />,
    color: "text-purple-400",
    skills: [
      { name: "MongoDB", level: 80, description: "NoSQL document database" },
      { name: "Firestore", level: 70, description: "Cloud-native NoSQL database" },
      { name: "MySQL", level: 75, description: "Relational database management" },
    ],
  },
  tools: {
    title: "Tools & Platforms",
    icon: <Settings className="w-5 h-5" />,
    color: "text-yellow-400",
    skills: [
      { name: "Git & GitHub", level: 90, description: "Version control and collaboration" },
      { name: "Docker", level: 60, description: "Containerization platform" },
      { name: "Postman", level: 85, description: "API development and testing" },
      { name: "Vite", level: 80, description: "Fast build tool for modern web" },
      { name: "Figma", level: 70, description: "UI/UX design and prototyping" },
      { name: "Netlify / Vercel", level: 85, description: "Modern deployment platforms" },
    ],
  },
}

const commands = [
  "show skills",
  "list mern-stack",
  "list languages",
  "list databases",
  "list tools",
  "show mern-stack frontend",
  "show mern-stack backend",
  "clear",
  "help",
  "sudo hire-me",
]

export default function TerminalSkillsExplorer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [input, setInput] = useState("")
  const [history, setHistory] = useState<string[]>([
    "Welcome to Abdullah's Skill Terminal v2.0",
    "Type 'help' for available commands or click suggestions below",
    "$ ",
  ])
  const [currentView, setCurrentView] = useState<string | null>(null)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [autoTypeIndex, setAutoTypeIndex] = useState(0)
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null)

  // Auto-type demo commands
  const autoTypeCommands = ["show skills", "list mern-stack", "show mern-stack frontend"]

  useEffect(() => {
    if (isInView && autoTypeIndex < autoTypeCommands.length) {
      const timer = setTimeout(
        () => {
          setIsTyping(true)
          typeCommand(autoTypeCommands[autoTypeIndex])
        },
        2000 + autoTypeIndex * 4000,
      )
      return () => clearTimeout(timer)
    }
  }, [isInView, autoTypeIndex])

  const typeCommand = async (command: string) => {
    setInput("")
    for (let i = 0; i <= command.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100))
      setInput(command.slice(0, i))
    }
    await new Promise((resolve) => setTimeout(resolve, 500))
    executeCommand(command)
    setAutoTypeIndex((prev) => prev + 1)
    setIsTyping(false)
  }

  const executeCommand = useCallback((cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase()
    setHistory((prev) => [...prev, `$ ${cmd}`])

    if (trimmedCmd === "clear") {
      setHistory(["$ "])
      setCurrentView(null)
      setInput("")
      return
    }

    if (trimmedCmd === "help") {
      setHistory((prev) => [
        ...prev,
        "Available commands:",
        "  show skills          - Display all skill categories",
        "  list <category>      - List skills in category",
        "  show <category> <sub> - Show subcategory details",
        "  clear               - Clear terminal",
        "  sudo hire-me        - Easter egg command",
        "",
      ])
      setInput("")
      return
    }

    if (trimmedCmd === "sudo hire-me") {
      setHistory((prev) => [
        ...prev,
        "🚀 Initiating hire sequence...",
        "✅ Checking qualifications... PASSED",
        "✅ Scanning GitHub repositories... IMPRESSIVE",
        "✅ Evaluating problem-solving skills... EXCELLENT",
        "💼 Ready for opportunities! Contact: abdullahuzair860@gmail.com",
        "",
      ])
      setInput("")
      return
    }

    if (trimmedCmd === "show skills") {
      setCurrentView("overview")
      setHistory((prev) => [...prev, "Loading skill categories...", ""])
      setInput("")
      return
    }

    if (trimmedCmd.startsWith("list ")) {
      const category = trimmedCmd.replace("list ", "")
      if (skillsData[category as keyof typeof skillsData]) {
        setCurrentView(category)
        setHistory((prev) => [...prev, `Loading ${category} skills...`, ""])
      } else {
        setHistory((prev) => [...prev, `Error: Category '${category}' not found`, ""])
      }
      setInput("")
      return
    }

    if (trimmedCmd.startsWith("show ")) {
      const parts = trimmedCmd.replace("show ", "").split(" ")
      if (parts.length === 2) {
        const [category, subcategory] = parts
        if (skillsData[category as keyof typeof skillsData]?.subcategories?.[subcategory as keyof any]) {
          setCurrentView(`${category}-${subcategory}`)
          setHistory((prev) => [...prev, `Loading ${category} ${subcategory} skills...`, ""])
        } else {
          setHistory((prev) => [...prev, `Error: '${category} ${subcategory}' not found`, ""])
        }
      }
      setInput("")
      return
    }

    setHistory((prev) => [...prev, `Command not found: ${cmd}`, "Type 'help' for available commands", ""])
    setInput("")
  }, [])

  // Auto-complete suggestions
  useEffect(() => {
    if (input) {
      const filtered = commands.filter((cmd) => cmd.toLowerCase().includes(input.toLowerCase())).slice(0, 4)
      setSuggestions(filtered)
    } else {
      setSuggestions(["show skills", "list mern-stack", "help", "sudo hire-me"])
    }
  }, [input])

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && input.trim()) {
      executeCommand(input)
    }
  }

  const renderSkillCard = (skill: any, index: number) => (
    <motion.div
      key={skill.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-black/50 border border-green-400/30 rounded-lg p-4 hover:border-green-400 transition-colors group"
      whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)" }}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-green-400 font-bold">{skill.name}</h4>
        <span className="text-cyan-400 text-sm">{skill.level}%</span>
      </div>
      <p className="text-gray-400 text-sm mb-3">{skill.description}</p>
      <div className="w-full bg-gray-800 rounded-full h-2">
        <motion.div
          className="h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: index * 0.1 }}
        />
      </div>
    </motion.div>
  )

  const renderCurrentView = () => {
    if (!currentView) return null

    if (currentView === "overview") {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {Object.entries(skillsData).map(([key, category], index) => (
            <motion.button
              key={key}
              onClick={() => executeCommand(`list ${key}`)}
              className="bg-black/70 border border-gray-600 rounded-lg p-6 text-left hover:border-green-400 transition-colors group cursor-pointer"
              whileHover={{ scale: 1.02, boxShadow: "0 0 15px rgba(0, 255, 0, 0.2)" }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center mb-3">
                <div className={`${category.color} mr-3`}>{category.icon}</div>
                <h3 className={`text-lg font-bold ${category.color}`}>{category.title}</h3>
                <ChevronRight className="ml-auto text-gray-400 group-hover:text-green-400 transition-colors" />
              </div>
              <div className="text-gray-400 text-sm">
                {category.subcategories
                  ? `${Object.keys(category.subcategories).length} subcategories`
                  : `${category.skills?.length || 0} skills`}
              </div>
            </motion.button>
          ))}
        </motion.div>
      )
    }

    // Handle subcategory views
    if (currentView.includes("-")) {
      const [categoryKey, subcategoryKey] = currentView.split("-")
      const category = skillsData[categoryKey as keyof typeof skillsData]
      const subcategory = category?.subcategories?.[subcategoryKey as keyof any]

      if (subcategory) {
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
            <div className="flex items-center mb-6">
              <div className={`${category.color} mr-3`}>{category.icon}</div>
              <h3 className={`text-2xl font-bold ${category.color}`}>
                {category.title} → {subcategory.title}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {subcategory.skills.map((skill: any, index: number) => renderSkillCard(skill, index))}
            </div>
          </motion.div>
        )
      }
    }

    // Handle category views
    const category = skillsData[currentView as keyof typeof skillsData]
    if (!category) return null

    if (category.subcategories) {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <div className="flex items-center mb-6">
            <div className={`${category.color} mr-3`}>{category.icon}</div>
            <h3 className={`text-2xl font-bold ${category.color}`}>{category.title}</h3>
          </div>
          <div className="space-y-6">
            {Object.entries(category.subcategories).map(([subKey, subcategory], index) => (
              <motion.div
                key={subKey}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="border border-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-cyan-400">{subcategory.title}</h4>
                  <motion.button
                    onClick={() => executeCommand(`show ${currentView} ${subKey}`)}
                    className="text-green-400 hover:text-cyan-400 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ChevronRight />
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {subcategory.skills
                    .slice(0, 4)
                    .map((skill: any, skillIndex: number) => renderSkillCard(skill, skillIndex))}
                </div>
                {subcategory.skills.length > 4 && (
                  <motion.button
                    onClick={() => executeCommand(`show ${currentView} ${subKey}`)}
                    className="mt-4 text-green-400 hover:text-cyan-400 transition-colors text-sm cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    View all {subcategory.skills.length} skills →
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      )
    }

    if (category.skills) {
      return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
          <div className="flex items-center mb-6">
            <div className={`${category.color} mr-3`}>{category.icon}</div>
            <h3 className={`text-2xl font-bold ${category.color}`}>{category.title}</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.skills.map((skill, index) => renderSkillCard(skill, index))}
          </div>
        </motion.div>
      )
    }

    return null
  }

  return (
    <section id="skills" className="min-h-screen py-20 relative">
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
              textShadow: ["0 0 10px #ff00ff", "0 0 20px #ff00ff", "0 0 10px #ff00ff"],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            $ ./skills --interactive
          </motion.h2>
          <div className="text-xl text-purple-400">Terminal Skill Explorer</div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Terminal Interface */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="bg-black/90 border border-green-400/50 rounded-lg overflow-hidden terminal-glow"
          >
            {/* Terminal Header */}
            <div className="flex items-center bg-gray-900 px-4 py-3 border-b border-gray-700">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4 flex items-center text-gray-400 text-sm">
                <Terminal className="w-4 h-4 mr-2" />
                skills-terminal
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6">
              {/* Command History */}
              <div className="mb-4 space-y-1 text-sm font-mono max-h-40 overflow-y-auto">
                {history.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={
                      line.startsWith("$")
                        ? "text-green-400"
                        : line.startsWith("Error")
                          ? "text-red-400"
                          : line.includes("✅") || line.includes("🚀") || line.includes("💼")
                            ? "text-cyan-400"
                            : "text-gray-300"
                    }
                  >
                    {line}
                  </motion.div>
                ))}
              </div>

              {/* Command Input */}
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-green-400 font-mono">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-transparent text-white outline-none font-mono"
                  placeholder={isTyping ? "" : "Type a command or click suggestions..."}
                  disabled={isTyping}
                />
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                  className="text-green-400 font-mono"
                >
                  |
                </motion.span>
              </div>

              {/* Command Suggestions */}
              <div className="flex flex-wrap gap-2 mb-6">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={suggestion}
                    onClick={() => executeCommand(suggestion)}
                    className="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-green-400 px-3 py-1 rounded text-sm text-gray-300 hover:text-green-400 transition-colors cursor-pointer"
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
          </motion.div>

          {/* Dynamic Content Area */}
          <AnimatePresence mode="wait">{renderCurrentView()}</AnimatePresence>
        </div>
      </div>
    </section>
  )
}
