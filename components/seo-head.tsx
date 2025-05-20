"use client"

import Head from "next/head"
import { JsonLd } from "./json-ld"

interface SEOHeadProps {
  title?: string
  description?: string
  canonicalUrl?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  structuredData?: any
  structuredDataType?: "LocalBusiness" | "WebSite" | "FAQPage" | "Article" | "BreadcrumbList"
}

export function SEOHead({
  title = "Merekamimpi - Jasa Fotografi Profesional Yogyakarta",
  description = "Merekamimpi adalah jasa fotografi profesional yang berbasis di Yogyakarta, hadir untuk mengabadikan setiap momen berharga dengan gaya yang hangat, estetik, dan penuh cerita.",
  canonicalUrl = "https://merekamimpi.com",
  ogImage = "/og-image.jpg",
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData,
  structuredDataType = "LocalBusiness",
}: SEOHeadProps) {
  return (
    <>
      <Head>
        <link rel="canonical" href={canonicalUrl} />
      </Head>
      {structuredData && <JsonLd type={structuredDataType} data={structuredData} />}
    </>
  )
}
