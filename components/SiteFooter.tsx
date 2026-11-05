import Link from 'next/link';
import { ArrowUpRight, Mail } from 'lucide-react';
import { piStats } from '@/app/data';

export default function SiteFooter() {
  return (
    <footer className="w-full border-t border-line bg-surface pt-14 pb-10">

      <div className="max-w-7xl mx-auto px-6">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-14 border-b border-line">
          
          {/* Col 1 & 2: Brand Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3.5">
              {/* White Logo Badge */}
              <Link href="/" aria-label="Raman's Research Lab, home" className="shrink-0 rounded-lg">
                <img src="/images/lab-logo-hex-96.webp" alt="" width={42} height={48} className="w-[42px] h-12" />
              </Link>
              <div>
                <p className="text-lg font-medium text-foreground">Raman&apos;s Research Lab</p>
                <p className="text-sm text-muted">Department of Chemistry, IISER Tirupati</p>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div>
            <p className="text-sm text-muted mb-3">Navigation</p>
            <ul className="space-y-2.5 text-sm text-secondary">
              <li><Link href="/" className="hover:text-foreground transition-colors">Home</Link></li>
              <li><Link href="/pi" className="hover:text-foreground transition-colors">About the PI</Link></li>
              <li><Link href="/team" className="hover:text-foreground transition-colors">People</Link></li>
              <li><Link href="/research" className="hover:text-foreground transition-colors">Research</Link></li>
              <li><Link href="/publications" className="hover:text-foreground transition-colors">Publications</Link></li>
              <li><Link href="/news" className="hover:text-foreground transition-colors">News</Link></li>
              <li><Link href="/gallery" className="hover:text-foreground transition-colors">Gallery</Link></li>
              <li><Link href="/alumni" className="hover:text-foreground transition-colors">Alumni</Link></li>
            </ul>
          </div>

          {/* Col 4: Research Pillars */}
          <div>
            <p className="text-sm text-muted mb-3">Research focus</p>
            <ul className="space-y-2.5 text-sm text-secondary">
              <li><Link href="/research#homogeneous" className="hover:text-foreground transition-colors">Homogeneous catalysis</Link></li>
              <li><Link href="/research#heterogeneous" className="hover:text-foreground transition-colors">Heterogeneous catalysis</Link></li>
              <li><Link href="/patents" className="hover:text-foreground transition-colors">Patents</Link></li>
            </ul>
          </div>

          {/* Col 5: Location & Contact */}
          <div>
            <p className="text-sm text-muted mb-3">Contact</p>
            <p className="text-sm text-secondary leading-relaxed mb-3">
              IISER Tirupati, Yerpedu Mandal,<br />
              Andhra Pradesh 517619, India
            </p>
            <a 
              href="mailto:eb.raman@iisertirupati.ac.in" 
              className="text-sm text-accent hover:underline underline-offset-4 block break-all mb-3"
            >
              eb.raman@iisertirupati.ac.in
            </a>
            <a 
              href="https://www.iisertirupati.ac.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-secondary hover:text-foreground transition-colors"
            >
              iisertirupati.ac.in <ArrowUpRight size={12} />
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-center md:text-left">
            <p>{`© ${new Date().getFullYear()} Raman's Research Lab. All rights reserved`}</p>
            <span className="hidden md:inline" aria-hidden="true">·</span>
            <p>
              Designed and developed by <span className="font-medium text-foreground">Suyog Andhare</span>
            </p>
          </div>
          <div className="flex items-center gap-2.5">
            <a href={piStats.googleScholar} target="_blank" rel="noopener noreferrer" 
              className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary hover:text-foreground hover:bg-raised transition-colors"
              title="Google Scholar" aria-label="Google Scholar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269z"/><circle cx="12" cy="16.5" r="5.5"/></svg>
            </a>
            <a href={`https://orcid.org/${piStats.orcid}`} target="_blank" rel="noopener noreferrer" 
              className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary hover:text-foreground hover:bg-raised transition-colors"
              title="ORCID" aria-label="ORCID">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947s-.422.947-.947.947a.95.95 0 0 1-.947-.947c0-.525.422-.947.947-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.025-5.325 5.025h-3.919V7.416zm1.444 1.303v7.444h2.297c3.272 0 4.022-2.484 4.022-3.722 0-1.847-1.188-3.722-3.978-3.722h-2.341z"/></svg>
            </a>
            <a href={piStats.twitter} target="_blank" rel="noopener noreferrer" 
              className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary hover:text-foreground hover:bg-raised transition-colors"
              title="X" aria-label="X">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            <a href={piStats.linkedin} target="_blank" rel="noopener noreferrer" 
              className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary hover:text-foreground hover:bg-raised transition-colors"
              title="LinkedIn" aria-label="LinkedIn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/></svg>
            </a>
            <a href="mailto:eb.raman@iisertirupati.ac.in" 
              className="w-9 h-9 rounded-lg flex items-center justify-center text-secondary hover:text-foreground hover:bg-raised transition-colors"
              title="Email" aria-label="Email">
              <Mail size={14} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
