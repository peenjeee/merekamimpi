"use client"
import Image from "next/image"
import { Splide, SplideSlide } from "@splidejs/react-splide"
import "@splidejs/react-splide/css"

interface SplideCarouselProps {
  images: {
    src: string
    alt: string
  }[]
  options?: any
  className?: string
}

export function SplideCarousel({ images, options = {}, className = "" }: SplideCarouselProps) {
  const defaultOptions = {
    type: "loop",
    perPage: 3,
    perMove: 1,
    gap: "1rem",
    pagination: true,
    arrows: true,
    autoplay: true,
    interval: 4000,
    pauseOnHover: true,
    breakpoints: {
      768: {
        perPage: 2,
      },
      480: {
        perPage: 1,
      },
    },
  }

  const carouselOptions = { ...defaultOptions, ...options }

  return (
    <div className={`splide-carousel-container ${className}`}>
      <Splide options={carouselOptions} aria-label="Image Carousel">
        {images.map((image, index) => (
          <SplideSlide key={index}>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover transition-transform hover:scale-105 duration-500"
              />
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </div>
  )
}
