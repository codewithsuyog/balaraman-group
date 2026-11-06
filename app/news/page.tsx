import Link from 'next/link';
import { news } from '../data';
import { PageHeader, pageMain } from '@/components/ui';
import { NewsImages } from '@/components/NewsImages';

export default function NewsPage() {
  return (
    <main id="main" className={pageMain}>
      <div className="max-w-3xl mx-auto">
        <PageHeader title="News" intro="Awards, new members and milestones from the lab" />
        <ol className="divide-y divide-[var(--line)] border-y border-line">
          {news.map((item) => (
            <li key={item.id} className="py-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
              <NewsImages images={item.images} className="sm:w-48 shrink-0" imgClassName="h-40 sm:h-36" />
              <div className="min-w-0">
                <p className="font-mono text-xs text-muted mb-2">{item.date} · {item.type}</p>
                <h2 className="font-sans text-lg font-medium text-foreground leading-snug mb-2">{item.title}</h2>
                <p className="text-secondary leading-relaxed">{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 text-secondary">
          Photos from these and other moments are in the{' '}
          <Link href="/gallery" className="text-accent underline underline-offset-4">gallery</Link>.
        </p>
      </div>
    </main>
  );
}
