"use client"

import { useEffect, useRef, useState } from "react"

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const mousePos = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    // Check if device supports hover (desktop)
    const hasHover = window.matchMedia("(hover: hover)").matches
    if (!hasHover) return

    setIsVisible(true)

    // Optimized mouse tracking with requestAnimationFrame
    let mouseUpdateScheduled = false
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY }

      if (!mouseUpdateScheduled) {
        mouseUpdateScheduled = true
        requestAnimationFrame(() => {
          updateCursorPosition()
          mouseUpdateScheduled = false
        })
      }
    }

    const updateCursorPosition = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`
      }
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Event listeners with passive option for better performance
    document.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mousedown", handleMouseDown, { passive: true })
    document.addEventListener("mouseup", handleMouseUp, { passive: true })
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true })
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true })

    // Trail animation with optimized rendering
    const animateTrail = () => {
      trailRef.current.forEach((trail, index) => {
        if (trail) {
          const delay = index * 0.05
          const targetX = mousePos.current.x - delay * 20
          const targetY = mousePos.current.y - delay * 20

          trail.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
          trail.style.opacity = `${Math.max(0, 0.8 - index * 0.15)}`
        }
      })

      animationRef.current = requestAnimationFrame(animateTrail)
    }

    animateTrail()

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-6 h-6 pointer-events-none z-[60] transition-transform duration-100 ease-out ${
          isClicking ? "scale-75" : "scale-100"
        }`}
        style={{
          transform: "translate3d(0, 0, 0)",
          willChange: "transform",
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-green-400 bg-green-400/20 shadow-lg shadow-green-400/50" />
      </div>

      {/* Trail particles */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) trailRef.current[i] = el
          }}
          className="fixed top-0 left-0 w-2 h-2 pointer-events-none z-[59] rounded-full bg-green-400/60"
          style={{
            transform: "translate3d(0, 0, 0)",
            willChange: "transform, opacity",
          }}
        />
      ))}
    </>
  )
}
