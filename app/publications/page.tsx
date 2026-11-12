'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import { publications } from '../publications_master';
import ChemText from '../../components/ChemText';
import { PatentList, patentRows } from '@/components/PatentList';
import { PageHeader, chipClass, pageMain } from '@/components/ui';

type Pub = (typeof publications)[number];

const doiUrl = (doi: string) => (doi.startsWith('http') ? doi : `https://doi.org/${doi}`);

// One row per paper: cover, details, and the reaction scheme (opens full size on click)
function PublicationRow({ pub }: { pub: Pub }) {
  const [coverFailed, setCoverFailed] = useState(false);
  const hasCover = !!pub.coverImage && !coverFailed;

  return (
    <li className="py-4 md:py-5 px-2 -mx-2 rounded-lg flex flex-wrap md:flex-nowrap gap-3 md:gap-6 transition-colors duration-(--dur) hover:bg-raised/50">
      {hasCover ? (
        <div className="w-14 h-[74px] shrink-0 rounded-md bg-white border border-line p-1">
          <img
            src={pub.coverImage}
            alt={`Journal cover art for: ${pub.title}`}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain"
            onError={() => setCoverFailed(true)}
          />
        </div>
      ) : (
        <div className="w-14 shrink-0 hidden sm:block" aria-hidden="true" />
      )}

      <div className="min-w-0 flex-1 basis-[calc(100%-5rem)] md:basis-auto">
        <p className="font-mono text-xs text-muted mb-1 tabular-nums">
          <span className="text-accent">[{pub.id}]</span> {pub.year}
          {pub.journal && <> · {pub.journal}</>}
          {(pub.volume || pub.pages) && <> · {[pub.volume, pub.pages].filter(Boolean).join(', ')}</>}
        </p>
        <h3 className="text-base md:text-lg font-medium leading-snug text-foreground">
          {pub.doi ? (
            <a href={doiUrl(pub.doi)} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" aria-label={`${pub.title} (opens in a new tab)`}>
              <ChemText text={pub.title} />
            </a>
          ) : (
            <ChemText text={pub.title} />
          )}
        </h3>
        <p className="text-sm text-secondary leading-relaxed mt-1 line-clamp-1 md:line-clamp-none">{pub.authors}</p>

      </div>

      {pub.schemeImage && (
        <a
          href={pub.schemeImage}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Open the reaction scheme for: ${pub.title} (full size, new tab)`}
          className="block w-full md:w-72 shrink-0 rounded-lg bg-white border border-line p-1.5 md:p-2 hover:border-[var(--accent)] transition-colors"
        >
          <img
            src={pub.schemeImage}
            alt={`Reaction scheme from: ${pub.title}`}
            loading="lazy"
            decoding="async"
            className="w-full h-24 sm:h-32 md:h-36 object-contain"
          />
        </a>
      )}
    </li>
  );
}

export default function PublicationsPage() {
  const [stage, setStage] = useState<'independent' | 'early' | 'patents'>('independent');
  const [query, setQuery] = useState('');

  // Patents live here too: /publications#patents (old /patents links redirect to it)
  useEffect(() => {
    const fromHash = () => { if (window.location.hash === '#patents') setStage('patents'); };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => window.removeEventListener('hashchange', fromHash);
  }, []);
  const pickStage = (key: typeof stage) => {
    setStage(key);
    history.replaceState(null, '', key === 'patents' ? '#patents' : window.location.pathname);
  };

  const patentsShown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return patentRows.filter((p) => !q || `${p.title} ${p.authors ?? ''} ${p.number ?? ''} ${p.coapplicant ?? ''}`.toLowerCase().includes(q));
  }, [query]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return publications.filter(
      (p) =>
        (stage === 'early' ? p.id < 28 : p.id >= 28) &&
        (!q || `${p.title} ${p.authors} ${p.journal} ${p.year}`.toLowerCase().includes(q))
    );
  }, [stage, query]);

  const byYear = useMemo(() => {
    const groups = new Map<string, Pub[]>();
    for (const p of filtered) groups.set(p.year, [...(groups.get(p.year) ?? []), p]);
    return [...groups.entries()]
      .sort((a, b) => parseInt(b[0]) - parseInt(a[0]))
      .map(([year, pubs]) => [year, pubs.sort((a, b) => b.id - a.id)] as const);
  }, [filtered]);

  return (
    <main id="main" className={pageMain}>
      <div className="max-w-5xl mx-auto">
        <PageHeader title="Publications" intro="Every paper and patent from Raman's Research Lab, newest first" className="mb-8" />

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <div className="flex flex-wrap gap-2" role="group" aria-label="Show">
            {([['independent', 'Independent career'], ['early', 'Doctoral and postdoctoral'], ['patents', `Patents (${patentRows.length})`]] as const).map(([key, label]) => (
              <button
                key={key}
                onClick={() => pickStage(key)}
                aria-pressed={stage === key}
                className={`h-10 px-4 text-sm font-medium ${chipClass(stage === key)}`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="relative md:ml-auto md:w-80">
            <label htmlFor="pub-search" className="sr-only">Search publications</label>
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" aria-hidden="true" />
            <input
              id="pub-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={stage === 'patents' ? 'Search title, inventor, number' : 'Search title, author, journal'}
              className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface border border-line text-sm text-foreground placeholder:text-muted"
            />
          </div>
        </div>

        <p className="text-sm text-muted mb-4" aria-live="polite">
          {stage === 'patents'
            ? `${patentsShown.length} ${patentsShown.length === 1 ? 'patent' : 'patents'}`
            : `${filtered.length} ${filtered.length === 1 ? 'paper' : 'papers'}`}
        </p>

        {stage === 'patents' ? (
          patentsShown.length === 0
            ? <p className="text-secondary py-10">No patents match &ldquo;{query}&rdquo;.</p>
            : <div className="swap-in"><h2 className="sr-only">Patents</h2><PatentList rows={patentsShown} /></div>
        ) : (<>

        {/* Jump to year */}
        {byYear.length > 1 && (
          <nav aria-label="Jump to year" className="mb-10 flex flex-wrap gap-1.5">
            {byYear.map(([year]) => (
              <a
                key={year}
                href={`#y-${year}`}
                className={`h-8 px-2.5 font-mono text-xs tabular-nums ${chipClass()}`}
              >
                {year}
              </a>
            ))}
          </nav>
        )}

        {byYear.length === 0 ? (
          <p className="text-secondary py-10">No papers match &ldquo;{query}&rdquo;.</p>
        ) : (
          <div key={stage} className="swap-in space-y-10">
            {byYear.map(([year, pubs]) => (
              <section key={year} id={`y-${year}`} aria-labelledby={`y-${year}-title`}>
                <h2 id={`y-${year}-title`} className="text-3xl text-foreground mb-1">
                  {year} <span className="font-mono text-sm text-muted ml-1 tabular-nums">{pubs.length}</span>
                </h2>
                <ul className="divide-y divide-[var(--line)] border-b border-line">
                  {pubs.map((pub) => (
                    <PublicationRow key={pub.id} pub={pub} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
        </>)}
      </div>
    </main>
  );
}
