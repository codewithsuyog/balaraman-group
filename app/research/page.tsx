import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { publications } from '../publications_master';
import { facilities, funding } from '../data';
import { PageHeader, SectionHeading, pageMain } from '@/components/ui';
import ChemText from '../../components/ChemText';
import { ResearchThemeArt } from '@/components/ResearchThemeArt';
import { ResearchDots } from '@/components/ResearchDots';

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

// Research themes. Each summary only claims what the selected papers show.
const themes = [
  {
    id: 'homogeneous',
    title: 'Earth-abundant metal catalysis',
    text: 'Making C–C and C–N bonds usually needs pre-activated reagents and leaves salt waste behind. We design catalysts based on manganese, iron, cobalt and nickel, many with pincer ligands, that use simple alcohols directly through acceptorless dehydrogenation and borrowing hydrogen, so hydrogen gas and water are the only by-products. Recent examples include amides made from alcohols without ammonia, selective mono-amination of diols to amino alcohols, and N-methylation with methanol.',
    papers: [118, 117, 114, 112, 111],
  },
  {
    id: 'heterogeneous',
    title: 'Heterogeneous catalysis and upcycling',
    text: 'Industrial processes need catalysts that are robust, easy to separate and reusable. We build solid catalysts, from 3d metals encapsulated in graphene and nitrogen-doped carbon to metal-modified zeolites, and use them to turn waste into value: co-pyrolysis of biomass with plastics gives aromatics, light olefins and linear α-olefins. A reusable manganese nanocatalyst carries out the amination of alcohols.',
    papers: [115, 106, 96, 85],
  },
  {
    id: 'c1-hydrogen',
    title: 'Methanol, C1 and hydrogen',
    text: 'Methanol can serve as a fuel, a hydrogen carrier and a one-carbon building block. We use it as a C1 source for methylation and methoxymethylation, as a hydrogen source for reductions, and as a hydrogen store, releasing H₂ from paraformaldehyde–methanol mixtures with nickel catalysts. We also work on catalytic routes that turn methane into hydrogen and solid carbon.',
    papers: [116, 113, 108, 98, 94],
  },
  {
    id: 'light',
    title: 'Light-driven catalysis',
    text: 'Visible light can drive reactions at room temperature that otherwise need heat. We use organic photoredox catalysts, porous covalent and metal–organic frameworks, and carbon-based materials for the dehydrogenation of N-heterocycles and hydrazines, E–Z isomerization of olefins, and solar hydrogen production.',
    papers: [58, 53, 50, 49, 43],
  },
  {
    id: 'ch-activation',
    title: 'C–H activation',
    text: 'Turning C–H bonds directly into new bonds avoids pre-functionalized starting materials. Our earlier work developed cobalt-, nickel- and rhodium-catalysed C–H alkynylation, N-vinylation and carbonylation, oxidant-free direct arylation, and manganese-catalysed α-alkylation of amides and esters with alcohols.',
    papers: [59, 42, 36, 35, 31],
  },
];

export default function ResearchPage() {
  return (
    <main id="main" className={pageMain}>
      <ResearchDots items={themes.map(({ id, title }) => ({ id, title }))} />

      <div className="max-w-6xl mx-auto">
        <PageHeader
          title="Research"
          intro="We develop catalysts for cleaner chemical synthesis, from molecular complexes of earth-abundant metals to reusable solid materials and light-driven systems. Recent themes of our work:"
        />

        {/* Theme map: one tile per theme, linked to its section */}
        <nav aria-label="Research themes" className="relative mb-16 md:mb-20">
          <svg viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true" className="hidden lg:block absolute inset-x-0 top-1/2 -translate-y-1/2 w-full h-28 text-line">
            <path d="M0 70 C120 10 220 110 340 60 S560 0 680 60 S880 110 1000 40" fill="none" stroke="currentColor" strokeWidth="2" />
            <path d="M0 80 C120 20 220 120 340 70 S560 10 680 70 S880 120 1000 50" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
          </svg>
          <ul className="relative grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {themes.map((t, i) => (
              <li key={t.id} className={i % 2 ? 'lg:mt-10' : ''}>
                <a
                  href={`#${t.id}`}
                  className="group flex flex-col items-center gap-2 p-3 rounded-lg bg-background border border-line hover:border-[var(--accent)] transition-colors text-center h-full"
                >
                  <ResearchThemeArt id={t.id} className="w-full max-w-[150px]" />
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
              <ResearchThemeArt id={t.id} className="w-48 md:w-56" />
            </div>
            <div className="min-w-0 max-w-3xl">
              <p className="text-lg text-secondary leading-relaxed">{t.text}</p>
              <h3 className="mt-8 mb-3 text-sm font-medium text-foreground">Selected publications</h3>
              <ol className="space-y-2.5">
                {t.papers.map((id) => {
                  const p = byId(id);
                  if (!p) return null;
                  return (
                    <li key={id} className="leading-snug">
                      <a
                        href={doiUrl(p.doi)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block"
                        aria-label={`${p.title}, ${journalOf(p.journal)} ${p.year} (opens in a new tab)`}
                      >
                        <span className="text-foreground group-hover:text-accent transition-colors">
                          <i>{journalOf(p.journal)}</i> <b>{p.year}</b>
                          {p.volume && <>, <i>{p.volume}</i></>}
                          {p.pages && <>, {p.pages}</>}.
                        </span>
                        <span className="block text-sm text-muted"><ChemText text={p.title} /></span>
                      </a>
                    </li>
                  );
                })}
              </ol>
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
