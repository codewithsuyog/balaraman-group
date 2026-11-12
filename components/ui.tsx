// Shared page pieces so every inner page uses the same type scale, spacing and chip style.
// Scale: page title (h1) text-5xl/7xl, section title (h2) text-3xl/4xl, item title (h3) text-lg medium.
import type { ReactNode } from 'react';

// Padding for an inner page's <main>: clears the floating nav (two lines on phones)
export const pageMain = 'w-full pt-32 pb-14 md:pb-20 px-6';

// Cards that link somewhere or can be acted on: accent border and a small lift on hover
export const cardHover = 'transition-[translate,border-color] duration-(--dur) ease-(--ease) hover:border-[var(--accent)] hover:-translate-y-0.5';

// Filter buttons, tabs and jump links: filled when active, outlined otherwise
export const chipClass = (active = false) =>
  `inline-flex items-center rounded-lg transition duration-(--dur-fast) active:scale-[0.98] ${
    active ? 'bg-foreground text-background' : 'border border-line text-secondary hover:text-foreground hover:bg-raised'
  }`;

export function PageHeader({ title, intro, eyebrow, children, className = 'mb-10 md:mb-12' }: {
  title: ReactNode;
  intro?: ReactNode;
  eyebrow?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={`max-w-3xl ${className}`}>
      {eyebrow && <p className="text-sm text-muted mb-3">{eyebrow}</p>}
      <h1 className="text-5xl md:text-7xl text-foreground leading-[0.95] mb-5">{title}</h1>
      {intro && <p className="text-lg md:text-xl text-secondary leading-relaxed">{intro}</p>}
      {children}
    </header>
  );
}

export function SectionHeading({ id, children, count, action, className = 'mb-6' }: {
  id?: string;
  children: ReactNode;
  count?: number;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`flex items-baseline justify-between gap-4 ${className}`}>
      <h2 id={id} className="text-3xl md:text-4xl text-foreground leading-[1]">
        {children}
        {count !== undefined && <span className="font-mono text-sm text-muted ml-2 tabular-nums">{count}</span>}
      </h2>
      {action}
    </div>
  );
}
