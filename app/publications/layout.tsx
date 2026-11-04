import type { Metadata } from 'next';
import { piStats } from '../data';
import { publications } from '../publications_master';

export const metadata: Metadata = {
  title: 'Publications — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
  description: `Complete archive of ${piStats.publications}+ peer-reviewed publications from Raman's Research Lab — catalysis, organometallics, and sustainable chemistry by Dr. E. Balaraman at IISER Tirupati.`,
  keywords: ['Balaraman Publications', 'E. Balaraman Papers', 'IISER Tirupati Chemistry Publications', 'Catalysis Research Papers', 'Organometallic Chemistry Publications'],
  alternates: {
    canonical: '/publications',
  },
  openGraph: {
    title: 'Publications — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
    description: `Complete archive of ${piStats.publications}+ peer-reviewed publications from Raman's Research Lab at IISER Tirupati.`,
    url: 'https://www.ebalaraman.com/publications',
    images: [{ url: 'https://www.ebalaraman.com/pi-photo.webp', width: 1024, height: 619, alt: 'Dr. Ekambaram Balaraman' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Publications — Dr. Ekambaram Balaraman | Raman\'s Research Lab',
    description: `${piStats.publications}+ peer-reviewed publications from Raman's Research Lab at IISER Tirupati.`,
    images: ['https://www.ebalaraman.com/pi-photo.webp'],
  },
};

const SITE = 'https://www.ebalaraman.com';

// One ScholarlyArticle per paper; Dr. Balaraman links to the Person defined in app/layout.tsx.
const scholarlyArticles = {
  '@context': 'https://schema.org',
  '@graph': publications.map((p) => {
    const doiUrl = p.doi ? `https://doi.org/${p.doi}` : undefined;
    return {
      '@type': 'ScholarlyArticle',
      '@id': `${SITE}/publications#pub-${p.id}`,
      headline: p.title,
      name: p.title,
      author: p.authors
        .split(/,\s*|\s+and\s+/)
        .map((n) => n.replace(/\*/g, '').trim())
        .filter(Boolean)
        .map((n) => (/Balaraman/i.test(n) ? { '@id': `${SITE}/#person` } : { '@type': 'Person', name: n })),
      datePublished: p.year,
      isPartOf: {
        '@type': 'PublicationVolume',
        ...(p.volume && { volumeNumber: p.volume }),
        isPartOf: { '@type': 'Periodical', name: p.journal },
      },
      ...(p.pages && { pagination: p.pages }),
      ...(doiUrl && { url: doiUrl, sameAs: doiUrl, identifier: { '@type': 'PropertyValue', propertyID: 'DOI', value: p.doi } }),
      ...(p.coverImage && { image: `${SITE}${p.coverImage}` }),
    };
  }),
};

export default function PublicationsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        // Escape "<" so a title can never close the script tag.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlyArticles).replace(/</g, '\\u003c') }}
      />
      {children}
    </>
  );
}
