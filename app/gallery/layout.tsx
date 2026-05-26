import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gallery | Raman\'s Research Lab',
  description: 'Photo gallery of lab moments, scientific facilities, and group memories from Raman\'s Research Lab.',
  openGraph: {
    title: 'Gallery | Raman\'s Research Lab',
    description: 'Photo gallery of lab moments, scientific facilities, and group memories from Raman\'s Research Lab.',
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
