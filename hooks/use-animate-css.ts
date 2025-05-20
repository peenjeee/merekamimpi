"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"

interface UseAnimateCssOptions {
  animation: string
  duration?: number
  delay?: number
  triggerOnce?: boolean
  threshold?: number
}

export function useAnimateCss({
  animation,
  duration = 1,
  delay = 0,
  triggerOnce = true,
  threshold = 0.1,
}: UseAnimateCssOptions) {
  const [isAnimated, setIsAnimated] = useState(false)
  const { ref, inView } = useInView({
    triggerOnce,
    threshold,
  })

  useEffect(() => {
    if (inView && !isAnimated) {
      setIsAnimated(true)
    } else if (!triggerOnce && !inView) {
      setIsAnimated(false)
    }
  }, [inView, isAnimated, triggerOnce])

  const animationClasses = isAnimated ? `animate__animated animate__${animation}` : "opacity-0"

  const style = {
    animationDuration: `${duration}s`,
    animationDelay: `${delay}s`,
  }

  return { ref, style, animationClasses, isAnimated }
}
