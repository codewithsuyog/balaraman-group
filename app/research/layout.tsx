import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
  description: 'Research in homogeneous and heterogeneous catalysis, sustainable chemistry, C-H activation, hydrogenation, and organometallic systems at Raman\'s Research Lab, IISER Tirupati.',
  keywords: ['Balaraman Research', 'Catalysis Research IISER Tirupati', 'Homogeneous Catalysis', 'Heterogeneous Catalysis', 'Sustainable Chemistry Research', 'C-H Activation', 'Organometallic Chemistry'],
  alternates: {
    canonical: '/research',
  },
  openGraph: {
    title: 'Research — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
    description: 'Research in catalysis, sustainable chemistry, and organometallic systems at IISER Tirupati.',
    url: 'https://www.ebalaraman.com/research',
    images: [{ url: 'https://www.ebalaraman.com/pi-photo.webp', width: 1200, height: 630, alt: 'Dr. Ekambaram Balaraman' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Research — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
    description: 'Research in catalysis, sustainable chemistry, and organometallic systems at IISER Tirupati.',
    images: ['https://www.ebalaraman.com/pi-photo.webp'],
  },
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
