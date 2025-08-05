"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useState, useEffect } from "react"

const navItems = [
  { name: "> home", href: "#hero", section: "hero" },
  { name: "> about", href: "#about", section: "about" },
  { name: "> skills", href: "#skills", section: "skills" },
  { name: "> projects", href: "#projects", section: "projects" },
  { name: "> contact", href: "#contact", section: "contact" },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 100], [0, 1])
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")
  const [isNavigating, setIsNavigating] = useState(false)
  const [navCommand, setNavCommand] = useState("")

  // Section detection
  useEffect(() => {
    const sections = navItems.map((item) => item.section)
    const sectionElements = sections.map((id) => document.getElementById(id))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    sectionElements.forEach((el) => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const handleNavClick = async (item: (typeof navItems)[0]) => {
    setIsNavigating(true)
    setNavCommand(`> navigating to ${item.section}...`)

    // Simulate terminal processing
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Navigate to section
    document.getElementById(item.section)?.scrollIntoView({ behavior: "smooth" })

    await new Promise((resolve) => setTimeout(resolve, 500))
    setNavCommand(`> ${item.section} loaded successfully ✅`)

    setTimeout(() => {
      setIsNavigating(false)
      setNavCommand("")
    }, 1000)
  }

  return (
    <>
      {/* Navigation Command Display */}
      {isNavigating && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 bg-black/90 border border-green-400/50 rounded-lg px-4 py-2"
        >
          <div className="text-green-400 font-mono text-sm">
            {navCommand}
            <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY }}>
              |
            </motion.span>
          </div>
        </motion.div>
      )}

      <motion.nav style={{ opacity }} className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40">
        <motion.div
          className="bg-black/80 backdrop-blur-md border border-green-400/30 rounded-lg px-6 py-3"
          whileHover={{
            boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)",
            borderColor: "rgba(0, 255, 0, 0.6)",
          }}
        >
          <div className="hidden md:flex space-x-6">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => handleNavClick(item)}
                className={`cursor-pointer transition-colors ${
                  activeSection === item.section ? "text-cyan-400 font-bold" : "text-green-400 hover:text-cyan-400"
                }`}
                whileHover={{
                  scale: 1.1,
                  textShadow: "0 0 10px rgba(0, 255, 255, 0.8)",
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
                {activeSection === item.section && (
                  <motion.div
                    className="h-0.5 bg-cyan-400 mt-1"
                    layoutId="activeSection"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-green-400 cursor-pointer relative w-6 h-6"
              whileTap={{ scale: 0.9 }}
            >
              <motion.span
                className="absolute top-1 left-0 w-6 h-0.5 bg-green-400 origin-center"
                animate={{
                  rotate: isOpen ? 45 : 0,
                  y: isOpen ? 8 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute top-3 left-0 w-6 h-0.5 bg-green-400"
                animate={{
                  opacity: isOpen ? 0 : 1,
                }}
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="absolute top-5 left-0 w-6 h-0.5 bg-green-400 origin-center"
                animate={{
                  rotate: isOpen ? -45 : 0,
                  y: isOpen ? -8 : 0,
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </div>
        </motion.div>

        {/* Enhanced Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="md:hidden mt-2 bg-black/90 backdrop-blur-md border border-green-400/30 rounded-lg p-4"
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => {
                  handleNavClick(item)
                  setIsOpen(false)
                }}
                className={`block w-full text-left py-2 cursor-pointer transition-colors ${
                  activeSection === item.section ? "text-cyan-400 font-bold" : "text-green-400 hover:text-cyan-400"
                }`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ x: 10 }}
              >
                {item.name}
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.nav>
    </>
  )
}
