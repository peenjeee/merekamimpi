"use client"

import { useEffect, type ReactNode } from "react"
import AOS from "aos"

interface AOSProviderProps {
  children: ReactNode
}

export function AOSProvider({ children }: AOSProviderProps) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: "ease-out-cubic",
      offset: 50,
    })

    // Refresh AOS when window is resized
    window.addEventListener("resize", () => {
      AOS.refresh()
    })

    return () => {
      window.removeEventListener("resize", () => {
        AOS.refresh()
      })
    }
  }, [])

  return <>{children}</>
}
