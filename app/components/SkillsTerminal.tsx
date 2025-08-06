"use client"

import type React from "react"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion } from "framer-motion"

interface Skill {
  name: string
  level: number
  category: string
  description: string
  icon: string
}

const skills: Skill[] = [
  // Programming Languages
  {
    name: "JavaScript",
    level: 95,
    category: "Programming Languages",
    description: "Expert in ES6+, async/await, and modern JS features",
    icon: "🟨",
  },
  {
    name: "TypeScript",
    level: 90,
    category: "Programming Languages",
    description: "Strong typing, interfaces, and advanced TS patterns",
    icon: "🔷",
  },
  {
    name: "Python",
    level: 85,
    category: "Programming Languages",
    description: "Backend development, automation, and data processing",
    icon: "🐍",
  },
  {
    name: "Java",
    level: 75,
    category: "Programming Languages",
    description: "Object-oriented programming and enterprise applications",
    icon: "☕",
  },
  {
    name: "C++",
    level: 70,
    category: "Programming Languages",
    description: "System programming and competitive programming",
    icon: "⚡",
  },
  {
    name: "Vibe Coding",
    level: 95,
    category: "Programming Languages",
    description: "Intuitive coding with perfect flow and rhythm",
    icon: "🎵",
  },

  // Frontend Technologies
  {
    name: "React",
    level: 95,
    category: "Frontend",
    description: "Hooks, Context API, and advanced React patterns",
    icon: "⚛️",
  },
  { name: "Next.js", level: 90, category: "Frontend", description: "SSR, SSG, API routes, and App Router", icon: "▲" },
  {
    name: "Vue.js",
    level: 80,
    category: "Frontend",
    description: "Composition API, Vuex, and component architecture",
    icon: "💚",
  },
  {
    name: "HTML5",
    level: 95,
    category: "Frontend",
    description: "Semantic markup, accessibility, and modern HTML features",
    icon: "🌐",
  },
  {
    name: "CSS3",
    level: 90,
    category: "Frontend",
    description: "Flexbox, Grid, animations, and responsive design",
    icon: "🎨",
  },
  {
    name: "Tailwind CSS",
    level: 95,
    category: "Frontend",
    description: "Utility-first CSS framework and custom configurations",
    icon: "💨",
  },
  {
    name: "SCSS/Sass",
    level: 85,
    category: "Frontend",
    description: "Advanced CSS preprocessing and mixins",
    icon: "💄",
  },

  // Backend Technologies
  {
    name: "Node.js",
    level: 90,
    category: "Backend",
    description: "Server-side JavaScript, Express, and API development",
    icon: "🟢",
  },
  {
    name: "Express.js",
    level: 88,
    category: "Backend",
    description: "RESTful APIs, middleware, and server architecture",
    icon: "🚂",
  },
  { name: "FastAPI", level: 80, category: "Backend", description: "High-performance Python web framework", icon: "⚡" },
  { name: "Django", level: 75, category: "Backend", description: "Full-featured Python web framework", icon: "🎸" },
  { name: "GraphQL", level: 70, category: "Backend", description: "Query language and runtime for APIs", icon: "🔗" },

  // Databases
  {
    name: "MongoDB",
    level: 85,
    category: "Database",
    description: "NoSQL database design and aggregation pipelines",
    icon: "🍃",
  },
  {
    name: "PostgreSQL",
    level: 80,
    category: "Database",
    description: "Relational database design and complex queries",
    icon: "🐘",
  },
  {
    name: "MySQL",
    level: 75,
    category: "Database",
    description: "Database optimization and stored procedures",
    icon: "🐬",
  },
  { name: "Redis", level: 70, category: "Database", description: "Caching, session storage, and pub/sub", icon: "🔴" },

  // Tools & Platforms
  {
    name: "Git",
    level: 90,
    category: "Tools & Platforms",
    description: "Version control, branching strategies, and collaboration",
    icon: "📚",
  },
  {
    name: "AWS",
    level: 75,
    category: "Tools & Platforms",
    description: "Cloud services, EC2, S3, and Lambda",
    icon: "☁️",
  },
  {
    name: "Vercel",
    level: 85,
    category: "Tools & Platforms",
    description: "Deployment, serverless functions, and edge computing",
    icon: "▲",
  },
  {
    name: "Figma",
    level: 80,
    category: "Tools & Platforms",
    description: "UI/UX design, prototyping, and design systems",
    icon: "🎨",
  },
  {
    name: "Postman",
    level: 85,
    category: "Tools & Platforms",
    description: "API testing, documentation, and automation",
    icon: "📮",
  },
  {
    name: "Vibe Coding",
    level: 95,
    category: "Tools & Platforms",
    description: "Creating harmonious code with perfect developer flow",
    icon: "🎵",
  },
]

export default function SkillsTerminal() {
  const [input, setInput] = useState("")
  const [output, setOutput] = useState<string[]>([])
  const [currentCategory, setCurrentCategory] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  // Memoized categories and skills for better performance
  const categories = useMemo(() => {
    return Array.from(new Set(skills.map((skill) => skill.category)))
  }, [])

  const skillsByCategory = useMemo(() => {
    return categories.reduce(
      (acc, category) => {
        acc[category] = skills.filter((skill) => skill.category === category)
        return acc
      },
      {} as Record<string, Skill[]>,
    )
  }, [categories])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.3 },
    )

    const skillsSection = document.getElementById("skills")
    if (skillsSection) {
      observer.observe(skillsSection)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible && output.length === 0) {
      setOutput([
        "🚀 Skills Terminal Initialized",
        "Type 'help' to see available commands",
        "Type 'skills' to view all skills",
        "Type 'categories' to see skill categories",
        "",
      ])
    }
  }, [isVisible, output.length])

  // Optimized command execution
  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase()
    const newOutput = [...output, `$ ${cmd}`]

    switch (command) {
      case "help":
        newOutput.push(
          "Available commands:",
          "• skills - Show all skills",
          "• categories - List skill categories",
          "• frontend - Show frontend skills",
          "• backend - Show backend skills",
          "• database - Show database skills",
          "• tools - Show tools & platforms",
          "• programming - Show programming languages",
          "• clear - Clear terminal",
          "",
        )
        break

      case "skills":
        newOutput.push("📊 All Skills Overview:", "")
        categories.forEach((category) => {
          newOutput.push(`${category.toUpperCase()}:`)
          skillsByCategory[category].forEach((skill) => {
            const progressBar = "█".repeat(Math.floor(skill.level / 10)) + "░".repeat(10 - Math.floor(skill.level / 10))
            newOutput.push(`  ${skill.icon} ${skill.name}: ${progressBar} ${skill.level}%`)
          })
          newOutput.push("")
        })
        break

      case "categories":
        newOutput.push("📂 Skill Categories:", "")
        categories.forEach((category, index) => {
          const skillCount = skillsByCategory[category].length
          newOutput.push(`${index + 1}. ${category} (${skillCount} skills)`)
        })
        newOutput.push("")
        break

      case "frontend":
        showCategorySkills("Frontend", newOutput)
        break

      case "backend":
        showCategorySkills("Backend", newOutput)
        break

      case "database":
        showCategorySkills("Database", newOutput)
        break

      case "tools":
        showCategorySkills("Tools & Platforms", newOutput)
        break

      case "programming":
        showCategorySkills("Programming Languages", newOutput)
        break

      case "clear":
        setOutput([])
        setInput("")
        return

      default:
        newOutput.push(`Command not found: ${cmd}`)
        newOutput.push("Type 'help' for available commands")
        newOutput.push("")
    }

    setOutput(newOutput)
    setInput("")
  }

  const showCategorySkills = (category: string, outputArray: string[]) => {
    const categorySkills = skillsByCategory[category]
    if (categorySkills) {
      outputArray.push(`💻 ${category} Skills:`, "")
      categorySkills.forEach((skill) => {
        const progressBar = "█".repeat(Math.floor(skill.level / 10)) + "░".repeat(10 - Math.floor(skill.level / 10))
        outputArray.push(`${skill.icon} ${skill.name}`)
        outputArray.push(`   Level: ${progressBar} ${skill.level}%`)
        outputArray.push(`   ${skill.description}`)
        outputArray.push("")
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (input.trim()) {
        executeCommand(input)
      }
    }
  }

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
  }, [output])

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      {/* Dark overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-5"></div>

      <div className="container mx-auto px-4 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-black mb-6"
            style={{
              textShadow: "0 0 20px rgba(255, 0, 255, 0.8), 0 4px 8px rgba(0, 0, 0, 0.8)",
              fontWeight: 900,
            }}
          >
            TECHNICAL SKILLS
          </h2>
          <p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
            style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)" }}
          >
            Explore my technical expertise through an interactive terminal interface
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="bg-black/90 border border-purple-400/50 rounded-lg font-mono backdrop-blur-md"
            style={{
              boxShadow: "0 0 30px rgba(255, 0, 255, 0.2)",
              willChange: "auto",
            }}
          >
            {/* Terminal Header */}
            <div className="flex items-center justify-between p-4 border-b border-purple-400/30">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="ml-4 text-sm text-gray-400">skills-terminal</div>
              </div>
              <div className="text-sm text-purple-400">Interactive Skills Explorer</div>
            </div>

            {/* Terminal Content */}
            <div
              ref={terminalRef}
              className="h-96 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 scrollbar-track-transparent text-sm"
              style={{ scrollbarWidth: "thin" }}
            >
              {output.map((line, index) => (
                <div
                  key={index}
                  className={`${
                    line.startsWith("$")
                      ? "text-purple-400"
                      : line.includes("█")
                        ? "text-green-400 font-mono"
                        : line.includes("•")
                          ? "text-cyan-400"
                          : line.includes(":") && line.includes("%")
                            ? "text-yellow-400"
                            : "text-gray-300"
                  }`}
                >
                  {line}
                </div>
              ))}

              {/* Input Line */}
              <div className="flex items-center mt-2">
                <span className="text-purple-400 mr-2">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent text-white outline-none flex-1 caret-purple-400"
                  style={{ caretColor: "#a855f7" }}
                  autoComplete="off"
                  spellCheck={false}
                  placeholder="Type a command..."
                />
              </div>
            </div>

            {/* Terminal Footer */}
            <div className="p-2 border-t border-purple-400/30 text-xs text-gray-400 text-center">
              Interactive Skills Terminal • Type 'help' for commands
            </div>
          </div>
        </motion.div>

        {/* Skills Grid Preview */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {skills.slice(0, 12).map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-black/60 border border-purple-400/30 rounded-lg p-4 text-center backdrop-blur-sm hover:border-purple-400/60 transition-colors"
              style={{ willChange: "border-color" }}
            >
              <div className="text-2xl mb-2">{skill.icon}</div>
              <div className="text-purple-400 font-bold text-sm mb-1">{skill.name}</div>
              <div className="text-xs text-gray-400">{skill.level}%</div>
              <div className="w-full bg-gray-700 rounded-full h-1 mt-2">
                <motion.div
                  className="bg-purple-400 h-1 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  viewport={{ once: true }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
