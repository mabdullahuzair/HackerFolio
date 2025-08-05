"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Briefcase, Calendar, MapPin, Code, TrendingUp } from "lucide-react"

const experiences = [
  {
    id: 1,
    year: "2024 - Present",
    title: "SEO Specialist",
    company: "Web20Ranker",
    location: "Remote",
    type: "Freelance",
    duration: "8+ months",
    description:
      "Specialized in creating custom SEO strategies and building high-quality Web 2.0 backlinks to improve search engine rankings.",
    achievements: [
      "Improved client website rankings by 40% on average",
      "Created 200+ high-quality Web 2.0 backlinks",
      "Developed custom SEO strategies for 15+ clients",
      "Increased organic traffic by 60% for key clients",
    ],
    skills: ["SEO", "Link Building", "Content Strategy", "Analytics", "WordPress"],
    status: "Current",
    color: "text-green-400",
    borderColor: "border-green-400/50",
  },
  {
    id: 2,
    year: "2024",
    title: "Web Designer Intern",
    company: "Levelup Solutions",
    location: "Lahore, Pakistan",
    type: "Internship",
    duration: "3 months",
    description: "Developed multiple client websites with focus on modern UI/UX design and responsive web development.",
    achievements: [
      "Designed and developed 8+ client websites",
      "Enhanced user experience across all projects",
      "Implemented responsive design principles",
      "Collaborated with senior developers on complex projects",
    ],
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "UI/UX"],
    status: "Completed",
    color: "text-cyan-400",
    borderColor: "border-cyan-400/50",
  },
]

export default function WorkExperience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)

  return (
    <section id="experience" className="min-h-screen py-20 relative">
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
              textShadow: "0 0 30px rgba(255, 100, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.9)",
              fontWeight: 900,
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
            animate={{
              textShadow: [
                "0 0 30px rgba(255, 100, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.9)",
                "0 0 40px rgba(255, 100, 0, 1), 0 6px 16px rgba(0, 0, 0, 1)",
                "0 0 30px rgba(255, 100, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.9)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            $ cat /var/log/experience
          </motion.h2>
          <div
            className="text-lg sm:text-xl md:text-2xl text-orange-400 font-bold break-words"
            style={{
              textShadow: "0 2px 6px rgba(0, 0, 0, 0.8)",
              wordBreak: "break-word",
            }}
          >
            Professional Journey & Achievements
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Experience Cards */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.3 }}
                className={`bg-black/80 border ${exp.borderColor} rounded-lg overflow-hidden backdrop-blur-md cursor-pointer`}
                whileHover={{
                  scale: 1.02,
                  boxShadow: `0 0 30px ${exp.color === "text-green-400" ? "rgba(0, 255, 0, 0.3)" : "rgba(0, 255, 255, 0.3)"}`,
                }}
                onClick={() => setSelectedExperience(selectedExperience === exp.id ? null : exp.id)}
                style={{
                  boxShadow: `0 0 20px ${exp.color === "text-green-400" ? "rgba(0, 255, 0, 0.2)" : "rgba(0, 255, 255, 0.2)"}`,
                }}
              >
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-2 sm:space-y-0">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <div className={`p-3 rounded-lg bg-black/50 ${exp.color}`}>
                        <Briefcase className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className={`text-2xl font-bold ${exp.color}`}>{exp.title}</h3>
                        <div className="flex items-center text-yellow-400 font-semibold">
                          <span className="text-lg">{exp.company}</span>
                          <span className="mx-2">•</span>
                          <span className="text-sm bg-gray-800 px-2 py-1 rounded">{exp.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                      <div className="flex items-center text-gray-300 text-sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        {exp.year}
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <MapPin className="w-4 h-4 mr-2" />
                        {exp.location}
                      </div>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-bold ${
                          exp.status === "Current" ? "bg-green-400/20 text-green-400" : "bg-blue-400/20 text-blue-400"
                        }`}
                      >
                        {exp.status}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-4 leading-relaxed font-medium">{exp.description}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="bg-blue-400/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Achievements */}
                  {selectedExperience === exp.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-700 pt-4 mt-4"
                    >
                      <div className="flex items-center mb-3">
                        <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
                        <h4 className="text-lg font-bold text-green-400">Key Achievements</h4>
                      </div>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start text-gray-300"
                          >
                            <span className="text-green-400 mr-3 mt-1">▶</span>
                            <span className="font-medium">{achievement}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center text-gray-400 text-sm">
                      <Code className="w-4 h-4 mr-2" />
                      Duration: {exp.duration}
                    </div>
                    <motion.button
                      className={`text-sm ${exp.color} hover:underline font-semibold`}
                      whileHover={{ scale: 1.05 }}
                    >
                      {selectedExperience === exp.id ? "Show Less ▲" : "Show More ▼"}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Experience Summary */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-12 bg-black/80 border border-purple-400/50 rounded-lg p-6 backdrop-blur-md text-center"
            style={{ boxShadow: "0 0 25px rgba(128, 0, 255, 0.2)" }}
          >
            <h3 className="text-2xl font-bold text-purple-400 mb-4">Experience Summary</h3>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400 mb-2">1+</div>
                <div className="text-gray-300 font-semibold">Year Experience</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">5+</div>
                <div className="text-gray-300 font-semibold">Projects Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400 mb-2">5+</div>
                <div className="text-gray-300 font-semibold">Clients Served</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
