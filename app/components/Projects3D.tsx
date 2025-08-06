"use client"

import { useState, useEffect, useRef, useMemo, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
  category: string
}

const projects: Project[] = [
  {
    id: 1,
    title: "MacroMate - Nutrition Tracker",
    description:
      "A comprehensive nutrition tracking application that helps users monitor their daily caloric intake, macronutrients, and fitness goals. Features include meal planning, progress tracking, and personalized recommendations.",
    image: "/health-fitness-app-dashboard.png",
    technologies: ["React", "Node.js", "MongoDB", "Chart.js", "Express"],
    liveUrl: "https://macromate-demo.vercel.app",
    githubUrl: "https://github.com/mabdullahuzair/macromate",
    category: "Full-Stack",
  },
  {
    id: 2,
    title: "TaskFlow - Project Management",
    description:
      "A collaborative project management platform designed for teams to organize tasks, track progress, and manage deadlines efficiently. Includes real-time collaboration features and advanced analytics.",
    image: "/modern-dashboard.png",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Socket.io"],
    liveUrl: "https://taskflow-demo.vercel.app",
    githubUrl: "https://github.com/mabdullahuzair/taskflow",
    category: "Full-Stack",
  },
  {
    id: 3,
    title: "Creative Studio Portfolio",
    description:
      "A stunning portfolio website for a creative design studio, showcasing their work with smooth animations and interactive elements. Built with performance and user experience in mind.",
    image: "/creative-studio-portfolio.png",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "GSAP"],
    liveUrl: "https://creative-studio-demo.vercel.app",
    githubUrl: "https://github.com/mabdullahuzair/creative-studio",
    category: "Frontend",
  },
  {
    id: 4,
    title: "Luxury Interior Design",
    description:
      "An elegant website for a luxury interior design company, featuring a sophisticated design system, interactive galleries, and seamless user experience across all devices.",
    image: "/luxury-interior-design-website.png",
    technologies: ["Vue.js", "Nuxt.js", "SCSS", "AOS"],
    liveUrl: "https://luxury-interior-demo.vercel.app",
    githubUrl: "https://github.com/mabdullahuzair/luxury-interior",
    category: "Frontend",
  },
  {
    id: 5,
    title: "Software Agency Website",
    description:
      "A modern and professional website for a software development agency, highlighting their services, team, and portfolio with clean design and smooth interactions.",
    image: "/software-agency-website.png",
    technologies: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
    liveUrl: "https://software-agency-demo.vercel.app",
    githubUrl: "https://github.com/mabdullahuzair/software-agency",
    category: "Frontend",
  },
]

export default function Projects3D() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [terminalJustClosed, setTerminalJustClosed] = useState(false)
  const autoRotateRef = useRef<NodeJS.Timeout>()
  const blockingTimeoutRef = useRef<NodeJS.Timeout>()

  // Memoize projects for better performance
  const memoizedProjects = useMemo(() => projects, [])

  // Enhanced terminal close event handler
  useEffect(() => {
    const handleTerminalClosed = () => {
      setTerminalJustClosed(true)

      // Block interactions for 2 seconds
      if (blockingTimeoutRef.current) {
        clearTimeout(blockingTimeoutRef.current)
      }

      blockingTimeoutRef.current = setTimeout(() => {
        setTerminalJustClosed(false)
      }, 2000)
    }

    window.addEventListener("terminalClosed", handleTerminalClosed)
    return () => {
      window.removeEventListener("terminalClosed", handleTerminalClosed)
      if (blockingTimeoutRef.current) {
        clearTimeout(blockingTimeoutRef.current)
      }
    }
  }, [])

  // Optimized auto-rotation with performance considerations
  useEffect(() => {
    if (isAutoRotating && !selectedProject && !terminalJustClosed) {
      autoRotateRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % memoizedProjects.length)
      }, 4000)
    }

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current)
      }
    }
  }, [isAutoRotating, selectedProject, terminalJustClosed, memoizedProjects.length])

  // Optimized navigation functions
  const nextProject = useCallback(() => {
    if (terminalJustClosed) return
    setCurrentIndex((prev) => (prev + 1) % memoizedProjects.length)
    setIsAutoRotating(false)
  }, [terminalJustClosed, memoizedProjects.length])

  const prevProject = useCallback(() => {
    if (terminalJustClosed) return
    setCurrentIndex((prev) => (prev - 1 + memoizedProjects.length) % memoizedProjects.length)
    setIsAutoRotating(false)
  }, [terminalJustClosed, memoizedProjects.length])

  const goToProject = useCallback(
    (index: number) => {
      if (terminalJustClosed) return
      setCurrentIndex(index)
      setIsAutoRotating(false)
    },
    [terminalJustClosed],
  )

  const openProject = useCallback(
    (project: Project) => {
      if (terminalJustClosed) return
      setSelectedProject(project)
      setIsAutoRotating(false)
    },
    [terminalJustClosed],
  )

  const closeProject = useCallback(() => {
    setSelectedProject(null)
    setIsAutoRotating(true)
  }, [])

  // Keyboard navigation with performance optimization
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedProject) {
        if (e.key === "Escape") closeProject()
        return
      }

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault()
          prevProject()
          break
        case "ArrowRight":
          e.preventDefault()
          nextProject()
          break
        case "Enter":
          e.preventDefault()
          openProject(memoizedProjects[currentIndex])
          break
        case "Escape":
          setIsAutoRotating(true)
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress, { passive: false })
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [selectedProject, currentIndex, memoizedProjects, nextProject, prevProject, openProject, closeProject])

  // Optimized card positioning calculation
  const getCardTransform = useCallback(
    (index: number) => {
      const totalCards = memoizedProjects.length
      const angle = (360 / totalCards) * (index - currentIndex)
      const radius = 280
      const x = Math.sin((angle * Math.PI) / 180) * radius
      const z = Math.cos((angle * Math.PI) / 180) * radius
      const rotateY = -angle

      return {
        transform: `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg)`,
        opacity: Math.abs(angle) > 90 ? 0.3 : 1,
        zIndex: z > 0 ? Math.floor(z) : Math.floor(z) - 100,
      }
    },
    [currentIndex, memoizedProjects.length],
  )

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      {/* Dark overlay for better visibility */}
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
              textShadow: "0 0 20px rgba(255, 255, 0, 0.8), 0 4px 8px rgba(0, 0, 0, 0.8)",
              fontWeight: 900,
            }}
          >
            FEATURED PROJECTS
          </h2>
          <p
            className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto"
            style={{ textShadow: "0 2px 4px rgba(0, 0, 0, 0.8)" }}
          >
            Explore my latest work in web development, featuring modern technologies and innovative solutions
          </p>
        </motion.div>

        {/* 3D Carousel Container */}
        <div className="relative">
          <div
            className="perspective-1000 h-[600px] sm:h-[700px] flex items-center justify-center"
            style={{ perspective: "1000px" }}
          >
            <div className="relative w-full h-full carousel-3d">
              {memoizedProjects.map((project, index) => {
                const cardStyle = getCardTransform(index)
                const isActive = index === currentIndex

                return (
                  <motion.div
                    key={project.id}
                    className="absolute carousel-card cursor-pointer"
                    style={{
                      ...cardStyle,
                      left: "50%",
                      top: "50%",
                      marginLeft: "-170px", // Half of increased width
                      marginTop: "-220px", // Half of increased height
                      willChange: "transform, opacity",
                    }}
                    whileHover={
                      isActive
                        ? {
                            scale: 1.05,
                            transition: { duration: 0.3, ease: "easeOut" },
                          }
                        : {}
                    }
                    onClick={() => openProject(project)}
                    animate={{
                      scale: isActive ? 1.1 : 1,
                    }}
                    transition={{
                      duration: 0.6,
                      ease: "easeInOut",
                      scale: { duration: 0.4 },
                    }}
                  >
                    <div className="w-80 sm:w-[26rem] h-[26rem] sm:h-[32rem] bg-black/80 border border-yellow-400/50 rounded-lg overflow-hidden backdrop-blur-md">
                      <div className="relative h-1/2 overflow-hidden">
                        <Image
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                          style={{ willChange: "transform" }}
                          sizes="(max-width: 640px) 320px, 416px"
                          priority={index === currentIndex}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 right-4">
                          <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs font-bold">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 sm:p-6 h-1/2 flex flex-col justify-between">
                        <div>
                          <h3 className="text-lg sm:text-xl font-bold text-yellow-400 mb-2 line-clamp-2">
                            {project.title}
                          </h3>
                          <p className="text-gray-300 text-sm mb-4 line-clamp-3">{project.description}</p>
                        </div>

                        <div>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {project.technologies.slice(0, 3).map((tech) => (
                              <span
                                key={tech}
                                className="bg-yellow-400/20 text-yellow-400 px-2 py-1 rounded text-xs border border-yellow-400/30"
                              >
                                {tech}
                              </span>
                            ))}
                            {project.technologies.length > 3 && (
                              <span className="text-yellow-400 text-xs px-2 py-1">
                                +{project.technologies.length - 3} more
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            {project.liveUrl && (
                              <button className="flex-1 bg-yellow-400 text-black px-3 py-2 rounded text-sm font-bold hover:bg-yellow-300 transition-colors">
                                Live Demo
                              </button>
                            )}
                            {project.githubUrl && (
                              <button className="flex-1 border border-yellow-400 text-yellow-400 px-3 py-2 rounded text-sm font-bold hover:bg-yellow-400/10 transition-colors">
                                GitHub
                              </button>
                            )}
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
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prevProject}
              disabled={terminalJustClosed}
              className="bg-yellow-400/20 border border-yellow-400/50 text-yellow-400 p-3 rounded-full hover:bg-yellow-400/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ willChange: "background-color" }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="flex gap-2">
              {memoizedProjects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  disabled={terminalJustClosed}
                  className={`w-3 h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed ${
                    index === currentIndex ? "bg-yellow-400 scale-125" : "bg-yellow-400/30 hover:bg-yellow-400/50"
                  }`}
                  style={{ willChange: "background-color, transform" }}
                />
              ))}
            </div>

            <button
              onClick={nextProject}
              disabled={terminalJustClosed}
              className="bg-yellow-400/20 border border-yellow-400/50 text-yellow-400 p-3 rounded-full hover:bg-yellow-400/30 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ willChange: "background-color" }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Auto-rotation indicator */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className="text-yellow-400/60 hover:text-yellow-400 transition-colors text-sm"
            >
              {isAutoRotating ? "⏸️ Pause Auto-rotation" : "▶️ Resume Auto-rotation"}
            </button>
          </div>

          {/* Keyboard hints */}
          <div className="text-center mt-4 text-gray-400 text-sm">
            Use ← → arrow keys to navigate • Enter to view details • ESC to resume auto-rotation
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeProject}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-black/95 border border-yellow-400/50 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              style={{
                boxShadow: "0 0 30px rgba(255, 255, 0, 0.3)",
                willChange: "transform, opacity",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <button
                  onClick={closeProject}
                  className="absolute top-4 right-4 z-10 bg-black/80 text-yellow-400 p-2 rounded-full hover:bg-black transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="relative h-64 sm:h-80">
                  <Image
                    src={selectedProject.image || "/placeholder.svg"}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 896px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>

                <div className="p-6 sm:p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-yellow-400 mb-2">{selectedProject.title}</h3>
                      <span className="bg-yellow-400 text-black px-3 py-1 rounded text-sm font-bold">
                        {selectedProject.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed">{selectedProject.description}</p>

                  <div className="mb-6">
                    <h4 className="text-lg font-bold text-yellow-400 mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-yellow-400/20 text-yellow-400 px-3 py-2 rounded border border-yellow-400/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    {selectedProject.liveUrl && (
                      <a
                        href={selectedProject.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-yellow-400 text-black px-6 py-3 rounded font-bold text-center hover:bg-yellow-300 transition-colors"
                      >
                        View Live Demo
                      </a>
                    )}
                    {selectedProject.githubUrl && (
                      <a
                        href={selectedProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 border border-yellow-400 text-yellow-400 px-6 py-3 rounded font-bold text-center hover:bg-yellow-400/10 transition-colors"
                      >
                        View Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
