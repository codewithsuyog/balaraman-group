import { Mail, MapPin, Globe, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { piStats } from '../data';
import { PageHeader, pageMain } from '@/components/ui';

export default function ContactPage() {
  return (
    <main id="main">
    <section className={pageMain}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <PageHeader title="Contact" intro="Interested in joining the group or collaborating? We'd like to hear from you." />

          <div className="space-y-6">
            <div className="flex gap-3">
              <MapPin size={18} className="text-muted mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm text-muted mb-1">Address</p>
                <div className="text-foreground leading-relaxed">
                  Department of Chemistry, IISER Tirupati<br />
                  Srinivasapuram Venkatagiri Road, Jangalapalli (G.P), Yerpedu Mandal<br />
                  Durgiperi, Andhra Pradesh 517619, India
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Mail size={18} className="text-muted mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm text-muted mb-1">Email</p>
                <div className="space-y-1">
                  <a href="mailto:eb.raman@iisertirupati.ac.in" className="block text-foreground hover:text-accent transition-colors">eb.raman@iisertirupati.ac.in</a>
                  <a href="mailto:balaramanekambaram@gmail.com" className="block text-foreground hover:text-accent transition-colors">balaramanekambaram@gmail.com</a>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Globe size={18} className="text-muted mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="text-sm text-muted mb-1">Follow the lab</p>
                <div className="flex flex-wrap gap-2">
                  <a href={piStats.twitter} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-line text-foreground hover:bg-raised transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> X
                  </a>
                  <a href={piStats.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 h-10 px-3 rounded-lg border border-line text-foreground hover:bg-raised transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg> LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 rounded-lg bg-surface border border-line self-start">
          <h2 className="text-3xl md:text-4xl text-foreground leading-[1] mb-3">Join the lab</h2>
          <p className="text-secondary mb-6 leading-relaxed">
            We welcome motivated Ph.D. students, postdocs and Master&apos;s students. Email Dr. Balaraman your CV and a short note on your research interests.
          </p>
          <Link href="/join" className="mb-8 flex w-fit items-center gap-1.5 text-accent underline underline-offset-4 decoration-1 hover:decoration-2">
            Ways to join and how to apply <ArrowRight size={16} aria-hidden="true" />
          </Link>
          <a
            href="mailto:eb.raman@iisertirupati.ac.in?subject=Joining%20the%20lab"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-accent-fill text-on-accent font-medium transition duration-(--dur-fast) hover:opacity-90 active:scale-[0.98]"
          >
            <Mail size={16} aria-hidden="true" /> Email Dr. Balaraman
          </a>
        </div>
      </div>
    </section>
    </main>
  );
}
