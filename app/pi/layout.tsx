import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Dr. Ekambaram Balaraman — Principal Investigator | Raman's Research Lab",
  description: 'Dr. Ekambaram Balaraman, Associate Professor and Chair, Department of Chemistry, IISER Tirupati: biography, education and career, honours and research metrics.',
  alternates: { canonical: '/pi' },
};

export default function PILayout({ children }: { children: React.ReactNode }) {
  return children;
}
