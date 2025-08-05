"use client"

import { useEffect, useState } from "react"

export default function ResponsiveFixes() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) {
      // Add mobile-specific styles
      const style = document.createElement("style")
      style.textContent = `
        /* Mobile text overflow fixes */
        .text-6xl, .text-7xl, .text-8xl {
          font-size: 2.5rem !important;
          line-height: 1.2 !important;
        }
        
        .text-5xl {
          font-size: 2rem !important;
          line-height: 1.2 !important;
        }
        
        .text-4xl {
          font-size: 1.75rem !important;
          line-height: 1.2 !important;
        }
        
        .text-2xl {
          font-size: 1.25rem !important;
          line-height: 1.3 !important;
        }
        
        .text-xl {
          font-size: 1.1rem !important;
          line-height: 1.4 !important;
        }
        
        /* Container padding fixes */
        .container {
          padding-left: 1rem !important;
          padding-right: 1rem !important;
        }
        
        /* Terminal fixes */
        .terminal-content {
          font-size: 0.75rem !important;
          padding: 0.5rem !important;
        }
        
        /* Card spacing fixes */
        .space-y-6 > * + * {
          margin-top: 1rem !important;
        }
        
        .space-y-8 > * + * {
          margin-top: 1.5rem !important;
        }
        
        /* Grid fixes */
        .grid-cols-2 {
          grid-template-columns: 1fr !important;
        }
        
        .md\\:grid-cols-2 {
          grid-template-columns: 1fr !important;
        }
        
        .md\\:grid-cols-3 {
          grid-template-columns: 1fr !important;
        }
        
        /* Flex wrap fixes */
        .flex-wrap {
          flex-wrap: wrap !important;
        }
        
        /* Text wrapping */
        .whitespace-nowrap {
          white-space: normal !important;
        }
        
        /* Button sizing */
        .px-6 {
          padding-left: 1rem !important;
          padding-right: 1rem !important;
        }
        
        .py-3 {
          padding-top: 0.5rem !important;
          padding-bottom: 0.5rem !important;
        }
        
        /* Modal fixes */
        .max-w-4xl {
          max-width: 95vw !important;
        }
        
        .max-w-6xl {
          max-width: 95vw !important;
        }
        
        /* 3D carousel mobile fixes */
        .perspective-1000 {
          perspective: 300px !important;
        }
        
        .w-80 {
          width: 280px !important;
        }
        
        .h-96 {
          height: 320px !important;
        }
        
        /* Hide complex animations on mobile */
        @media (max-width: 768px) {
          .animate-pulse,
          .animate-spin {
            animation: none !important;
          }
          
          .motion-reduce {
            animation: none !important;
            transition: none !important;
          }
        }
      `

      document.head.appendChild(style)

      return () => {
        document.head.removeChild(style)
      }
    }
  }, [isMobile])

  return null
}
