'use client';

import { useEffect, useState } from 'react';

// Sticky dot navigation for the Research themes (desktop only): highlights the theme in view.
export function ResearchDots({ items }: { items: { id: string; title: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Jump to theme" className="hidden xl:block fixed right-6 top-1/2 -translate-y-1/2 z-40">
      <ul className="flex flex-col items-end gap-3">
        {items.map(({ id, title }) => {
          const on = id === active;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-label={title}
                aria-current={on ? 'true' : undefined}
                className="group flex items-center gap-3 py-1"
              >
                <span className="text-xs text-secondary opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity whitespace-nowrap">
                  {title}
                </span>
                <span className={`block rounded-full transition-all ${on ? 'w-3 h-3 bg-accent-fill ring-4 ring-[var(--accent)]/20' : 'w-2 h-2 bg-[var(--muted)]'}`} />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
