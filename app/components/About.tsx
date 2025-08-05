"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react"

const education = [
  {
    year: "2022-2026",
    degree: "Bachelor of Software Engineering",
    institution: "University of Central Punjab",
    location: "Lahore, Pakistan",
    details: "CGPA: 3.6/4.0 | Currently pursuing degree",
    description:
      "Comprehensive study of software development, algorithms, data structures, and modern programming paradigms.",
    status: "In Progress",
  },
  {
    year: "2019-2021",
    degree: "FSc Pre Engineering",
    institution: "Government College of Science",
    location: "Lahore, Pakistan",
    details: "Foundation in Mathematics, Physics, and Chemistry",
    description: "Strong foundation in mathematics and sciences, preparing for engineering studies.",
    status: "Completed",
  },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="about" className="min-h-screen py-20 relative">
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
              textShadow: "0 0 30px rgba(0, 255, 255, 0.8), 0 4px 12px rgba(0, 0, 0, 0.9)",
              fontWeight: 900,
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
            animate={{
              textShadow: [
                "0 0 30px rgba(0, 255, 255, 0.8), 0 4px 12px rgba(0, 0, 0, 0.9)",
                "0 0 40px rgba(0, 255, 255, 1), 0 6px 16px rgba(0, 0, 0, 1)",
                "0 0 30px rgba(0, 255, 255, 0.8), 0 4px 12px rgba(0, 0, 0, 0.9)",
              ],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            $ whoami --education
          </motion.h2>
          <div
            className="text-lg sm:text-xl md:text-2xl text-cyan-400 font-bold break-words"
            style={{
              textShadow: "0 2px 6px rgba(0, 0, 0, 0.8)",
              wordBreak: "break-word",
            }}
          >
            Academic Journey & Learning Path
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-start">
            {/* Personal Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1 }}
              className="space-y-6"
            >
              <div
                className="bg-black/80 border border-green-400/50 rounded-lg p-6 backdrop-blur-md"
                style={{
                  boxShadow: "0 0 25px rgba(0, 255, 0, 0.2)",
                }}
              >
                <div className="text-green-400 mb-4 font-bold text-lg">$ cat about.txt</div>
                <div className="text-white leading-relaxed font-medium">
                  I'm a passionate Software Engineering student at the University of Central Punjab with a strong
                  foundation in problem-solving and full-stack web development. My journey in technology began with
                  curiosity and has evolved into expertise across multiple domains including web development, machine
                  learning, and software architecture.
                </div>
              </div>

              <motion.div
                className="bg-black/80 border border-cyan-400/50 rounded-lg p-6 backdrop-blur-md"
                whileHover={{ boxShadow: "0 0 30px rgba(0, 255, 255, 0.3)" }}
                style={{ boxShadow: "0 0 25px rgba(0, 255, 255, 0.2)" }}
              >
                <div className="text-cyan-400 mb-4 font-bold text-lg">$ ls -la ~/interests</div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-green-400 font-semibold flex items-center">
                    <span className="mr-2">🧩</span> Problem Solving
                  </div>
                  <div className="text-green-400 font-semibold flex items-center">
                    <span className="mr-2">🚀</span> Full-Stack Development
                  </div>
                  <div className="text-green-400 font-semibold flex items-center">
                    <span className="mr-2">🤖</span> Machine Learning
                  </div>
                  <div className="text-green-400 font-semibold flex items-center">
                    <span className="mr-2">🎨</span> UI/UX Design
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Education Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="space-y-8">
                {education.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: index * 0.3 }}
                    className="relative pl-8 border-l-2 border-green-400/50"
                  >
                    <div className="absolute -left-3 top-0 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-3 h-3 text-black" />
                    </div>

                    <motion.div
                      className="bg-black/80 border border-green-400/50 rounded-lg p-6 backdrop-blur-md"
                      whileHover={{
                        scale: 1.02,
                        boxShadow: "0 0 30px rgba(0, 255, 0, 0.3)",
                      }}
                      style={{ boxShadow: "0 0 20px rgba(0, 255, 0, 0.2)" }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center text-cyan-400 font-bold text-sm">
                          <Calendar className="w-4 h-4 mr-2" />
                          {item.year}
                        </div>
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-bold ${
                            item.status === "Completed"
                              ? "bg-green-400/20 text-green-400"
                              : "bg-yellow-400/20 text-yellow-400"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <h3 className="text-green-400 text-xl font-bold mb-2">{item.degree}</h3>

                      <div className="flex items-center text-yellow-400 text-sm mb-2 font-semibold">
                        <Award className="w-4 h-4 mr-2" />
                        {item.institution}
                      </div>

                      <div className="flex items-center text-gray-300 text-sm mb-3">
                        <MapPin className="w-4 h-4 mr-2" />
                        {item.location}
                      </div>

                      <div className="text-cyan-400 text-sm font-semibold mb-2">{item.details}</div>
                      <div className="text-gray-300 text-sm leading-relaxed">{item.description}</div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
