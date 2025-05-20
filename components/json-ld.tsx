"use client"

import { useEffect, useState } from "react"

interface JsonLdProps {
  type: "LocalBusiness" | "WebSite" | "FAQPage" | "Article" | "BreadcrumbList"
  data: any
}

export function JsonLd({ type, data }: JsonLdProps) {
  const [jsonLdString, setJsonLdString] = useState("")

  useEffect(() => {
    // Create the JSON-LD structure based on the type
    const jsonLdObject = {
      "@context": "https://schema.org",
      "@type": type,
      ...data,
    }

    setJsonLdString(JSON.stringify(jsonLdObject))
  }, [type, data])

  // Only render on client-side to avoid hydration issues
  if (typeof window === "undefined" || !jsonLdString) {
    return null
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdString }} />
}
