import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { AnimatedCounter } from '@/components/ui/animated-counter';
import { piBio, piStats, awards, cvLink } from '../data';

type BioItem = { year: string; role: string; institution: string; details?: string };

const isEducation = (item: BioItem) => /bachelor|master|doctor|ph\.d/i.test(item.role);
// Newest first, like an academic CV
const education = (piBio as BioItem[]).filter(isEducation).reverse();
const career = (piBio as BioItem[]).filter((i) => !isEducation(i)).reverse();

// "Title – 2021" -> { title, year }; entries without a year keep an empty year
const honours = awards.map((a) => {
  const m = a.match(/^(.*?)\s+[–-]\s+((?:19|20)\d{2}(?:[–-]\d{2,4})?(?:\s*&\s*\d{4})?)(.*)$/);
  return m ? { title: (m[1] + m[3]).trim(), year: m[2] } : { title: a, year: '' };
}).sort((x, y) => (parseInt(y.year) || 0) - (parseInt(x.year) || 0)); // newest first, undated last

const courses = [
  { code: 'CHM 111', name: 'Inorganic Chemistry' },
  { code: 'CHM 211', name: 'Coordination Chemistry' },
  { code: 'CHM 411', name: 'Organometallic Chemistry' },
];

export default function PIPage() {
  return (
    <main id="main">
    <section className="w-full pt-28 md:pt-32 pb-20 md:pb-28 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

        <div className="flex flex-col">
          <div className="w-full aspect-square rounded-2xl overflow-hidden relative bg-raised">
            <Image
              src="/images/pi/PI Photo 2.webp"
              alt="Dr. Ekambaram Balaraman, Principal Investigator of Raman's Research Lab at IISER Tirupati"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-center"
            />
          </div>

          <div className="mt-5 flex items-center gap-2">
            <a href={piStats.googleScholar} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-line flex items-center justify-center text-secondary hover:text-foreground hover:bg-raised transition-colors" title="Google Scholar" aria-label="Google Scholar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269z"/><circle cx="12" cy="16.5" r="5.5"/></svg>
            </a>
            <a href={`https://orcid.org/${piStats.orcid}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg border border-line flex items-center justify-center text-secondary hover:text-foreground hover:bg-raised transition-colors" title="ORCID" aria-label="ORCID">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.847-1.188-3.722-3.978-3.722h-2.341z"/></svg>
            </a>
            <a href="mailto:eb.raman@iisertirupati.ac.in" className="ml-1 text-sm font-mono text-secondary hover:text-accent transition-colors">eb.raman@iisertirupati.ac.in</a>
          </div>
        </div>

        <div className="lg:col-span-2 flex flex-col">
          <p className="text-sm text-muted mb-3">Principal investigator</p>
          <h1 className="text-4xl md:text-6xl text-foreground leading-[1.04] mb-3">Dr. Ekambaram Balaraman</h1>
          <p className="text-lg text-secondary mb-8">Associate Professor &amp; Chair, Department of Chemistry, IISER Tirupati</p>

          <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-12 max-w-2xl">
            Developing transition-metal catalytic systems for sustainable synthesis and molecular transformations
          </p>

          {/* Scholarly metrics: plain figures, accent only on citations */}
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-px bg-line rounded-xl overflow-hidden border border-line mb-4">
            <div className="bg-surface p-5">
              <dt className="text-sm text-muted mb-1">Publications</dt>
              <dd className="text-3xl font-medium tabular-nums text-foreground"><AnimatedCounter target={piStats.publications} suffix="+" /></dd>
            </div>
            <div className="bg-surface p-5">
              <dt className="text-sm text-muted mb-1">Citations</dt>
              <dd className="text-3xl font-medium tabular-nums text-accent"><AnimatedCounter target={piStats.citations} formatCommas /></dd>
            </div>
            <div className="bg-surface p-5">
              <dt className="text-sm text-muted mb-1">h-index</dt>
              <dd className="text-3xl font-medium tabular-nums text-foreground"><AnimatedCounter target={piStats.hIndex} /></dd>
            </div>
            <div className="bg-surface p-5">
              <dt className="text-sm text-muted mb-1">US patents granted</dt>
              <dd className="text-3xl font-medium tabular-nums text-foreground"><AnimatedCounter target={piStats.grantedUSPatents} /></dd>
            </div>
          </dl>
          <p className="font-mono text-xs text-muted mb-12 tabular-nums">
            {piStats.phdCompleted} Ph.D. completed · {piStats.phdPursuing} Ph.D. pursuing · {piStats.postdocs} postdocs · {piStats.mscStudents} MSc students · {piStats.projectFellows} project fellows
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12 mb-14">
            <section aria-labelledby="career">
              <h2 id="career" className="font-sans text-xl font-medium tracking-normal text-foreground mb-4">Career</h2>
              <ol className="divide-y divide-[var(--line)] border-y border-line">
                {career.map((item) => (
                  <li key={item.year} className="py-4 grid grid-cols-[7.5rem_1fr] gap-4">
                    <span className="font-mono text-sm text-muted tabular-nums pt-0.5">{item.year}</span>
                    <div>
                      <p className="font-medium text-foreground leading-snug">{item.role}</p>
                      <p className="text-sm text-secondary leading-relaxed">{item.institution}</p>
                      {item.details && <p className="text-sm text-muted leading-relaxed mt-1">{item.details}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="education">
              <h2 id="education" className="font-sans text-xl font-medium tracking-normal text-foreground mb-4">Education</h2>
              <ol className="divide-y divide-[var(--line)] border-y border-line">
                {education.map((item) => (
                  <li key={item.year} className="py-4 grid grid-cols-[7.5rem_1fr] gap-4">
                    <span className="font-mono text-sm text-muted tabular-nums pt-0.5">{item.year}</span>
                    <div>
                      <p className="font-medium text-foreground leading-snug">{item.role}</p>
                      <p className="text-sm text-secondary leading-relaxed">{item.institution}</p>
                      {item.details && <p className="text-sm text-muted leading-relaxed mt-1">{item.details}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          </div>

          <blockquote className="mb-14 border-l-2 border-accent pl-5 max-w-2xl">
            <p className="text-lg text-foreground leading-relaxed">Take risk in life. If you win, you will lead; if you lose, you will guide.</p>
          </blockquote>

          <section aria-labelledby="honours" className="mb-14">
            <h2 id="honours" className="font-sans text-xl font-medium tracking-normal text-foreground mb-4">
              Honours and awards <span className="font-mono text-sm text-muted ml-1 tabular-nums">{honours.length}</span>
            </h2>
            <ul className="divide-y divide-[var(--line)] border-y border-line">
              {honours.map((h) => (
                <li key={h.title} className="py-3.5 grid grid-cols-[7.5rem_1fr] gap-4">
                  <span className="font-mono text-sm text-muted tabular-nums pt-0.5">{h.year || '—'}</span>
                  <span className="text-foreground leading-relaxed">{h.title}</span>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="courses" className="mb-14">
            <h2 id="courses" className="font-sans text-xl font-medium tracking-normal text-foreground mb-4">Courses taught</h2>
            <ul className="divide-y divide-[var(--line)] border-y border-line">
              {courses.map((c) => (
                <li key={c.code} className="py-3.5 grid grid-cols-[7.5rem_1fr] gap-4">
                  <span className="font-mono text-sm text-muted">{c.code}</span>
                  <span className="text-foreground">{c.name}</span>
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap gap-3">
            <a href={cvLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-foreground text-background font-medium transition-opacity hover:opacity-90">
              <ExternalLink size={16} /> View CV
            </a>
            <a href={piStats.googleScholar} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-11 px-5 rounded-lg border border-line text-foreground font-medium hover:bg-raised transition-colors">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269z"/><circle cx="12" cy="16.5" r="5.5"/></svg>
              Google Scholar
            </a>
          </div>
        </div>
      </div>
    </section>
    </main>
  );
}
