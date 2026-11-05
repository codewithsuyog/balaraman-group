import { Mail, MapPin, Globe, GraduationCap, Briefcase } from 'lucide-react';
import { piStats } from '../data';

export default function ContactPage() {
  return (
    <main id="main">
    <section className="w-full pt-40 sm:pt-32 pb-14 md:pb-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
        <div>
          <h1 className="text-4xl md:text-6xl text-foreground leading-[1.04] mb-4">Contact</h1>
          <p className="text-lg text-secondary mb-10 max-w-md">
            Interested in joining the group or collaborating? We&apos;d like to hear from you.
          </p>

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

        <div className="p-6 md:p-8 rounded-2xl bg-surface border border-line self-start">
          <h2 className="font-sans text-2xl font-medium tracking-normal text-foreground mb-3">Join the lab</h2>
          <p className="text-secondary mb-6 leading-relaxed">
            We welcome motivated Ph.D. students, postdocs and Master&apos;s students. Email Dr. Balaraman your CV and a short note on your research interests.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex gap-3">
              <GraduationCap size={18} className="text-muted mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">Ph.D.</p>
                <p className="text-sm text-secondary">Apply through IISER Tirupati&apos;s regular Ph.D. admissions</p>
              </div>
            </li>
            <li className="flex gap-3">
              <Briefcase size={18} className="text-muted mt-0.5 shrink-0" aria-hidden="true" />
              <div>
                <p className="font-medium text-foreground">Postdoc</p>
                <p className="text-sm text-secondary">Apply with a fellowship such as NPDF or an institute fellowship</p>
              </div>
            </li>
          </ul>
          <a
            href="mailto:eb.raman@iisertirupati.ac.in?subject=Joining%20the%20lab"
            className="inline-flex items-center gap-2 h-11 px-5 rounded-lg bg-accent-fill text-on-accent font-medium transition-opacity hover:opacity-90"
          >
            <Mail size={16} aria-hidden="true" /> Email Dr. Balaraman
          </a>
        </div>
      </div>
    </section>
    </main>
  );
}
