import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.APP_BASE_URL || 'https://lighthouse.example.com'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/thank-you'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}








