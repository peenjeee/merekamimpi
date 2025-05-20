"use client"

import { useEffect, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToTop } from "./scroll-to-top"
import { AOSProvider } from "./aos-provider"

interface AnimationProviderProps {
  children: ReactNode
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  useEffect(() => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger)

    // Refresh ScrollTrigger when the page is fully loaded
    const refreshScrollTrigger = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener("load", refreshScrollTrigger)
    return () => window.removeEventListener("load", refreshScrollTrigger)
  }, [])

  return (
    <AOSProvider>
      {children}
      <ScrollToTop />
    </AOSProvider>
  )
}
