import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alumni | Raman\'s Research Lab',
  description: 'Alumni registry of doctoral scholars, postgraduates, and project fellows from Raman\'s Research Lab at IISER Tirupati.',
  alternates: {
    canonical: 'https://www.ebalaraman.com/alumni',
  },
  openGraph: {
    title: 'Alumni | Raman\'s Research Lab',
    description: 'Alumni registry of doctoral scholars, postgraduates, and project fellows from Raman\'s Research Lab at IISER Tirupati.',
  },
};

export default function AlumniLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
