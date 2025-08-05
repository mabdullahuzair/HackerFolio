"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export default function Terminal3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height

      containerRef.current.style.transform = `
        perspective(1000px) 
        rotateY(${x * 10}deg) 
        rotateX(${-y * 10}deg)
      `
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <motion.div
        ref={containerRef}
        className="w-96 h-96 relative"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2 }}
      >
        {/* 3D Cube */}
        <div className="absolute inset-0 transform-gpu preserve-3d">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-full h-full border border-green-400/20 bg-green-400/5"
              style={{
                transform: `
                  ${i === 0 ? "rotateY(0deg) translateZ(192px)" : ""}
                  ${i === 1 ? "rotateY(90deg) translateZ(192px)" : ""}
                  ${i === 2 ? "rotateY(180deg) translateZ(192px)" : ""}
                  ${i === 3 ? "rotateY(-90deg) translateZ(192px)" : ""}
                  ${i === 4 ? "rotateX(90deg) translateZ(192px)" : ""}
                  ${i === 5 ? "rotateX(-90deg) translateZ(192px)" : ""}
                `,
              }}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(0, 255, 0, 0.1)",
                  "0 0 40px rgba(0, 255, 0, 0.2)",
                  "0 0 20px rgba(0, 255, 0, 0.1)",
                ],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
