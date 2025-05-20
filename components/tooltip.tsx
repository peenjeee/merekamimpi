"use client"

import { useState, useRef, useEffect, type ReactNode } from "react"
import { createPopper, type Instance } from "@popperjs/core"

interface TooltipProps {
  children: ReactNode
  content: string | ReactNode
  placement?: "top" | "right" | "bottom" | "left"
  className?: string
  contentClassName?: string
}

export function Tooltip({ children, content, placement = "top", className = "", contentClassName = "" }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const popperInstanceRef = useRef<Instance | null>(null)

  useEffect(() => {
    if (!triggerRef.current || !tooltipRef.current) return

    if (isVisible) {
      popperInstanceRef.current = createPopper(triggerRef.current, tooltipRef.current, {
        placement,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, 8],
            },
          },
        ],
      })
    } else if (popperInstanceRef.current) {
      popperInstanceRef.current.destroy()
      popperInstanceRef.current = null
    }

    return () => {
      if (popperInstanceRef.current) {
        popperInstanceRef.current.destroy()
      }
    }
  }, [isVisible, placement])

  return (
    <div className={`tooltip-container inline-block relative ${className}`}>
      <div
        ref={triggerRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        className="tooltip-trigger"
      >
        {children}
      </div>

      {isVisible && (
        <div
          ref={tooltipRef}
          className={`tooltip-content z-50 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm 
          animate__animated animate__fadeIn animate__faster ${contentClassName}`}
          style={{ animationDuration: "200ms" }}
        >
          {content}
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      )}
    </div>
  )
}
