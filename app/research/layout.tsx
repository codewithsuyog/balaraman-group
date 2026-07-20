import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research | Raman\'s Research Lab',
  description: 'Explore our research in homogeneous and heterogeneous catalysis, sustainable chemistry, and organometallic systems.',
  alternates: {
    canonical: 'https://www.ebalaraman.com/research',
  },
  openGraph: {
    title: 'Research | Raman\'s Research Lab',
    description: 'Explore our research in homogeneous and heterogeneous catalysis, sustainable chemistry, and organometallic systems.',
  },
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
