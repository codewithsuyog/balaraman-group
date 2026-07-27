import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Patents — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
  description: 'Patent portfolio of Raman\'s Research Lab — granted US patents and industry-sponsored filings in catalysis and sustainable chemistry by Dr. E. Balaraman.',
  keywords: ['Balaraman Patents', 'IISER Tirupati Chemistry Patents', 'Catalysis Patents India', 'E. Balaraman Inventions', 'Sustainable Chemistry Patents'],
  alternates: {
    canonical: '/patents',
  },
  openGraph: {
    title: 'Patents — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
    description: 'Patent portfolio of Raman\'s Research Lab at IISER Tirupati.',
    url: 'https://www.ebalaraman.com/patents',
    images: [{ url: 'https://www.ebalaraman.com/pi-photo.webp', width: 1200, height: 630, alt: 'Dr. Ekambaram Balaraman' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Patents — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
    description: 'Patent portfolio of Raman\'s Research Lab at IISER Tirupati.',
    images: ['https://www.ebalaraman.com/pi-photo.webp'],
  },
};

export default function PatentsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
