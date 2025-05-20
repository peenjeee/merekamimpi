"use client"

import { useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"

interface GalleryItem {
  id: number
  src: string
  thumb: string
  alt: string
  description?: string
}

interface SimpleGalleryProps {
  items: GalleryItem[]
  className?: string
}

export function SimpleGallery({ items, className = "" }: SimpleGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item)
    document.body.style.overflow = "hidden" // Prevent scrolling when lightbox is open
  }

  const closeLightbox = () => {
    setSelectedImage(null)
    document.body.style.overflow = "" // Restore scrolling
  }

  return (
    <div className={`simple-gallery ${className}`}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="gallery-item relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => openLightbox(item)}
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

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate__animated animate__fadeIn"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
            onClick={(e) => {
              e.stopPropagation()
              closeLightbox()
            }}
          >
            <X size={24} />
          </button>
          <div
            className="relative max-w-4xl max-h-[80vh] animate__animated animate__zoomIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-full w-full">
              <Image
                src={selectedImage.src || "/placeholder.svg"}
                alt={selectedImage.alt}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] rounded-lg"
              />
            </div>
            {selectedImage.description && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 rounded-b-lg">
                <p>{selectedImage.description}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
