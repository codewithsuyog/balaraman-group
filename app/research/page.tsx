import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { publications } from '../publications_master';
import { facilities, funding } from '../data';
import { PageHeader, SectionHeading, pageMain } from '@/components/ui';
import ChemText from '../../components/ChemText';
import { ResearchThemeArt } from '@/components/ResearchThemeArt';
import { ResearchDots } from '@/components/ResearchDots';
import { researchThemes } from '../research-themes';

const byId = (id: number) => publications.find((p) => p.id === id);
const doiUrl = (doi: string) => (doi.startsWith('http') ? doi : `https://doi.org/${doi}`);
const decode = (s: string) => s.replace(/&amp;/g, '&');

// Journal abbreviations for the compact citations; unknown names are shown as stored
const JOURNAL_ABBR: Record<string, string> = {
  'Advanced Synthesis & Catalysis': 'Adv. Synth. Catal.',
  'Organic Letters': 'Org. Lett.',
  'Chemical Communications': 'Chem. Commun.',
  'The Journal of Organic Chemistry': 'J. Org. Chem.',
  'Biomass Conversion and Biorefinery': 'Biomass Convers. Biorefin.',
  'ACS Sustainable Chemistry & Engineering': 'ACS Sustainable Chem. Eng.',
  'Catalysis Today': 'Catal. Today',
  'International Journal of Hydrogen Energy': 'Int. J. Hydrogen Energy',
  'Catalysis Science & Technology': 'Catal. Sci. Technol.',
  'ACS Catalysis': 'ACS Catal.',
  'Journal of the American Chemical Society': 'J. Am. Chem. Soc.',
  'Journal of Materials Chemistry A': 'J. Mater. Chem. A',
  'Chemistry – A European Journal': 'Chem. Eur. J.',
  'Dalton Transactions': 'Dalton Trans.',
  'Green Chemistry': 'Green Chem.',
  'Organic & Biomolecular Chemistry': 'Org. Biomol. Chem.',
  'Nature Communications': 'Nat. Commun.',
  'ACS Applied Energy Materials': 'ACS Appl. Energy Mater.',
};
const journalOf = (j: string) => JOURNAL_ABBR[decode(j)] ?? decode(j);

// One compact journal-style citation, linked to the DOI when there is one
function Citation({ id }: { id: number }) {
  const p = byId(id);
  if (!p) return null;
  const body = (
    <>
      <span className="text-foreground group-hover:text-accent transition-colors">
        <i>{journalOf(p.journal)}</i> <b>{p.year}</b>
        {p.volume && <>, <i>{p.volume}</i></>}
        {p.pages && <>, {p.pages}</>}.
      </span>
      <span className="block text-sm text-muted"><ChemText text={p.title} /></span>
    </>
  );
  return (
    <li className="leading-snug">
      {p.doi ? (
        <a href={doiUrl(p.doi)} target="_blank" rel="noopener noreferrer" className="group block" aria-label={`${p.title}, ${journalOf(p.journal)} ${p.year} (opens in a new tab)`}>
          {body}
        </a>
      ) : (
        <div className="group">{body}</div>
      )}
    </li>
  );
}

const themes = researchThemes;

export default function ResearchPage() {
  return (
    <main id="main" className={pageMain}>
      <ResearchDots items={themes.map(({ id, title }) => ({ id, title }))} />

      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Research"
          intro="We develop catalysts for cleaner chemical synthesis, most of them based on earth-abundant metals such as manganese, iron, cobalt and nickel. Our work falls into six themes:"
        />

        {/* Theme map: one tile per theme, linked to its section */}
        <nav aria-label="Research themes" className="relative mb-16 md:mb-20">
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true" className="hidden xl:block absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-28 text-line">
            <path d="M0 70 C120 10 220 110 340 60 S560 0 680 60 S880 110 1000 40" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M0 80 C120 20 220 120 340 70 S560 10 680 70 S880 120 1000 50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          </svg>
          <ul className="relative grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 md:gap-4">
            {themes.map((t, i) => (
              <li key={t.id} className={i % 2 ? 'xl:mt-10' : ''}>
                <a
                  href={`#${t.id}`}
                  className="group flex flex-col items-center gap-2 p-3 rounded-lg bg-background border border-line hover:border-[var(--accent)] transition-colors text-center h-full"
                >
                  <ResearchThemeArt molecule={t.molecule} tiles={t.tiles} className="w-full max-w-[150px]" />
                  <span className="text-sm font-medium text-foreground group-hover:text-accent leading-snug">{t.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Themes, on alternating bands */}
      {themes.map((t, i) => (
        <section
          key={t.id}
          id={t.id}
          aria-labelledby={`${t.id}-title`}
          className={`-mx-6 px-6 py-14 md:py-20 border-t border-line ${i % 2 ? '' : 'bg-surface'}`}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[17rem_1fr] gap-8 lg:gap-16 items-start">
            <div className="flex flex-col items-start lg:items-end gap-4">
              <h2 id={`${t.id}-title`} className="text-3xl md:text-4xl text-foreground leading-[1.05] lg:text-right">{t.title}</h2>
              <ResearchThemeArt molecule={t.molecule} tiles={t.tiles} labelled className="w-48 md:w-56" />
            </div>
            <div className="min-w-0 max-w-3xl">
              <p className="text-lg text-secondary leading-relaxed">{t.text}</p>
              <h3 className="mt-8 mb-3 text-sm font-medium text-foreground">Selected publications</h3>
              <ol className="space-y-2.5">
                {t.selected.map((id) => <Citation key={id} id={id} />)}
              </ol>
              <details className="mt-5 group/all">
                <summary className="cursor-pointer w-fit py-2 text-sm text-accent hover:underline underline-offset-4">
                  Show the other {t.papers.length - t.selected.length} papers in this theme
                </summary>
                <ol className="mt-3 space-y-2.5 border-l-2 border-line pl-4">
                  {t.papers.filter((id) => !t.selected.includes(id)).map((id) => <Citation key={id} id={id} />)}
                </ol>
              </details>
            </div>
          </div>
        </section>
      ))}

      <div className="max-w-6xl mx-auto">
        {facilities.length > 0 && (
          <section aria-labelledby="facilities" className="mt-20">
            <SectionHeading id="facilities">Facilities and instruments</SectionHeading>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 divide-y divide-[var(--line)] border-y border-line">
              {facilities.map((f) => (
                <li key={f.name} className="py-3">
                  <span className="text-foreground">{f.name}</span>
                  {f.detail && <span className="text-secondary"> · {f.detail}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {funding.length > 0 && (
          <section aria-labelledby="funding" className="mt-20">
            <SectionHeading id="funding">Funding</SectionHeading>
            <ul className="divide-y divide-[var(--line)] border-y border-line">
              {funding.map((f) => (
                <li key={`${f.agency}-${f.title}`} className="py-3 flex flex-wrap justify-between gap-x-6">
                  <span className="text-foreground">{f.agency}{f.title && <span className="text-secondary"> · {f.title}</span>}</span>
                  {f.years && <span className="font-mono text-sm text-muted tabular-nums">{f.years}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        <Link href="/publications" className="mt-12 inline-flex items-center gap-1.5 py-2 text-accent hover:underline underline-offset-4">
          All publications <ArrowRight size={16} />
        </Link>
      </div>
    </main>
  );
}
