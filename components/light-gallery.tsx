"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import dynamic from "next/dynamic"

// Define the interface for gallery items
interface GalleryItem {
  id: number
  src: string
  thumb: string
  alt: string
  subHtml?: string
}

interface LightGalleryWrapperProps {
  items: GalleryItem[]
  className?: string
}

// Dynamically import LightGallery with SSR disabled
const LightGalleryComponent = dynamic(() => import("lightgallery/react").then((mod) => mod.default), {
  ssr: false,
})

export function LightGalleryWrapper({ items, className = "" }: LightGalleryWrapperProps) {
  const [mounted, setMounted] = useState(false)
  const lightGalleryRef = useRef<any>(null)

  // Only load plugins on the client side
  const [plugins, setPlugins] = useState<any[]>([])

  useEffect(() => {
    // Import plugins only on client side
    const loadPlugins = async () => {
      const lgThumbnail = (await import("lightgallery/plugins/thumbnail")).default
      const lgZoom = (await import("lightgallery/plugins/zoom")).default
      setPlugins([lgThumbnail, lgZoom])
    }

    loadPlugins()
    setMounted(true)
  }, [])

  const onInit = () => {
    console.log("LightGallery has been initialized")
  }

  if (!mounted) {
    // Return a placeholder with the same structure until client-side rendering is ready
    return (
      <div className={`light-gallery-wrapper ${className}`}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="gallery-item relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            >
              <Image
                src={item.thumb || "/placeholder.svg"}
                alt={item.alt}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">View Larger</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`light-gallery-wrapper ${className}`}>
      {plugins.length > 0 && (
        <LightGalleryComponent
          elementClassNames="grid grid-cols-2 md:grid-cols-3 gap-4"
          onInit={onInit}
          speed={500}
          plugins={plugins}
          mode="lg-fade"
        >
          {items.map((item) => (
            <a
              key={item.id}
              data-src={item.src}
              data-sub-html={item.subHtml}
              className="gallery-item relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            >
              <Image
                src={item.thumb || "/placeholder.svg"}
                alt={item.alt}
                fill
                className="object-cover transition-transform group-hover:scale-105 duration-500"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-medium bg-black/50 px-3 py-1 rounded-full">View Larger</span>
              </div>
            </a>
          ))}
        </LightGalleryComponent>
      )}
    </div>
  )
}
