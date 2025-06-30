"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Instagram, Users, Star, ChevronRight, Check, Heart, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TiltCard } from "@/components/tilt-card"
import { fadeInLeft, fadeInRight, staggerAnimation, scrollAnimation, scaleAnimation } from "@/lib/animation"
import { TypedAnimation } from "@/components/typed-animation"
import { AnimatedCounter } from "@/components/animated-counter"
import { ParticleBackground } from "@/components/particle-background"

// Import the SweetAlert utility at the top of the file
import { showSuccessAlert, showErrorAlert } from "@/utils/sweet-alert"

// Import the new components at the top of the file
import { SplideCarousel } from "@/components/splide-carousel"
import { AnimatedElement } from "@/components/animated-element"

// First, add the import at the top of the file:
import { Navbar } from "@/components/navbar"

import { SEOHead } from "@/components/seo-head"
import { JsonLd } from "@/components/json-ld"

export default function Home() {
  const searchParams = useSearchParams()
  const serviceParam = searchParams.get("service")

  const [activeService, setActiveService] = useState(serviceParam || "wisuda")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Refs for animation targets
  const heroRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const portfolioRef = useRef<HTMLDivElement>(null)
  const testimonialsRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  // Initialize animations
  useEffect(() => {
    // Hero animations
    if (heroRef.current) {
      fadeInLeft(heroRef.current.querySelector(".hero-content"), 0.3, 1.2)
    }
    if (heroImageRef.current) {
      fadeInRight(heroImageRef.current, 0.6, 1.2)
    }

    // About section animations
    if (aboutRef.current) {
      scrollAnimation(aboutRef.current.querySelector(".about-content"), aboutRef.current, "top 75%")
      scrollAnimation(aboutRef.current.querySelector(".about-images"), aboutRef.current, "top 75%")
    }

    // Services section animations
    if (servicesRef.current) {
      scrollAnimation(servicesRef.current.querySelector(".services-header"), servicesRef.current, "top 80%")
      scrollAnimation(servicesRef.current.querySelector(".services-tabs"), servicesRef.current, "top 80%")
      scrollAnimation(servicesRef.current.querySelector(".services-content"), servicesRef.current, "top 75%")
    }

    // Portfolio section animations
    if (portfolioRef.current) {
      scrollAnimation(portfolioRef.current.querySelector(".portfolio-header"), portfolioRef.current, "top 80%")
      staggerAnimation(portfolioRef.current.querySelectorAll(".portfolio-item"), 0.1, 0.2)
    }

    // Testimonials section animations
    if (testimonialsRef.current) {
      scrollAnimation(testimonialsRef.current.querySelector(".testimonials-header"), testimonialsRef.current, "top 80%")
      staggerAnimation(testimonialsRef.current.querySelectorAll(".testimonial-card"), 0.2, 0.3)
    }

    // Team section animations
    if (teamRef.current) {
      scrollAnimation(teamRef.current.querySelector(".team-header"), teamRef.current, "top 80%")
      staggerAnimation(teamRef.current.querySelectorAll(".team-member"), 0.15, 0.2)
    }

    // CTA section animations
    if (ctaRef.current) {
      scaleAnimation(ctaRef.current.querySelector(".cta-content"), 0.2, 1)
    }

    // Contact section animations
    if (contactRef.current) {
      fadeInLeft(contactRef.current.querySelector(".contact-info"), 0.2, 1)
      fadeInRight(contactRef.current.querySelector(".contact-form"), 0.4, 1)
    }
  }, [])

  // Update active service when URL parameter changes
  useEffect(() => {
    if (serviceParam && ["wisuda", "produk", "event", "potret"].includes(serviceParam)) {
      setActiveService(serviceParam)

      // Scroll to layanan section if service param exists
      const layananSection = document.getElementById("layanan")
      if (layananSection) {
        layananSection.scrollIntoView({ behavior: "smooth" })
      }
    }
  }, [serviceParam])

  const services = {
    wisuda: {
      title: "Fotografi Wisuda",
      description:
        "Abadikan momen bersejarah kelulusan Anda dengan gaya yang elegan dan penuh makna. Kami menangkap kebahagiaan dan kebanggaan dalam setiap jepretan.",
      features: ["Sesi foto indoor dan outdoor", "Editing profesional", "Foto bersama keluarga dan teman"],
      buttonText: "Lihat Paket Wisuda",
    },
    produk: {
      title: "Fotografi Produk",
      description:
        "Tampilkan produk Anda dengan estetika yang menarik dan profesional. Kami membantu meningkatkan daya tarik visual produk untuk kebutuhan pemasaran.",
      features: ["Pencahayaan profesional", "Komposisi yang menarik", "Editing detail tinggi"],
      buttonText: "Lihat Paket Produk",
    },
    event: {
      title: "Fotografi Event",
      description:
        "Dokumentasikan acara spesial Anda dengan sentuhan profesional. Kami menangkap setiap momen penting dalam acara untuk kenangan abadi.",
      features: ["Liputan acara lengkap", "Pengambilan candid dan formal", "Pengiriman cepat"],
      buttonText: "Lihat Paket Event",
    },
    potret: {
      title: "Fotografi Potret",
      description:
        "Ekspresikan diri Anda melalui potret yang menawan. Kami menangkap karakter dan kepribadian dalam setiap jepretan.",
      features: ["Konsultasi gaya dan konsep", "Sesi indoor dan outdoor", "Retouching profesional"],
      buttonText: "Lihat Paket Potret",
    },
  }

  const whatsappLink = "https://api.whatsapp.com/send?phone=6285975200852"

  // Create structured data for the business
  const businessStructuredData = {
    name: "Merekamimpi Photography",
    description: "Jasa fotografi profesional di Yogyakarta untuk wisuda, produk, event, dan potret.",
    url: "https://www.merekamimpi.my.id",
    telephone: "+6285975200852",
    email: "merekamimpi@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Yogyakarta",
      addressRegion: "DIY",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "-7.7956",
      longitude: "110.3695",
    },
    image: "/placeholder.svg?height=1000&width=800",
    priceRange: "Rp300.000 - Rp2.000.000",
    openingHours: "Mo-Su 09:00-21:00",
    sameAs: [
      "https://www.instagram.com/merekamimpi",
      "https://linktr.ee/merekamimpi",
      "https://www.tiktok.com/@merekamimpi",
    ],
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* SEO Components */}
      <SEOHead structuredData={businessStructuredData} structuredDataType="LocalBusiness" />

      <JsonLd
        type="WebSite"
        data={{
          name: "Merekamimpi Photography",
          url: "https://www.merekamimpi.my.id",
          potentialAction: {
            "@type": "SearchAction",
            target: "https://www.merekamimpi.my.id/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
          },
        }}
      />

      {/* Then replace the header section with: */}
      <Navbar isHomePage={true} />

      <main className="flex-1">
        {/* Hero Section */}
        <section id="beranda" className="relative py-20 md:py-32 overflow-hidden bg-[#0b2643]" ref={heroRef}>
          <ParticleBackground color="rgba(255, 255, 255" particleCount={80} speed={0.3} />
          <div className="absolute inset-0 opacity-20">
            {/* <Image
              src="/placeholder.svg?height=1080&width=1920"
              alt="Background texture"
              fill
              className="object-cover"
              priority
            /> */}
          </div>
          <div className="container relative z-10 grid gap-8 md:grid-cols-2 items-center">
            <div className="text-white space-y-6 hero-content">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <TypedAnimation
                  strings={[
                    "Merekam momen, mewujudkan mimpi",
                    "Mengabadikan cerita, menciptakan kenangan",
                    "Menangkap emosi, merangkai kisah",
                  ]}
                  typeSpeed={80}
                  backSpeed={40}
                  loop={true}
                />
              </h1>
              <p className="text-lg md:text-xl opacity-90" data-aos="fade-up" data-aos-delay="300">
                Karena setiap detik punya cerita. Dari cahaya dan rasa, tercipta kenangan. Kamu bermimpi, kami
                memotretnya jadi nyata.
              </p>
              <div className="flex flex-col sm:flex-row gap-4" data-aos="fade-up" data-aos-delay="500">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                  <Button size="lg" className="bg-white text-[#1d365e] hover:bg-gray-100">
                    Booking Sekarang
                  </Button>
                </a>
              </div>
            </div>
            <div
              className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden"
              ref={heroImageRef}
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <Image
                src="/img/hero.png?height=1000&width=8000"
                alt="Fotografi Merekamimpi"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="tentang" className="py-20 bg-white" ref={aboutRef}>
          <div className="container">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="about-content">
                <h2
                  className="text-3xl md:text-4xl font-bold text-[#1d365e] mb-6"
                  data-aos="fade-right"
                  data-aos-duration="1000"
                >
                  Abadikan Momen Berharga, dengan Sentuhan Cerita
                </h2>
                <p className="text-lg text-gray-700 mb-8" data-aos="fade-right" data-aos-delay="200">
                  Di Merekamimpi, kami percaya bahwa setiap momen bukan hanya pantas untuk dikenang tapi juga
                  diceritakan lewat foto yang berbicara. Dengan gaya visual yang estetik, penuh warna, dan menyentuh
                  emosi, kami membantu kamu merekam mimpi jadi kenangan abadi.
                </p>

                <div className="space-y-6">
                  <div className="flex gap-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="w-10 h-10 rounded-full bg-[#1d365e] flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-[#1d365e]">Narasi Visual</h3>
                      <p className="text-gray-600">
                        Kami tidak sekadar mengambil gambar, tetapi menciptakan narasi visual yang mengekspresikan
                        cerita unik di balik setiap momen.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="w-10 h-10 rounded-full bg-[#1d365e] flex items-center justify-center flex-shrink-0">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-[#1d365e]">Kolaborasi Mendalam</h3>
                      <p className="text-gray-600">
                        Kami mengedepankan proses kolaboratif dengan klien untuk memahami visi, cerita, dan kebutuhan
                        spesifik Anda.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4" data-aos="fade-up" data-aos-delay="300">
                    <div className="w-10 h-10 rounded-full bg-[#1d365e] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-1 text-[#1d365e]">Sentuhan Lokal Yogyakarta</h3>
                      <p className="text-gray-600">
                        Sebagai fotografer lokal, kami memiliki pemahaman mendalam tentang budaya, estetika, dan
                        kehidupan di Yogyakarta.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 about-images">
                <div className="space-y-4">
                  <TiltCard
                    className="aspect-square relative rounded-lg overflow-hidden"
                    data-aos="flip-left"
                    data-aos-delay="100"
                  >
                    <Image
                      src="/img/potrait1.jpg?height=400&width=400"
                      alt="Fotografi Merekamimpi"
                      fill
                      className="object-cover"
                    />
                  </TiltCard>
                  <TiltCard
                    className="aspect-square relative rounded-lg overflow-hidden"
                    data-aos="flip-left"
                    data-aos-delay="300"
                  >
                    <Image
                      src="/img/street1.jpg?height=400&width=400"
                      alt="Fotografi Merekamimpi"
                      fill
                      className="object-cover"
                    />
                  </TiltCard>
                </div>
                <div className="space-y-4 mt-8">
                  <TiltCard
                    className="aspect-square relative rounded-lg overflow-hidden"
                    data-aos="flip-right"
                    data-aos-delay="200"
                  >
                    <Image
                      src="/img/potrait2.jpg?height=400&width=400"
                      alt="Fotografi Merekamimpi"
                      fill
                      className="object-cover"
                    />
                  </TiltCard>
                  <TiltCard
                    className="aspect-square relative rounded-lg overflow-hidden"
                    data-aos="flip-right"
                    data-aos-delay="400"
                  >
                    <Image
                      src="/img/event1.jpg?height=400&width=400"
                      alt="Fotografi Merekamimpi"
                      fill
                      className="object-cover"
                    />
                  </TiltCard>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="layanan" className="py-20 bg-gray-50" ref={servicesRef}>
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12 services-header">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1d365e] mb-4" data-aos="fade-up">
                Layanan Kami
              </h2>
              <p className="text-lg text-gray-700" data-aos="fade-up" data-aos-delay="200">
                Kami menawarkan berbagai layanan fotografi profesional untuk mengabadikan momen berharga dalam hidup
                Anda.
              </p>
            </div>

            <div className="flex justify-center mb-8 services-tabs" data-aos="fade-up" data-aos-delay="300">
              <div className="inline-flex bg-white rounded-full p-1 shadow-sm">
                {Object.keys(services).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveService(key)}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeService === key ? "bg-[#1d365e] text-white" : "text-gray-600 hover:text-[#1d365e]"
                    }`}
                  >
                    {key === "wisuda" ? "Wisuda" : key === "produk" ? "Produk" : key === "event" ? "Event" : "Potret"}
                  </button>
                ))}
              </div>
            </div>

            <div
              className="bg-white rounded-lg overflow-hidden shadow-sm services-content"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-[#1d365e]">{services[activeService].title}</h3>
                  <p className="text-gray-600 mb-6">{services[activeService].description}</p>
                  <ul className="space-y-3 mb-8">
                    {services[activeService].features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3 text-gray-700">
                        <Check className="h-5 w-5 text-[#1d365e]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-[#1d365e] hover:bg-[#1d365e] text-white">
                      {services[activeService].buttonText}
                    </Button>
                  </a>
                </div>
                <div className="grid grid-cols-2 gap-2 p-2">
                  <TiltCard className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src="/img/Girls.jpeg?height=400&width=400"
                      alt={`Fotografi ${services[activeService].title} 1`}
                      fill
                      className="object-cover"
                    />
                  </TiltCard>
                  <TiltCard className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src="/img/Man.jpeg?height=400&width=400"
                      alt={`Fotografi ${services[activeService].title} 2`}
                      fill
                      className="object-cover"
                    />
                  </TiltCard>
                  <TiltCard className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src="/img/bd.jpeg?height=400&width=400"
                      alt={`Fotografi ${services[activeService].title} 3`}
                      fill
                      className="object-cover"
                    />
                  </TiltCard>
                  <TiltCard className="aspect-square relative rounded-lg overflow-hidden">
                    <Image
                      src="/img/bd1.jpeg?height=400&width=400"
                      alt={`Fotografi ${services[activeService].title} 4`}
                      fill
                      className="object-cover"
                    />
                  </TiltCard>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-[#1d365e] text-white">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="stats-item" data-aos="zoom-in" data-aos-delay="100">
                <p className="text-4xl md:text-5xl font-bold">
                  <AnimatedCounter end={240} suffix="+" className="counter" />
                </p>
                <p className="text-sm md:text-base mt-2 opacity-80">Pelanggan Puas</p>
              </div>
              <div className="stats-item" data-aos="zoom-in" data-aos-delay="200">
                <p className="text-4xl md:text-5xl font-bold">
                  <AnimatedCounter end={3} suffix="+" className="counter" />
                </p>
                <p className="text-sm md:text-base mt-2 opacity-80">Tahun Pengalaman</p>
              </div>
              <div className="stats-item" data-aos="zoom-in" data-aos-delay="300">
                <p className="text-4xl md:text-5xl font-bold">
                  <AnimatedCounter end={4} className="counter" />
                </p>
                <p className="text-sm md:text-base mt-2 opacity-80">Fotografer Profesional</p>
              </div>
              <div className="stats-item" data-aos="zoom-in" data-aos-delay="400">
                <p className="text-4xl md:text-5xl font-bold">
                  <AnimatedCounter end={1000} suffix="+" className="counter" />
                </p>
                <p className="text-sm md:text-base mt-2 opacity-80">Foto Tercipta</p>
              </div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portofolio" className="py-20 bg-white" ref={portfolioRef}>
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16 portfolio-header">
              <AnimatedElement animation="fadeIn" duration={1} className="mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1d365e] mb-4">Portofolio Kami</h2>
                <p className="text-lg text-gray-700">
                  Lihat bagaimana kami mengabadikan momen berharga dengan sentuhan cerita yang unik
                </p>
              </AnimatedElement>

              <SplideCarousel
                images={[1, 2, 3, 4, 5, 6].map((item) => ({
                  src: `/galeri/galeri${item}.jpg?height=800&width=800&text=Portfolio+${item}`,
                  alt: `Portfolio image ${item}`,
                }))}
                options={{
                  perPage: 3,
                  autoplay: true,
                  interval: 3000,
                }}
                className="mb-10"
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <TiltCard
                  key={item}
                  className="relative aspect-square overflow-hidden rounded-lg group portfolio-item"
                  data-aos="fade-up"
                  data-aos-delay={item * 100}
                >
                  <Image
                    src={`/galeri/galeri${item}.jpg?height=800&width=800&text=Portfolio+${item}`}
                    alt={`Portfolio image ${item}`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </TiltCard>
              ))}
            </div>

            <div className="mt-10 text-center" data-aos="fade-up" data-aos-delay="700">
              <Link href="/gallery" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  className="border-[#1d365e] text-[#1d365e] hover:bg-[#1d365e] hover:text-white"
                >
                  Lihat Semua Karya <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="ulasan" className="py-20 bg-gray-50" ref={testimonialsRef}>
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16 testimonials-header">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1d365e] mb-4" data-aos="fade-up">
                Ulasan Pelanggan
              </h2>
              <p className="text-lg text-gray-700" data-aos="fade-up" data-aos-delay="200">
                Apa kata mereka tentang pengalaman bersama Merekamimpi
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  name: "Rina Wijaya",
                  role: "Wisudawan",
                  quote:
                    "Merekamimpi berhasil mengabadikan momen wisuda saya dengan cara yang sangat personal dan bermakna. Setiap foto menceritakan perjalanan saya selama kuliah.",
                },
                {
                  name: "Budi Santoso",
                  role: "Pemilik UMKM",
                  quote:
                    "Foto produk dari Merekamimpi membuat penjualan online saya meningkat drastis. Mereka memahami esensi produk dan menampilkannya dengan sangat menarik.",
                },
                {
                  name: "Anita Permata",
                  role: "Pengantin",
                  quote:
                    "Kami sangat puas dengan hasil foto prewedding kami. Tim Merekamimpi sangat profesional dan membuat kami merasa nyaman selama sesi pemotretan.",
                },
              ].map((testimonial, index) => (
                <TiltCard
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm testimonial-card"
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-[#1d365e]/10 flex items-center justify-center mr-4">
                      <Image src="/img/user.png" alt="Avatar" width={40} height={40} className="rounded-full" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  <div className="mt-4 flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-20 bg-white" ref={teamRef}>
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16 team-header">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1d365e] mb-4" data-aos="fade-up">
                Tim Kami
              </h2>
              <p className="text-lg text-gray-700" data-aos="fade-up" data-aos-delay="200">
                Kenali para fotografer profesional di balik Merekamimpi yang akan mengabadikan momen berharga Anda.
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { name: "Panji", role: "Event Photographer", instagram: "https://www.instagram.com/peenjeee_", image: "/img/boy.png" },
                { name: "Aziz", role: "Lead Photographer", instagram: "https://www.instagram.com/azizmstf_", image: "/img/boy.png" },
                {
                  name: "Marcell",
                  role: "Product Photographer",
                  instagram: "https://www.instagram.com/aceeeelllllll",
                  image: "/img/boy.png",
                },
                {
                  name: "Abbad",
                  role: "Portrait Photographer",
                  instagram: "https://www.instagram.com/bbadralf_",
                  image: "/img/boy.png",
                },
              ].map((member, index) => (
                <div key={index} className="text-center team-member" data-aos="fade-up" data-aos-delay={index * 150}>
                  <TiltCard className="aspect-square relative rounded-full overflow-hidden mb-4 mx-auto max-w-[200px]">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </TiltCard>
                  <h4 className="font-semibold text-lg">{member.name}</h4>
                  <p className="text-gray-500 mb-3">{member.role}</p>
                  <div className="flex justify-center gap-3">
                    <a
                      href={member.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-[#1d365e]/10 flex items-center justify-center hover:bg-[#1d365e] hover:text-white transition-colors"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-[#0b2643] text-white relative overflow-hidden" ref={ctaRef}>
          <ParticleBackground color="rgba(255, 255, 255" particleCount={60} speed={0.2} />
          <div className="container relative z-10">
            <div className="max-w-3xl mx-auto text-center cta-content" data-aos="zoom-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Jadwalkan Sesi Fotomu Hari Ini!</h2>
              <p className="text-lg mb-8 opacity-90">
                Bersama Merekamimpi, biarkan setiap momenmu tidak hanya menjadi kenangan, tapi juga cerita visual yang
                berbicara kepada siapapun yang melihatnya. Karena hidup terlalu berharga untuk diabadikan dengan cara
                biasa-biasa saja.
              </p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="bg-white text-[#1d365e] hover:bg-gray-100"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  Booking Sekarang
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="kontak" className="py-20 bg-white" ref={contactRef}>
          <div className="container">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
              <div className="contact-info">
                <h2 className="text-3xl font-bold text-[#1d365e] mb-6" data-aos="fade-right">
                  Hubungi Kami
                </h2>
                <p className="text-gray-700 mb-8" data-aos="fade-right" data-aos-delay="200">
                  Punya pertanyaan atau ingin mendiskusikan proyek fotografi? Jangan ragu untuk menghubungi kami.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4" data-aos="fade-up" data-aos-delay="100">
                    <div className="w-10 h-10 rounded-full bg-[#1d365e]/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#1d365e]"
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
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Lokasi</h4>
                      <p className="text-gray-600">Yogyakarta, Indonesia</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-aos="fade-up" data-aos-delay="200">
                    <div className="w-10 h-10 rounded-full bg-[#1d365e]/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#1d365e]"
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
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Email</h4>
                      <p className="text-gray-600">merekamimpi@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-aos="fade-up" data-aos-delay="300">
                    <div className="w-10 h-10 rounded-full bg-[#1d365e]/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#1d365e]"
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
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Telepon</h4>
                      <p className="text-gray-600">+62 859 7520 0852</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4" data-aos="fade-up" data-aos-delay="400">
                    <div className="w-10 h-10 rounded-full bg-[#1d365e]/10 flex items-center justify-center flex-shrink-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-[#1d365e]"
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
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">WhatsApp</h4>
                      <p className="text-gray-600">+62 859 7520 0852</p>
                      <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1d365e] font-medium hover:underline inline-flex items-center mt-1"
                      >
                        Chat Sekarang <ChevronRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg contact-form" data-aos="fade-left" data-aos-delay="300">
                <h3 className="text-xl font-semibold mb-4 text-[#1d365e]">Kirim Pesan</h3>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    const name = formData.get("name")
                    const email = formData.get("email")
                    const service = formData.get("service")
                    const message = formData.get("message")

                    if (!name || !email || !message) {
                      showErrorAlert("Form Incomplete", "Please fill in all required fields")
                      return
                    }

                    // Here you would normally send the data to your backend
                    // For now, we'll just show a success message
                    showSuccessAlert("Pesan Terkirim!", "Terima kasih atas kepercayaan Anda!")
                    e.currentTarget.reset()
                  }}
                >
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Nama <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#1d365e] focus:border-[#1d365e]"
                      placeholder="Nama lengkap"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#1d365e] focus:border-[#1d365e]"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                      Layanan
                    </label>
                    <select
                      id="service"
                      name="service"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#1d365e] focus:border-[#1d365e]"
                    >
                      <option value="">Pilih layanan</option>
                      <option value="wisuda">Fotografi Wisuda</option>
                      <option value="produk">Fotografi Produk</option>
                      <option value="event">Fotografi Event</option>
                      <option value="potret">Fotografi Potret</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Pesan <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#1d365e] focus:border-[#1d365e]"
                      placeholder="Ceritakan kebutuhan fotografi Anda..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#1d365e] hover:bg-[#0b2643] text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0b2643] text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div data-aos="fade-up" data-aos-delay="100">
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

            <div data-aos="fade-up" data-aos-delay="200">
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

            <div data-aos="fade-up" data-aos-delay="300">
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

            <div data-aos="fade-up" data-aos-delay="400">
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
