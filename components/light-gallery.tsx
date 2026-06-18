"use client"

import { SimpleGallery } from "@/components/simple-gallery"

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

export function LightGalleryWrapper({ items, className = "" }: LightGalleryWrapperProps) {
  return (
    <SimpleGallery
      className={className}
      items={items.map((item) => ({
        id: item.id,
        src: item.src,
        thumb: item.thumb,
        alt: item.alt,
        description: item.subHtml,
      }))}
    />
  )
}
