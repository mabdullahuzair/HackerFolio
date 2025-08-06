"use client"

import { useEffect, useRef, useState } from "react"

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [currentSection, setCurrentSection] = useState("hero")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const getParticleCount = () => {
      if (window.innerWidth < 600) {
        return 40
      } else {
        return window.innerWidth < 1200 ? 80 : 150
      }
    }

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      originalX: number
      originalY: number
    }> = []

    // Create particles
    for (let i = 0; i < getParticleCount(); i++) {
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      particles.push({
        x,
        y,
        originalX: x,
        originalY: y,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
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

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const handleMouseDown = () => {
      isMouseDown = true
      // Create ripple effect
      createRipple(mouseX, mouseY)
    }

    const handleMouseUp = () => {
      isMouseDown = false
    }

    const createRipple = (x: number, y: number) => {
      particles.forEach((particle) => {
        const dx = x - particle.x
        const dy = y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          const force = (100 - distance) / 100
          particle.vx += (dx / distance) * force * 2
          particle.vy += (dy / distance) * force * 2
        }
      })
    }

    // Section detection
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

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const currentColor = sectionColors[currentSection as keyof typeof sectionColors] || sectionColors.hero

      particles.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Apply friction
        particle.vx *= 0.99
        particle.vy *= 0.99

        // Return to original position slowly
        const returnForce = 0.01
        particle.vx += (particle.originalX - particle.x) * returnForce
        particle.vy += (particle.originalY - particle.y) * returnForce

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Mouse interaction - spider web distortion with hover
        const dx = mouseX - particle.x
        const dy = mouseY - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 150) {
          const force = (150 - distance) / 150
          if (isMouseDown) {
            // Pull towards mouse when clicking (stronger effect)
            particle.vx += dx * 0.0008 * force
            particle.vy += dy * 0.0008 * force
          } else {
            // Gentle hover distortion (weaker effect)
            particle.vx += dx * 0.0001 * force
            particle.vy += dy * 0.0001 * force
          }
        }

        // Draw particle with section-based color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        const alpha = Math.max(0.1, 1 - distance / 300)
        ctx.fillStyle = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${alpha})`
        ctx.fill()

        // Draw connections
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 120) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            const alpha = Math.max(0.1, 0.15 - distance / 400)
            ctx.strokeStyle = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Update particle original positions
      particles.length = getParticleCount()
      for (let i = particles.length; i < getParticleCount(); i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        particles.push({
          x,
          y,
          originalX: x,
          originalY: y,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
        })
      }
      particles.forEach((particle) => {
        particle.originalX = Math.random() * canvas.width
        particle.originalY = Math.random() * canvas.height
      })
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mousedown", handleMouseDown)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
    }
  }, [currentSection])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "radial-gradient(circle at center, #000400 0%, #000000 100%)" }}
    />
  )
}
