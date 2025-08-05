"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

const skillCategories = {
  frontend: {
    title: "Frontend Arsenal",
    skills: [
      { name: "HTML5", level: 90 },
      { name: "CSS3", level: 85 },
      { name: "JavaScript", level: 80 },
      { name: "React", level: 75 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Bootstrap", level: 80 },
    ],
  },
  backend: {
    title: "Backend Systems",
    skills: [
      { name: "Node.js", level: 75 },
      { name: "Express.js", level: 70 },
      { name: "PHP", level: 65 },
      { name: "MongoDB", level: 70 },
      { name: "MySQL", level: 75 },
    ],
  },
  languages: {
    title: "Programming Languages",
    skills: [
      { name: "JavaScript", level: 80 },
      { name: "Python", level: 70 },
      { name: "C++", level: 75 },
      { name: "C", level: 70 },
    ],
  },
  tools: {
    title: "Tools & Technologies",
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "Postman", level: 75 },
      { name: "RESTful APIs", level: 70 },
    ],
  },
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeCategory, setActiveCategory] = useState("frontend")

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
            $ ./skills --list
          </motion.h2>
          <div className="text-xl text-purple-400">Loading skill modules...</div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Terminal Interface */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="bg-black/80 border border-green-400/50 rounded-lg p-6 mb-8 backdrop-blur-sm"
          >
            <div className="flex items-center mb-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="ml-4 text-sm text-gray-400">skills-terminal</div>
            </div>

            <div className="space-y-2 text-sm mb-6">
              <div className="text-green-400">$ skills --help</div>
              <div className="text-gray-300">Available commands:</div>
              <div className="flex flex-wrap gap-4 mt-2">
                {Object.keys(skillCategories).map((category) => (
                  <motion.button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 py-1 rounded border cursor-pointer ${
                      activeCategory === category
                        ? "border-green-400 bg-green-400/20 text-green-400"
                        : "border-gray-600 text-gray-400 hover:border-green-400 hover:text-green-400"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    skills {category}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="text-green-400 mb-2">$ skills {activeCategory}</div>
            <div className="text-cyan-400 mb-4">
              Loading {skillCategories[activeCategory as keyof typeof skillCategories].title}...
            </div>
          </motion.div>

          {/* Skills Display */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black/70 border border-cyan-400/30 rounded-lg p-6 backdrop-blur-sm"
          >
            <h3 className="text-2xl font-bold text-cyan-400 mb-6">
              {skillCategories[activeCategory as keyof typeof skillCategories].title}
            </h3>

            <div className="space-y-4">
              {skillCategories[activeCategory as keyof typeof skillCategories].skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-mono">{skill.name}</span>
                    <span className="text-yellow-400 text-sm">{skill.level}%</span>
                  </div>

                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-400 to-cyan-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
