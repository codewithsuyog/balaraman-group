import Link from 'next/link';
import { Mail, ArrowUpRight } from 'lucide-react';
import { PageHeader, SectionHeading, pageMain } from '@/components/ui';

// Draft text: replace with details from Dr. Balaraman (openings, requirements, how to apply).
const routes = [
  {
    title: 'Ph.D.',
    text: "Apply through IISER Tirupati's regular Ph.D. admissions, usually with a national fellowship such as CSIR-UGC JRF, DST-INSPIRE or PMRF.",
    links: [
      { label: 'IISER Tirupati', url: 'https://www.iisertirupati.ac.in' },
      { label: 'CSIR HRDG fellowships', url: 'https://csirhrdg.res.in/' },
      { label: 'DST-INSPIRE', url: 'https://online-inspire.gov.in/' },
    ],
  },
  {
    title: 'Postdoc',
    text: 'Apply with a fellowship such as the ANRF National Post-Doctoral Fellowship (NPDF) or an institute postdoctoral fellowship. Email first to discuss a project.',
    links: [{ label: 'ANRF online', url: 'https://anrfonline.in/' }],
  },
  {
    title: "Master's thesis (IISER Tirupati)",
    text: 'BS-MS and M.Sc. students at IISER Tirupati can do their thesis project in the lab. Talk to Dr. Balaraman before the thesis allotment.',
    links: [],
  },
  {
    title: 'Summer and project students',
    text: 'Students from other institutes can join for a summer or semester project. Email Dr. Balaraman to ask.',
    links: [],
  },
];

const apply = [
  'Your CV, with any lab or research experience',
  'A short note (half a page) on what you would like to work on and why this lab',
  'Which route above you are applying through, and your fellowship if you have one',
];

export default function JoinPage() {
  return (
    <main id="main" className={pageMain}>
      <div className="max-w-5xl mx-auto">
        <PageHeader
          title="Join the lab"
          intro="We welcome motivated students and postdocs who want to build new catalysts and use them for cleaner synthesis. Here is how to join."
        />

        <section aria-labelledby="routes" className="mb-14">
          <SectionHeading id="routes">Ways to join</SectionHeading>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routes.map((r) => (
              <li key={r.title} className="p-5 md:p-6 rounded-lg bg-surface border border-line">
                <h3 className="text-lg font-medium text-foreground mb-2">{r.title}</h3>
                <p className="text-secondary leading-relaxed">{r.text}</p>
                {r.links.length > 0 && (
                  <p className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    {r.links.map((l) => (
                      <a key={l.url} href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-accent hover:underline underline-offset-4">
                        {l.label} <ArrowUpRight size={13} aria-hidden="true" />
                      </a>
                    ))}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="openings" className="mb-14">
          <SectionHeading id="openings">Current openings</SectionHeading>
          <p className="text-secondary leading-relaxed max-w-3xl">
            Openings may be posted on the lab&apos;s{' '}
            <a href="https://x.com/EbLabgroup" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">X</a> or{' '}
            <a href="https://www.linkedin.com/in/ekambaram-balaraman-4a11293a/" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">LinkedIn</a>.
            You can also email Dr. Balaraman to ask.
          </p>
        </section>

        <section aria-labelledby="apply" className="mb-14">
          <SectionHeading id="apply">How to apply</SectionHeading>
          <p className="text-secondary mb-4">Email Dr. Balaraman with:</p>
          <ol className="list-decimal pl-5 space-y-2 text-foreground max-w-3xl marker:text-muted">
            {apply.map((a) => <li key={a}>{a}</li>)}
          </ol>
          <a
            href="mailto:eb.raman@iisertirupati.ac.in?subject=Joining%20the%20lab"
            className="mt-8 inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-accent-fill text-on-accent font-medium transition duration-(--dur-fast) hover:opacity-90 active:scale-[0.98]"
          >
            <Mail size={16} aria-hidden="true" /> Email Dr. Balaraman
          </a>
        </section>

        <p className="text-secondary">
          Want to see what the group works on first? Read about our{' '}
          <Link href="/research" className="text-accent underline underline-offset-4">research</Link> and meet the{' '}
          <Link href="/team" className="text-accent underline underline-offset-4">people</Link>.
        </p>
      </div>
    </main>
  );
}
