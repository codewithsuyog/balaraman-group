import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
  description: 'Meet the researchers of Raman\'s Research Lab — postdoctoral fellows, PhD scholars, and master\'s students working under Dr. Ekambaram Balaraman at IISER Tirupati.',
  keywords: ['Balaraman Group Members', 'Raman Lab Team', 'IISER Tirupati Chemistry Group', 'E. Balaraman Research Team', 'Catalysis Research Group India'],
  alternates: {
    canonical: '/team',
  },
  openGraph: {
    title: 'Team — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
    description: 'Meet the researchers of Raman\'s Research Lab at IISER Tirupati.',
    url: 'https://www.ebalaraman.com/team',
    images: [{ url: 'https://www.ebalaraman.com/pi-photo.webp', width: 1024, height: 619, alt: 'Dr. Ekambaram Balaraman' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Team — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
    description: 'Meet the researchers of Raman\'s Research Lab at IISER Tirupati.',
    images: ['https://www.ebalaraman.com/pi-photo.webp'],
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children;
}
