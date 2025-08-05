"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"

const projects = [
  {
    id: 1,
    name: "MacroMate",
    description: "AI-powered health and fitness web app (Final Year Project)",
    tech: ["React", "Node.js", "MongoDB", "AI/ML"],
    status: "In Development",
    type: "Full-Stack Web App",
  },
  {
    id: 2,
    name: "XRevStudio.com",
    description: "Portfolio website for a creative studio",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    status: "Live",
    type: "Portfolio Website",
    link: "https://xrevstudio.com",
  },
  {
    id: 3,
    name: "ObecheInterior.com",
    description: "Landing page for an interior design company",
    tech: ["HTML5", "CSS3", "Bootstrap", "jQuery"],
    status: "Live",
    type: "Landing Page",
    link: "https://obecheinterior.com",
  },
  {
    id: 4,
    name: "LevelUpSol.com.pk",
    description: "Company website for a software agency",
    tech: ["WordPress", "PHP", "MySQL", "SEO"],
    status: "Live",
    type: "Corporate Website",
    link: "https://levelupsol.com.pk",
  },
]

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  return (
    <section id="projects" className="min-h-screen py-20 relative">
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
              textShadow: ["0 0 10px #ffff00", "0 0 20px #ffff00", "0 0 10px #ffff00"],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            $ ls ~/projects
          </motion.h2>
          <div className="text-xl text-yellow-400">Scanning project directory...</div>
        </motion.div>

        {/* Terminal Interface */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="bg-black/80 border border-green-400/50 rounded-lg p-6 mb-8 backdrop-blur-sm max-w-4xl mx-auto"
        >
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4 text-sm text-gray-400">projects-explorer</div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="text-green-400">$ find ~/projects -type f -name "*.project"</div>
            <div className="text-gray-300">Found {projects.length} projects:</div>

            <div className="mt-4 space-y-2">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.2 }}
                  className={`p-3 rounded border cursor-pointer transition-all ${
                    selectedProject === project.id
                      ? "border-green-400 bg-green-400/10"
                      : "border-gray-600 hover:border-green-400"
                  }`}
                  onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-yellow-400">📁</span>
                      <span className="text-green-400 font-mono">{project.name}</span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          project.status === "Live"
                            ? "bg-green-400/20 text-green-400"
                            : "bg-yellow-400/20 text-yellow-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <span className="text-gray-400 text-xs">{project.type}</span>
                  </div>

                  {selectedProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 pt-4 border-t border-gray-600"
                    >
                      <div className="space-y-2">
                        <div className="text-cyan-400">$ cat {project.name.toLowerCase()}/README.md</div>
                        <div className="text-white">{project.description}</div>

                        <div className="text-cyan-400">
                          $ cat {project.name.toLowerCase()}/package.json | grep dependencies
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech) => (
                            <span key={tech} className="bg-blue-400/20 text-blue-400 px-2 py-1 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>

                        {project.link && (
                          <div className="flex space-x-4 mt-4">
                            <motion.a
                              href={project.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-400 text-black px-4 py-2 rounded text-sm font-bold cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              ./deploy --live
                            </motion.a>
                            <motion.button
                              className="border border-green-400 text-green-400 px-4 py-2 rounded text-sm cursor-pointer"
                              whileHover={{ backgroundColor: "rgba(0, 255, 0, 0.1)" }}
                            >
                              git clone
                            </motion.button>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
