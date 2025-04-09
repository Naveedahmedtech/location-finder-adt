import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://app.howmanyhours.com';
    const lastModified = new Date();

    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}/`,
            lastModified,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/home`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/about`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/driving-distance`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/flight-distance`,
            lastModified,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/auth`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.4, // Lower priority - not crucial to SEO
        },
        {
            url: `${baseUrl}/admin`,
            lastModified,
            changeFrequency: 'monthly',
            priority: 0.3, // Admin pages typically not for indexing
        },
        {
            url: `${baseUrl}/privacy`,
            lastModified,
            changeFrequency: 'yearly',
            priority: 0.2, // Legal pages = low frequency/priority
        },
    ];

    return staticRoutes;
}
