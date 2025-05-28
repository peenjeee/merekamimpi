

import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "./analytics"
import { Suspense } from "react"
import { AnimationProvider } from "@/components/animation-provider"
import { CustomCursor } from "@/components/custom-cursor"
import { ScrollToTop } from "@/components/scroll-to-top"
import Head from "next/head"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Merekamimpi - Jasa Fotografi Profesional Yogyakarta",
  description:
    "Merekamimpi adalah jasa fotografi profesional yang berbasis di Yogyakarta, hadir untuk mengabadikan setiap momen berharga dengan gaya yang hangat, estetik, dan penuh cerita.",
  keywords: [
    "fotografi yogyakarta",
    "jasa foto yogyakarta",
    "fotografer wisuda",
    "foto produk",
    "foto event",
    "foto potret",
    "merekamimpi",
    "fotografer profesional yogyakarta",
  ],
  authors: [{ name: "Merekamimpi Photography" }],
  creator: "Merekamimpi Photography",
  publisher: "Merekamimpi Photography",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://www.merekamimpi.my.id"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Merekamimpi - Jasa Fotografi Profesional Yogyakarta",
    description:
      "Merekamimpi adalah jasa fotografi profesional yang berbasis di Yogyakarta, hadir untuk mengabadikan setiap momen berharga dengan gaya yang hangat, estetik, dan penuh cerita.",
    url: "https://www.merekamimpi.my.id",
    siteName: "Merekamimpi Photography",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Merekamimpi Photography",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Merekamimpi - Jasa Fotografi Profesional Yogyakarta",
    description:
      "Merekamimpi adalah jasa fotografi profesional yang berbasis di Yogyakarta, hadir untuk mengabadikan setiap momen berharga dengan gaya yang hangat, estetik, dan penuh cerita.",
    images: ["/og-image.jpg"],
  },
  verification: {
    google: "Dl99mJiGpiJN25kcb8Fa97CFsfY3zimdWV-nKQh51Gs", // Replace with your actual verification code
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <Head>
        {/* Meta Verification */}
        <meta
          name="google-site-verification"
          content="Dl99mJiGpiJN25kcb8Fa97CFsfY3zimdWV-nKQh51Gs"
        />
        <meta name="google-adsense-account" content="ca-pub-2491405868841693" />
      </Head>

      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-NMMW9LJ34M"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-NMMW9LJ34M');
        `}
      </Script>

      {/* Google AdSense */}
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2491405868841693"
        strategy="afterInteractive"
        crossOrigin="anonymous"
      />

      <body className={inter.className}>
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
