import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Team | Raman\'s Research Lab',
  description: 'Meet the researchers of Raman\'s Lab — postdocs, PhD scholars, and students at IISER Tirupati.',
  openGraph: {
    title: 'Team | Raman\'s Research Lab',
    description: 'Meet the researchers of Raman\'s Lab — postdocs, PhD scholars, and students at IISER Tirupati.',
  },
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
