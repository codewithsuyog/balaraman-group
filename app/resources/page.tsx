'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, FileText, FileDown, Database, Book, BookOpen } from 'lucide-react';
import { resourceGroups } from '../resources';
import { ResourceIllustration } from '@/components/ResourceIllustrations';
import { PageHeader, chipClass, pageMain } from '@/components/ui';

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

const ids = resourceGroups.map((g) => g.id);
const categories = [...new Set(resourceGroups.map((g) => g.category))];

export default function ResourcesPage() {
  const total = resourceGroups.reduce((n, g) => n + g.items.length, 0);
  const [activeId, setActiveId] = useState(ids[0]);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Each tab has its own address (/resources#workup) so a section can be shared
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      if (ids.includes(id)) setActiveId(id);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);

  const select = (id: string, focus = false) => {
    setActiveId(id);
    history.replaceState(null, '', `#${id}`);
    if (focus) tabRefs.current[id]?.focus();
  };

  // Arrow keys, Home and End move between tabs (WAI-ARIA tabs pattern)
  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = ids.indexOf(activeId);
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight' ? ids[(i + 1) % ids.length]
      : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? ids[(i - 1 + ids.length) % ids.length]
      : e.key === 'Home' ? ids[0]
      : e.key === 'End' ? ids[ids.length - 1]
      : null;
    if (next) {
      e.preventDefault();
      select(next, true);
    }
  };

  const group = resourceGroups.find((g) => g.id === activeId) ?? resourceGroups[0];

  return (
    <main id="main" className={pageMain}>
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Resources"
          className="mb-10"
          intro={<>Practical references we use in the lab, from NMR impurity tables and column chromatography to Schlenk line technique and
            catalysis tests. Open to everyone; {total} links in {resourceGroups.length} topics, checked every month.</>}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[15rem_1fr] gap-8 lg:gap-12 items-start">
          {/* Topic tabs under category headings: wrap at the top on small screens, a column on the left on desktop.
              Arrow keys move through every tab in order, across categories. */}
          <div onKeyDown={onKeyDown} className="space-y-4 lg:space-y-3 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
            {categories.map((cat, ci) => (
            <div key={cat}>
            <p id={`cat-${ci}`} className="font-mono text-xs text-muted mb-1.5 lg:mb-1 lg:px-3">{cat}</p>
            <div
              role="tablist"
              aria-labelledby={`cat-${ci}`}
              aria-orientation="vertical"
              className="flex flex-wrap lg:flex-col gap-1.5 lg:gap-0.5"
            >
            {resourceGroups.filter((g) => g.category === cat).map((g) => {
              const active = g.id === activeId;
              return (
                <button
                  key={g.id}
                  ref={(el) => { tabRefs.current[g.id] = el; }}
                  role="tab"
                  id={`tab-${g.id}`}
                  aria-selected={active}
                  aria-controls="resource-panel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => {
                    select(g.id);
                    // On phones the links sit below the tabs, so bring them into view
                    if (window.innerWidth < 1024) document.getElementById('resource-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`h-9 lg:h-8 px-3 text-sm text-left justify-between gap-3 ${chipClass(active)} ${active ? '' : 'lg:border-transparent'}`}
                >
                  <span>{g.title}</span>
                  <span className={`hidden lg:inline font-mono text-xs tabular-nums ${active ? 'opacity-70' : 'text-muted'}`}>{g.items.length}</span>
                </button>
              );
            })}
            </div>
            </div>
            ))}
          </div>

          <section id="resource-panel" role="tabpanel" aria-labelledby={`tab-${group.id}`} tabIndex={0} className="min-w-0 rounded-lg scroll-mt-24">
            <div className="flex items-start gap-5 mb-6">
              <div className="w-28 h-[68px] shrink-0 rounded-lg bg-surface border border-line p-1.5">
                <ResourceIllustration id={group.id} />
              </div>
              <div className="min-w-0">
                <h2 className="text-3xl md:text-4xl text-foreground leading-[1] mb-2">{group.title}</h2>
                <p className="text-secondary">{group.description}</p>
              </div>
            </div>

            <ul className="divide-y divide-[var(--line)] border-y border-line">
              {group.items.map((item) => {
                const t = linkType(item.url);
                const Icon = TYPE_ICON[t];
                return (
                  <li key={item.url}>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between gap-4 py-3.5 text-foreground hover:text-accent transition-colors"
                    >
                      <span className="flex items-start gap-2.5 leading-snug">
                        <Icon size={16} className="shrink-0 mt-0.5 text-muted group-hover:text-accent" aria-label={TYPE_LABEL[t]} role="img" />
                        <span>{item.title}</span>
                      </span>
                      <span className="shrink-0 inline-flex items-center gap-1 font-mono text-xs text-muted group-hover:text-accent pt-1">
                        {sourceOf(item.url)} <ArrowUpRight size={12} aria-hidden="true" />
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <ul aria-label="Link types" className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
              {(Object.keys(TYPE_ICON) as (keyof typeof TYPE_ICON)[]).map((k) => {
                const LegendIcon = TYPE_ICON[k];
                return (
                  <li key={k} className="inline-flex items-center gap-1.5">
                    <LegendIcon size={15} aria-hidden="true" /> {TYPE_LABEL[k]}
                  </li>
                );
              })}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
