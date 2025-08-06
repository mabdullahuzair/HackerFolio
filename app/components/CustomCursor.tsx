"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { motion } from "framer-motion"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const requestRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })

  const updateMousePosition = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
  }, [])

  const animatePosition = useCallback(() => {
    setMousePosition(mouseRef.current)
    requestRef.current = requestAnimationFrame(animatePosition)
  }, [])

  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.classList.contains("cursor-pointer") ||
        target.closest("button") ||
        target.closest("a")
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    // Use passive listeners for better performance
    window.addEventListener("mousemove", updateMousePosition, { passive: true })
    window.addEventListener("mouseover", handleMouseOver, { passive: true })
    window.addEventListener("mousedown", handleMouseDown, { passive: true })
    window.addEventListener("mouseup", handleMouseUp, { passive: true })

    requestRef.current = requestAnimationFrame(animatePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
      window.removeEventListener("mouseover", handleMouseOver)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [updateMousePosition, animatePosition])

  // Hide on mobile devices
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  if (isMobile) return null

  return (
    <>
      {/* Main cursor dot */}
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 bg-green-400 rounded-full pointer-events-none z-[60] mix-blend-difference"
        style={{
          x: mousePosition.x - 6,
          y: mousePosition.y - 6,
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovering ? 1.5 : 1,
          backgroundColor: isClicking ? "#ff00ff" : isHovering ? "#00ffff" : "#00ff00",
        }}
        transition={{ type: "spring", stiffness: 800, damping: 30 }}
      />

      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-green-400 rounded-full pointer-events-none z-[60]"
        style={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        animate={{
          scale: isClicking ? 0.8 : isHovering ? 2 : 1,
          borderColor: isClicking ? "#ff00ff" : isHovering ? "#00ffff" : "#00ff00",
          opacity: isHovering ? 0.8 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 25 }}
      />

      {/* Trailing particles */}
      <motion.div
        className="fixed top-0 left-0 w-1 h-1 bg-cyan-400 rounded-full pointer-events-none z-[59] opacity-60"
        style={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      />
    </>
  )
}
