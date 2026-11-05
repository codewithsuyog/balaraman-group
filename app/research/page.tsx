import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { publications } from '../publications_master';
import ChemText from '../../components/ChemText';
import { HomogeneousDiagram, HeterogeneousDiagram } from '@/components/ResearchDiagrams';

const byId = (id: number) => publications.find((p) => p.id === id);
const doiUrl = (doi: string) => (doi.startsWith('http') ? doi : `https://doi.org/${doi}`);

// Most recent papers whose title matches the area (publications_master is newest first)
const keyPapers = (keywords: RegExp, count = 5) =>
  publications.filter((p) => keywords.test(p.title)).slice(0, count);

const areas = [
  {
    id: 'homogeneous',
    title: 'Homogeneous catalysis',
    why: 'Forming C–C and C–N bonds usually needs pre-activated reagents and leaves stoichiometric waste behind. Using simple alcohols directly, with hydrogen and water as the only by-products, makes these bonds cleaner and cheaper to build.',
    how: 'We design well-defined pincer complexes of earth-abundant metals such as Mn, Co, Ni and Fe that work through metal–ligand cooperation. With acceptorless dehydrogenation, hydrogenation and borrowing-hydrogen strategies, these catalysts turn alcohols into coupling partners for C–C and C–N bond formation.',
    examples: [
      { id: 112, text: 'a Mn(I) pincer catalyst couples amino alcohols with primary alcohols in a double dehydrogenative coupling, releasing hydrogen and water' },
      { id: 117, text: 'nickel catalysis gives selective mono-amination of 1,2-diols, an affordable route to amino alcohols' },
    ],
    scheme: 112,
    Diagram: HomogeneousDiagram,
    diagramCaption: 'Borrowing hydrogen and acceptorless dehydrogenation with a pincer catalyst',
    keywords: /pincer|dehydrogenat|borrowing|hydrogenation|Mn\(I\)|manganese|cobalt|nickel|iron/i,
  },
  {
    id: 'heterogeneous',
    title: 'Heterogeneous catalysis',
    why: 'Molecular catalysts are precise but hard to separate and reuse. Industrial processes need robust catalysts that can be recovered and run again, without losing selectivity.',
    how: 'We build reusable nanocatalysts on graphene and nitrogen-doped carbon supports, including core–shell architectures of 3d transition metals, for hydrogen generation, CO₂ conversion, biomass upgrading and the co-pyrolysis of waste materials.',
    examples: [
      { id: 106, text: 'graphene-encapsulated metal@N/C catalysts convert biomass and waste plastics into linear α-olefins and aromatics' },
      { id: 85, text: 'a reusable manganese-based nanocatalyst carries out the amination of alcohols' },
    ],
    scheme: 106,
    Diagram: HeterogeneousDiagram,
    diagramCaption: 'Reusable 3d-metal nanocatalysts on N-doped carbon supports',
    keywords: /nanocatal|heterogeneous|graphene|supported|co-?pyrolysis|biomass|HZSM|N\/C|carbon nitride|nanopartic/i,
  },
];

export default function ResearchPage() {
  return (
    <main id="main" className="w-full pt-40 sm:pt-32 pb-14 md:pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="max-w-3xl mb-16 md:mb-20">
          <h1 className="text-5xl md:text-7xl text-foreground leading-[0.95] mb-6">Research</h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed">
            We explore organometallic chemistry, designing molecular architectures that open new pathways for
            sustainable catalysis and selective organic transformations. The lab works in two connected areas, bridging
            the precision of molecular catalysts with the robustness of heterogeneous ones.
          </p>
          <nav aria-label="Research areas" className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {areas.map((a) => (
              <a key={a.id} href={`#${a.id}`} className="text-accent hover:underline underline-offset-4">{a.title}</a>
            ))}
          </nav>
        </header>

        <div className="space-y-20 md:space-y-28">
          {areas.map((area) => {
            const scheme = byId(area.scheme);
            return (
              <section key={area.id} id={area.id} className="border-t border-line pt-12 md:pt-16">
                <h2 className="text-4xl md:text-5xl text-foreground leading-[1] mb-8">{area.title}</h2>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-start">
                  <div className="space-y-5 text-lg text-secondary leading-relaxed">
                    <p>{area.why}</p>
                    <p>{area.how}</p>
                    <p>
                      For example,{' '}
                      {area.examples.map((ex, i) => {
                        const p = byId(ex.id);
                        return (
                          <span key={ex.id}>
                            {i > 0 && '; '}
                            {ex.text}{' '}
                            {p ? (
                              <a href={doiUrl(p.doi)} target="_blank" rel="noopener noreferrer" className="font-mono text-base text-accent hover:underline underline-offset-4" aria-label={`Paper ${ex.id}: ${p.title} (opens in a new tab)`}>[{ex.id}]</a>
                            ) : (
                              <span className="font-mono text-base text-accent">[{ex.id}]</span>
                            )}
                          </span>
                        );
                      })}
                      .
                    </p>
                  </div>

                  <figure>
                    <div className="rounded-xl bg-surface border border-line p-4 md:p-6">
                      <area.Diagram />
                    </div>
                    <figcaption className="mt-3 text-sm text-muted">{area.diagramCaption}</figcaption>
                  </figure>
                </div>

                {scheme?.schemeImage && (
                  <figure className="mt-12">
                    <p className="text-sm text-muted mb-3">From our work</p>
                    <div className="rounded-xl bg-white border border-line p-4 md:p-6">
                      <img
                        src={scheme.schemeImage}
                        alt={`Reaction scheme from: ${scheme.title}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full max-w-3xl mx-auto h-auto"
                      />
                    </div>
                    <figcaption className="mt-3 text-sm text-muted">
                      <span className="font-mono text-accent">[{scheme.id}]</span> <ChemText text={scheme.title} />. {scheme.journal}, {scheme.year}
                    </figcaption>
                  </figure>
                )}

                <div className="mt-12">
                  <h3 className="text-lg font-medium text-foreground mb-4">Key publications</h3>
                  <ol className="divide-y divide-[var(--line)] border-y border-line">
                    {keyPapers(area.keywords).map((p) => (
                      <li key={p.id} className="py-4 flex gap-4">
                        <span className="font-mono text-sm text-accent tabular-nums shrink-0 w-12">[{p.id}]</span>
                        <div className="min-w-0">
                          <a href={doiUrl(p.doi)} target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-accent transition-colors leading-snug">
                            <ChemText text={p.title} />
                          </a>
                          <p className="text-sm text-muted mt-1">{p.journal}, {p.year}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            );
          })}
        </div>

        <Link href="/publications" className="mt-16 inline-flex items-center gap-1.5 text-accent hover:underline underline-offset-4">
          All publications <ArrowRight size={16} />
        </Link>
      </div>
    </main>
  );
}
