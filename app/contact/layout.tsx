import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact and joining the lab | Raman's Research Lab",
  description: "Contact Raman's Research Lab at IISER Tirupati, and how to join as a Ph.D. student, postdoc or Master's student.",
  alternates: { canonical: '/contact' },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
