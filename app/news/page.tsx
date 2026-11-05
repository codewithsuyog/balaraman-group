import { news } from '../data';

export default function NewsPage() {
  return (
    <main id="main" className="w-full pt-28 md:pt-32 pb-20 md:pb-28 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl text-foreground leading-[1.04] mb-4">News</h1>
        <p className="text-lg text-secondary mb-12">Awards, new members and milestones from the lab</p>
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
