import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publications — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
  description: 'Complete archive of 117+ peer-reviewed publications from Raman\'s Research Lab — catalysis, organometallics, and sustainable chemistry by Dr. E. Balaraman at IISER Tirupati.',
  keywords: ['Balaraman Publications', 'E. Balaraman Papers', 'IISER Tirupati Chemistry Publications', 'Catalysis Research Papers', 'Organometallic Chemistry Publications'],
  alternates: {
    canonical: '/publications',
  },
  openGraph: {
    title: 'Publications — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
    description: 'Complete archive of 117+ peer-reviewed publications from Raman\'s Research Lab at IISER Tirupati.',
    url: 'https://www.ebalaraman.com/publications',
    images: [{ url: 'https://www.ebalaraman.com/pi-photo.webp', width: 1200, height: 630, alt: 'Dr. Ekambaram Balaraman' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Publications — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
    description: '117+ peer-reviewed publications from Raman\'s Research Lab at IISER Tirupati.',
    images: ['https://www.ebalaraman.com/pi-photo.webp'],
  },
};

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
