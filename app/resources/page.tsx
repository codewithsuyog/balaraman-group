import { ArrowUpRight, FileText, FileDown, Database, Book, BookOpen } from 'lucide-react';
import { resourceGroups } from '../resources';
import { ResourceIllustration } from '@/components/ResourceIllustrations';

// "paper" for DOI links, otherwise the site's host name
const sourceOf = (url: string) => {
  const host = new URL(url).hostname.replace(/^www\./, '');
  return host === 'doi.org' ? 'paper' : host;
};

// Link type, worked out from the URL so new links get an icon automatically
const DATABASE_HOSTS = ['pubchem.ncbi.nlm.nih.gov', 'sdbs.db.aist.go.jp', 'chemcalc.org', 'acsgcipr.org', 'reagents.acsgcipr.org', 'organicchemistrydata.org'];
const BOOK_HOSTS = ['nap.nationalacademies.org'];
const linkType = (url: string) => {
  const u = new URL(url);
  const host = u.hostname.replace(/^www\./, '');
  if (u.pathname.toLowerCase().endsWith('.pdf')) return 'pdf';
  if (host === 'doi.org') return 'paper';
  if (BOOK_HOSTS.includes(host) || u.pathname.includes('/doi/book/')) return 'book';
  if (DATABASE_HOSTS.includes(host)) return 'database';
  return 'guide';
};
const TYPE_ICON = { paper: FileText, pdf: FileDown, database: Database, book: Book, guide: BookOpen } as const;
const TYPE_LABEL = { paper: 'Paper', pdf: 'PDF', database: 'Database or tool', book: 'Book', guide: 'Guide' } as const;

export default function ResourcesPage() {
  const total = resourceGroups.reduce((n, g) => n + g.items.length, 0);

  return (
    <main id="main" className="w-full pt-40 sm:pt-32 pb-14 md:pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="max-w-3xl mb-12">
          <h1 className="text-5xl md:text-7xl text-foreground leading-[0.95] mb-6">Resources</h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed">
            Practical references we use in the lab, from NMR impurity tables and column chromatography to Schlenk line technique and
            catalysis tests. Open to everyone; {total} links, checked every month.
          </p>
        </header>

        <nav aria-label="Resource sections" className="mb-16 flex flex-wrap gap-2">
          {resourceGroups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="h-9 px-3 inline-flex items-center rounded-lg border border-line text-sm text-secondary hover:text-foreground hover:bg-raised transition-colors"
            >
              {g.title}
            </a>
          ))}
        </nav>

        <ul aria-label="Link types" className="-mt-10 mb-12 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          {(Object.keys(TYPE_ICON) as (keyof typeof TYPE_ICON)[]).map((t) => {
            const Icon = TYPE_ICON[t];
            return (
              <li key={t} className="inline-flex items-center gap-1.5">
                <Icon size={15} aria-hidden="true" /> {TYPE_LABEL[t]}
              </li>
            );
          })}
        </ul>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-14">
          {resourceGroups.map((g) => (
            <section key={g.id} id={g.id} aria-labelledby={`${g.id}-title`}>
              <div className="flex items-start gap-5 mb-5">
                <div className="w-28 h-[68px] shrink-0 rounded-lg bg-surface border border-line p-1.5">
                  <ResourceIllustration id={g.id} />
                </div>
                <div className="min-w-0">
                  <h2 id={`${g.id}-title`} className="text-3xl md:text-4xl text-foreground leading-[1] mb-2">
                    {g.title}
                  </h2>
                  <p className="text-secondary">{g.description}</p>
                </div>
              </div>
              <ul className="divide-y divide-[var(--line)] border-y border-line">
                {g.items.map((item) => (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-4 py-3 text-foreground hover:text-accent transition-colors"
                    >
                      <span className="flex items-start gap-2.5 leading-snug">
                        {(() => {
                          const t = linkType(item.url);
                          const Icon = TYPE_ICON[t];
                          return <Icon size={16} className="shrink-0 mt-0.5 text-muted group-hover:text-accent" aria-label={TYPE_LABEL[t]} role="img" />;
                        })()}
                        <span>{item.title}</span>
                      </span>
                      <span className="shrink-0 inline-flex items-center gap-1 font-mono text-xs text-muted group-hover:text-accent pt-1">
                        {sourceOf(item.url)} <ArrowUpRight size={12} aria-hidden="true" />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
