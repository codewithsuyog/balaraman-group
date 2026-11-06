'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowUpRight, FileText, FileDown, Database, Book, BookOpen, Search } from 'lucide-react';
import { resourceGroups, type Resource } from '../resources';
import { guides, type Guide } from '../resource-guides';
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

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Highlight every case-insensitive match of the search term
function Mark({ text, q }: { text: string; q: string }) {
  if (!q) return <>{text}</>;
  const parts = text.split(new RegExp(`(${escapeRe(q)})`, 'gi'));
  return <>{parts.map((part, i) => (i % 2 ? <mark key={i} className="bg-accent-fill/25 text-inherit rounded-sm">{part}</mark> : part))}</>;
}

function LinkList({ items, q = '' }: { items: Resource[]; q?: string }) {
  return (
    <ul className="divide-y divide-[var(--line)] border-y border-line">
      {items.map((item) => {
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
                <span><Mark text={item.title} q={q} /></span>
              </span>
              <span className="shrink-0 inline-flex items-center gap-1 font-mono text-xs text-muted group-hover:text-accent pt-1">
                {sourceOf(item.url)} <ArrowUpRight size={12} aria-hidden="true" />
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}

function GuideBlock({ guide }: { guide: Guide }) {
  return (
    <div className="mb-8">
      <p className="text-lg text-foreground leading-relaxed mb-6">{guide.summary}</p>
      <h3 className="text-lg font-medium text-foreground mb-3">Key steps</h3>
      <ol className="list-decimal pl-5 space-y-1.5 text-secondary leading-relaxed marker:text-muted marker:font-mono">
        {guide.steps.map((x) => <li key={x}>{x}</li>)}
      </ol>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <h3 className="text-lg font-medium text-foreground mb-3">Tips</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-secondary leading-relaxed marker:text-muted">
            {guide.tips.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-medium text-foreground mb-3">Common mistakes</h3>
          <ul className="list-disc pl-5 space-y-1.5 text-secondary leading-relaxed marker:text-muted">
            {guide.mistakes.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

const guideLines = (g?: Guide) => (g ? [g.summary, ...g.steps, ...g.tips, ...g.mistakes] : []);

const ids = resourceGroups.map((g) => g.id);
const categories = [...new Set(resourceGroups.map((g) => g.category))];

export default function ResourcesPage() {
  const total = resourceGroups.reduce((n, g) => n + g.items.length, 0);
  const [activeId, setActiveId] = useState(ids[0]);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [query, setQuery] = useState('');
  const q = query.trim().length >= 2 ? query.trim() : '';

  // Matching links and guide lines in every topic
  const results = useMemo(() => {
    if (!q) return [];
    const needle = q.toLowerCase();
    return resourceGroups
      .map((g) => ({
        group: g,
        links: g.items.filter((i) => i.title.toLowerCase().includes(needle)),
        lines: guideLines(guides[g.id]).filter((l) => l.toLowerCase().includes(needle)),
      }))
      .filter((r) => r.links.length || r.lines.length || r.group.title.toLowerCase().includes(needle));
  }, [q]);

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
    setQuery('');
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
  const guide = guides[group.id];

  return (
    <main id="main" className={pageMain}>
      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Resources"
          className="mb-10"
          intro={<>Practical references we use in the lab, from NMR impurity tables and column chromatography to Schlenk line technique and
            catalysis tests. Open to everyone; {total} links in {resourceGroups.length} topics, checked every month.</>}
        />

        <div className="relative max-w-md mb-8">
          <label htmlFor="resource-search" className="sr-only">Search guides and links</label>
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" aria-hidden="true" />
          <input
            id="resource-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides and links, e.g. streaking, Celite, degas"
            className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface border border-line text-sm text-foreground placeholder:text-muted"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[15rem_1fr] gap-8 lg:gap-12 items-start">
          {/* Topic tabs under category headings: wrap at the top on small screens, a column on the left on desktop.
              Arrow keys move through every tab in order, across categories. */}
          <div onKeyDown={onKeyDown} className="space-y-4 lg:space-y-2.5 lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
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
                  aria-controls={q ? undefined : "resource-panel"}
                  tabIndex={active ? 0 : -1}
                  onClick={() => {
                    select(g.id);
                    // On phones the links sit below the tabs, so bring them into view
                    if (window.innerWidth < 1024) document.getElementById('resource-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className={`h-9 lg:h-[30px] px-3 text-sm text-left justify-between gap-3 ${chipClass(active)} ${active ? '' : 'lg:border-transparent'}`}
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

          {q ? (
            <section aria-labelledby="results-title" className="min-w-0" aria-live="polite">
              <h2 id="results-title" className="text-3xl md:text-4xl text-foreground leading-[1] mb-6">
                {results.length ? `Results for “${q}”` : `Nothing found for “${q}”`}
              </h2>
              <div className="space-y-10">
                {results.map(({ group: g, links, lines }) => (
                  <div key={g.id}>
                    <h3 className="text-lg font-medium text-foreground mb-3">
                      <button onClick={() => select(g.id)} className="hover:text-accent underline underline-offset-4 decoration-1 decoration-[var(--line)] hover:decoration-[var(--accent)]">
                        {g.title}
                      </button>
                      <span className="ml-2 font-mono text-xs text-muted">{g.category}</span>
                    </h3>
                    {lines.length > 0 && (
                      <ul className="mb-4 space-y-2 text-secondary leading-relaxed">
                        {lines.map((l) => <li key={l} className="pl-3 border-l-2 border-line"><Mark text={l} q={q} /></li>)}
                      </ul>
                    )}
                    {links.length > 0 && <LinkList items={links} q={q} />}
                  </div>
                ))}
              </div>
            </section>
          ) : (
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

            {guide && <GuideBlock guide={guide} />}
            {guide && <h3 className="text-lg font-medium text-foreground mb-2">Further reading</h3>}
            <LinkList items={group.items} />

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
          )}
        </div>
      </div>
    </main>
  );
}
