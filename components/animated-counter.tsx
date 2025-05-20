"use client"

import { useEffect, useRef, useState } from "react"
import { useInView } from "react-intersection-observer"

interface AnimatedCounterProps {
  end: number
  duration?: number
  suffix?: string
  className?: string
}

export function AnimatedCounter({ end, duration = 2000, suffix = "", className = "" }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  })

  useEffect(() => {
    if (inView) {
      const start = 0
      const step = Math.ceil(end / (duration / 16)) // 16ms is roughly 60fps
      let current = start
      countRef.current = start

      const timer = setInterval(() => {
        current += step
        if (current >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(current)
        }
      }, 16)

      return () => clearInterval(timer)
    }
    return () => {}
  }, [inView, end, duration])

  return (
    <span ref={ref} className={className}>
      {count}
      {suffix}
    </span>
  )
}
