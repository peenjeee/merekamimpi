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
    if (tiltRef.current) {
      VanillaTilt.init(tiltRef.current, {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.3,
        scale: 1.05,
        ...options,
      })
    }

    return () => {
      if (tiltRef.current) {
        ;(tiltRef.current as any)?.vanillaTilt?.destroy()
      }
    }
  }, [options])

  return (
    <div ref={tiltRef} className={className}>
      {children}
    </div>
  )
}
