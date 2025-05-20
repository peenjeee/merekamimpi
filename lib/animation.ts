import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Fade in animation
export const fadeIn = (element: string | Element, delay = 0, duration = 1) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: "power3.out",
    },
  )
}

// Fade in from left animation
export const fadeInLeft = (element: string | Element, delay = 0, duration = 1) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      x: -100,
    },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: "power3.out",
    },
  )
}

// Fade in from right animation
export const fadeInRight = (element: string | Element, delay = 0, duration = 1) => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      x: 100,
    },
    {
      opacity: 1,
      x: 0,
      duration,
      delay,
      ease: "power3.out",
    },
  )
}

// Stagger animation for multiple elements
export const staggerAnimation = (elements: string | Element, stagger = 0.1, delay = 0) => {
  gsap.fromTo(
    elements,
    {
      opacity: 0,
      y: 30,
    },
    {
      opacity: 1,
      y: 0,
      stagger,
      delay,
      duration: 0.8,
      ease: "power2.out",
    },
  )
}

// Scroll trigger animation
export const scrollAnimation = (element: string | Element, trigger: string | Element, start = "top 80%") => {
  gsap.fromTo(
    element,
    {
      opacity: 0,
      y: 50,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      scrollTrigger: {
        trigger,
        start,
        toggleActions: "play none none none",
      },
    },
  )
}

// Scale animation
export const scaleAnimation = (element: string | Element, delay = 0, duration = 1) => {
  gsap.fromTo(
    element,
    {
      scale: 0.8,
      opacity: 0,
    },
    {
      scale: 1,
      opacity: 1,
      duration,
      delay,
      ease: "back.out(1.7)",
    },
  )
}
