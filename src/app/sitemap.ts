import { MetadataRoute } from 'next'
import { siteConfig } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_BASE_URL || 'https://lighthouse.example.com'

  const routes = [
    '',
    '/services',
    '/services/families',
    '/services/schools',
    '/services/local-authorities',
    '/pricing',
    '/about',
    '/resources',
    '/contact',
    '/legal/privacy',
    '/legal/terms',
    '/legal/cookies',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }))
}


