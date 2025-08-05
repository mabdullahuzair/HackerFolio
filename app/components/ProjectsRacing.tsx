"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"

const projects = [
  {
    id: 1,
    name: "MacroMate",
    description: "AI-powered health and fitness web app (Final Year Project)",
    tech: ["React", "Node.js", "MongoDB", "AI/ML"],
    status: "In Development",
    type: "Full-Stack Web App",
    position: 0,
  },
  {
    id: 2,
    name: "XRevStudio.com",
    description: "Portfolio website for a creative studio",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    status: "Live",
    type: "Portfolio Website",
    link: "https://xrevstudio.com",
    position: 1,
  },
  {
    id: 3,
    name: "ObecheInterior.com",
    description: "Landing page for an interior design company",
    tech: ["HTML5", "CSS3", "Bootstrap", "jQuery"],
    status: "Live",
    type: "Landing Page",
    link: "https://obecheinterior.com",
    position: 2,
  },
  {
    id: 4,
    name: "LevelUpSol.com.pk",
    description: "Company website for a software agency",
    tech: ["WordPress", "PHP", "MySQL", "SEO"],
    status: "Live",
    type: "Corporate Website",
    link: "https://levelupsol.com.pk",
    position: 3,
  },
]

export default function ProjectsRacing() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [currentProject, setCurrentProject] = useState(0)
  const [isBuilding, setIsBuilding] = useState(false)
  const [buildLogs, setBuildLogs] = useState<string[]>([])

  const moveToProject = (direction: "left" | "right") => {
    if (direction === "left" && currentProject > 0) {
      setCurrentProject((prev) => prev - 1)
    } else if (direction === "right" && currentProject < projects.length - 1) {
      setCurrentProject((prev) => prev + 1)
    }
  }

  const executeProject = async (project: (typeof projects)[0]) => {
    setIsBuilding(true)
    setBuildLogs([])

    const logs = [
      `> cd ~/projects/${project.name.toLowerCase()}`,
      `> npm install`,
      `> Installing dependencies...`,
      `> ${project.tech.join(", ")} loaded successfully`,
      `> npm run build`,
      `> Building production bundle...`,
      `> Build completed successfully ✅`,
      `> Status: ${project.status}`,
    ]

    for (let i = 0; i < logs.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setBuildLogs((prev) => [...prev, logs[i]])
    }

    setTimeout(() => {
      setIsBuilding(false)
      setBuildLogs([])
    }, 2000)
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        moveToProject("left")
      } else if (e.key === "ArrowRight") {
        moveToProject("right")
      } else if (e.key === "Enter") {
        executeProject(projects[currentProject])
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentProject])

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
            $ ./projects --race-mode
          </motion.h2>
          <div className="text-xl text-yellow-400">Navigate the project highway</div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Racing Track */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="bg-black/80 border border-green-400/50 rounded-lg p-8 mb-8 relative overflow-hidden"
            style={{ height: "500px" }}
          >
            {/* Track Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-gray-800">
              {/* Road lines */}
              <div className="absolute top-0 left-1/4 w-1 h-full bg-yellow-400 opacity-30" />
              <div className="absolute top-0 left-2/4 w-2 h-full bg-yellow-400 opacity-50" />
              <div className="absolute top-0 left-3/4 w-1 h-full bg-yellow-400 opacity-30" />

              {/* Moving road lines animation */}
              <motion.div
                className="absolute inset-0"
                animate={{ backgroundPositionY: ["0px", "100px"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(255,255,0,0.1) 20px, rgba(255,255,0,0.1) 25px)",
                }}
              />
            </div>

            {/* Controls */}
            <div className="absolute top-4 left-4 z-10 text-green-400 font-mono text-sm">
              <div>Use ← → keys to navigate</div>
              <div>Press ENTER to execute project</div>
              <div>
                Project {currentProject + 1} of {projects.length}
              </div>
            </div>

            {/* Project Car */}
            <motion.div
              className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20"
              animate={{ x: (currentProject - 1.5) * 150 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="text-6xl">🏎️</div>
            </motion.div>

            {/* Project Checkpoints */}
            <div className="absolute bottom-0 left-0 right-0 h-32 flex justify-center items-end">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  className={`mx-8 relative ${index === currentProject ? "z-10" : "z-5"}`}
                  animate={{
                    scale: index === currentProject ? 1.2 : 1,
                    y: index === currentProject ? -20 : 0,
                  }}
                >
                  {/* Checkpoint Flag */}
                  <div className="text-4xl mb-2">🏁</div>

                  {/* Project Card */}
                  <motion.div
                    className={`w-48 p-4 rounded-lg border ${
                      index === currentProject ? "border-green-400 bg-green-400/20" : "border-gray-600 bg-black/50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-center">
                      <div className="font-bold text-green-400 mb-2">{project.name}</div>
                      <div className="text-xs text-gray-400 mb-2">{project.type}</div>
                      <div
                        className={`text-xs px-2 py-1 rounded ${
                          project.status === "Live"
                            ? "bg-green-400/20 text-green-400"
                            : "bg-yellow-400/20 text-yellow-400"
                        }`}
                      >
                        {project.status}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Build Terminal */}
            {isBuilding && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/95 border border-green-400 rounded-lg p-6 z-30 min-w-96"
              >
                <div className="flex items-center mb-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="ml-4 text-sm text-gray-400">build-terminal</div>
                </div>

                <div className="space-y-1 text-sm font-mono">
                  {buildLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={log.startsWith(">") ? "text-green-400" : "text-white"}
                    >
                      {log}
                    </motion.div>
                  ))}
                  <motion.div
                    className="text-green-400"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    |
                  </motion.div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Project Details */}
          <motion.div
            key={currentProject}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/70 border border-cyan-400/30 rounded-lg p-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">{projects[currentProject].name}</h3>
                <p className="text-gray-300 mb-4">{projects[currentProject].description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {projects[currentProject].tech.map((tech) => (
                    <span key={tech} className="bg-blue-400/20 text-blue-400 px-3 py-1 rounded text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col justify-center space-y-4">
                <motion.button
                  onClick={() => executeProject(projects[currentProject])}
                  className="bg-green-400 text-black px-6 py-3 rounded-lg font-bold cursor-pointer"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(0, 255, 0, 0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  disabled={isBuilding}
                >
                  {isBuilding ? "Building..." : "🚀 Execute Build"}
                </motion.button>

                {projects[currentProject].link && (
                  <motion.a
                    href={projects[currentProject].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-green-400 text-green-400 px-6 py-3 rounded-lg text-center cursor-pointer"
                    whileHover={{ backgroundColor: "rgba(0, 255, 0, 0.1)" }}
                  >
                    🌐 View Live
                  </motion.a>
                )}

                <div className="flex justify-center space-x-4 mt-4">
                  <motion.button
                    onClick={() => moveToProject("left")}
                    disabled={currentProject === 0}
                    className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50"
                    whileHover={{ scale: currentProject > 0 ? 1.05 : 1 }}
                  >
                    ← Previous
                  </motion.button>
                  <motion.button
                    onClick={() => moveToProject("right")}
                    disabled={currentProject === projects.length - 1}
                    className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer disabled:opacity-50"
                    whileHover={{ scale: currentProject < projects.length - 1 ? 1.05 : 1 }}
                  >
                    Next →
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
