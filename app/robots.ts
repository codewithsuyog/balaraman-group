import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        // Keep members' and group photos out of search results, so Google uses the PI photo or logo as the thumbnail.
        // The pages still show them; next/image serves some through /_next/image, hence the second pair.
        '/images/team/',
        '/images/gallery/',
        '/_next/image?url=%2Fimages%2Fteam',
        '/_next/image?url=%2Fimages%2Fgallery',
      ],
    },
    sitemap: 'https://www.ebalaraman.com/sitemap.xml',
  }
}
