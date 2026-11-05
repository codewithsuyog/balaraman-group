import { news } from '../data';
import { PageHeader, pageMain } from '@/components/ui';

export default function NewsPage() {
  return (
    <main id="main" className={pageMain}>
      <div className="max-w-3xl mx-auto">
        <PageHeader title="News" intro="Awards, new members and milestones from the lab" />
        <ol className="divide-y divide-[var(--line)] border-y border-line">
          {news.map((item) => (
            <li key={item.id} className="py-6">
              <p className="font-mono text-xs text-muted mb-2">{item.date} · {item.type}</p>
              <h2 className="font-sans text-lg font-medium text-foreground leading-snug mb-2">{item.title}</h2>
              <p className="text-secondary leading-relaxed">{item.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
