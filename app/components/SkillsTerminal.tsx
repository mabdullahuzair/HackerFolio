"use client"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useState } from "react"
import { ChevronRight, Terminal, Code, Database, Settings, Layers, X } from "lucide-react"

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
      { name: "Python", level: 70, description: "Data science and backend development" },
      { name: "C/C++", level: 65, description: "System programming and algorithms" },
      { name: "Bash", level: 60, description: "Shell scripting and automation" },
      { name: "Vibe Coding", level: 95, description: "Writing code with style and intuition" },
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
      { name: "Postman", level: 85, description: "API development and testing" },
      { name: "Figma", level: 70, description: "UI/UX design and prototyping" },
      { name: "Netlify / Vercel", level: 85, description: "Modern deployment platforms" },
      { name: "Vibe Coding", level: 95, description: "Intuitive and aesthetic code writing" },
    ],
  },
}

export default function SkillsTerminal() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [isTerminalOpen, setIsTerminalOpen] = useState(false)
  const [currentView, setCurrentView] = useState<string | null>(null)

  const renderSkillCard = (skill: any, index: number) => (
    <motion.div
      key={skill.name}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-black/80 border border-green-400/50 rounded-lg p-4 hover:border-green-400 transition-colors group backdrop-blur-sm"
      whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)" }}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-green-400 font-bold">{skill.name}</h4>
        <span className="text-cyan-400 text-sm font-bold">{skill.level}%</span>
      </div>
      <p className="text-gray-300 text-sm mb-3">{skill.description}</p>
      <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
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
    if (!currentView) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {Object.entries(skillsData).map(([key, category], index) => (
            <motion.button
              key={key}
              onClick={() => setCurrentView(key)}
              className="bg-black/80 border border-gray-600 rounded-lg p-6 text-left hover:border-green-400 transition-colors group cursor-pointer backdrop-blur-sm"
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
              <div className="text-gray-300 text-sm">
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center mb-6">
              <button
                onClick={() => setCurrentView(categoryKey)}
                className="text-green-400 hover:text-cyan-400 mr-4 cursor-pointer"
              >
                ← Back
              </button>
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center mb-6">
            <button
              onClick={() => setCurrentView(null)}
              className="text-green-400 hover:text-cyan-400 mr-4 cursor-pointer"
            >
              ← Back
            </button>
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
                className="border border-gray-700 rounded-lg p-4 bg-black/60 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-bold text-cyan-400">{subcategory.title}</h4>
                  <motion.button
                    onClick={() => setCurrentView(`${currentView}-${subKey}`)}
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
                    onClick={() => setCurrentView(`${currentView}-${subKey}`)}
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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center mb-6">
            <button
              onClick={() => setCurrentView(null)}
              className="text-green-400 hover:text-cyan-400 mr-4 cursor-pointer"
            >
              ← Back
            </button>
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
            $ ./skills --explore
          </motion.h2>
          <div className="text-xl text-purple-400">Interactive Skill Explorer</div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {!isTerminalOpen ? (
            // Terminal Preview (Clickable)
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              onClick={() => setIsTerminalOpen(true)}
              className="bg-black/90 border border-green-400/50 rounded-lg overflow-hidden cursor-pointer hover:border-green-400 transition-colors group"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)" }}
            >
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

              <div className="p-8 text-center">
                <motion.div
                  className="text-6xl mb-4"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  💻
                </motion.div>
                <div className="text-green-400 text-xl font-bold mb-2">Click to Open Terminal</div>
                <div className="text-gray-400">Explore my skills interactively</div>
                <motion.div
                  className="mt-4 text-cyan-400 text-sm"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  $ skills --interactive
                </motion.div>
              </div>
            </motion.div>
          ) : (
            // Full Terminal Interface
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-black/95 border border-green-400/50 rounded-lg overflow-hidden backdrop-blur-sm"
            >
              <div className="flex items-center justify-between bg-gray-900 px-4 py-3 border-b border-gray-700">
                <div className="flex items-center">
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
                <button
                  onClick={() => {
                    setIsTerminalOpen(false)
                    setCurrentView(null)
                  }}
                  className="text-gray-400 hover:text-red-400 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-4 text-green-400 font-mono text-sm">
                  $ skills --list
                  <br />
                  Loading skill categories...
                </div>
                <AnimatePresence mode="wait">{renderCurrentView()}</AnimatePresence>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
