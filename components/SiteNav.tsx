'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { siteLinks as links } from '@/components/site-links';

// One floating bar for every screen size, with every page link always visible:
// on narrow windows the links wrap onto extra lines instead of hiding behind a menu.
export default function SiteNav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href) || (href === '/team' && pathname.startsWith('/alumni')) || (href === '/contact' && pathname.startsWith('/join'));

  return (
    <nav
      aria-label="Main"
      className="fixed top-2 lg:top-3 inset-x-2 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 lg:w-max z-50 rounded-xl bg-surface/95 border border-line px-1.5 lg:px-3 py-1 lg:py-1.5 flex items-center gap-1 text-[13px] lg:text-sm"
    >
      <Link href="/" className="flex items-center p-1 rounded-lg shrink-0" aria-label="Raman's Research Lab, home">
        <img src="/images/lab-logo-hex-96.webp" alt="" width={28} height={32} className="w-7 h-8 shrink-0 min-w-7" />
      </Link>

      <div className="flex-1 min-w-0 flex flex-wrap items-center justify-center lg:justify-start gap-x-0.5">
        {links.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              className={`px-[5px] sm:px-2 lg:px-3 py-1.5 lg:py-2 rounded-lg whitespace-nowrap transition-colors ${
                active
                  ? 'text-foreground underline decoration-2 decoration-[var(--accent)] underline-offset-[6px]'
                  : 'text-secondary hover:text-foreground hover:bg-raised'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        {/* Theme toggle flows with the links so phones fit them on two lines */}
        <span className="hidden lg:block w-px h-5 bg-line mx-1" aria-hidden="true"></span>
        <span className="shrink-0"><ThemeToggle /></span>
      </div>
    </nav>
  );
}
