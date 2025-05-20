"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface NavbarProps {
  isHomePage?: boolean
}

export function Navbar({ isHomePage = true }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const whatsappLink = "https://api.whatsapp.com/send?phone=6285975200852"

  // Determine the correct href for links based on whether we're on the home page
  const getHref = (anchor: string) => {
    return isHomePage ? `#${anchor}` : `/#${anchor}`
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-[#1d365e]">Merekamimpi</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          <Link href={getHref("beranda")} className="text-sm font-medium hover:text-[#1d365e] transition-colors">
            Beranda
          </Link>
          <Link href={getHref("tentang")} className="text-sm font-medium hover:text-[#1d365e] transition-colors">
            Tentang Kami
          </Link>
          <Link href={getHref("portofolio")} className="text-sm font-medium hover:text-[#1d365e] transition-colors">
            Portofolio
          </Link>
          <Link href={getHref("kontak")} className="text-sm font-medium hover:text-[#1d365e] transition-colors">
            Kontak
          </Link>
          
        </nav>

        {/* Right side container for mobile menu button and booking button */}
        <div className="flex items-center gap-2">
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="hidden md:block bg-[#1d365e] hover:bg-[#0b2643] text-white w-full ">Booking Sekarang</Button>
            </a>
          {/* Mobile Menu Button - Only visible on mobile */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-[#1d365e] focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Only visible when toggled */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b animate__animated animate__fadeIn animate__faster">
          <nav className="container py-4 flex flex-col">
            <Link
              href={getHref("beranda")}
              className="py-2 text-sm font-medium hover:text-[#1d365e] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Beranda
            </Link>
            <Link
              href={getHref("tentang")}
              className="py-2 text-sm font-medium hover:text-[#1d365e] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tentang Kami
            </Link>
            <Link
              href={getHref("portofolio")}
              className="py-2 text-sm font-medium hover:text-[#1d365e] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Portofolio
            </Link>
            <Link
              href={getHref("kontak")}
              className="py-2 text-sm font-medium hover:text-[#1d365e] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kontak
            </Link>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="bg-[#1d365e] hover:bg-[#0b2643] text-white w-full">Booking Sekarang</Button>
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}
