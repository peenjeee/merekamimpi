import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "./analytics"
import { Suspense } from "react"
import { AnimationProvider } from "@/components/animation-provider"

// Only import CSS that doesn't cause MIME type issues
import "animate.css"
import "@splidejs/react-splide/css"

// Import the CustomCursor component
import { CustomCursor } from "@/components/custom-cursor"
import { ScrollToTop } from "@/components/scroll-to-top"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Merekamimpi - Jasa Fotografi Profesional Yogyakarta",
  description:
    "Merekamimpi adalah jasa fotografi profesional yang berbasis di Yogyakarta, hadir untuk mengabadikan setiap momen berharga dengan gaya yang hangat, estetik, dan penuh cerita.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
      <meta name="google-site-verification" content="Dl99mJiGpiJN25kcb8Fa97CFsfY3zimdWV-nKQh51Gs" />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Suspense>
            <AnimationProvider>
              {children}
              <ScrollToTop />
              <CustomCursor trailEffect={false} />
            </AnimationProvider>
            <Analytics />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  )
}
