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
  canonicalUrl = "https://www.merekamimpi.my.id",
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
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-NMMW9LJ34M"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-NMMW9LJ34M');
</script>
      {structuredData && <JsonLd type={structuredDataType} data={structuredData} />}
    </>
  )
}
