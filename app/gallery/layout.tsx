import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
  description: 'Photo gallery of Raman\'s Research Lab — lab moments, scientific facilities, group celebrations, and research highlights at IISER Tirupati.',
  keywords: ['Raman Lab Gallery', 'IISER Tirupati Chemistry Lab Photos', 'Balaraman Group Photos', 'Research Lab Images'],
  alternates: {
    canonical: '/gallery',
  },
  openGraph: {
    title: 'Gallery — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
    description: 'Photo gallery of Raman\'s Research Lab at IISER Tirupati.',
    url: 'https://www.ebalaraman.com/gallery',
    images: [{ url: 'https://www.ebalaraman.com/pi-photo.webp', width: 1200, height: 630, alt: 'Dr. Ekambaram Balaraman' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gallery — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
    description: 'Photo gallery of Raman\'s Research Lab at IISER Tirupati.',
    images: ['https://www.ebalaraman.com/pi-photo.webp'],
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
