import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Patents | Raman\'s Research Lab',
  description: 'Patent portfolio including granted US patents and industry-sponsored filings from Raman\'s Research Lab.',
  openGraph: {
    title: 'Patents | Raman\'s Research Lab',
    description: 'Patent portfolio including granted US patents and industry-sponsored filings from Raman\'s Research Lab.',
  },
};

export default function PatentsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
