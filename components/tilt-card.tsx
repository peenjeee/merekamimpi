"use client"

import { useRef, useEffect, type ReactNode } from "react"
import VanillaTilt from "vanilla-tilt"

interface TiltCardProps {
  children: ReactNode
  className?: string
  options?: object
}

export function TiltCard({ children, className = "", options = {} }: TiltCardProps) {
  const tiltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tiltElement = tiltRef.current
    if (!tiltElement) return

    VanillaTilt.init(tiltElement, {
      max: 15,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
      scale: 1.05,
      ...options,
    })

    return () => {
      const elementWithTilt = tiltElement as HTMLDivElement & {
        vanillaTilt?: { destroy: () => void }
      }
      elementWithTilt.vanillaTilt?.destroy()
    }
  }, [options])

  return (
    <div ref={tiltRef} className={className}>
      {children}
    </div>
  )
}
