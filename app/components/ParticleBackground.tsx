"use client"

import { useEffect, useRef, useState } from "react"

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentSection, setCurrentSection] = useState("hero")
  const animationRef = useRef<number>()
  const lastFrameTime = useRef(0)
  const [isReducedMotion, setIsReducedMotion] = useState(false)

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    setIsReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches)
    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || isReducedMotion) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    // Optimize canvas size with device pixel ratio
    const updateCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2) // Cap at 2x for performance
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + "px"
      canvas.style.height = window.innerHeight + "px"
      ctx.scale(dpr, dpr)
    }

    updateCanvasSize()

    // Optimized particle count based on device capabilities
    const getParticleCount = () => {
      const width = window.innerWidth
      const isMobile = width < 768
      const isTablet = width < 1200

      if (isMobile) return 50 // Increased from 30
      if (isTablet) return 100 // Increased from 60
      return Math.min(150, Math.floor(width / 12)) // Increased density
    }

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      originalX: number
      originalY: number
      brightness: number
      pulsePhase: number
    }> = []

    // Create particles with enhanced properties
    const particleCount = getParticleCount()
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        brightness: Math.random() * 0.5 + 0.5,
        pulsePhase: Math.random() * Math.PI * 2,
      })
    }

    let mouseX = 0
    let mouseY = 0
    let isMouseDown = false

    const sectionColors = {
      hero: { r: 0, g: 255, b: 0 },
      about: { r: 0, g: 255, b: 255 },
      skills: { r: 255, g: 0, b: 255 },
      projects: { r: 255, g: 255, b: 0 },
      contact: { r: 255, g: 100, b: 0 },
    }

    // Throttled mouse handlers with requestAnimationFrame
    let mouseUpdateScheduled = false
    const handleMouseMove = (e: MouseEvent) => {
      if (!mouseUpdateScheduled) {
        mouseUpdateScheduled = true
        requestAnimationFrame(() => {
          mouseX = e.clientX
          mouseY = e.clientY
          mouseUpdateScheduled = false
        })
      }
    }

    const handleMouseDown = () => {
      isMouseDown = true
      createRipple(mouseX, mouseY)
    }

    const handleMouseUp = () => {
      isMouseDown = false
    }

    // Enhanced ripple effect with wave propagation
    const createRipple = (x: number, y: number) => {
      particles.forEach((particle) => {
        const dx = x - particle.x
        const dy = y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 120) {
          const force = (120 - distance) / 120
          particle.vx += (dx / distance) * force * 2.5
          particle.vy += (dy / distance) * force * 2.5
          particle.brightness = Math.min(1, particle.brightness + force * 0.5)
        }
      })
    }

    // Section detection with intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    const sections = ["hero", "about", "skills", "projects", "contact"]
    sections.forEach((id) => {
      const element = document.getElementById(id)
      if (element) observer.observe(element)
    })

    // Event listeners with passive option
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mousedown", handleMouseDown, { passive: true })
    window.addEventListener("mouseup", handleMouseUp, { passive: true })

    // Enhanced animation loop with better performance
    const animate = (currentTime: number) => {
      // Target 60fps with adaptive frame rate
      const targetFPS = 60
      const frameInterval = 1000 / targetFPS

      if (currentTime - lastFrameTime.current < frameInterval) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      const deltaTime = currentTime - lastFrameTime.current
      lastFrameTime.current = currentTime

      // Enhanced background with subtle gradient animation
      const gradientOffset = Math.sin(currentTime * 0.001) * 0.1
      ctx.fillStyle = "rgba(0, 4, 0, 0.05)"
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      const currentColor = sectionColors[currentSection as keyof typeof sectionColors] || sectionColors.hero

      // Enhanced particle system
      particles.forEach((particle, i) => {
        // Update position with smooth movement
        particle.x += particle.vx
        particle.y += particle.vy

        // Apply friction for natural movement
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Return to original position with spring-like force
        const returnForce = 0.01
        particle.vx += (particle.originalX - particle.x) * returnForce
        particle.vy += (particle.originalY - particle.y) * returnForce

        // Boundary collision with energy preservation
        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.vx *= -0.8
          particle.x = Math.max(0, Math.min(window.innerWidth, particle.x))
        }
        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.vy *= -0.8
          particle.y = Math.max(0, Math.min(window.innerHeight, particle.y))
        }

        // Enhanced mouse interaction with distance-based effects
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const force = (150 - distance) / 150
          if (isMouseDown) {
            // Stronger attraction when clicking
            particle.vx += dx * 0.0008 * force
            particle.vy += dy * 0.0008 * force
          } else {
            // Gentle repulsion on hover
            particle.vx -= dx * 0.0002 * force
            particle.vy -= dy * 0.0002 * force
          }

          // Brightness enhancement near mouse
          particle.brightness = Math.min(1, particle.brightness + force * 0.3)
        }

        // Brightness decay
        particle.brightness = Math.max(0.3, particle.brightness * 0.995)

        // Pulse animation
        particle.pulsePhase += 0.02
        const pulseIntensity = Math.sin(particle.pulsePhase) * 0.2 + 0.8

        // Enhanced particle rendering with glow effects
        const alpha = particle.brightness * pulseIntensity * Math.max(0.3, 1 - distance / 400)

        // Main particle with glow
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)

        // Create gradient for glow effect
        const gradient = ctx.createRadialGradient(particle.x, particle.y, 0, particle.x, particle.y, particle.size * 3)
        gradient.addColorStop(0, `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${alpha})`)
        gradient.addColorStop(0.5, `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${alpha * 0.5})`)
        gradient.addColorStop(1, `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0)`)

        ctx.fillStyle = gradient
        ctx.fill()

        // Core particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${alpha * 1.5})`
        ctx.fill()

        // Enhanced connection system with dynamic opacity
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)

            const connectionAlpha = Math.max(0.05, ((120 - distance) / 120) * 0.3)
            const avgBrightness = (particle.brightness + otherParticle.brightness) / 2

            // Create gradient for connection lines
            const lineGradient = ctx.createLinearGradient(particle.x, particle.y, otherParticle.x, otherParticle.y)
            lineGradient.addColorStop(
              0,
              `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${connectionAlpha * avgBrightness})`,
            )
            lineGradient.addColorStop(
              0.5,
              `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${connectionAlpha * avgBrightness * 1.5})`,
            )
            lineGradient.addColorStop(
              1,
              `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${connectionAlpha * avgBrightness})`,
            )

            ctx.strokeStyle = lineGradient
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        })
      })

      // Add subtle scan line effect
      if (Math.random() < 0.02) {
        const scanY = Math.random() * window.innerHeight
        ctx.beginPath()
        ctx.moveTo(0, scanY)
        ctx.lineTo(window.innerWidth, scanY)
        ctx.strokeStyle = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, 0.1)`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    // Optimized resize handler with debouncing
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        updateCanvasSize()

        // Redistribute particles on resize
        const newCount = getParticleCount()
        if (newCount !== particles.length) {
          particles.length = newCount
          for (let i = 0; i < newCount; i++) {
            if (!particles[i]) {
              const x = Math.random() * window.innerWidth
              const y = Math.random() * window.innerHeight
              particles[i] = {
                x,
                y,
                originalX: x,
                originalY: y,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 1,
                brightness: Math.random() * 0.5 + 0.5,
                pulsePhase: Math.random() * Math.PI * 2,
              }
            }
          }
        }

        // Update existing particles' original positions
        particles.forEach((particle) => {
          particle.originalX = Math.min(particle.originalX, window.innerWidth)
          particle.originalY = Math.min(particle.originalY, window.innerHeight)
        })
      }, 250)
    }

    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("resize", handleResize)
      observer.disconnect()

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      clearTimeout(resizeTimeout)
    }
  }, [currentSection, isReducedMotion])

  if (isReducedMotion) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{ background: "radial-gradient(circle at center, #000400 0%, #000000 100%)" }}
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{
        background: "radial-gradient(circle at center, #000400 0%, #000000 100%)",
        willChange: "auto",
      }}
    />
  )
}
