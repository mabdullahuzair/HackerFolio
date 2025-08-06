"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { ExternalLink, Code, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "MacroMate",
    description: "AI-powered health and fitness web app with personalized nutrition tracking",
    longDescription:
      "A comprehensive health platform that uses machine learning to provide personalized meal plans, track macronutrients, and suggest optimal workout routines based on user goals and preferences.",
    tech: ["React", "Node.js", "MongoDB", "AI/ML", "Express.js"],
    status: "In Development",
    type: "Full-Stack Web App",
    image: "/health-fitness-app-dashboard.png",
    features: ["AI Meal Planning", "Workout Tracking", "Progress Analytics", "Social Features"],
    category: "web",
    color: "from-green-400 to-emerald-600",
  },
  {
    id: 2,
    name: "XRevStudio.com",
    description: "Modern portfolio website for a creative studio with stunning animations",
    longDescription:
      "A visually striking portfolio website featuring smooth animations, interactive elements, and a modern design system that showcases the studio's creative work effectively.",
    tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "Responsive Design"],
    status: "Live",
    type: "Portfolio Website",
    link: "https://xrevstudio.com",
    image: "/creative-studio-portfolio.png",
    features: ["Smooth Animations", "Responsive Design", "Interactive Gallery", "Contact Forms"],
    category: "web",
    color: "from-blue-400 to-cyan-600",
  },
  {
    id: 3,
    name: "ObecheInterior.com",
    description: "Elegant landing page for an interior design company",
    longDescription:
      "A sophisticated landing page that captures the essence of luxury interior design through carefully crafted visuals, smooth scrolling, and an intuitive user experience.",
    tech: ["HTML5", "CSS3", "Bootstrap", "jQuery", "AOS"],
    status: "Live",
    type: "Landing Page",
    link: "https://obecheinterior.com",
    image: "/luxury-interior-design-website.png",
    features: ["Modern Design", "Image Gallery", "Contact Integration", "SEO Optimized"],
    category: "web",
    color: "from-purple-400 to-pink-600",
  },
  {
    id: 4,
    name: "LevelUpSol.com.pk",
    description: "Professional corporate website for a software development agency",
    longDescription:
      "A comprehensive corporate website showcasing services, team, and portfolio with integrated CMS for easy content management and SEO optimization.",
    tech: ["WordPress", "PHP", "MySQL", "Custom Theme", "SEO"],
    status: "Live",
    type: "Corporate Website",
    link: "https://levelupsol.com.pk",
    image: "/software-agency-website.png",
    features: ["CMS Integration", "Service Pages", "Team Profiles", "Blog System"],
    category: "web",
    color: "from-yellow-400 to-orange-600",
  },
]

export default function Projects3D() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [isModalBlocked, setIsModalBlocked] = useState(false)
  const [terminalJustClosed, setTerminalJustClosed] = useState(false)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
      } else if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % projects.length)
      } else if (e.key === "Enter") {
        if (!isModalBlocked && !terminalJustClosed) {
          setSelectedProject(projects[currentIndex].id)
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [currentIndex, isModalBlocked, terminalJustClosed])

  // Listen for terminal events
  useEffect(() => {
    const handleTerminalClosed = () => {
      setTerminalJustClosed(true)
      setIsModalBlocked(true)

      // Block for 2 seconds after terminal closes
      setTimeout(() => {
        setTerminalJustClosed(false)
        setIsModalBlocked(false)
      }, 2000)
    }

    const handleTerminalOpened = () => {
      setIsModalBlocked(true)
    }

    window.addEventListener("terminalClosed", handleTerminalClosed)
    window.addEventListener("terminalOpened", handleTerminalOpened)

    return () => {
      window.removeEventListener("terminalClosed", handleTerminalClosed)
      window.removeEventListener("terminalOpened", handleTerminalOpened)
    }
  }, [])

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToProject = (index: number) => {
    setCurrentIndex(index)
  }

  const openProjectModal = (projectId: number, fromClick = false) => {
    // Extra protection against unwanted modal opening
    if (isModalBlocked || terminalJustClosed) {
      console.log("Modal blocked - terminal recently closed or modal blocked")
      return
    }

    if (fromClick) {
      // Small delay for click events to ensure terminal has fully closed
      setTimeout(() => {
        if (!terminalJustClosed && !isModalBlocked) {
          setSelectedProject(projectId)
        }
      }, 100)
    } else {
      setSelectedProject(projectId)
    }
  }

  return (
    <section id="projects" className="min-h-screen py-20 relative overflow-hidden">
      {/* Dark overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40 z-5"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-3xl sm:text-5xl md:text-7xl font-black mb-6 break-words"
            style={{
              textShadow: "0 0 30px rgba(255, 255, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.9)",
              fontWeight: 900,
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
            animate={{
              textShadow: [
                "0 0 30px rgba(255, 255, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.9)",
                "0 0 40px rgba(255, 255, 0, 1), 0 6px 16px rgba(0, 0, 0, 1)",
                "0 0 30px rgba(255, 255, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.9)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            $ ls ~/projects --3d
          </motion.h2>
          <div
            className="text-lg sm:text-xl md:text-2xl text-yellow-400 font-bold break-words"
            style={{
              textShadow: "0 2px 6px rgba(0, 0, 0, 0.8)",
              wordBreak: "break-word",
            }}
          >
            Interactive 3D Project Showcase
          </div>
        </motion.div>

        {/* 3D Carousel Container */}
        <div className="max-w-6xl mx-auto">
          {/* Main Carousel */}
          <div className="relative h-[450px] sm:h-[550px] mb-8 perspective-1000">
            <div className="relative w-full h-full flex items-center justify-center">
              {projects.map((project, index) => {
                const offset = index - currentIndex
                const absOffset = Math.abs(offset)
                const isActive = index === currentIndex

                return (
                  <motion.div
                    key={project.id}
                    className="absolute w-80 sm:w-[26rem] h-[26rem] sm:h-[32rem] cursor-pointer"
                    style={{
                      zIndex: isActive ? 10 : 5 - absOffset,
                    }}
                    animate={{
                      x: offset * 140,
                      rotateY: offset * 25,
                      scale: isActive ? 1 : 0.75 - absOffset * 0.1,
                      opacity: absOffset > 2 ? 0 : 1 - absOffset * 0.3,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    onClick={() => openProjectModal(project.id, true)}
                    whileHover={{
                      scale: isActive ? 1.05 : 0.8,
                      rotateY: offset * 25 + (isActive ? 0 : 5),
                    }}
                  >
                    <div className={`w-full h-full rounded-xl overflow-hidden bg-gradient-to-br ${project.color} p-1`}>
                      <div className="w-full h-full bg-black/90 rounded-lg overflow-hidden backdrop-blur-md">
                        {/* Project Image */}
                        <div className="h-56 sm:h-64 overflow-hidden">
                          <img
                            src={project.image || "/placeholder.svg"}
                            alt={project.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Project Info */}
                        <div className="p-4 sm:p-6">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-lg sm:text-xl font-bold text-green-400 truncate">{project.name}</h3>
                            <span
                              className={`text-xs px-2 py-1 rounded-full font-bold ${
                                project.status === "Live"
                                  ? "bg-green-400/20 text-green-400"
                                  : "bg-yellow-400/20 text-yellow-400"
                              }`}
                            >
                              {project.status}
                            </span>
                          </div>

                          <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>

                          {/* Tech Stack */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.slice(0, 3).map((tech) => (
                              <span key={tech} className="bg-blue-400/20 text-blue-400 px-2 py-1 rounded text-xs">
                                {tech}
                              </span>
                            ))}
                            {project.tech.length > 3 && (
                              <span className="text-gray-400 text-xs">+{project.tech.length - 3}</span>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            {project.link && (
                              <motion.a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-1 bg-green-400 text-black px-3 py-2 rounded text-xs font-bold cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>Live</span>
                              </motion.a>
                            )}
                            <motion.button
                              className="flex items-center space-x-1 border border-green-400 text-green-400 px-3 py-2 rounded text-xs cursor-pointer"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.stopPropagation()
                                openProjectModal(project.id, true)
                              }}
                            >
                              <Code className="w-3 h-3" />
                              <span>Details</span>
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-6 mb-8">
            <motion.button
              onClick={prevProject}
              className="bg-black/80 border border-green-400/50 rounded-full p-3 text-green-400 hover:border-green-400 transition-colors cursor-pointer backdrop-blur-md"
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)" }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="bg-black/80 border border-cyan-400/50 rounded-full p-3 text-cyan-400 hover:border-cyan-400 transition-colors cursor-pointer backdrop-blur-md"
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.9 }}
            >
              {isAutoPlay ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </motion.button>

            <motion.button
              onClick={nextProject}
              className="bg-black/80 border border-green-400/50 rounded-full p-3 text-green-400 hover:border-green-400 transition-colors cursor-pointer backdrop-blur-md"
              whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)" }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center space-x-4">
            {projects.map((project, index) => (
              <motion.button
                key={project.id}
                onClick={() => goToProject(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 cursor-pointer ${
                  index === currentIndex ? "border-green-400 shadow-lg" : "border-gray-600 hover:border-green-400/50"
                } transition-colors`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>

          {/* Project Info Display */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 text-center"
          >
            <h3 className="text-2xl font-bold text-green-400 mb-2">{projects[currentIndex].name}</h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-4">{projects[currentIndex].longDescription}</p>
            <div className="text-sm text-gray-400">
              Use ← → arrow keys to navigate • Click cards for details • {isAutoPlay ? "Auto-playing" : "Paused"}
            </div>
          </motion.div>
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-black/95 border border-green-400/50 rounded-lg w-full max-w-[95vw] sm:max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-md mx-4"
              onClick={(e) => e.stopPropagation()}
              style={{ boxShadow: "0 0 40px rgba(0, 255, 0, 0.3)" }}
            >
              {(() => {
                const project = projects.find((p) => p.id === selectedProject)
                if (!project) return null

                return (
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-3xl font-bold text-green-400">{project.name}</h2>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="text-gray-400 hover:text-red-400 text-2xl cursor-pointer"
                      >
                        ×
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.name}
                          className="w-full h-64 object-cover rounded-lg mb-4"
                        />

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-cyan-400 font-bold mb-2">Key Features</h4>
                            <ul className="space-y-1">
                              {project.features.map((feature, index) => (
                                <li key={index} className="text-gray-300 text-sm flex items-center">
                                  <span className="text-green-400 mr-2">•</span>
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-cyan-400 font-bold mb-2">Description</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">{project.longDescription}</p>
                          </div>

                          <div>
                            <h4 className="text-cyan-400 font-bold mb-2">Technology Stack</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.tech.map((tech) => (
                                <span key={tech} className="bg-blue-400/20 text-blue-400 px-3 py-1 rounded text-sm">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-cyan-400 font-bold mb-2">Project Info</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Type:</span>
                                <span className="text-white font-semibold">{project.type}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-400">Status:</span>
                                <span className={project.status === "Live" ? "text-green-400" : "text-yellow-400"}>
                                  {project.status}
                                </span>
                              </div>
                            </div>
                          </div>

                          {project.link && (
                            <div className="pt-4">
                              <motion.a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center space-x-2 bg-green-400 text-black px-6 py-3 rounded-lg font-bold cursor-pointer w-full"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <ExternalLink className="w-5 h-5" />
                                <span>Visit Live Site</span>
                              </motion.a>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
