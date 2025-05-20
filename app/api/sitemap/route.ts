import { NextResponse } from "next/server"

export async function GET() {
  // Base URL of your website
  const baseUrl = "https://merekamimpi.my.id"

  // Get the current date in the format YYYY-MM-DD
  const date = new Date().toISOString().split("T")[0]

  // Define your routes
  const routes = [
    {
      url: "/",
      lastModified: date,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "/gallery",
      lastModified: date,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    // Add more routes as needed
  ]

  // Generate the XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${routes
        .map(
          (route) => `
        <url>
          <loc>${baseUrl}${route.url}</loc>
          <lastmod>${route.lastModified}</lastmod>
          <changefreq>${route.changeFrequency}</changefreq>
          <priority>${route.priority}</priority>
        </url>
      `,
        )
        .join("")}
    </urlset>`

  // Return the XML with the correct content type
  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
