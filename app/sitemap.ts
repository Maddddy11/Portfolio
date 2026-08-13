import { MetadataRoute } from 'next'
import { getNews, getProjects } from '@/lib/content'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const [news, projects] = await Promise.all([getNews(), getProjects()])

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl,                   lastModified: new Date(), changeFrequency: 'daily',   priority: 1 },
    { url: `${siteUrl}/about`,        lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${siteUrl}/projects`,     lastModified: new Date(), changeFrequency: 'weekly',   priority: 0.9 },
    { url: `${siteUrl}/publications`, lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.8 },
    { url: `${siteUrl}/experience`,   lastModified: new Date(), changeFrequency: 'monthly',  priority: 0.7 },
    { url: `${siteUrl}/news`,         lastModified: new Date(), changeFrequency: 'daily',    priority: 0.8 },
    { url: `${siteUrl}/contact`,      lastModified: new Date(), changeFrequency: 'yearly',   priority: 0.6 },
  ]

  const newsRoutes: MetadataRoute.Sitemap = news.map(n => ({
    url: `${siteUrl}/news/${n.slug}`,
    lastModified: new Date(n.published_date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const projectRoutes: MetadataRoute.Sitemap = projects.map(p => ({
    url: `${siteUrl}/projects/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...newsRoutes, ...projectRoutes]
}
