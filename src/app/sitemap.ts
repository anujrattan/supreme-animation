import { MetadataRoute } from 'next'
import { projects } from '@/content/projects'
import { getAllServiceCategories } from '@/content/services'
import { createSubcategorySlug } from '@/content/subcategories'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://supremeanimation.com'
  
  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  // Service category pages
  const serviceCategoryPages: MetadataRoute.Sitemap = getAllServiceCategories().map(category => ({
    url: `${baseUrl}/services/${category.id}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  // Service subcategory pages
  const subcategoryPages: MetadataRoute.Sitemap = getAllServiceCategories().flatMap(category => 
    category.subcategories.map(subcategoryName => {
      const subcategorySlug = createSubcategorySlug(subcategoryName);
      return {
        url: `${baseUrl}/services/${category.id}/${subcategorySlug}/`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.85,
      };
    })
  )

  // Portfolio pages
  const portfolioPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${baseUrl}/portfolio/${project.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...routes, ...serviceCategoryPages, ...subcategoryPages, ...portfolioPages]
}

