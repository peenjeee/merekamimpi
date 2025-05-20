"use client"

import { useEffect, useState, useRef } from "react"

interface CustomCursorProps {
  color?: string
  size?: number
  hoverScale?: number
  trailEffect?: boolean
}

export function CustomCursor({
  color = "#1d365e",
  size = 20,
  hoverScale = 1.5,
  trailEffect = true,
}: CustomCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement[]>([])
  const trailCount = 5

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleHoverStart = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).tagName === "A" ||
        (e.target as HTMLElement).tagName === "BUTTON" ||
        (e.target as HTMLElement).closest("a") ||
        (e.target as HTMLElement).closest("button")
      ) {
        setIsHovering(true)
      }
    }

    const handleHoverEnd = () => {
      setIsHovering(false)
    }

    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseover", handleHoverStart)
    document.addEventListener("mouseout", handleHoverEnd)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseover", handleHoverStart)
      document.removeEventListener("mouseout", handleHoverEnd)
    }
  }, [isVisible])

  useEffect(() => {
    if (!trailEffect) return

    // Create trail elements
    const trailElements: HTMLDivElement[] = []
    for (let i = 0; i < trailCount; i++) {
      const trailElement = document.createElement("div")
      trailElement.className = "custom-cursor-trail fixed pointer-events-none z-50 rounded-full opacity-30"
      trailElement.style.width = `${size * 0.8}px`
      trailElement.style.height = `${size * 0.8}px`
      trailElement.style.backgroundColor = color
      trailElement.style.transition = "transform 0.1s, opacity 0.5s"
      trailElement.style.transform = `translate(${position.x}px, ${position.y}px) scale(${i / trailCount})`
      trailElement.style.opacity = `${1 - i / trailCount}`
      document.body.appendChild(trailElement)
      trailElements.push(trailElement)
    }

    trailRef.current = trailElements

    return () => {
      trailElements.forEach((el) => {
        document.body.removeChild(el)
      })
    }
  }, [trailEffect, color, size, trailCount])

  useEffect(() => {
    if (!trailEffect) return

    // Update trail positions with delay
    const updateTrailPositions = () => {
      trailRef.current.forEach((trail, i) => {
        setTimeout(() => {
          if (trail) {
            trail.style.transform = `translate(${position.x}px, ${position.y}px) scale(${1 - (i / trailCount) * 0.5})`
          }
        }, i * 40)
      })
    }

    updateTrailPositions()
  }, [position, trailEffect, trailCount])

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-50 rounded-full mix-blend-difference transition-transform duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        transform: `translate(${position.x}px, ${position.y}px) scale(${isHovering ? hoverScale : 1})`,
        left: `-${size / 2}px`,
        top: `-${size / 2}px`,
      }}
    />
  )
}
