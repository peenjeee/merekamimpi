"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { useInView } from "react-intersection-observer"

interface AnimatedElementProps {
  children: ReactNode
  animation: string
  delay?: number
  duration?: number
  className?: string
  triggerOnce?: boolean
  threshold?: number
}

export function AnimatedElement({
  children,
  animation,
  delay = 0,
  duration = 1,
  className = "",
  triggerOnce = true,
  threshold = 0.1,
}: AnimatedElementProps) {
  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
  })

  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    if (inView) {
      element.style.visibility = "visible"
      element.classList.add("animate__animated", `animate__${animation}`)
    } else if (!triggerOnce) {
      element.classList.remove("animate__animated", `animate__${animation}`)
      // Optional: hide the element when out of view if not triggerOnce
      // element.style.visibility = 'hidden'
    }
  }, [inView, animation, triggerOnce])

  return (
    <div
      ref={(node) => {
        // This assigns the ref to both the react-intersection-observer and our local ref
        if (node) {
          ref(node)
          elementRef.current = node
        }
      }}
      className={className}
      style={{
        visibility: "hidden",
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  )
}
