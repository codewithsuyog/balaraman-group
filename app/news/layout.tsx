import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "News | Raman's Research Lab",
  description: "Awards, new members and milestones from Raman's Research Lab at IISER Tirupati.",
  alternates: { canonical: '/news' },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
