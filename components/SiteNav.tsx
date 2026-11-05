'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const links = [
  { href: '/', label: 'Home' },
  { href: '/pi', label: 'PI' },
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Publications' },
  { href: '/patents', label: 'Patents' },
  { href: '/team', label: 'People' },
  { href: '/news', label: 'News' },
  { href: '/resources', label: 'Resources' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <nav
      aria-label="Main"
      className="fixed top-3 inset-x-3 lg:inset-x-auto lg:left-1/2 lg:-translate-x-1/2 z-50 rounded-xl bg-surface/95 border border-line px-2 lg:px-3 py-1.5 flex flex-col lg:flex-row lg:items-center gap-1 text-sm"
    >
      <div className="flex items-center justify-between lg:justify-start gap-2">
        <Link href="/" className="flex items-center gap-2 p-1 rounded-lg" aria-label="Raman's Research Lab, home" onClick={() => setOpen(false)}>
          <img src="/images/lab-logo-hex-96.webp" alt="" width={28} height={32} className="w-7 h-8 shrink-0 min-w-7" />
        </Link>
        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="w-10 h-10 rounded-lg flex items-center justify-center text-foreground hover:bg-raised transition-colors"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div className={`${open ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row lg:items-center gap-0.5 pb-2 lg:pb-0`}>
        {links.map((link) => {
          const active = isActive(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active ? 'page' : undefined}
              onClick={() => setOpen(false)}
              className={`px-3 py-2 rounded-lg whitespace-nowrap transition-colors ${
                active
                  ? 'text-foreground underline decoration-2 decoration-[var(--accent)] underline-offset-[6px]'
                  : 'text-secondary hover:text-foreground hover:bg-raised'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        <span className="hidden lg:block w-px h-5 bg-line mx-1" aria-hidden="true"></span>
        <span className="hidden lg:block"><ThemeToggle /></span>
      </div>
    </nav>
  );
}
