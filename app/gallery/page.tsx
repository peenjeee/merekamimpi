"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ParticleBackground } from "@/components/particle-background"
import { fadeIn, staggerAnimation } from "@/lib/animation"

// Import the new components at the top of the file
import { SplideCarousel } from "@/components/splide-carousel"
import { AnimatedElement } from "@/components/animated-element"
import { Tooltip } from "@/components/tooltip"
import { showToast } from "@/utils/sweet-alert"
import { SimpleGallery } from "@/components/simple-gallery" // Use SimpleGallery instead
import { Navbar } from "@/components/navbar"
import { SEOHead } from "@/components/seo-head"
import { JsonLd } from "@/components/json-ld"

export default function GalleryPage() {
  // Refs for animation targets
  const headerRef = useRef<HTMLDivElement>(null)
  const filtersRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)

  // Initialize animations
  useEffect(() => {
    if (headerRef.current) {
      fadeIn(headerRef.current, 0.2, 1)
    }
    if (filtersRef.current) {
      fadeIn(filtersRef.current, 0.4, 1)
    }
    if (galleryRef.current) {
      staggerAnimation(galleryRef.current.querySelectorAll(".gallery-item"), 0.1, 0.6)
    }
  }, [])

  // Categories for filtering
  const categories = [
    { id: "all", name: "Semua" },
    { id: "wisuda", name: "Wisuda" },
    { id: "produk", name: "Produk" },
    { id: "event", name: "Event" },
    { id: "potret", name: "Potret" },
  ]

  // Gallery items - in a real implementation, this would come from a database or CMS
  const galleryItems = [
    {
      id: 1,
      title: "Produk Rambut",
      category: "produk",
      description: "Produk rambut yang bagus",
      imageUrl: "/galeri/galeri1.jpg?height=800&width=800&text=Produk+1",
    },
    {
      id: 2,
      title: "Wisuda Kelulusan",
      category: "wisuda",
      description: "Momen wisuda yang indah",
      imageUrl: "/galeri/galeri2.jpg?height=800&width=800&text=Wisuda+1",
    },
    {
      id: 3,
      title: "Produk Coca Cola",
      category: "produk",
      description: "Produk coca cola yang bagus",
      imageUrl: "/galeri/galeri3.jpg?height=800&width=800&text=Produk+2",
    },
    {
      id: 4,
      title: "Wisuda Kelulusan",
      category: "wisuda",
      description: "Momen wisuda yang indah",
      imageUrl: "/galeri/galeri4.jpg?height=800&width=800&text=Potret+1",
    },
    {
      id: 5,
      title: "Wedding Event",
      category: "event",
      description: "Event pernikahan di Yogyakarta",
      imageUrl: "/galeri/galeri5.jpg?height=800&width=800&text=Wisuda+2",
    },
    {
      id: 6,
      title: "Produk Kuliner",
      category: "produk",
      description: "Fotografi kuliner untuk restoran lokal",
      imageUrl: "/galeri/galeri6.jpg?height=800&width=800&text=Produk+2",
    },
    {
      id: 7,
      title: "Wisuda Universitas Gadjah Mada",
      category: "wisuda",
      description: "Momen wisuda di Yogyakarta",
      imageUrl: "/galeri/galeri7.jpg?height=800&width=800&text=Event+2",
    },
    {
      id: 8,
      title: "Potret Model",
      category: "potret",
      description: "Model perempuan di Yogyakarta",
      imageUrl: "/galeri/galeri8.jpg?height=800&width=800&text=Potret+2",
    },
    {
      id: 9,
      title: "Potret Kesenian",
      category: "potret",
      description: "Potret seniman di Yogyakarta",
      imageUrl: "/galeri/galeri9.jpg?height=800&width=800&text=Wisuda+3",
    },
  ]

  const [activeCategory, setActiveCategory] = useState("all")
  const whatsappLink = "https://api.whatsapp.com/send?phone=6285975200852"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Filter gallery items based on active category
  const filteredItems =
    activeCategory === "all" ? galleryItems : galleryItems.filter((item) => item.category === activeCategory)

  // Animation effect when changing category
  useEffect(() => {
    if (galleryRef.current) {
      const items = galleryRef.current.querySelectorAll(".gallery-item")
      items.forEach((item) => {
        item.classList.add("opacity-0", "translate-y-4")
        setTimeout(() => {
          item.classList.remove("opacity-0", "translate-y-4")
        }, 50)
      })
      staggerAnimation(items, 0.1, 0.1)
    }
  }, [activeCategory])

  // Create structured data for the gallery page
  const galleryStructuredData = {
    "@type": "ImageGallery",
    name: "Galeri Karya Merekamimpi Photography",
    description: "Koleksi foto-foto terbaik dari berbagai proyek fotografi Merekamimpi di Yogyakarta",
    url: "https://merekamimpi.com/gallery",
    image: galleryItems.map((item) => item.imageUrl),
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Components */}
      <SEOHead
        title="Galeri Karya Merekamimpi - Fotografi Profesional Yogyakarta"
        description="Lihat koleksi foto-foto terbaik dari berbagai proyek fotografi Merekamimpi di Yogyakarta, termasuk foto wisuda, produk, event, dan potret."
        canonicalUrl="https://merekamimpi.com/gallery"
        structuredData={galleryStructuredData}
        structuredDataType="Article"
      />

      <JsonLd
        type="BreadcrumbList"
        data={{
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Beranda",
              item: "https://merekamimpi.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Galeri",
              item: "https://merekamimpi.com/gallery",
            },
          ],
        }}
      />

      <ParticleBackground />
      <Navbar isHomePage={false} />

      <main className="container py-12">
        <div className="mb-8" ref={headerRef}>
          <Link href="/" className="inline-flex items-center text-[#1d365e] hover:underline mb-4">
            <ChevronLeft className="h-4 w-4 mr-1" /> Kembali ke Beranda
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1d365e]">Galeri Karya Merekamimpi</h1>
          <p className="text-lg text-gray-600 mt-2">Koleksi foto-foto terbaik dari berbagai proyek fotografi kami</p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap gap-2 mb-8" ref={filtersRef}>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category.id
                  ? "bg-[#1d365e] text-white"
                  : "bg-white border border-gray-200 hover:bg-[#1d365e]/10"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Featured Carousel */}
        <div className="mb-12" data-aos="fade-up">
          <h3 className="text-2xl font-bold text-[#1d365e] mb-6">Featured Works</h3>
          <SplideCarousel
            images={galleryItems.slice(0, 9).map((item) => ({
              src: item.imageUrl,
              alt: item.title,
            }))}
            options={{
              perPage: 3,
              autoplay: true,
              interval: 3000,
            }}
          />
        </div>

        {/* Gallery Grid with Simple Gallery */}
        <div className="mb-12" ref={galleryRef}>
          <AnimatedElement animation="fadeIn" duration={1.2} className="mb-6">
            <h3 className="text-2xl font-bold text-[#1d365e]">Browse All Photos</h3>
          </AnimatedElement>

          <SimpleGallery
            items={filteredItems.map((item) => ({
              id: item.id,
              src: item.imageUrl,
              thumb: item.imageUrl,
              alt: item.title,
              description: item.description,
            }))}
          />
        </div>

        {/* <div className="text-center mt-12">
          <Tooltip content="Click to contact us about these photos">
            <button
              onClick={() => {
                showToast("Contact form is ready!", "success")
              }}
              className="bg-[#1d365e] hover:bg-[#0b2643] text-white px-6 py-3 rounded-lg font-medium inline-flex items-center animate__animated animate__pulse animate__infinite"
              style={{ animationDuration: "2s" }}
            >
              <span>Contact Us About These Photos</span>
              <ChevronRight className="ml-2 h-4 w-4" />
            </button>
          </Tooltip>
        </div> */}
      </main>

      <footer className="bg-[#0b2643] text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Merekamimpi</h3>
              <p className="text-sm text-gray-300 mb-4">
                Merekam momen, mewujudkan mimpi.
                <br />
                Jasa fotografi profesional di Yogyakarta.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/merekamimpi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a
                  href="https://linktr.ee/merekamimpi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-globe"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" x2="22" y1="12" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@merekamimpi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-brand-tiktok"
                  >
                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
                  </svg>
                </a>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 21l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Layanan</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="/?service=wisuda#layanan" className="hover:text-white">
                    Fotografi Wisuda
                  </a>
                </li>
                <li>
                  <a href="/?service=produk#layanan" className="hover:text-white">
                    Fotografi Produk
                  </a>
                </li>
                <li>
                  <a href="/?service=event#layanan" className="hover:text-white">
                    Fotografi Event
                  </a>
                </li>
                <li>
                  <a href="/?service=potret#layanan" className="hover:text-white">
                    Fotografi Potret
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Tautan</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <Link href="/#beranda" className="hover:text-white">
                    Beranda
                  </Link>
                </li>
                <li>
                  <Link href="/#tentang" className="hover:text-white">
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="/#portofolio" className="hover:text-white">
                    Portofolio
                  </Link>
                </li>
                <li>
                  <Link href="/#kontak" className="hover:text-white">
                    Kontak
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Kontak</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  Yogyakarta, Indonesia
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  merekamimpi@gmail.com
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  +62 859 7520 0852
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 21l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  WhatsApp: +62 859 7520 0852
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            © 2025 Merekamimpi. Hak Cipta Dilindungi.
          </div>
        </div>
      </footer>
    </div>
  )
}
