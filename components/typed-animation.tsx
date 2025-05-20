"use client"

import { useEffect, useRef } from "react"
import Typed from "typed.js"

interface TypedAnimationProps {
  strings: string[]
  typeSpeed?: number
  backSpeed?: number
  backDelay?: number
  loop?: boolean
  className?: string
}

export function TypedAnimation({
  strings,
  typeSpeed = 50,
  backSpeed = 30,
  backDelay = 1500,
  loop = true,
  className = "",
}: TypedAnimationProps) {
  const el = useRef<HTMLSpanElement>(null)
  const typed = useRef<Typed | null>(null)

  useEffect(() => {
    if (el.current) {
      typed.current = new Typed(el.current, {
        strings,
        typeSpeed,
        backSpeed,
        backDelay,
        loop,
        cursorChar: "|",
        smartBackspace: true,
      })
    }

    return () => {
      typed.current?.destroy()
    }
  }, [strings, typeSpeed, backSpeed, backDelay, loop])

  return <span ref={el} className={className}></span>
}
