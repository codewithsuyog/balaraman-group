import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Raman's Research Lab",
    short_name: "Raman Lab",
    description: "Research lab at IISER Tirupati specializing in catalysis, sustainable chemistry, C1 chemistry, and organometallic systems.",
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#b45309',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
