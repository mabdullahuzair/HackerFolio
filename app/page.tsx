"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import Projects3D from "./components/Projects3D"
import About from "./components/About"
import WorkExperience from "./components/WorkExperience"
import SkillsTerminal from "./components/SkillsTerminal"
import Contact from "./components/Contact"
import CustomCursor from "./components/CustomCursor"
import ParticleBackground from "./components/ParticleBackground"
import BootSequence from "./components/BootSequence"
import CreativeFooter from "./components/CreativeFooter"
import ResponsiveFixes from "./components/ResponsiveFixes"

export default function Portfolio() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [showBootSequence, setShowBootSequence] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBootSequence(false)
      setIsLoaded(true)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="bg-black text-green-400 font-mono overflow-x-hidden">
      <CustomCursor />
      <ResponsiveFixes />
      <ParticleBackground />

      <AnimatePresence>{showBootSequence && <BootSequence />}</AnimatePresence>

      <AnimatePresence>
        {isLoaded && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <Navbar />
            <Hero />
            <About />
            <WorkExperience />
            <SkillsTerminal />
            <Projects3D />
            <Contact />
            <CreativeFooter />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
