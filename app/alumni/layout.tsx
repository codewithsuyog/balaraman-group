import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alumni — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
  description: 'Alumni of Raman\'s Research Lab — PhD scholars, postdoctoral fellows, and project students trained under Dr. Ekambaram Balaraman at IISER Tirupati.',
  keywords: ['Balaraman Lab Alumni', 'IISER Tirupati Chemistry Alumni', 'Raman Lab PhD Graduates', 'E. Balaraman Group Alumni', 'Catalysis PhD Alumni India'],
  alternates: {
    canonical: '/alumni',
  },
  openGraph: {
    title: 'Alumni — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
    description: 'Alumni of Raman\'s Research Lab — PhD scholars, postdoctoral fellows, and project students trained under Dr. Ekambaram Balaraman at IISER Tirupati.',
    url: 'https://www.ebalaraman.com/alumni',
    images: [{ url: 'https://www.ebalaraman.com/pi-photo.webp', width: 1200, height: 630, alt: 'Dr. Ekambaram Balaraman' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alumni — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
    description: 'Alumni of Raman\'s Research Lab at IISER Tirupati.',
    images: ['https://www.ebalaraman.com/pi-photo.webp'],
  },
};

export default function AlumniLayout({ children }: { children: React.ReactNode }) {
  return children;
}
