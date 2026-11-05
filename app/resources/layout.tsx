import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Resources for synthetic and organometallic chemists | Raman's Research Lab",
  description:
    'Practical lab references: NMR impurity tables, Schlenk line and vacuum technique, air-sensitive reagents, safety, catalysis tests, data tables and flow chemistry.',
  alternates: { canonical: '/resources' },
};

export default function ResourcesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
