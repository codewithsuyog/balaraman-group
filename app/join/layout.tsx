import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Join the lab | Raman's Research Lab",
  description: "How to join Raman's Research Lab at IISER Tirupati as a Ph.D. student, postdoc, Master's thesis or project student.",
  alternates: { canonical: '/join' },
};

export default function JoinLayout({ children }: { children: React.ReactNode }) {
  return children;
}
