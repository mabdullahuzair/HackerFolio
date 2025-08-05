"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { ExternalLink, Code, Smartphone, Globe, ArrowRight } from "lucide-react"

const projects = [
  {
    id: 1,
    name: "MacroMate",
    description:
      "AI-powered health and fitness web app with personalized nutrition tracking and workout recommendations",
    longDescription:
      "A comprehensive health platform that uses machine learning to provide personalized meal plans, track macronutrients, and suggest optimal workout routines based on user goals and preferences.",
    tech: ["React", "Node.js", "MongoDB", "AI/ML", "Express.js"],
    status: "In Development",
    type: "Full-Stack Web App",
    image: "/health-fitness-app-dashboard.png",
    features: ["AI Meal Planning", "Workout Tracking", "Progress Analytics", "Social Features"],
    category: "web",
  },
  {
    id: 2,
    name: "XRevStudio.com",
    description: "Modern portfolio website for a creative studio with stunning animations and responsive design",
    longDescription:
      "A visually striking portfolio website featuring smooth animations, interactive elements, and a modern design system that showcases the studio's creative work effectively.",
    tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "Responsive Design"],
    status: "Live",
    type: "Portfolio Website",
    link: "https://xrevstudio.com",
    image: "/creative-studio-portfolio.png",
    features: ["Smooth Animations", "Responsive Design", "Interactive Gallery", "Contact Forms"],
    category: "web",
  },
  {
    id: 3,
    name: "ObecheInterior.com",
    description: "Elegant landing page for an interior design company with modern aesthetics",
    longDescription:
      "A sophisticated landing page that captures the essence of luxury interior design through carefully crafted visuals, smooth scrolling, and an intuitive user experience.",
    tech: ["HTML5", "CSS3", "Bootstrap", "jQuery", "AOS"],
    status: "Live",
    type: "Landing Page",
    link: "https://obecheinterior.com",
    image: "/luxury-interior-design-website.png",
    features: ["Modern Design", "Image Gallery", "Contact Integration", "SEO Optimized"],
    category: "web",
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
  },
]

const categories = [
  { id: "all", name: "All Projects", icon: <Globe className="w-4 h-4" /> },
  { id: "web", name: "Web Apps", icon: <Code className="w-4 h-4" /> },
  { id: "mobile", name: "Mobile", icon: <Smartphone className="w-4 h-4" /> },
]

export default function ProjectsShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)

  const filteredProjects =
    activeCategory === "all" ? projects : projects.filter((project) => project.category === activeCategory)

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
          <div className="text-xl text-yellow-400">Featured Work & Creations</div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="flex justify-center mb-12"
        >
          <div className="bg-black/80 border border-green-400/30 rounded-lg p-2 backdrop-blur-sm">
            <div className="flex space-x-2">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    activeCategory === category.id
                      ? "bg-green-400 text-black font-bold"
                      : "text-green-400 hover:bg-green-400/20"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto" layout>
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-black/80 border border-gray-600 rounded-lg overflow-hidden hover:border-green-400 transition-colors group backdrop-blur-sm"
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0, 255, 0, 0.2)" }}
              onHoverStart={() => setHoveredProject(project.id)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden h-48">
                <motion.img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <motion.button
                    onClick={() => setSelectedProject(project.id)}
                    className="bg-green-400 text-black px-6 py-2 rounded-lg font-bold cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    View Details
                  </motion.button>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      project.status === "Live" ? "bg-green-400 text-black" : "bg-yellow-400 text-black"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-green-400">{project.name}</h3>
                  <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">{project.type}</span>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{project.description}</p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.slice(0, 4).map((tech) => (
                    <span key={tech} className="bg-blue-400/20 text-blue-400 px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                  {project.tech.length > 4 && (
                    <span className="text-gray-400 text-xs">+{project.tech.length - 4} more</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3">
                  {project.link && (
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-green-400 text-black px-4 py-2 rounded-lg text-sm font-bold cursor-pointer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Demo</span>
                    </motion.a>
                  )}

                  <motion.button
                    onClick={() => setSelectedProject(project.id)}
                    className="flex items-center space-x-2 border border-green-400 text-green-400 px-4 py-2 rounded-lg text-sm cursor-pointer hover:bg-green-400/10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>Details</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

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
              className="bg-black/95 border border-green-400/50 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
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
                                <span className="text-white">{project.type}</span>
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
