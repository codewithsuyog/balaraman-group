import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Publications | Raman\'s Research Lab',
  description: 'Complete archive of peer-reviewed publications from Raman\'s Research Lab at IISER Tirupati.',
  openGraph: {
    title: 'Publications | Raman\'s Research Lab',
    description: 'Complete archive of peer-reviewed publications from Raman\'s Research Lab at IISER Tirupati.',
  },
};

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
